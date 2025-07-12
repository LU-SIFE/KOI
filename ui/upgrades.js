function upgrade_speed() {
  const minCatchTime = 1000;
  if (timeToCatch <= minCatchTime) return;

  const baseCost = 20;
  // Calculate how many steps you've upgraded so far
  const upgradesDone = (10000 - timeToCatch) / 1000;
  const cost = baseCost * (upgradesDone + 1);

  if (!spendMoney(cost)) {
    console.log("Not enough money for speed upgrade!");
    return;
  }

  timeToCatch -= 1000;
  const newSeconds = timeToCatch / 1000;

  document.getElementById('speed_info').innerText = `${newSeconds} Second${newSeconds === 1 ? '' : 's'}`;
  document.getElementById('speed_price').innerText = timeToCatch === minCatchTime ? "MAX" : `$${baseCost * ((10000 - timeToCatch) / 1000 + 1)}`;
  saveUpgrades();

}

function upgrade_fish() {
  const maxFish = 10;
  const baseCost = 80;

  if (fishMax >= maxFish) return;

  const cost = baseCost * (fishMax + 1);

  if (!spendMoney(cost)) {
    console.log("Not enough money for max fish upgrade!");
    return;
  }

  fishMax++;
  document.getElementById('fish_info').innerText = `${fishMax} Max Fish`;
  document.getElementById('fish_price').innerText =
    fishMax === maxFish ? "MAX" : `$${baseCost * (fishMax + 1)}`;

  // Use spawnNewFishSpot helper to add a new spot safely!
  const newSpot = spawnNewFishSpot(fishSpots);
  fishSpots.push(newSpot);

  saveUpgrades();
}


function upgrade_fisher() {
  const maxFishers = 7;
  const baseCost = 300;

  if (autofishers.length >= maxFishers) return;

  const cost = baseCost * (autofishers.length + 1);

  if (!spendMoney(cost)) {
    console.log("Not enough money for autofisher upgrade!");
    return;
  }

  autofishers.push(createAutofisher());
  const fisherCount = autofishers.length;
  saveUpgrades();

  document.getElementById('fisher_info').innerText = `${fisherCount} Fisher${fisherCount === 1 ? '' : 's'}`;
  document.getElementById('fisher_price').innerText = fisherCount >= maxFishers ? "MAX" : `$${baseCost * (fisherCount + 1)}`;
}


function saveUpgrades() {
  const upgrades = {
    timeToCatch,
    fishMax,
    autofisherCount: autofishers.length
  };
  localStorage.setItem("gameUpgrades", JSON.stringify(upgrades));
}

function loadUpgrades() {
  const saved = localStorage.getItem("gameUpgrades");
  if (saved) {
    const upgrades = JSON.parse(saved);
    if (upgrades.timeToCatch !== undefined) timeToCatch = upgrades.timeToCatch;
    if (upgrades.fishMax !== undefined) fishMax = upgrades.fishMax;

    // For autofishers, recreate that many autofishers
    if (upgrades.autofisherCount !== undefined) {
      autofishers.length = 0; // clear current autofishers
      for (let i = 0; i < upgrades.autofisherCount; i++) {
        autofishers.push(createAutofisher());
      }
    }

    // Update UI to reflect loaded upgrades
    updateUpgradeUI();
  }
}

function updateUpgradeUI() {
  // Speed
  const newSeconds = timeToCatch / 1000;
  const minCatchTime = 1000;
  const baseSpeedCost = 20;
  document.getElementById('speed_info').innerText = `${newSeconds} Second${newSeconds === 1 ? '' : 's'}`;
  document.getElementById('speed_price').innerText =
    timeToCatch === minCatchTime ? "MAX" : `$${baseSpeedCost * ((10000 - timeToCatch) / 1000 + 1)}`;

  // Fish max
  const maxFish = 10;
  const baseFishCost = 80;
  document.getElementById('fish_info').innerText = `${fishMax} Max Fish`;
  document.getElementById('fish_price').innerText =
    fishMax === maxFish ? "MAX" : `$${baseFishCost * (fishMax + 1)}`;

  // Autofishers
  const maxFishers = 7;
  const baseFisherCost = 300;
  const fisherCount = autofishers.length;
  document.getElementById('fisher_info').innerText = `${fisherCount} Fisher${fisherCount === 1 ? '' : 's'}`;
  document.getElementById('fisher_price').innerText =
    fisherCount >= maxFishers ? "MAX" : `$${baseFisherCost * (fisherCount + 1)}`;
}
