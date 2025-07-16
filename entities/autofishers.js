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
    trail: [] // 🌟 autofisher trail
  };
}

function updateAutofishers() {
  const usedFish = new Set();

  for (const autofisher of autofishers) {
    // ❗ If no valid target, or someone else claimed it, or it no longer exists — find a new one
    if (
      !autofisher.target ||
      usedFish.has(autofisher.target) ||
      !fishSpots.includes(autofisher.target)
    ) {
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

    usedFish.add(target); // Claim this ripple

    const dx = target.x - autofisher.x;
    const dy = target.y - autofisher.y;
    const angleToTarget = Math.atan2(dy, dx);
    const dist = Math.hypot(dx, dy);

    // Rotate toward target
    const angleDiff = ((angleToTarget - autofisher.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
    if (angleDiff < -0.01) autofisher.angle -= autofisher.turnSpeed;
    else if (angleDiff > 0.01) autofisher.angle += autofisher.turnSpeed;

    // Clamp angle
    if (autofisher.angle > Math.PI) autofisher.angle -= Math.PI * 2;
    if (autofisher.angle < -Math.PI) autofisher.angle += Math.PI * 2;

    // Accelerate if mostly facing the target
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

    autofisher.trail.push({ x: autofisher.x, y: autofisher.y, angle: autofisher.angle });
    if (autofisher.trail.length > maxTrailLength) {
      autofisher.trail.shift();
    }

    // Ripple fishing logic
    if (dist < rippleRadius) {
      autofisher.holding = true;
      autofisher.holdTime += 16.67;

      if (autofisher.holdTime >= timeToCatch) {
        const caughtFish = target.fish;
        caughtFish.caught++;
        catchCount++;
        localStorage.setItem("catchCount", catchCount);

        const article = caughtFish.rarity.toLowerCase().startsWith("u") ? "an" : "a";
        const message = `You caught ${article} ${caughtFish.rarity} ${caughtFish.name}!<br>Caught: ${caughtFish.caught}`;

        showFishAlert(message, rarityInfo[caughtFish.rarity].color);
        catchUpdate(catchCount);
        saveFishdex();
        addItem("fish", caughtFish.name);
        renderInventory();
        saveInventory();

        // Use helper to spawn new fish spot, replacing old one
        const newFish = spawnNewFishSpot(fishSpots);

        const index = fishSpots.indexOf(target);
        if (index !== -1) fishSpots[index] = newFish;

        autofisher.holding = false;
        autofisher.holdTime = 0;
        autofisher.target = null;
      }
    } else {
      autofisher.holding = false;
      autofisher.holdTime = 0;
    }
  }
}


function drawAutofisherTrails() {
  for (const autofisher of autofishers) {
    const trail = autofisher.trail;
    for (let i = 0; i < trail.length; i++) {
      const { x, y, angle } = trail[i];
      const opacity = ((i + 1) / trail.length) * 0.35; // slightly subtler

      const width = autofisher.size * 0.4;
      const height = autofisher.size * 0.15;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.moveTo(-width, 0);
      ctx.lineTo(0, height * 0.5);
      ctx.lineTo(0, -height * 0.5);
      ctx.closePath();

      const colors = fisherColors[currentPond];
      const r = colors[0];
      const g = colors[1];
      const b = colors[2];

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      ctx.fill();
      ctx.restore();
    }
  }
}
