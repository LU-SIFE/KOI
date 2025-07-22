window.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

function update() {
    SoundManager.updateToneBasedOnSpeed(diamond.speed, diamond.maxSpeed);
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
        let inRipple = false;

        for (const fishSpot of fishSpots) {
            const dx = diamond.x - fishSpot.x;
            const dy = diamond.y - fishSpot.y;
            const distance = Math.hypot(dx, dy);

            if (distance < rippleRadius) {
                inRipple = true;

                if (!isHolding) {
                    isHolding = true;
                    holdTime = 0;
                }

                holdTime += 16.67; // ~60fps

                if (holdTime >= timeToCatch) {
                    const caughtFish = fishSpot.fish;
                    if (caughtFish.rarity !== "Item") {
                        caughtFish.caught++;
                        catchCount++;
                    }
                    localStorage.setItem("catchCount", catchCount);

                    const article = caughtFish.rarity.toLowerCase().startsWith("u") ? "an" : "a";
                    const message = `You caught ${article} ${caughtFish.rarity} ${caughtFish.name}!<br>Caught: ${caughtFish.caught}`;

                    showFishAlert(message, rarityInfo[caughtFish.rarity].color);
                    catchUpdate(catchCount);
                    SoundManager.playFishSfx();
                    saveFishdex();
                    addItem("fish", caughtFish.name);

                    const newFishSpot = spawnNewFishSpot(fishSpots);
                    fishSpots[fishSpots.indexOf(fishSpot)] = newFishSpot;

                    isHolding = false;
                    holdTime = 0;
                }

                break; // exit loop after first valid fish spot
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

    if (keys["f"]) {
        if (start_state) {
            if (pond_select_state === false) {
                document.getElementById("pond_select").classList.remove("hide");
                document.getElementById("pond_select").classList.add("show");
                setTimeout(() => { pond_select_state = true; }, 300);
            } else {
                document.getElementById("pond_select").classList.remove("show");
                document.getElementById("pond_select").classList.add("hide");
                setTimeout(() => { pond_select_state = false; }, 300);
            }
        }
    }

    // quick menu binds

    //Open menu
    if (keys["e"]) {
        toggle_menu();
        build_compendium();
    }

    //Compendium
    if (keys["c"]) {
        swap_menu('compendium');
        show_menu();
    }

    if (keys["q"]) {
        swap_menu('inventory');
        show_menu();
    }

    if (keys["r"]) {
        swap_menu('upgrade');
        show_menu();
    }

    if (keys["t"]) {
        swap_menu('market');
        show_menu();
    }

    // Save inventory only when dirty and spacebar is NOT pressed by player
    if (dirtyInventory && !keys[" "]) {
        console.log("💾 Saving inventory");
        refreshInventory();
    }
}

function show_menu() {
    document.getElementById("menu").classList.remove("hide");
    document.getElementById("menu").classList.add("show");
    setTimeout(() => { menu_state = true; }, 300);
}

function toggle_menu() {
    if (menu_state === false) {
        show_menu();
    } else {
        document.getElementById("menu").classList.remove("show");
        document.getElementById("menu").classList.add("hide");
        setTimeout(() => { menu_state = false; }, 300);
    }
}