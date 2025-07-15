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
  Chromatic: 2,
  Crystalline: 3,
  Cursed: 4,
  Ethereal: 5,
  Night: 6,
  Fireproof: 7,
  Frozen: 8,
  Rare: 9,
  Uncommon: 10,
  Common: 11
};

const rarityPrices = {
  Common: 1,
  Uncommon: 5,
  Rare: 15,
  Frozen: 25,
  Night: 22,
  Fireproof: 28,
  Ethereal: 30,
  Cursed: 35,
  Crystalline: 40,
  Chromatic: 45,
  Legendary: 60,
  Mythical: 80
};

let pondColors = {
  Base: [255, 202, 212],
  Frozen: [150, 220, 255],
  Fireproof: [255, 100, 70],
  Night: [80, 80, 120],
  Ethereal: [210, 210, 255],
  Cursed: [140, 0, 50],
  Crystalline: [190, 255, 255],
  Chromatic: [255, 180, 255],
};

let unlockedPonds = {
  Base: true,
  Frozen: false,
  Fireproof: false,
  Night: false
};

const inspect_quotes = {
  Common: "A humble fish, common but dependable.",
  Uncommon: "A little rarer, showing promise beneath the waves.",
  Rare: "A prize catch that few have the skill to reel in.",
  Frozen: "Chilled by icy waters, with a frost-kissed glow.",
  Night: "This fish shines softly under the moon's watchful eye.",
  Fireproof: "Forged in fiery currents, it defies the flames.",
  Ethereal: "A shimmering spirit of the water, barely caught between worlds.",
  Cursed: "Beware the shadows it carries, for fortune has a price.",
  Crystalline: "Sparkling like gemstones, it's a treasure from the depths.",
  Chromatic: "A dazzling burst of colors, ever-changing and mesmerizing.",
  Legendary: "A legendary catch, tales will be told of this one.",
  Mythical: "A creature of legend, almost too magical to be real."
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