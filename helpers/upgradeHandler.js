function upgradeItem(type) {
    if (type === "nextPond") {
        const nextIndex = states.ponds.unlockedPonds.length;
        const max = upgrades.types.nextPond.max;

        if (nextIndex >= max) {
            switchPond(nextPond);
            return;
        }

        const price = upgrades.types.nextPond.prices[nextIndex];

        if (inventory.money >= price) {
            inventory.money -= price;
            document.getElementById('money').innerHTML = `$${inventory.money}`;

            const nextPond = states.ponds.list[nextIndex];
            if (nextPond) {
                states.ponds.unlockedPonds.push(nextPond);
                save('unlockedPonds', states.ponds.unlockedPonds);
            }

            if (states.ponds.unlockedPonds.length >= states.ponds.list.length) {
                document.getElementById('nextPondUpgrade').style.display = 'none';
            }

            save('inventory', inventory);
            switchPond(nextPond);
        } else {
        }

        return;
    }

    // === Regular Upgrade Types ===
    const pond = states.ponds.currentPond;
    const currentLevel = upgradeStats[pond].values[type];
    const maxLevel = upgrades.types[type].max;

    if (currentLevel >= maxLevel) {
        console.log(`${type} upgrade is already maxed out! 💡`);
        return;
    }

    const basePrice = upgrades.types[type].prices[currentLevel];
    const priceMult = upgradeStats[pond].priceMult;
    const finalPrice = Math.floor(basePrice * priceMult);

    if (inventory.money >= finalPrice) {
        inventory.money -= finalPrice;
        upgradeStats[pond].values[type]++;

        if (type === "speed") {
            const newSpeed = (5 - (upgradeStats[pond].values.speed / 2));
            entities.player.timeToCatch = newSpeed * 1000;

            for (const fisher of entities.autofishers) {
                fisher.timeToCatch = newSpeed * 1000;
            }

            updateUI();
        }

        else if (type === "ripples") {
            entities.ripples.push(entityTypes.ripple({
                fish: getRandomFish()
            }));
        }

        else if (type === "autofishers") {
            spawnAutofisher();
        }

        save('upgradeStats', upgradeStats);
        save('inventory', inventory);
        updateUI();
    }
}


function updateUI() {
    const pond = states.ponds.currentPond;
    const mult = upgradeStats[pond].priceMult;

    // === SPEED UPGRADE ===
    {
        const type = 'speed';
        const level = upgradeStats[pond].values[type];
        const max = upgrades.types[type].max;

        const price = level < max ? Math.floor(upgrades.types[type].prices[level] * mult) : null;
        const seconds = 5 - (level / 2);

        document.getElementById('speedPrice').innerText = price !== null ? `$${price}` : 'MAX';
        document.getElementById('speedInfo').innerText = seconds === 1 ? '1 Second' : `${seconds} Seconds`;
        document.getElementById('speedButton').disabled = level >= max;
    }

    // === RIPPLES UPGRADE ===
    {
        const type = 'ripples';
        const level = upgradeStats[pond].values[type];
        const max = upgrades.types[type].max;

        const price = level < max ? Math.floor(upgrades.types[type].prices[level] * mult) : null;
        const maxFish = Math.min(level, 10);

        document.getElementById('ripplesPrice').innerText = price !== null ? `$${price}` : 'MAX';
        document.getElementById('ripplesInfo').innerText = maxFish === 1 ? '1 Max Fish' : `${maxFish} Max Fish`;
        document.getElementById('ripplesButton').disabled = level >= max;
    }

    // === AUTOFISHERS UPGRADE ===
    {
        const type = 'autofishers';
        const level = upgradeStats[pond].values[type];
        const max = upgrades.types[type].max;

        const price = level < max ? Math.floor(upgrades.types[type].prices[level] * mult) : null;
        const fishers = entities.autofishers.length;

        document.getElementById('autofishersPrice').innerText = price !== null ? `$${price}` : 'MAX';
        document.getElementById('autofishersInfo').innerText = fishers === 1 ? '1 Fisher' : `${fishers} Fishers`;
        document.getElementById('autofishersButton').disabled = level >= max;
    }

    // === NEXT POND UPGRADE ===
    {

        const nextIndex = states.ponds.unlockedPonds.length;
        const nextPond = states.ponds.list[nextIndex];
        const nextPrice = upgrades.types.nextPond.prices[nextIndex];

        if (nextPond && nextIndex < upgrades.types.nextPond.max) {
            const isUnlocked = states.ponds.unlockedPonds.includes(nextPond);

            document.getElementById('nextPondPrice').innerHTML = isUnlocked ? 'UNLOCKED' : `$${nextPrice}`;
            document.getElementById('nextPondInfo').innerHTML = `${upgrades.types.nextPond.labels[nextPond]} Pond`;
            document.getElementById('nextPondButton').disabled = isUnlocked;
            updatePondButtons();
        } else {
            document.getElementById('nextPondUpgrade').style.display = 'none';
        }
    }

}

