function start() {
    states.extras.startState = true;
    save('startState', states.extras.startState);

    if (states.containers.blurMenuOpen) { toggleMenu('blurMenu', 'container'); }
    if (states.containers.tutorialMenuOpen) { toggleMenu('tutorialMenu', 'container'); }

    toggleMenu('inventoryMenu', 'content');

    addKeyListeners();
    entities.player = entityTypes.player();

    quote_cycle();
    states.extras.quoteInterval = setInterval(quote_cycle, 15000);

    states.ponds.currentPond = load('currentPond', 'base');
    states.ponds.unlockedPonds = load('unlockedPonds', states.ponds.unlockedPonds);
    switchPond(states.ponds.currentPond);
    updatePondButtons();

    loadCaughtFish();

    buildCompendium();

    inventory = load("inventory", inventory);
    document.getElementById('money').innerHTML = `$${inventory.money}`;
    upgradeStats = load('upgradeStats', upgradeStats);
    states.ponds.unlockedPonds = load('unlockedPonds', ['base']);
    entities.player.catchCount = load('catchCount', 0);
    entities.player.timeToCatch = (5 - (upgradeStats[states.ponds.currentPond].values.speed / 2)) * 1000;
    renderInventory();


    entities.ripples = [];

    for (let i = 0; i < upgradeStats[states.ponds.currentPond].values.ripples; i++) {
        entities.ripples.push(entityTypes.ripple({
            fish: getRandomFish()
        }));
    }

    for (let i = 0; i < upgradeStats[states.ponds.currentPond].values.autofishers; i++) {
        spawnAutofisher();
    }

    updateUI();

    loop();
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

let lastTime = performance.now();

function loop(currentTime) {
    if (!lastTime) lastTime = performance.now();
    const deltaTime = (currentTime - lastTime)
    lastTime = currentTime;
    update(deltaTime);
    requestAnimationFrame(loop);
}

function update(deltaTime) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //update ripples
    for (const ripple of entities.ripples) {
        ripple.update(deltaTime);
        ripple.draw();
    }

    entities.autofishers.forEach(a => a.update(deltaTime));
    entities.autofishers.forEach(a => a.draw());

    //update the player
    entities.player.update(deltaTime);
    entities.player.draw();

    SoundManager.updateToneBasedOnSpeed(entities.player.speed, entities.player.maxSpeed)

    updateHoldBar();
}

window.onload = function () {
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    states.extras.startState = load('startState', false);

    if (states.extras.startState === true) {
        start();
    } else {
        //toggle on if it's the first time playing
        toggleMenu('blurMenu', 'container');
        toggleMenu('tutorialMenu', 'container');
    }
}