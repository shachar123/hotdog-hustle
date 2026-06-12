"use strict";

var BUNS = {
  regular: { name: 'לחמנייה' },
  pretzel: { name: 'לחמניית בייגלה' }
};

var SAUSAGES = {
  sausage: { name: 'נקניקייה' },
  vegan:   { name: 'נקניקייה טבעונית' }
};

var TOPPINGS = {
  ketchup:  { name: 'קטשופ' },
  mustard:  { name: 'חרדל' },
  onions:   { name: 'בצל מטוגן' },
  kraut:    { name: 'כרוב כבוש' }
};

var EXTRAS = {
  fries: { name: 'ציפס' },
  soda:  { name: 'שתייה' }
};

var CUSTOMER_TYPES = {
  office: {
    name: 'עובד משרד',
    patience: 35,
    tipMult: 1.0,
    weight: 35,
    maxToppings: 2,
    extraChance: 0.25,
    emoji: '💼'
  },
  tourist: {
    name: 'תייר',
    patience: 42,
    tipMult: 1.6,
    weight: 20,
    maxToppings: 4,
    extraChance: 0.5,
    emoji: '📷'
  },
  child: {
    name: 'ילד',
    patience: 28,
    tipMult: 0.8,
    weight: 20,
    maxToppings: 1,
    extraChance: 0.6,
    emoji: '🧒'
  },
  vip: {
    name: 'VIP',
    patience: 32,
    tipMult: 2.5,
    weight: 15,
    maxToppings: 4,
    extraChance: 0.7,
    emoji: '⭐'
  },
  critic: {
    name: 'מבקר אוכל',
    patience: 50,
    tipMult: 3.0,
    weight: 5,
    maxToppings: 3,
    extraChance: 0.3,
    emoji: '📝'
  }
};

var BALANCE = {
  dayLength: 120,
  baseGoal: 40,
  goalGrowth: 1.15,
  spawnBaseMs: 8000,
  spawnMinMs: 3500,
  spawnDecayPerDay: 300,
  patienceDecayPerDay: 0.04,
  burnTime: 16,                 // cosmetic only: seconds for a dog to go raw->perfect->burned
  grillMax: 4,                  // max dogs on the grill at once
  restockTime: 2,
  stockMax: 10,
  scoreServe: 10,
  comboMax: 5,
  coinBase: 8,
  coinPerTopping: 2,
  coinExtra: 4,
  speedBonusCoins: 5,
  rushHourLen: 20,
  rushFromDay: 4
};
