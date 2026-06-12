/* ===== Hot Dog Hustle — game state + persistence ===== */
"use strict";

const SAVE_KEY = "hotdog-hustle-save-v1";

/* Persistent data (survives reload) */
const persist = {
  coins: 0,
  highScore: 0,
  bestDay: 0,
  muted: false,
};

/* Per-session game state — reset each game / day */
const state = {
  screen: "splash",          // splash | game | dayend | gameover
  running: false,
  paused: false,

  day: 1,
  dayTimeLeft: 90,           // seconds
  dayGoal: 50,               // coins target for the day
  dayCoins: 0,               // coins earned today
  score: 0,
  combo: 1,                  // multiplier ×1..×5
  comboStreak: 0,
  strikes: 0,                // 3 = day failed

  // held item being assembled on the tray: null or
  // {bun, sausage:null|{type,doneness}, sausageFrom:{x,y}, toppings:{ketchup,mustard,onions,kraut}, fries, soda, anim:{...0..1}}
  held: null,

  // serve fly-to-customer animation: null or {slot, t, dur, coins, quality}
  serveAnim: null,

  // grill: array of {type:'sausage'|'vegan', t:cook progress (cosmetic), id}
  grill: [],

  // stock
  stock: { buns: 8, sausages: 8 },
  restocking: null,          // null or {item:'buns'|'sausages', timeLeft}

  // customers: 3 slots, null or customer object (see customers.js)
  customers: [null, null, null],

  rushHour: { active: false, timeLeft: 0, happenedToday: false },

  stats: { served: 0, perfect: 0, angry: 0 },
};

function saveGame() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(persist)); } catch (e) {}
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) Object.assign(persist, JSON.parse(raw));
  } catch (e) {}
}

loadGame();
