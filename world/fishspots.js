// Constants for fish spawning and ripple radius
const rippleRadius = 50;
const minDistanceBetweenFish = rippleRadius * 2.5;
const fishSpawnPadding = 50;  // Unified padding constant for all spawning
const maxSpawnAttempts = 100;

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

// Example usage:
let fishMax = 1;
let fishSpots = generateFishSpots(fishMax);
