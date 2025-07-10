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
  document.getElementById('speed_price').innerText =
    timeToCatch === minCatchTime ? "MAX" : `$${baseCost * ((10000 - timeToCatch) / 1000 + 1)}`;
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

  // Spawn new fish spot logic...
  const padding = 50;
  const maxAttempts = 100;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const candidate = {
      x: padding + Math.random() * (canvas.width - 2 * padding),
      y: padding + Math.random() * (canvas.height - 2 * padding),
      rippleSize: 0
    };

    const tooClose = fishSpots.some(f =>
      Math.hypot(f.x - candidate.x, f.y - candidate.y) < minDistanceBetweenFish
    );

    if (!tooClose) {
      fishSpots.push(candidate);
      break;
    }

    attempts++;
  }
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

  document.getElementById('fisher_info').innerText = `${fisherCount} Fisher${fisherCount === 1 ? '' : 's'}`;
  document.getElementById('fisher_price').innerText =
    fisherCount >= maxFishers ? "MAX" : `$${baseCost * (fisherCount + 1)}`;
}
