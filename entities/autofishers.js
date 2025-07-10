const autofishers = [];

function createAutofisher() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    angle: 0,
    size: 20,
    speed: 0,
    maxSpeed: 1.25,
    acceleration: 0.015,
    friction: 0.0175,
    turnSpeed: 0.02,
    holding: false,
    holdTime: 0,
    target: null,
  };
}

function updateAutofishers() {
  const usedFish = new Set();

  for (const autofisher of autofishers) {
    // If no valid target or someone else claimed it, find a new one
    if (!autofisher.target || usedFish.has(autofisher.target)) {
      let nearest = null;
      let minDist = Infinity;

      for (const spot of fishSpots) {
        if (usedFish.has(spot)) continue;

        const dx = spot.x - autofisher.x;
        const dy = spot.y - autofisher.y;
        const dist = Math.hypot(dx, dy);

        if (dist < minDist) {
          minDist = dist;
          nearest = spot;
        }
      }

      autofisher.target = nearest;
    }

    const target = autofisher.target;
    if (!target) continue;

    usedFish.add(target); // Claim this ripple so others don't use it

    const dx = target.x - autofisher.x;
    const dy = target.y - autofisher.y;
    const angleToTarget = Math.atan2(dy, dx);
    let dist = Math.hypot(dx, dy);

    // Rotate toward target
    const angleDiff = ((angleToTarget - autofisher.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
    if (angleDiff < -0.01) autofisher.angle -= autofisher.turnSpeed;
    else if (angleDiff > 0.01) autofisher.angle += autofisher.turnSpeed;

    // Clamp angle
    if (autofisher.angle > Math.PI) autofisher.angle -= Math.PI * 2;
    if (autofisher.angle < -Math.PI) autofisher.angle += Math.PI * 2;

    // Accelerate
    if (Math.abs(angleDiff) < 0.3) {
      autofisher.speed = Math.min(autofisher.speed + autofisher.acceleration, autofisher.maxSpeed);
    } else {
      autofisher.speed = Math.max(0, autofisher.speed - autofisher.friction);
    }

    // Move
    autofisher.x += Math.cos(autofisher.angle) * autofisher.speed;
    autofisher.y += Math.sin(autofisher.angle) * autofisher.speed;

    // Wrap around screen
    if (autofisher.x < 0) autofisher.x = canvas.width;
    if (autofisher.x > canvas.width) autofisher.x = 0;
    if (autofisher.y < 0) autofisher.y = canvas.height;
    if (autofisher.y > canvas.height) autofisher.y = 0;

    // Ripple fishing logic
    if (dist < rippleRadius) {
      autofisher.holding = true;
      autofisher.holdTime += 16.67;

      if (autofisher.holdTime >= timeToCatch) {
        rollFish();

        // Replace caught fish
        let newFish;
        let attempts = 0;
        do {
          newFish = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            rippleSize: 0,
          };
          attempts++;
        } while (
          fishSpots.some(f => Math.hypot(f.x - newFish.x, f.y - newFish.y) < minDistanceBetweenFish)
          && attempts < 100
        );

        const index = fishSpots.indexOf(target);
        fishSpots[index] = newFish;
        autofisher.holding = false;
        autofisher.holdTime = 0;
        autofisher.target = null; // reset target after catch
      }
    } else {
      autofisher.holding = false;
      autofisher.holdTime = 0;
    }
  }
}