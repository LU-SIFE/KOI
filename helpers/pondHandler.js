function switchPond(newPond) {
    if (!states.ponds.list.includes(newPond)) {
        console.warn(`Pond "${newPond}" does not exist`);
        return;
    }

    if (!states.ponds.unlockedPonds.includes(newPond)) {
        console.warn(`"${newPond}" is not unlocked!`);
        return;
    }

    states.ponds.currentPond = newPond;

    // Clear current pond entities
    entities.autofishers = [];
    entities.ripples = [];

    const stats = upgradeStats[newPond];

    // === Spawn Ripples
    for (let i = 0; i < stats.values.ripples; i++) {
        entities.ripples.push(entityTypes.ripple({
            fish: getRandomFish()
        }));
    }

    // === Spawn Autofishers
    for (let i = 0; i < stats.values.autofishers; i++) {
        spawnAutofisher();
    }

    // === Toggle Upgrade Visibility
    for (const type in upgrades.types) {
        const upgrade = upgrades.types[type];
        const isAvailable = upgrade.available?.includes(newPond);
        const element = document.getElementById(`${type}Upgrade`);
        if (element) {
            element.style.display = isAvailable ? 'flex' : 'none';
        }
    }

    updateUI();

    const rgb = pondColors[states.ponds.currentPond];
    document.getElementById('quotes').style.color = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`;
    canvas.style.filter = `drop-shadow(5px 30px 4px rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.4))`;
    document.getElementById('overlay').style.backgroundImage = `radial-gradient(rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1) 1px, transparent 2px)`;

    document.documentElement.style.setProperty('--col2', `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`);
    document.documentElement.style.setProperty('--col2-l', `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.5)`);


    save('currentPond', states.ponds.currentPond);
    updatePondButtons();
}

function updatePondButtons() {
    for (const pond in states.ponds.unlockedPonds) {
        document.getElementById(`${states.ponds.unlockedPonds[pond]}Btn`).style.display = 'flex';
    }
}