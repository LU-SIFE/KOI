const keys = {};

window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

function update() {
    updateToneBasedOnSpeed(diamond.speed, diamond.maxSpeed)
    updateAutofishers();

    const speedMultiplier = keys["shift"] ? 2 : 1;

    // Accelerate / decelerate
    if (keys["w"]) {
        diamond.speed = Math.min(diamond.speed + diamond.acceleration * speedMultiplier, diamond.maxSpeed * speedMultiplier);
    } else if (keys["s"]) {
        diamond.speed = Math.max(diamond.speed - diamond.acceleration * speedMultiplier, -diamond.maxSpeed * speedMultiplier);
    } else {
        // Friction slows down speed toward 0
        if (diamond.speed > 0) diamond.speed = Math.max(0, diamond.speed - diamond.friction);
        else if (diamond.speed < 0) diamond.speed = Math.min(0, diamond.speed + diamond.friction);
    }

    // Turn only when moving
    if (diamond.speed !== 0) {
        if (keys["a"]) diamond.angle -= diamond.turnSpeed;
        if (keys["d"]) diamond.angle += diamond.turnSpeed;
    }

    // Update position
    diamond.x += Math.cos(diamond.angle) * diamond.speed;
    diamond.y += Math.sin(diamond.angle) * diamond.speed;

    // Screen wrap
    if (diamond.x < 0) diamond.x = canvas.width;
    else if (diamond.x > canvas.width) diamond.x = 0;
    if (diamond.y < 0) diamond.y = canvas.height;
    else if (diamond.y > canvas.height) diamond.y = 0;

    // Record position for trail
    trail.push({ x: diamond.x, y: diamond.y, angle: diamond.angle });
    if (trail.length > maxTrailLength) trail.shift();

    if (keys[" "]) {
        // Only try to fish if space is held
        let inRipple = false;

        for (const fish of fishSpots) {
            const dx = diamond.x - fish.x;
            const dy = diamond.y - fish.y;
            const distance = Math.hypot(dx, dy);

            if (distance < rippleRadius) {
                inRipple = true;

                if (!isHolding) {
                    isHolding = true;
                    holdTime = 0;
                }

                holdTime += 16.67; // ~60fps

                if (holdTime >= timeToCatch) {
                    rollFish();

                    // Replace caught fish
                    let newFish;
                    let attempts = 0;
                    const padding = 50;

                    do {
                        newFish = {
                            x: padding + Math.random() * (canvas.width - 2 * padding),
                            y: padding + Math.random() * (canvas.height - 2 * padding),
                            rippleSize: 0,
                        };
                        attempts++;
                    } while (
                        fishSpots.some(f => Math.hypot(f.x - newFish.x, f.y - newFish.y) < minDistanceBetweenFish) &&
                        attempts < 100
                    );

                    fishSpots[fishSpots.indexOf(fish)] = newFish;

                    isHolding = false;
                    holdTime = 0;
                }

                break; // Found a ripple, stop checking
            }
        }

        if (!inRipple) {
            isHolding = false;
            holdTime = 0;
        }
    } else {
        isHolding = false;
        holdTime = 0;
    }


    if (keys["e"]) {
        if (menu_state === false) {
            document.getElementById("menu").classList.remove("hide");
            document.getElementById("menu").classList.add("show");
            setTimeout(function () { menu_state = true; }, 300);
        } else {
            document.getElementById("menu").classList.remove("show");
            document.getElementById("menu").classList.add("hide");
            setTimeout(function () { menu_state = false; }, 300);
        }
    }
}