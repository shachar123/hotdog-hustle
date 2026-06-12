/* ===== Hot Dog Hustle — main loop & input ===== */
"use strict";

let spawnTimer = 2000;       // ms until next spawn
let lastTs = 0;
let rafId = null;

/* ---------- day lifecycle ---------- */
function startDay(retry) {
  if (!retry) state.dayGoal = Math.round(BALANCE.baseGoal * Math.pow(BALANCE.goalGrowth, state.day - 1));
  state.dayTimeLeft = BALANCE.dayLength;
  state.dayCoins = 0;
  state.strikes = 0;
  state.held = null;
  state.serveAnim = null;
  state.grill = [];
  state.stock = { buns: BALANCE.stockMax, sausages: BALANCE.stockMax };
  state.restocking = null;
  state.customers = [null, null, null];
  state.rushHour = { active: false, timeLeft: 0, happenedToday: false };
  state.stats = { served: 0, perfect: 0, angry: 0 };
  spawnTimer = 1500;
  state.running = true;
  state.paused = false;
  showScreen("game");
  renderScene();
  renderHUD();
  setRushBanner(false);
  toast(`📅 יום ${state.day} — יעד: ${state.dayGoal} 💰`);
  playMusic();
  lastTs = 0;
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(tick);
}

function endDay() {
  state.running = false;
  cancelAnimationFrame(rafId);
  pauseMusic();
  setRushBanner(false);
  const passed = state.dayCoins >= state.dayGoal;
  persist.coins += state.dayCoins;
  if (state.score > persist.highScore) persist.highScore = state.score;
  if (passed && state.day > persist.bestDay) persist.bestDay = state.day;
  saveGame();
  sfx(passed ? "goal" : "fail");
  showDayEnd(passed);
  if (passed) state.day += 1;
}

function failDay() {
  state.running = false;
  cancelAnimationFrame(rafId);
  pauseMusic();
  setRushBanner(false);
  if (state.score > persist.highScore) { persist.highScore = state.score; }
  persist.coins += state.dayCoins;
  saveGame();
  sfx("fail");
  showGameOver();
}

function newGame() {
  state.day = 1;
  state.score = 0;
  state.combo = 1;
  state.comboStreak = 0;
  startDay(false);
}

/* ---------- main loop ---------- */
function tick(ts) {
  if (!state.running) return;
  if (!lastTs) lastTs = ts;
  const dt = Math.min(0.1, (ts - lastTs) / 1000);
  lastTs = ts;

  if (!state.paused) {
    // day clock
    state.dayTimeLeft -= dt;
    if (state.dayTimeLeft <= 0) { endDay(); return; }

    // rush hour trigger: from rushFromDay, once a day, somewhere in the middle
    if (state.day >= BALANCE.rushFromDay && !state.rushHour.happenedToday &&
        state.dayTimeLeft < BALANCE.dayLength * 0.6 && state.dayTimeLeft > BALANCE.rushHourLen + 10) {
      state.rushHour = { active: true, timeLeft: BALANCE.rushHourLen, happenedToday: true };
      setRushBanner(true);
      sfx("siren");
      toast("🚨 שעת לחץ — כפול לקוחות!");
    }
    if (state.rushHour.active) {
      state.rushHour.timeLeft -= dt;
      if (state.rushHour.timeLeft <= 0) { state.rushHour.active = false; setRushBanner(false); }
    }

    // spawn customers
    spawnTimer -= dt * 1000 * (state.rushHour.active ? 2 : 1);
    if (spawnTimer <= 0) {
      const slot = findFreeSlot();
      if (slot !== -1) spawnCustomer(slot);
      const base = Math.max(BALANCE.spawnMinMs, BALANCE.spawnBaseMs - (state.day - 1) * BALANCE.spawnDecayPerDay);
      spawnTimer = base * (0.7 + Math.random() * 0.6);
    }

    // patience
    const expired = tickCustomers(dt);
    expired.forEach((slot) => {
      state.customers[slot] = null;
      state.strikes += 1;
      state.stats.angry += 1;
      state.combo = 1; state.comboStreak = 0;
      sfx("angry");
      toast("😡 לקוח עזב בכעס!");
      if (state.strikes >= 3) { failDay(); }
    });
    if (!state.running) return;

    // restocking
    if (state.restocking) {
      state.restocking.timeLeft -= dt;
      if (state.restocking.timeLeft <= 0) {
        state.stock[state.restocking.item] = BALANCE.stockMax;
        toast("📦 המלאי חודש!");
        sfx("ding");
        state.restocking = null;
        renderStock();
      }
    }

    // grill cooking (cosmetic only — never rejected)
    state.grill.forEach((s) => { s.t = Math.min(1.25, s.t + dt / BALANCE.burnTime); });

    // meal assembly layer animations
    if (state.held && state.held.anim) {
      const a = state.held.anim;
      for (const k in a) { if (a[k] < 1) a[k] = Math.min(1, a[k] + dt / 0.28); }
    }

    // serve fly-to-customer animation
    if (state.serveAnim) {
      state.serveAnim.t += dt / state.serveAnim.dur;
      if (state.serveAnim.t >= 1) finalizeServe();
    }

    renderCustomers();
    renderGrill();
    renderAssembly();
    renderServeButton();
    renderHUD();
  }
  rafId = requestAnimationFrame(tick);
}

/* ---------- easing ---------- */
function easeOut(t) { return 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3); }

/* ---------- input ---------- */
function emptyHeld(bun) {
  return {
    bun,
    sausage: null,
    sausageFrom: null,
    toppings: { ketchup: 0, mustard: 0, onions: 0, kraut: 0 },
    fries: false,
    soda: false,
    anim: { bun: 0 }
  };
}

function takeBun(kind) {
  if (state.serveAnim) return;
  if (state.held) { toast("כבר יש מנה על המגש — הגש או זרוק 🗑️"); return; }
  if (state.stock.buns <= 0) { toast("אין לחמניות! מלא מלאי 📦"); sfx("trash"); return; }
  state.stock.buns -= 1;
  state.held = emptyHeld(kind);
  sfx("click");
  renderAssembly(); renderStock(); renderServeButton();
}

function addTopping(key) {
  if (state.serveAnim) return;
  if (!state.held) { toast("קח לחמנייה קודם! 🥖"); return; }
  if (!state.held.sausage) { toast("שים קודם נקניקייה 🌭"); return; }
  if (state.held.toppings[key]) { toast("כבר הוספת " + TOPPINGS[key].name); return; }
  state.held.toppings[key] = 1;
  state.held.anim[key] = 0;
  sfx("click");
  renderAssembly();
}

function addExtra(key) {
  if (state.serveAnim) return;
  if (!state.held) { toast("קח לחמנייה קודם! 🥖"); return; }
  if (state.held[key]) { toast("כבר הוספת"); return; }
  state.held[key] = true;
  state.held.anim[key] = 0;
  sfx("click");
  renderAssembly();
}

// put a raw dog on the grill
function addToGrill(type) {
  if (state.serveAnim) return;
  if (state.grill.length >= BALANCE.grillMax) { toast("הגריל מלא! 🔥"); return; }
  if (state.stock.sausages <= 0) { toast("אין נקניקיות! מלא מלאי 📦"); sfx("trash"); return; }
  state.stock.sausages -= 1;
  state.grill.push({ type, t: 0, id: Math.random() });
  sfx("sizzle");
  renderGrill(); renderStock();
}

// take a cooked dog off the grill into the bun (cosmetic doneness, never rejected)
function pickFromGrill(idx) {
  if (state.serveAnim) return;
  const s = state.grill[idx];
  if (!s) return;
  if (!state.held) { toast("קח לחמנייה קודם! 🥖"); return; }
  if (state.held.sausage) { toast("כבר יש נקניקייה בלחמנייה"); return; }
  const doneness = s.t < 0.4 ? "raw" : s.t < 0.85 ? "perfect" : "burnt";
  // remember where it came from so it animates from the grill into the bun
  const gx = 75 + idx * 52, gy = 470;
  state.grill.splice(idx, 1);
  state.held.sausage = { type: s.type, doneness };
  state.held.sausageFrom = { x: gx, y: gy };
  state.held.anim.sausage = 0;
  sfx("sizzle");
  renderGrill(); renderAssembly(); renderServeButton();
}

function handleSvgClick(e) {
  if (!state.running || state.paused) return;
  const t = e.target;
  const find = (sel) => t.closest(sel);

  // serve button
  if (find("#st_serve")) { serveViaButton(); return; }

  // customer serve (tap a customer directly)
  const cust = find(".cust-hit");
  if (cust) { serveTo(parseInt(cust.dataset.slot, 10)); return; }

  // pick a cooked dog off the grill
  const gd = find("[data-grill]");
  if (gd) { pickFromGrill(parseInt(gd.dataset.grill, 10)); return; }

  if (find("#st_rawSausages")) { addToGrill("sausage"); return; }
  if (find("#st_veganSausages")) { addToGrill("vegan"); return; }
  if (find("#st_buns")) { takeBun("regular"); return; }
  if (find("#st_pretzelBuns")) { takeBun("pretzel"); return; }
  if (find("#st_ketchup")) { addTopping("ketchup"); return; }
  if (find("#st_mustard")) { addTopping("mustard"); return; }
  if (find("#st_onions")) { addTopping("onions"); return; }
  if (find("#st_kraut")) { addTopping("kraut"); return; }
  if (find("#st_fries")) { addExtra("fries"); return; }
  if (find("#st_soda")) { addExtra("soda"); return; }
  if (find("#st_restock")) {
    if (state.restocking) return;
    const item = state.stock.sausages <= state.stock.buns ? "sausages" : "buns";
    state.restocking = { item, timeLeft: BALANCE.restockTime };
    toast("📦 ממלא מלאי...");
    sfx("click"); renderStock(); return;
  }
  if (find("#st_trash")) {
    if (state.held) {
      state.held = null;
      sfx("trash");
      toast("🗑️ נזרק לפח");
      renderAssembly(); renderServeButton();
    }
    return;
  }
}

// is the tray meal complete enough to serve?
function mealReady() {
  return !!(state.held && state.held.sausage);
}

// Serve button: deliver to the best matching waiting customer
function serveViaButton() {
  if (!mealReady() || state.serveAnim) { toast("הכן קודם מנה 🌭"); return; }
  let best = -1, bestPat = Infinity;
  for (let i = 0; i < state.customers.length; i++) {
    const c = state.customers[i];
    if (!c) continue;
    if (orderMatches(c.order, state.held).match && c.patience < bestPat) {
      best = i; bestPat = c.patience;
    }
  }
  if (best === -1) {
    // no one matches — tell the player what's off vs the most patient-waiting customer
    const waiting = state.customers.find(Boolean);
    sfx("angry");
    if (waiting) {
      const res = orderMatches(waiting.order, state.held);
      toast(res.reasons && res.reasons.length ? "❌ " + res.reasons[0] : "❌ אף לקוח לא הזמין את זה");
    } else {
      toast("אין לקוחות כרגע");
    }
    return;
  }
  serveTo(best);
}

// begin serving to a specific customer slot (starts fly animation)
function serveTo(slot) {
  if (state.serveAnim) return;
  const c = state.customers[slot];
  if (!c) return;
  if (!state.held) { toast("אין מה להגיש!"); return; }
  const res = orderMatches(c.order, state.held);
  if (!res.match) {
    sfx("angry");
    toast(res.reasons && res.reasons.length ? "❌ " + res.reasons[0] : "❌ זו לא ההזמנה!");
    return;
  }
  const patienceFrac = c.patience / c.maxPatience;
  const quality = patienceFrac > 0.55 ? "perfect" : "ok";
  const reward = customerReward(c, quality, patienceFrac);
  const coins = Math.round(reward.coins * (1 + (state.combo - 1) * 0.25));
  // lock in the animation; reward applied when it lands
  state.serveAnim = { slot, t: 0, dur: 0.55, coins, quality, score: reward.score };
  sfx("serve");
  renderServeButton();
}

// called when the serve fly animation lands on the customer
function finalizeServe() {
  const sa = state.serveAnim;
  state.serveAnim = null;
  if (!sa) return;
  const slot = sa.slot;
  const c = state.customers[slot];
  state.dayCoins += sa.coins;
  state.score += sa.score * state.combo;
  state.stats.served += 1;
  if (sa.quality === "perfect") {
    state.stats.perfect += 1;
    state.comboStreak += 1;
    if (state.comboStreak % 2 === 0 && state.combo < BALANCE.comboMax) state.combo += 1;
  } else {
    state.comboStreak = 0;
    state.combo = Math.max(1, state.combo - 1);
  }
  state.customers[slot] = null;
  state.held = null;
  setTimeout(() => sfx("coin"), 60);
  coinPop(slot, sa.coins);
  toast(sa.quality === "perfect" ? "✨ מושלם! +" + sa.coins : "👍 הוגש! +" + sa.coins);
  renderAssembly(); renderServeButton(); renderCustomers(); renderHUD();
}

/* ---------- buttons ---------- */
function initInput() {
  $("game-svg").addEventListener("click", handleSvgClick);
  $("btn-start").addEventListener("click", () => { initMusic(); sfx("click"); newGame(); });
  $("btn-nextday").addEventListener("click", () => { sfx("click"); startDay(state.dayCoins >= state.dayGoal ? false : true); });
  $("btn-restart").addEventListener("click", () => { sfx("click"); newGame(); });
  $("btn-mute").addEventListener("click", () => {
    const muted = toggleMute();
    $("btn-mute").textContent = muted ? "🔇" : "🔊";
  });
  $("btn-pause").addEventListener("click", () => {
    state.paused = !state.paused;
    $("btn-pause").textContent = state.paused ? "▶" : "⏸";
    if (state.paused) pauseMusic(); else playMusic();
  });
}

/* ---------- boot ---------- */
window.addEventListener("DOMContentLoaded", () => {
  renderSplash();
  initInput();
  $("btn-mute").textContent = persist.muted ? "🔇" : "🔊";
});
