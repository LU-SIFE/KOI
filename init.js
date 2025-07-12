//canvas init
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//game states
let caughtThisPress = false;
let menu_state = false;
let isHolding = false;
let holdTime = 0;
let timeToCatch = 10000;

let currentPond = "Base";
let fishSpots = [];

let fishMax = 1;

let quoteInterval;
let lastQuoteIndex = -1;
let quote_vis = true;

const keys = {};
let speedMultiplier = 1;

const autofishers = [];

const holdBarContainer = document.getElementById("holdBarContainer");
const holdBar = document.getElementById("holdBar");

// Inventory
let inventory = {
  fish: {},
  items: {},
  money: 0
};

// Sorting
const rarityOrder = {
  Mythical: 0,
  Legendary: 1,
  Night: 2,
  Fireproof: 3,
  Frozen: 4,
  Rare: 5,
  Uncommon: 6,
  Common: 7
};

let pondColors = {
    Base: [255, 202, 212],
    Frozen: [150, 220, 255],
};

let catchCount = 0;

// Menu states
let settings_state = false;
let market_state = false;
let inventory_state = false;
let upgrade_state = false;
let start_state = false;

// Constants for fish spawning
const rippleRadius = 50;
const minDistanceBetweenFish = rippleRadius * 2.5;
const fishSpawnPadding = 100;
const maxSpawnAttempts = 100;