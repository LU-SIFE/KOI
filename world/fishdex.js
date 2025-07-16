const fishdex = [
  //Common Fish
  { name: "Drum", rarity: "Common" },
  { name: "Bass", rarity: "Common" },
  { name: "Perch", rarity: "Common" },
  { name: "Minnow", rarity: "Common" },
  { name: "Walleye", rarity: "Common" },
  { name: "Sunfish", rarity: "Common" },
  { name: "Flounder", rarity: "Common" },
  { name: "Bluegill", rarity: "Common" },

  //Uncommon Fish
  { name: "Carp", rarity: "Uncommon" },
  { name: "Trout", rarity: "Uncommon" },
  { name: "Catfish", rarity: "Uncommon" },
  { name: "Grouper", rarity: "Uncommon" },
  { name: "Snapper", rarity: "Uncommon" },
  { name: "Lingcod", rarity: "Uncommon" },
  { name: "Tilapia", rarity: "Uncommon" },
  { name: "Hogfish", rarity: "Uncommon" },
  { name: "Black Cod", rarity: "Uncommon" },

  //Rare Fish
  { name: "Pike", rarity: "Rare" },
  { name: "Salmon", rarity: "Rare" },
  { name: "Zander", rarity: "Rare" },
  { name: "Halibut", rarity: "Rare" },
  { name: "Sturgeon", rarity: "Rare" },
  { name: "Kingfish", rarity: "Rare" },
  { name: "Tilefish", rarity: "Rare" },
  { name: "Mahi Mahi", rarity: "Rare" },
  { name: "Barracuda", rarity: "Rare" },

  //Legendary Fish
  { name: "Marlin", rarity: "Legendary" },
  { name: "Voltfish", rarity: "Legendary" },
  { name: "Seadrake", rarity: "Legendary" },
  { name: "Swordfish", rarity: "Legendary" },
  { name: "Titan Bass", rarity: "Legendary" },
  { name: "Bluefin Tuna", rarity: "Legendary" },

  //Mythical Fish
  { name: "Nebulark", rarity: "Mythical" },
  { name: "Phoenix Carp", rarity: "Mythical" },
  { name: "Leviathan Fry", rarity: "Mythical" },
  { name: "Celestial Koi", rarity: "Mythical" },
  { name: "Dreamscale Eel", rarity: "Mythical" },
  { name: "Voidfin Serpent", rarity: "Mythical" },
  { name: "Moonlit Axolotl", rarity: "Mythical" },
  { name: "Eclipscale Trout", rarity: "Mythical" },
  { name: "Star-Eater Guppy", rarity: "Mythical" },
  { name: "Aurorafin Dragonet", rarity: "Mythical" },
  { name: "Whisperscale Wraith", rarity: "Mythical" },

  //Frozen Fish
  { name: "Glacier Ray", rarity: "Frozen" },
  { name: "Icefin Tetra", rarity: "Frozen" },
  { name: "Frostbite Eel", rarity: "Frozen" },
  { name: "Aurora Salmon", rarity: "Frozen" },
  { name: "Snowscale Carp", rarity: "Frozen" },
  { name: "Crystal Haddock", rarity: "Frozen" },

  //Fireproof Fish
  { name: "Magmafin", rarity: "Fireproof" },
  { name: "Lava Koi", rarity: "Fireproof" },
  { name: "Cinder Eel", rarity: "Fireproof" },
  { name: "Infernapleco", rarity: "Fireproof" },
  { name: "Ashscale Pike", rarity: "Fireproof" },
  { name: "Blazegill Grouper", rarity: "Fireproof" },

  //Twilight Fish
  { name: "Twilight Ray", rarity: "Twilight" },
  { name: "Lanternbelly", rarity: "Twilight" },
  { name: "Duskgill Carp", rarity: "Twilight" },
  { name: "Moonshadow Eel", rarity: "Twilight" },
  { name: "Stargazer Minnow", rarity: "Twilight" },
  { name: "Nocturne Catfish", rarity: "Twilight" },
  { name: "Nightlight Tetra", rarity: "Twilight" },
  { name: "Gloamfin Barracuda", rarity: "Twilight" },

  //Ethereal Fish
  { name: "Phantom Guppy", rarity: "Ethereal" },
  { name: "Celestail Koi", rarity: "Ethereal" },
  { name: "Moonlit Glider", rarity: "Ethereal" },
  { name: "Mistveil Minnow", rarity: "Ethereal" },
  { name: "Ghostscale Carp", rarity: "Ethereal" },
  { name: "Veilfin Serpent", rarity: "Ethereal" },
  { name: "Luminous Wispfin", rarity: "Ethereal" },
  { name: "Shimmerdrift Eel", rarity: "Ethereal" },

  //Chromatic Fish
  { name: "Prismscale Guppy", rarity: "Chromatic" },
  { name: "Rainbowfin Tetra", rarity: "Chromatic" },
  { name: "Spectrum Snapper", rarity: "Chromatic" },
  { name: "Kaleidoscale Koi", rarity: "Chromatic" },
  { name: "Iridescent Minnow", rarity: "Chromatic" },

  //Crystalline Fish
  { name: "Quartz Pike", rarity: "Crystalline" },
  { name: "Emerald Eel", rarity: "Crystalline" },
  { name: "Topaz Trout", rarity: "Crystalline" },
  { name: "Diamondback Carp", rarity: "Crystalline" },
  { name: "Sapphire Grouper", rarity: "Crystalline" },

  //Cursed Fish
  { name: "Wraith Pike", rarity: "Cursed" },
  { name: "Hauntgill Eel", rarity: "Cursed" },
  { name: "Bloodfin Catfish", rarity: "Cursed" },
  { name: "Shadowscale Bass", rarity: "Cursed" },
  { name: "Doomtail Snapper", rarity: "Cursed" },

  { name: "Chest", rarity: "Item" },
  { name: "Key", rarity: "Item" },
];

for (const fish of fishdex) {
  fish.caught = 0; //i didn't wanna write "caught" a hundred times :P
}

const rarityInfo = {
  Common: {
    order: 11, price: 1, color: [250, 250, 250],
    quote: "A humble fish, common but dependable."
  },

  Uncommon: {
    order: 10, price: 5, color: [180, 245, 200],
    quote: "A little rarer, showing promise beneath the waves."
  },

  Rare: {
    order: 9, price: 15, color: [180, 190, 255],
    quote: "A prize catch that few have the skill to reel in."
  },

  Frozen: {
    order: 8, price: 25, color: [100, 180, 255],
    quote: "Chilled by icy waters, with a frost-kissed glow."
  },

  Fireproof: {
    order: 7, price: 28, color: [255, 100, 70],
    quote: "Forged in fiery currents, it defies the flames."
  },

  Twilight: {
    order: 6, price: 30, color: [80, 80, 120],
    quote: "This fish shines softly under the moon's watchful eye."
  },

  Ethereal: {
    order: 5, price: 30, color: [210, 210, 255],
    quote: "A shimmering spirit of the water, barely caught between worlds."
  },

  Cursed: {
    order: 4, price: 35, color: [140, 0, 50],
    quote: "Beware the shadows it carries, for fortune has a price."
  },

  Crystalline: {
    order: 3, price: 40, color: [190, 255, 255],
    quote: "Sparkling like gemstones, it's a treasure from the depths."
  },

  Chromatic: {
    order: 2, price: 45, color: [255, 180, 255],
    quote: "A dazzling burst of colors, ever-changing and mesmerizing."
  },

  Legendary: {
    order: 1, price: 50, color: [255, 200, 150],
    quote: "A legendary catch, tales will be told of this one."
  },

  Mythical: {order: 0, price: 70, color: [200, 150, 255],
    quote: "A creature of legend, almost too magical to be real."
  },

  Item: {order: 12, price: 70, color: [200, 150, 255],
    quote: "A creature of legend, almost too magical to be real."
  }
};

const poolWeights = {
  Base: {
    Item: 1,
    Legendary: 3,
    Rare: 10,
    Uncommon: 22,
    Common: 65,
  },

  Frozen: {
    Item: 1,
    Mythical: 1,
    Legendary: 4,
    Rare: 8,
    Frozen: 20,
    Uncommon: 22,
    Common: 25,
  },

  Fireproof: {
    Item: 1,
    Mythical: 1,
    Legendary: 5,
    Rare: 7,
    Fireproof: 22,
    Uncommon: 22,
    Common: 23,
  },

  Twilight: {
    Item: 1,
    Mythical: 1,
    Legendary: 6,
    Rare: 9,
    Frozen: 10,
    Twilight: 25,
    Uncommon: 18,
    Common: 30,
  },

  Ethereal: {
    Item: 1,
    Mythical: 1,
    Legendary: 6,
    Rare: 9,
    Ethereal: 10,
    Twilight: 25,
    Uncommon: 18,
    Common: 30,
  }
};


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

  return function showPopup(message, color) {
    if (timeout) clearTimeout(timeout);
    if (color) {
      let r = color[0]
      let g = color[1]
      let b = color[2]
      element.style.color = `rgba(${r}, ${g}, ${b}, 1)`;
      element.style.borderColor = `rgba(${r}, ${g}, ${b}, 1)`;
    }
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
