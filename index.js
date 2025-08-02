function start() {
    states.extras.startState = true;
    save('startState', true);

    setTimeout(function() {canvas.classList.remove('hide');}, 1000);
    if (states.containers.blurMenuOpen) toggleMenu('blurMenu', 'container');
    if (states.containers.tutorialMenuOpen) toggleMenu('tutorialMenu', 'container');

    toggleMenu('inventoryMenu', 'content');

    addKeyListeners();
    entities.player = entityTypes.player();

    quote_cycle();
    states.extras.quoteInterval = setInterval(quote_cycle, 15000);

    states.items.cursed = load('curseState', true);
    states.items.void = load('voidState', true);

    states.ponds.currentPond = load('currentPond', 'base');
    states.ponds.unlockedPonds = load('unlockedPonds', states.ponds.unlockedPonds);
    switchPond(states.ponds.currentPond);
    updatePondButtons();

    loadCaughtFish();
    buildCompendium();

    inventory = load('inventory', inventory);
    document.getElementById('money').textContent = `$${inventory.money}`;

    upgradeStats = load('upgradeStats', upgradeStats);

    entities.player.catchCount = load('catchCount', 0);
    entities.player.timeToCatch = (5 - (upgradeStats[states.ponds.currentPond].values.speed / 2)) * 1000;

    renderInventory();

    entities.ripples = [];
    for (let i = 0; i < upgradeStats[states.ponds.currentPond].values.ripples; i++) {
        entities.ripples.push(entityTypes.ripple({ fish: getRandomFish() }));
    }

    for (let i = 0; i < upgradeStats[states.ponds.currentPond].values.autofishers; i++) {
        spawnAutofisher();
    }

    updateProgress();
    updateUI();

    requestAnimationFrame(loop);
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

let lastTime = performance.now();

function loop(currentTime) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    update(deltaTime);
    requestAnimationFrame(loop);
}

function update(deltaTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    entities.ripples.forEach(ripple => {
        ripple.update(deltaTime);
        ripple.draw(deltaTime);
    });

    entities.autofishers.forEach(a => {
        a.update(deltaTime);
        a.draw();
    });

    entities.player.update(deltaTime);
    entities.player.draw();

    SoundManager.updateToneBasedOnSpeed(entities.player.speed, entities.player.maxSpeed);

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

    if (states.extras.startState) {
        console.log(`${fishdex.length} fish loaded!`);
        start();
    } else {
        // Show menus if first time playing
        toggleMenu('blurMenu', 'container');
        toggleMenu('tutorialMenu', 'container');
    }
};

function compareVersions(a, b) {
    const pa = a.split('.').map(Number);
    const pb = b.split('.').map(Number);

    for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
        const diff = (pa[i] || 0) - (pb[i] || 0);
        if (diff !== 0) return diff;
    }
    return 0;
}
