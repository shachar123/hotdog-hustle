/* ===== Hot Dog Hustle — rendering & screens ===== */
"use strict";

const SLOT_X = [280, 540, 800];
const CUST_Y = 205;

const $ = (id) => document.getElementById(id);

/* ---------- screens ---------- */
function showScreen(name) {
  state.screen = name;
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  $("screen-" + name).classList.add("active");
}

/* ---------- assembly tray geometry ---------- */
const TRAY_X = 515;     // meal origin x on the tray
const TRAY_Y = 600;     // meal base y on the tray

/* ---------- scene setup (once per day) ---------- */
function renderScene() {
  $("game-svg").innerHTML = `
    <defs>${customerGradDefs()}</defs>
    ${sceneArt()}
    <g id="layer-customers"></g>
    <g id="layer-bubbles" pointer-events="none"></g>
    <g id="layer-assembly" pointer-events="none"></g>
    <g id="layer-ui"></g>
    <g id="layer-fx" pointer-events="none"></g>
  `;
  renderCustomers();
  renderGrill();
  renderAssembly();
  renderServeButton();
  renderStock();
}

/* ---------- customers + bubbles + patience ---------- */
function customerExpr(c) {
  const frac = c.patience / c.maxPatience;
  const blink = Math.floor(performance.now() / 220) % 14 === 0;
  if (frac < 0.3) return blink ? "angryblink" : "angry";
  return blink ? "blink" : "normal";
}

function renderCustomers() {
  const layer = $("game-svg").querySelector("#layer-customers");
  const bubbles = $("game-svg").querySelector("#layer-bubbles");
  if (!layer) return;
  let custSvg = "", bubSvg = "";
  state.customers.forEach((c, i) => {
    if (!c) return;
    const x = SLOT_X[i];
    const t = CUSTOMER_TYPES[c.type];
    custSvg += `<g class="cust-hit" data-slot="${i}" style="cursor:pointer" transform="translate(${x - 100} ${CUST_Y})">
      ${customerArt(c.variant, customerExpr(c))}
      <g transform="translate(170 10)">${typeBadgeArt(t.emoji)}</g>
      <rect x="-10" y="-15" width="220" height="240" fill="transparent"/>
    </g>`;
    const frac = Math.max(0, c.patience / c.maxPatience);
    const barColor = frac > 0.5 ? "#2fa84f" : frac > 0.25 ? "#e8c020" : "#d83020";
    bubSvg += `<g transform="translate(${x - 85} ${CUST_Y - 175})">
      <rect x="0" y="-16" width="175" height="11" rx="5.5" fill="#3a3a3a" stroke="#1c1c1c" stroke-width="1.5"/>
      <rect x="1.5" y="-14.5" width="${172 * frac}" height="8" rx="4" fill="${barColor}"/>
      ${bubbleOrderText(c.order)}
    </g>`;
  });
  layer.innerHTML = custSvg;
  bubbles.innerHTML = bubSvg;
}

/* ---------- grill dynamic items ---------- */
function renderGrill() {
  const g = $("game-svg").querySelector("#grill-items");
  if (!g) return;
  g.innerHTML = state.grill
    .map((s, i) => `<g data-grill="${i}" style="cursor:pointer" transform="translate(${75 + i * 52} 470)">${grillSausageArt(s.type, s.t)}</g>`)
    .join("");
}

/* ---------- assembly tray meal ---------- */
function renderAssembly() {
  const g = $("game-svg").querySelector("#layer-assembly");
  if (!g) return;
  if (!state.held) { g.innerHTML = ""; return; }

  // serve fly-to-customer transform
  let dx = 0, dy = 0, scale = 1, opacity = 1;
  if (state.serveAnim) {
    const e = easeOut(state.serveAnim.t);
    const cx = SLOT_X[state.serveAnim.slot], cy = CUST_Y + 110;
    dx = (cx - TRAY_X) * e;
    dy = (cy - TRAY_Y) * e;
    scale = 1 - 0.45 * e;
    opacity = 1 - 0.25 * e;
  }

  g.innerHTML = `<g transform="translate(${TRAY_X + dx} ${TRAY_Y + dy}) scale(${scale})" opacity="${opacity}">${mealArt(state.held)}</g>`;
}

/* ---------- serve button + ready glow ---------- */
function renderServeButton() {
  const g = $("game-svg").querySelector("#layer-ui");
  if (!g) return;
  const ready = !!(state.held && state.held.sausage) && !state.serveAnim;
  g.innerHTML = ready ? serveButtonArt() : "";
}

/* ---------- stock ---------- */
function renderStock() {
  const svg = $("game-svg");
  const sb = svg.querySelector("#stock-buns"), ss = svg.querySelector("#stock-sausages");
  if (sb) sb.textContent = state.stock.buns;
  if (ss) ss.textContent = state.stock.sausages;
  const crate = svg.querySelector("#st_restock");
  if (crate) crate.style.opacity = state.restocking ? "0.5" : "1";
  const rv = svg.querySelector("#restock-vendor");
  if (rv) rv.setAttribute("display", state.restocking ? "inline" : "none");
}

/* ---------- HUD ---------- */
function renderHUD() {
  $("hud-score").textContent = state.score;
  $("hud-coins").textContent = state.dayCoins + " / " + state.dayGoal;
  $("hud-combo").textContent = "×" + state.combo;
  $("hud-day").textContent = state.day;
  $("hud-goal").textContent = state.dayGoal;
  $("hud-time").textContent = Math.ceil(state.dayTimeLeft);
  $("hud-strikes").textContent = "❌".repeat(state.strikes) + "⬜".repeat(Math.max(0, 3 - state.strikes));
}

/* ---------- toast message ---------- */
let toastTimer = null;
function toast(msg) {
  const el = $("toast-msg");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 1600);
}

/* ---------- coin pop effect ---------- */
function coinPop(slot, amount) {
  const fx = $("game-svg").querySelector("#layer-fx");
  if (!fx) return;
  const x = SLOT_X[slot];
  const el = document.createElementNS("http://www.w3.org/2000/svg", "g");
  el.innerHTML = `<text x="${x}" y="${CUST_Y - 20}" font-size="30" text-anchor="middle" fill="#e8b020" stroke="#7a5810" stroke-width="1" font-weight="bold">+${amount} 💰</text>`;
  fx.appendChild(el);
  let dy = 0;
  const anim = setInterval(() => {
    dy -= 2.5;
    el.setAttribute("transform", `translate(0 ${dy})`);
    el.setAttribute("opacity", String(1 + dy / 60));
    if (dy < -60) { clearInterval(anim); el.remove(); }
  }, 30);
}

/* ---------- rush banner ---------- */
function setRushBanner(on) {
  $("rush-banner").classList.toggle("show", on);
}

/* ---------- day end / game over ---------- */
function showDayEnd(passed) {
  const s = state.stats;
  $("dayend-title").textContent = passed ? `🎉 יום ${state.day} הושלם!` : `😞 לא הגעת ליעד...`;
  $("dayend-stats").innerHTML = `
    💰 הרווחת היום: <b class="${passed ? "stat-good" : "stat-bad"}">${state.dayCoins}</b> (יעד: ${state.dayGoal})<br>
    🌭 הוגשו: <b>${s.served}</b> &nbsp;|&nbsp; ✨ מושלמים: <b>${s.perfect}</b> &nbsp;|&nbsp; 😡 עזבו: <b>${s.angry}</b><br>
    💯 ניקוד כולל: <b>${state.score}</b>`;
  const rating = s.served === 0 ? "🪦" : s.perfect / Math.max(1, s.served) > 0.6 ? "⭐⭐⭐" : s.angry === 0 ? "⭐⭐" : "⭐";
  $("dayend-rating").textContent = rating;
  $("btn-nextday").textContent = passed ? "ליום הבא ▶" : "נסה שוב 🔄";
  showScreen("dayend");
}

function showGameOver() {
  $("gameover-stats").innerHTML = `
    💯 ניקוד: <b>${state.score}</b><br>
    📅 הגעת ליום: <b>${state.day}</b><br>
    🏆 השיא שלך: <b>${persist.highScore}</b>${state.score >= persist.highScore && state.score > 0 ? " — שיא חדש! 🎊" : ""}`;
  showScreen("gameover");
}

/* ---------- splash ---------- */
function renderSplash() {
  $("splash-art").innerHTML = splashVendorArt();
  $("splash-coins").textContent = persist.coins;
  $("splash-highscore").textContent = persist.highScore;
}
