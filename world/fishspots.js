function createFishSpot() {
  return {
    x: fishSpawnPadding + Math.random() * (canvas.width - 2 * fishSpawnPadding),
    y: fishSpawnPadding + Math.random() * (canvas.height - 2 * fishSpawnPadding),
    rippleSize: 0,
    fish: rollFishWeighted(),
  };
}


function generateFishSpots(count) {
  const spots = [];

  while (spots.length < count) {
    let candidate;
    let attempts = 0;

    do {
      candidate = createFishSpot();
      attempts++;
    } while (
      spots.some(fish =>
        Math.hypot(fish.x - candidate.x, fish.y - candidate.y) < minDistanceBetweenFish
      ) && attempts < maxSpawnAttempts
    );

    spots.push(candidate);
  }

  return spots;
}

function spawnNewFishSpot(existingSpots) {
  let attempts = 0;
  let newSpot;

  do {
    newSpot = createFishSpot();
    attempts++;
  } while (
    existingSpots.some(f =>
      Math.hypot(f.x - newSpot.x, f.y - newSpot.y) < minDistanceBetweenFish
    ) && attempts < maxSpawnAttempts
  );

  return newSpot;
}
