//canvas init
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//game states
let caughtThisPress = false;
let menu_state = false;
let pond_select_state = false;
let isHolding = false;
let holdTime = 0;
let timeToCatch = 10000;

let currentPond = "Base";
let fishSpots = [];

let fishMax = 1;
let dirtyInventory = false;

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

let pondColors = {
  Base: [255, 202, 212],
  Frozen: [150, 220, 255],
  Fireproof: [255, 100, 70],
  Twilight: [80, 80, 120],
  Ethereal: [210, 210, 255],
  Cursed: [140, 0, 50],
  Crystalline: [190, 255, 255],
  Chromatic: [255, 180, 255],
};

let fisherColors = {
  Base: [255, 120, 200],
  Frozen: [0, 180, 255],
  Fireproof: [255, 60, 0],
  Twilight: [120, 0, 255],
  Ethereal: [210, 210, 255],
  Cursed: [255, 0, 90],
  Crystalline: [0, 255, 230],
  Chromatic: [255, 255, 0],
};

let unlockedPonds = {
  Base: true,
  Frozen: false,
  Fireproof: false,
  Twilight: false,
  Ethereal: false
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

const trail = [];
const maxTrailLength = 40; // length of the streamer

const diamond = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  angle: 0,             // radians
  size: 25,
  speed: 0,
  maxSpeed: 1.25,
  acceleration: 0.015,
  friction: 0.0175,
  turnSpeed: 0.025,
};