"use strict";

// מזהה ייחודי גלובלי לכל לקוח
var _custIdCounter = 0;

// בחירת סוג לקוח אקראית לפי משקל
function pickCustomerType() {
  var keys = Object.keys(CUSTOMER_TYPES);
  var total = 0;
  for (var i = 0; i < keys.length; i++) {
    total += CUSTOMER_TYPES[keys[i]].weight;
  }
  var roll = Math.random() * total;
  var cumulative = 0;
  for (var j = 0; j < keys.length; j++) {
    cumulative += CUSTOMER_TYPES[keys[j]].weight;
    if (roll < cumulative) return keys[j];
  }
  return keys[keys.length - 1];
}

// בניית הזמנה לפי סוג לקוח ויום
function makeOrder(typeKey, day) {
  var type = CUSTOMER_TYPES[typeKey];
  var toppingKeys = Object.keys(TOPPINGS); // ['ketchup','mustard','onions','kraut']

  // -- לחמנייה --
  var bun;
  if (typeKey === 'child') {
    bun = 'regular';
  } else if (typeKey === 'vip') {
    // vip מעדיף בייגלה
    var pretzelChanceVip = 0.6 + Math.min(day - 1, 5) * 0.02;
    bun = Math.random() < pretzelChanceVip ? 'pretzel' : 'regular';
  } else if (typeKey === 'tourist') {
    var pretzelChanceTourist = 0.45 + Math.min(day - 1, 5) * 0.02;
    bun = Math.random() < pretzelChanceTourist ? 'pretzel' : 'regular';
  } else {
    // office, critic: סיכוי בסיסי קטן, גדל עם הימים
    var pretzelChanceBase = 0.15 + Math.min(day - 1, 7) * 0.02;
    bun = Math.random() < pretzelChanceBase ? 'pretzel' : 'regular';
  }

  // -- נקניקייה --
  var sausage;
  if (typeKey === 'child') {
    sausage = 'sausage';
  } else if (typeKey === 'tourist') {
    var veganChanceTourist = 0.35 + Math.min(day - 1, 5) * 0.02;
    sausage = Math.random() < veganChanceTourist ? 'vegan' : 'sausage';
  } else {
    var veganChanceBase = 0.1 + Math.min(day - 1, 7) * 0.015;
    sausage = Math.random() < veganChanceBase ? 'vegan' : 'sausage';
  }

  // -- תוספות --
  // מינימום תוספות לפי סוג ויום
  var minToppings = 0;
  if (typeKey === 'tourist') {
    minToppings = 2;
  } else if (typeKey === 'vip') {
    minToppings = 3;
  } else if (day >= 3) {
    minToppings = typeKey === 'child' ? 0 : 1;
  }

  var maxToppings = type.maxToppings;
  // הגבלה ל-4 (גודל מערך התוספות)
  maxToppings = Math.min(maxToppings, toppingKeys.length);
  minToppings = Math.min(minToppings, maxToppings);

  var toppingCount = minToppings + Math.floor(Math.random() * (maxToppings - minToppings + 1));
  toppingCount = Math.min(toppingCount, toppingKeys.length);

  // בחירת תוספות אקראיות
  var shuffled = toppingKeys.slice().sort(function() { return Math.random() - 0.5; });
  var chosen = shuffled.slice(0, toppingCount);

  var toppings = { ketchup: 0, mustard: 0, onions: 0, kraut: 0 };
  for (var i = 0; i < chosen.length; i++) {
    toppings[chosen[i]] = 1;
  }

  // -- תוספות (ציפס/שתייה) --
  var fries = Math.random() < type.extraChance;
  var soda  = Math.random() < type.extraChance;

  return {
    bun: bun,
    sausage: sausage,
    toppings: toppings,
    fries: fries,
    soda: soda
  };
}

// יצירת לקוח חדש וכניסתו לסלוט
function spawnCustomer(slot) {
  var typeKey = pickCustomerType();
  var type = CUSTOMER_TYPES[typeKey];
  var day = state.day || 1;

  // סבלנות מותאמת ליום (עם מינימום 8)
  var decayFactor = 1 - BALANCE.patienceDecayPerDay * (day - 1);
  var patience = Math.max(8, type.patience * decayFactor);

  var customer = {
    slot: slot,
    type: typeKey,
    order: makeOrder(typeKey, day),
    patience: patience,
    maxPatience: patience,
    variant: Math.floor(Math.random() * 6),
    id: ++_custIdCounter,
    served: false
  };

  state.customers[slot] = customer;
  return customer;
}

// מעדכן סבלנות לכל הלקוחות; מחזיר מערך סלוטים שפג סבלנותם
function tickCustomers(dt) {
  var expired = [];
  for (var i = 0; i < state.customers.length; i++) {
    var cust = state.customers[i];
    if (cust === null) continue;
    cust.patience -= dt;
    if (cust.patience <= 0) {
      cust.patience = 0;
      expired.push(i);
    }
  }
  return expired;
}

// מוצא סלוט פנוי אקראי; מחזיר -1 אם אין
function findFreeSlot() {
  var free = [];
  for (var i = 0; i < state.customers.length; i++) {
    if (state.customers[i] === null) free.push(i);
  }
  if (free.length === 0) return -1;
  return free[Math.floor(Math.random() * free.length)];
}

// השוואת הרכבה מוחזקת להזמנה; מחזירה {match, quality, reasons}
function orderMatches(order, held) {
  var reasons = [];
  var match = true;

  // בדיקת לחמנייה
  if (held.bun !== order.bun) {
    match = false;
    reasons.push('לחמנייה שגויה');
  }

  // בדיקת נקניקייה
  if (!held.sausage) {
    match = false;
    reasons.push('חסרה נקניקייה');
  } else if (held.sausage.type !== order.sausage) {
    match = false;
    reasons.push('סוג נקניקייה שגוי');
  }

  // בדיקת תוספות
  var toppingKeys = Object.keys(TOPPINGS);
  for (var i = 0; i < toppingKeys.length; i++) {
    var tk = toppingKeys[i];
    var wantedVal = order.toppings[tk] || 0;
    var heldVal   = (held.toppings && held.toppings[tk]) ? held.toppings[tk] : 0;
    if (wantedVal !== heldVal) {
      match = false;
      reasons.push('תוספת שגויה: ' + TOPPINGS[tk].name);
    }
  }

  // בדיקת ציפס ושתייה
  var heldFries = held.fries ? true : false;
  var heldSoda  = held.soda  ? true : false;
  if (heldFries !== order.fries) {
    match = false;
    reasons.push(order.fries ? 'חסר ציפס' : 'ציפס לא הוזמן');
  }
  if (heldSoda !== order.soda) {
    match = false;
    reasons.push(order.soda ? 'חסרה שתייה' : 'שתייה לא הוזמנה');
  }

  if (!match) {
    return { match: false, quality: 'ok', reasons: reasons };
  }

  // speed-based quality: perfect if customer still has >60% patience
  var quality = 'ok';
  return { match: true, quality: quality, reasons: reasons };
}

// חישוב תגמול לקוח
function customerReward(cust, quality, patienceFrac) {
  var type = CUSTOMER_TYPES[cust.type];
  var order = cust.order;

  // ספירת תוספות
  var toppingCount = 0;
  var toppingKeys = Object.keys(order.toppings);
  for (var i = 0; i < toppingKeys.length; i++) {
    if (order.toppings[toppingKeys[i]]) toppingCount++;
  }

  // מטבעות בסיסיים
  var coins = BALANCE.coinBase
    + toppingCount * BALANCE.coinPerTopping
    + (order.fries ? BALANCE.coinExtra : 0)
    + (order.soda  ? BALANCE.coinExtra : 0);

  coins *= type.tipMult;

  // מכפיל איכות
  if (quality === 'perfect') {
    coins *= 1.5;
  } else if (quality === 'bad') {
    coins *= 0.5;
  }

  // בונוס מהירות
  if (patienceFrac > 0.6) {
    coins += BALANCE.speedBonusCoins;
  }

  // כלל מיוחד למבקר
  if (cust.type === 'critic') {
    if (quality === 'perfect') {
      coins *= 2;
    } else if (quality === 'bad') {
      coins = 2;
    }
  }

  coins = Math.round(coins);

  var score = BALANCE.scoreServe;

  return { coins: coins, score: score };
}
