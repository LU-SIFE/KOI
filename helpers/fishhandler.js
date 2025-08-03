function getFishData(name) {
    return fishdex.find(f => f.name === name);
}

function getFishRarity(name) {
    return getFishData(name)?.rarity ?? "Common";
}

function getRandomFish() {
    const currentPond = states.ponds.currentPond;

    // Filter and map in one pass
    const weightedFish = fishdex
        .map(fish => {
            const rarity = fish.rarity?.toLowerCase() ?? "common";
            const weight = poolWeights[currentPond]?.[rarity] ?? 0;
            return weight > 0 ? { fish, weight } : null;
        })
        .filter(Boolean);

    const totalWeight = weightedFish.reduce((sum, { weight }) => sum + weight, 0);
    let random = Math.random() * totalWeight;

    const rerollItem = (excludeName) => {
        const itemPool = fishdex.filter(f => {
            if (f.rarity?.toLowerCase() !== "item") return false;
            if (f.name === excludeName) return false;
            if (f.name === "Curse Remover" && !states.items.cursed) return false;
            if (f.name === "Void Stabilizer" && !states.items.void) return false;
            return true;
        });

        return itemPool.length > 0
            ? itemPool[Math.floor(Math.random() * itemPool.length)]
            : { name: "Chest", rarity: "Item" };
    };

    for (const { fish, weight } of weightedFish) {
        random -= weight;
        if (random <= 0) {
            const { name } = fish;

            // Conditional rerolling
            if (
                name === "Curse Remover" &&
                (!["ethereal", "twilight"].includes(currentPond) || !states.items.cursed)
            ) {
                return rerollItem(name);
            }

            if (
                name === "Void Stabilizer" &&
                (currentPond !== "chromatic" || !states.items.void)
            ) {
                return rerollItem(name);
            }

            return fish;
        }
    }

    // Fallback
    return weightedFish.at(-1).fish;
}

function specialCatch(fish) {
    const rarity = fish?.rarity?.toLowerCase();
    if (!rarity) return;

    if (rarity === 'void' && !states.extras.voidLore) {
        showLore(0, 'voidNotification');
        states.extras.voidLore = true;
    } else if (rarity === 'cursed' && !states.extras.curseLore) {
        showLore(0, 'curseNotification');
        states.extras.curseLore = true;
    }
}

function catchLogic(caughtFish) {
    addItem(caughtFish);
    fishAlert(caughtFish);
    saveCaughtFish();
    specialCatch(caughtFish);
    updateCompendium(caughtFish.name);
}
