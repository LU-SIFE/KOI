function getFishRarity(name) {
    const fish = fishdex.find(f => f.name === name);
    return fish?.rarity ?? "Common"; // default fallback
}

function getFishData(name) {
    return fishdex.find(f => f.name === name);
}

function getRandomFish() {
    // Map fish with weights based on rarity (default to 0 if missing)
    const weightedFish = fishdex.map(fish => {
        const weight = poolWeights[states.ponds.currentPond][fish.rarity.toLowerCase()] ?? 0;
        return { fish, weight };
    }).filter(entry => entry.weight > 0);  // filter out zero weight just in case

    // Sum total weight
    const totalWeight = weightedFish.reduce((sum, entry) => sum + entry.weight, 0);

    // Pick random number in [0, totalWeight)
    let random = Math.random() * totalWeight;

    // Find fish by subtracting weights until <= 0
    for (const entry of weightedFish) {
        random -= entry.weight;
        if (random <= 0) {
            return entry.fish;
        }
    }

    return weightedFish[weightedFish.length - 1].fish;
}

function catchLogic(caughtFish) {
    addItem(caughtFish);
    fishAlert(caughtFish);
    saveCaughtFish();
    updateCompendium(caughtFish.name);
}