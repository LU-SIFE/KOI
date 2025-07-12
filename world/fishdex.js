const fishdex = [
  { caught: 0, name: "Bass", rarity: "Common" },
  { caught: 0, name: "Perch", rarity: "Common" },
  { caught: 0, name: "Sunfish", rarity: "Common" },
  { caught: 0, name: "Trout", rarity: "Uncommon" },
  { caught: 0, name: "Carp", rarity: "Uncommon" },
  { caught: 0, name: "Catfish", rarity: "Uncommon" },
  { caught: 0, name: "Pike", rarity: "Rare" },
  { caught: 0, name: "Sturgeon", rarity: "Rare" },
  { caught: 0, name: "Salmon", rarity: "Rare" },
  { caught: 0, name: "Marlin", rarity: "Legendary" },
  { caught: 0, name: "Swordfish", rarity: "Legendary" },
  { caught: 0, name: "Bluefin Tuna", rarity: "Legendary" },
  { caught: 0, name: "Mahi Mahi", rarity: "Rare" },
  { caught: 0, name: "Grouper", rarity: "Uncommon" },
  { caught: 0, name: "Snapper", rarity: "Uncommon" },
  { caught: 0, name: "Flounder", rarity: "Common" },
  { caught: 0, name: "Barracuda", rarity: "Rare" },
  { caught: 0, name: "Halibut", rarity: "Rare" },
  { caught: 0, name: "Lingcod", rarity: "Uncommon" },
  { caught: 0, name: "Walleye", rarity: "Common" }
];

const rarityColorsRgb = {
  Common: [250, 250, 250],       // Soft Snow White ☁️
  Uncommon: [180, 245, 200],     // Pastel Mint Green 🍃
  Rare: [180, 210, 255],         // Powdery Sky Blue 💎
  Legendary: [255, 200, 150]     // Soft Tangerine Gold ✨
};

function getFishRarity(name) {
  const fish = fishdex.find(f => f.name === name);
  return fish?.rarity ?? "Common"; // default fallback
}

let catchCount = 0;

const rarityWeights = {
  Common: 65,
  Uncommon: 20,
  Rare: 10,
  Legendary: 5
};

// Build cumulative weight array once for efficient weighted random selection
const weightedFish = [];
let cumulativeWeight = 0;

for (const fish of fishdex) {
  const weight = rarityWeights[fish.rarity] ?? 0;
  if (weight > 0) {
    cumulativeWeight += weight;
    weightedFish.push({ fish, cumulativeWeight });
  }
}

function rollFishWeighted() {
  const rand = Math.random() * cumulativeWeight; // cumulativeWeight and weightedFish from fishdex.js
  for (const entry of weightedFish) {
    if (rand < entry.cumulativeWeight) {
      return entry.fish;
    }
  }
}

// Fish alert popup handler
const fishAlert = document.getElementById("fishAlert");
let alertTimeout;

function showFishAlert(message) {
  if (alertTimeout) clearTimeout(alertTimeout);

  fishAlert.innerHTML = message;
  fishAlert.classList.remove("hide");
  fishAlert.classList.add("show");

  // Trigger reflow for CSS animation restart
  void fishAlert.offsetWidth;

  alertTimeout = setTimeout(() => {
    fishAlert.classList.remove("show");
    fishAlert.classList.add("hide");
  }, 3000);
}

const fishInspect = document.getElementById("fishInspect");
let inspectTimeout;

function showFishInspect(message) {
  if (inspectTimeout) clearTimeout(inspectTimeout);

  fishInspect.innerHTML = message;
  fishInspect.classList.remove("hide");
  fishInspect.classList.add("show");

  // Trigger reflow for CSS animation restart
  void fishInspect.offsetWidth;

  alertTimeout = setTimeout(() => {
    fishInspect.classList.remove("show");
    fishInspect.classList.add("hide");
  }, 3000);
}

function saveFishdex() {
  // Only save the `caught` count for each fish
  const caughtCounts = fishdex.map(fish => fish.caught);
  localStorage.setItem("fishdexCaught", JSON.stringify(caughtCounts));
}


function loadFishdex() {
  const saved = localStorage.getItem("fishdexCaught");
  if (saved) {
    const caughtCounts = JSON.parse(saved);
    for (let i = 0; i < fishdex.length; i++) {
      if (caughtCounts[i] !== undefined) {
        fishdex[i].caught = caughtCounts[i];
      }
    }
  }
}
