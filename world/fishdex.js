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

let catchCount = 0;

const rarityWeights = {
  Common: 70,
  Uncommon: 24,
  Rare: 5,
  Legendary: 1
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

function rollFish() {
  const rand = Math.random() * cumulativeWeight;
  
  for (const entry of weightedFish) {
    if (rand < entry.cumulativeWeight) {
      entry.fish.caught++;
      catchCount++;
      localStorage.setItem("catchCount", catchCount);

      // Use 'an' before vowels
      const article = entry.fish.rarity.toLowerCase().startsWith("u") ? "an" : "a";
      const message = `You caught ${article} ${entry.fish.rarity} ${entry.fish.name}!<br>Caught: ${entry.fish.caught}`;

      showFishAlert(message);
      document.getElementById("catchCount").innerHTML = `Fish Caught: ${catchCount}`;
      inventory.money += 10; //replace later!

      saveFishdex();
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
