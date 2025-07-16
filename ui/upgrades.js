let upgrades = {
  Base: {
    Speed: {
      Value: 0,
      Max: 9,
      Prices: [20, 40, 60, 80, 100, 120, 140, 160, 180]
    },

    FishAmount: {
      Value: 1,
      Max: 10,
      Prices: [80, 130, 180, 230, 280, 330, 380, 430, 480, 530]
    },

    Fishers: {
      Value: 0,
      Max: 7,
      Prices: [250, 450, 650, 850, 1050, 1250, 1450]
    },

    NextPond: {
      Value: 0,
      Max: 1,
      Prices: [5000],
      PondType: "Frozen"
    }
  },

  Frozen: {
    Speed: {
      Value: 0,
      Max: 9,
      Prices: [40, 75, 110, 145, 180, 215, 250, 285, 320]
    },

    FishAmount: {
      Value: 1,
      Max: 10,
      Prices: [80, 130, 180, 230, 280, 330, 380, 430, 480, 530]
    },

    Fishers: {
      Value: 0,
      Max: 7,
      Prices: [250, 450, 650, 850, 1050, 1250, 1450]
    },

    NextPond: {
      Value: 0,
      Max: 1,
      Prices: [7000],
      PondType: "Fireproof"
    }
  },

  Fireproof: {
    Speed: {
      Value: 0,
      Max: 9,
      Prices: [50, 100, 150, 200, 250, 300, 350, 400, 450]
    },

    FishAmount: {
      Value: 1,
      Max: 10,
      Prices: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    },

    Fishers: {
      Value: 0,
      Max: 7,
      Prices: [300, 550, 800, 1050, 1300, 1550, 1800]
    },

    NextPond: {
      Value: 0,
      Max: 1,
      Prices: [14000],
      PondType: "Night"
    }
  },

  Night: {
    Speed: {
      Value: 0,
      Max: 9,
      Prices: [70, 140, 210, 280, 350, 420, 490, 560, 630]
    },

    FishAmount: {
      Value: 1,
      Max: 10,
      Prices: [140, 280, 420, 560, 700, 840, 980, 1120, 1260, 1400]
    },

    Fishers: {
      Value: 0,
      Max: 7,
      Prices: [420, 770, 1120, 1470, 1820, 2170, 2520]
    },

    NextPond: {
      Value: 0,
      Max: 1,
      Prices: [20000],
      PondType: "Ethereal"
    }
  },

  Ethereal: {
    Speed: {
      Value: 0,
      Max: 9,
      Prices: [80, 160, 240, 320, 400, 480, 560, 640, 720]
    },

    FishAmount: {
      Value: 1,
      Max: 10,
      Prices: [160, 320, 480, 640, 800, 960, 1120, 1280, 1440, 1600]
    },

    Fishers: {
      Value: 0,
      Max: 7,
      Prices: [480, 960, 1440, 1920, 2400, 2880, 3360]
    },

    NextPond: {
      Value: 0,
      Max: 1,
      Prices: [30000],
      PondType: "Base"
    }
  }
};

function upgradeUpgrade(type) {
  const pondUpgrades = upgrades[currentPond];

  if (!pondUpgrades || !pondUpgrades[type]) return;

  const upgrade = pondUpgrades[type];
  const currentValue = upgrade.Value;
  const maxValue = upgrade.Max;

  // 🧠 Allow switching ponds if upgrade is maxed
  if (currentValue >= maxValue) {
    if (type === "NextPond" && upgrade.PondType && upgrades[upgrade.PondType]) {
      switchPond(upgrade.PondType);
    }
    return;
  }

  // 🛒 Normal purchase and effect logic
  const cost = upgrade.Prices[currentValue];
  if (!spendMoney(cost)) return;

  upgrade.Value++;

  // Apply effects
  switch (type) {
    case "Speed":
      timeToCatch = 10000 - upgrade.Value * 1000;
      break;

    case "FishAmount":
      fishMax = upgrade.Value;
      const newSpot = spawnNewFishSpot(fishSpots);
      fishSpots.push(newSpot);
      break;

    case "Fishers":
      autofishers.push(createAutofisher());
      break;

    case "NextPond":
      // Switch only if pond is defined
      if (upgrade.PondType && upgrades[upgrade.PondType]) {
        unlockedPonds[upgrade.PondType] = true;
        switchPond(upgrade.PondType);
      }
      break;
  }

  saveUpgrades();
  updateUpgradeUI();
  updateMoneyDisplay();

}

function saveUpgrades() {
  localStorage.setItem("gameUpgrades", JSON.stringify(upgrades));
  localStorage.setItem("currentPond", currentPond);
  localStorage.setItem("unlockedPonds", JSON.stringify(unlockedPonds));
}

function loadUpgrades() {
  const saved = localStorage.getItem("gameUpgrades");

  if (saved) {
    upgrades = JSON.parse(saved);
  }

  const pondUpgrades = upgrades[currentPond];

  if (!pondUpgrades) {
    console.warn(`No upgrades found for pond: ${currentPond}`);
    return;
  }

  // Apply loaded upgrade values to your game state
  if (pondUpgrades.Speed) {
    timeToCatch = 10000 - pondUpgrades.Speed.Value * 1000;
  }

  if (pondUpgrades.FishAmount) {
    fishMax = pondUpgrades.FishAmount.Value;
    while (fishSpots.length < fishMax) {
      const newSpot = spawnNewFishSpot(fishSpots);
      fishSpots.push(newSpot);
    }
  }

  if (pondUpgrades.Fishers) {
    autofishers.length = 0;
    for (let i = 0; i < pondUpgrades.Fishers.Value; i++) {
      autofishers.push(createAutofisher());
    }
  }
}

function updateUpgradeUI() {
  const pondUpgrades = upgrades[currentPond];

  // Speed
  const speedVal = pondUpgrades.Speed.Value;
  const speedMax = pondUpgrades.Speed.Max;
  const speedNext = pondUpgrades.Speed.Prices[speedVal];
  const speedSeconds = (10000 - speedVal * 1000) / 1000;

  document.getElementById('speed_info').innerText = `${speedSeconds} Second${speedSeconds === 1 ? '' : 's'}`;
  document.getElementById('speed_price').innerText = speedVal >= speedMax ? "MAX" : `$${speedNext}`;

  // FishAmount
  const fishVal = pondUpgrades.FishAmount.Value;
  const fishMax = pondUpgrades.FishAmount.Max;
  const fishNext = pondUpgrades.FishAmount.Prices[fishVal];

  document.getElementById('fish_info').innerText = `${fishVal} Max Fish`;
  document.getElementById('fish_price').innerText = fishVal >= fishMax ? "MAX" : `$${fishNext}`;

  // Fishers
  const fisherVal = pondUpgrades.Fishers.Value;
  const fisherMax = pondUpgrades.Fishers.Max;
  const fisherNext = pondUpgrades.Fishers.Prices[fisherVal];

  document.getElementById('fisher_info').innerText = `${fisherVal} Fisher${fisherVal === 1 ? '' : 's'}`;
  document.getElementById('fisher_price').innerText = fisherVal >= fisherMax ? "MAX" : `$${fisherNext}`;

  // NextPond upgrade UI
  const nextPondVal = pondUpgrades.NextPond.Value;
  const nextPondMax = pondUpgrades.NextPond.Max;
  const nextPondNext = pondUpgrades.NextPond.Prices[nextPondVal];

  const nextPondInfo = document.getElementById('nextpond_info');
  const nextPondPrice = document.getElementById('nextpond_price');

  if (!nextPondInfo || !nextPondPrice) return; // safety check

  if (nextPondVal >= nextPondMax) {
    nextPondInfo.innerText = `(Unlocked)`;
    nextPondPrice.innerText = "";
  } else {
    nextPondInfo.innerText = `(Locked)`;
    nextPondPrice.innerText = `${nextPondNext}`;
  }
}

function updateUpgradeUI() {
  const pondUpgrades = upgrades[currentPond];

  // Speed
  const speedVal = pondUpgrades.Speed.Value;
  const speedMax = pondUpgrades.Speed.Max;
  const speedNext = pondUpgrades.Speed.Prices[speedVal];
  const speedSeconds = (10000 - speedVal * 1000) / 1000;

  document.getElementById('speed_info').innerText = `${speedSeconds} Second${speedSeconds === 1 ? '' : 's'}`;
  document.getElementById('speed_price').innerText = speedVal >= speedMax ? "MAX" : `$${speedNext}`;

  // FishAmount
  const fishVal = pondUpgrades.FishAmount.Value;
  const fishMax = pondUpgrades.FishAmount.Max;
  const fishNext = pondUpgrades.FishAmount.Prices[fishVal];

  document.getElementById('fish_info').innerText = `${fishVal} Max Fish`;
  document.getElementById('fish_price').innerText = fishVal >= fishMax ? "MAX" : `$${fishNext}`;

  // Fishers
  const fisherVal = pondUpgrades.Fishers.Value;
  const fisherMax = pondUpgrades.Fishers.Max;
  const fisherNext = pondUpgrades.Fishers.Prices[fisherVal];

  document.getElementById('fisher_info').innerText = `${fisherVal} Fisher${fisherVal === 1 ? '' : 's'}`;
  document.getElementById('fisher_price').innerText = fisherVal >= fisherMax ? "MAX" : `$${fisherNext}`;


  const nextPondVal = pondUpgrades.NextPond.Value;
  const nextPondMax = pondUpgrades.NextPond.Max;
  const nextPondNext = pondUpgrades.NextPond.Prices[nextPondVal];

  const nextPondInfo = document.getElementById('nextpond_info');
  const nextPondPrice = document.getElementById('nextpond_price');

  if (nextPondVal >= nextPondMax) {
    nextPondInfo.innerText = `(Unlocked)`;
    nextPondPrice.innerText = "";
  } else {
    nextPondInfo.innerText = `(Locked)`;
    nextPondPrice.innerText = `$${nextPondNext}`;
  }

  updatePondButtons();
}

function update_overlay(pond) {
  const r = pondColors[pond][0];
  const g = pondColors[pond][1];
  const b = pondColors[pond][2];
  document.getElementById("overlay").style.backgroundImage = `radial-gradient(rgba(${r}, ${g}, ${b}, 1) 1px, transparent 2px)`;

  canvas.style.filter = `drop-shadow(5px 30px 4px rgba(${r}, ${g}, ${b}, 0.4))`;
}

function switchPond(newPond) {
  if (unlockedPonds[newPond] === false || start_state === false) { return; }
  saveUpgrades();
  currentPond = newPond;
  loadUpgrades();
  buildWeights(currentPond);
  fishSpots = generateFishSpots(fishMax);
  updateUpgradeUI();
  update_overlay(currentPond);
  saveUpgrades();
  updateQuoteColors()
}

function updateQuoteColors() {
  const r = pondColors[currentPond][0]
  const g = pondColors[currentPond][1]
  const b = pondColors[currentPond][2]
  document.getElementById("quotes").style.color = `rgba(${r}, ${g}, ${b}, 1)`;
}

function updatePondButtons() {
  for (let pond in unlockedPonds) {
    if (unlockedPonds[pond] === true) {
      
      const btn = document.getElementById(pond + "Btn");
      btn.classList.remove('hide');
      btn.classList.add('show');
      let r = pondColors[pond][0];
      let g = pondColors[pond][1];
      let b = pondColors[pond][2];

      if (!btn.classList.contains('button-hover')) {
        btn.classList.add('button-hover');
      }

      // Apply custom CSS variables for your button styles
      btn.style.setProperty('--btn-color', `rgba(${r}, ${g}, ${b}, 1)`);
      btn.style.setProperty('--btn-hover-bg', `rgba(${r}, ${g}, ${b}, 0.5)`);

      // Optional: Reset any previously set border/color if needed
      btn.style.border = '';
      btn.style.color = '';

    } else {
      document.getElementById(pond + "Btn").classList.remove('show');
      document.getElementById(pond + "Btn").classList.add('hide');
    }
  }
}


function loadPondStates() {

  let saved = localStorage.getItem("unlockedPonds");

  if (saved) {
    saved = JSON.parse(saved);
  unlockedPonds = saved;
  }
}

function catchUpdate(count) {
  if (count >= 999999) {
    document.getElementById("catchCount").innerHTML = `Fish Caught: A Lot`;
  } else {
    document.getElementById("catchCount").innerHTML = `Fish Caught: ${catchCount}`;
  }
}