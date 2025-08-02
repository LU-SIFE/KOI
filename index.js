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

    states.items.cursed = load('curseState', true);
    states.items.void = load('voidState', true);


    entities.ripples = [];

    for (let i = 0; i < upgradeStats[states.ponds.currentPond].values.ripples; i++) {
        entities.ripples.push(entityTypes.ripple({
            fish: getRandomFish()
        }));
    }

    for (let i = 0; i < upgradeStats[states.ponds.currentPond].values.autofishers; i++) {
        spawnAutofisher();
    }

    updateProgress();

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

    if (compareVersions(load('version', '1.0.0'), '1.2.1') !== 0) {
        localStorage.clear();
        save('version', '1.2.1');
    }

    states.extras.startState = load('startState', false);

    if (states.extras.startState === true) {
        console.log(`${fishdex.length} fish loaded!`);
        start();
    } else {
        //toggle on if it's the first time playing
        toggleMenu('blurMenu', 'container');
        toggleMenu('tutorialMenu', 'container');
    }
}

function compareVersions(a, b) {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);
    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const diff = (pa[i] || 0) - (pb[i] || 0);
        if (diff !== 0) return diff;
    }
    return 0;
}