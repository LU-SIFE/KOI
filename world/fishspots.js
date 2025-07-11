const rippleRadius = 50;
const minDistanceBetweenFish = rippleRadius * 2.5;

function generateFishSpots(count) {
  const spots = [];
  const padding = 75;
  while (spots.length < count) {
    const candidate = {
      x: padding + Math.random() * (canvas.width - 2 * padding),
      y: padding + Math.random() * (canvas.height - 2 * padding),
      rippleSize: 0,
      fish: rollFishWeighted() // Assign a pre-rolled fish to the spot
    };

    const tooClose = spots.some(fish =>
      Math.hypot(fish.x - candidate.x, fish.y - candidate.y) < minDistanceBetweenFish
    );

    if (!tooClose) spots.push(candidate);
  }

  return spots;
}


let fishMax = 1;
let fishSpots = generateFishSpots(fishMax);
fishSpots = fishSpots.map(spot => {
  spot.fish = rollFishWeighted(); // This returns a fish object with rarity
  return spot;
});