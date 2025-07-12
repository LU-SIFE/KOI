const fishdex = [
  //Common Fish
  { caught: 0, name: "Bass", rarity: "Common" },
  { caught: 0, name: "Perch", rarity: "Common" },
  { caught: 0, name: "Walleye", rarity: "Common" },
  { caught: 0, name: "Sunfish", rarity: "Common" },
  { caught: 0, name: "Flounder", rarity: "Common" },

  //Uncommon Fish
  { caught: 0, name: "Carp", rarity: "Uncommon" },
  { caught: 0, name: "Trout", rarity: "Uncommon" },
  { caught: 0, name: "Catfish", rarity: "Uncommon" },
  { caught: 0, name: "Grouper", rarity: "Uncommon" },
  { caught: 0, name: "Snapper", rarity: "Uncommon" },
  { caught: 0, name: "Lingcod", rarity: "Uncommon" },

  //Rare Fish
  { caught: 0, name: "Pike", rarity: "Rare" },
  { caught: 0, name: "Sturgeon", rarity: "Rare" },
  { caught: 0, name: "Salmon", rarity: "Rare" },
  { caught: 0, name: "Mahi Mahi", rarity: "Rare" },
  { caught: 0, name: "Barracuda", rarity: "Rare" },
  { caught: 0, name: "Halibut", rarity: "Rare" },

  //Legendary Fish
  { caught: 0, name: "Marlin", rarity: "Legendary" },
  { caught: 0, name: "Swordfish", rarity: "Legendary" },
  { caught: 0, name: "Bluefin Tuna", rarity: "Legendary" },

  //Mythical Fish
  { caught: 0, name: "Nebulark", rarity: "Mythical" },
  { caught: 0, name: "Phoenix Carp", rarity: "Mythical" },
  { caught: 0, name: "Leviathan Fry", rarity: "Mythical" },
  { caught: 0, name: "Celestial Koi", rarity: "Mythical" },
  { caught: 0, name: "Dreamscale Eel", rarity: "Mythical" },
  { caught: 0, name: "Voidfin Serpent", rarity: "Mythical" },
  { caught: 0, name: "Moonlit Axolotl", rarity: "Mythical" },
  { caught: 0, name: "Star-Eater Guppy", rarity: "Mythical" },


  //Frozen Fish
  { caught: 0, name: "Glacier Ray", rarity: "Frozen" },
  { caught: 0, name: "Icefin Tetra", rarity: "Frozen" },
  { caught: 0, name: "Frostbite Eel", rarity: "Frozen" },
  { caught: 0, name: "Aurora Salmon", rarity: "Frozen" },
  { caught: 0, name: "Snowscale Carp", rarity: "Frozen" },
  { caught: 0, name: "Crystal Haddock", rarity: "Frozen" },

];

const rarityColorsRgb = {
  Mythical: [200, 150, 255],
  Legendary: [255, 200, 150],
  Night: [50, 50, 80],
  Fireproof: [255, 100, 70],
  Frozen: [150, 220, 255],
  Rare: [180, 210, 255],
  Uncommon: [180, 245, 200],
  Common: [250, 250, 250]
};


const poolWeights = {
  Base: {
    Legendary: 5,
    Rare: 10,
    Uncommon: 20,
    Common: 65,
  },

  Frozen: {
    Mythical: 1,
    Legendary: 4,
    Rare: 8,
    Frozen: 25,
    Uncommon: 22,
    Common: 20,
  },
}

function getFishRarity(name) {
  const fish = fishdex.find(f => f.name === name);
  return fish?.rarity ?? "Common"; // default fallback
}

function buildWeights(pond) {
  weightedFish = [];
  cumulativeWeight = 0;

  for (const fish of fishdex) {
    const weight = poolWeights[pond][fish.rarity] ?? 0;
    if (weight > 0) {
      cumulativeWeight += weight;
      weightedFish.push({ fish, cumulativeWeight });
    }
  }
}

// Build cumulative weight array once for efficient weighted random selection
let weightedFish = [];
let cumulativeWeight = 0;

function rollFishWeighted() {
  const rand = Math.random() * cumulativeWeight; // cumulativeWeight and weightedFish from fishdex.js
  for (const entry of weightedFish) {
    if (rand < entry.cumulativeWeight) {
      return entry.fish;
    }
  }
}
function createPopupHandler(elementId) {
  const element = document.getElementById(elementId);
  let timeout;

  return function showPopup(message) {
    if (timeout) clearTimeout(timeout);

    element.innerHTML = message;
    element.classList.remove("hide");
    element.classList.add("show");

    // Trigger reflow for CSS animation restart
    void element.offsetWidth;

    timeout = setTimeout(() => {
      element.classList.remove("show");
      element.classList.add("hide");
    }, 3000);
  };
}

const showFishAlert = createPopupHandler("fishAlert");
const showFishInspect = createPopupHandler("fishInspect");

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
