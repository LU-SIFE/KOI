const fishdex = [
    //Common Fish
    { name: "Drum", rarity: "Common" },
    { name: "Bass", rarity: "Common" },
    { name: "Perch", rarity: "Common" },
    { name: "Minnow", rarity: "Common" },
    { name: "Walleye", rarity: "Common" },
    { name: "Sunfish", rarity: "Common" },
    { name: "Flounder", rarity: "Common" },
    { name: "Bluegill", rarity: "Common" },
    { name: "Chub", rarity: "Common" },
    { name: "Mullet", rarity: "Common" },
    { name: "Smelt", rarity: "Common" },
    { name: "Whitefish", rarity: "Common" },
    { name: "Stickleback", rarity: "Common" },
    { name: "Pond Sculpin", rarity: "Common" },
    { name: "Gobbie", rarity: "Common" },
    { name: "Stone Loach", rarity: "Common" },
    { name: "Golden Shiner", rarity: "Common" },
    { name: "Tench", rarity: "Common" },
    { name: "Rudd", rarity: "Common" },
    { name: "Mudbelly", rarity: "Common" },

    //Uncommon Fish
    { name: "Carp", rarity: "Uncommon" },
    { name: "Trout", rarity: "Uncommon" },
    { name: "Catfish", rarity: "Uncommon" },
    { name: "Grouper", rarity: "Uncommon" },
    { name: "Snapper", rarity: "Uncommon" },
    { name: "Lingcod", rarity: "Uncommon" },
    { name: "Tilapia", rarity: "Uncommon" },
    { name: "Hogfish", rarity: "Uncommon" },
    { name: "Black Cod", rarity: "Uncommon" },
    { name: "Driftperch", rarity: "Uncommon" },
    { name: "Rockbass", rarity: "Uncommon" },
    { name: "Marbled Loach", rarity: "Uncommon" },
    { name: "Spotted Darter", rarity: "Uncommon" },
    { name: "Whitesnout Carp", rarity: "Uncommon" },
    { name: "Golden Crappie", rarity: "Uncommon" },
    { name: "Silver Catfish", rarity: "Uncommon" },
    { name: "Dusky Grouper", rarity: "Uncommon" },
    { name: "Threadfin Snapper", rarity: "Uncommon" },
    { name: "Banded Tilapia", rarity: "Uncommon" },
    { name: "Flathead Cod", rarity: "Uncommon" },
    { name: "Amberjack", rarity: "Uncommon" },
    { name: "Redeye Bass", rarity: "Uncommon" },
    { name: "Creek Chub", rarity: "Uncommon" },
    { name: "Weedy Goby", rarity: "Uncommon" },

    //Rare Fish
    { name: "Pike", rarity: "Rare" },
    { name: "Salmon", rarity: "Rare" },
    { name: "Zander", rarity: "Rare" },
    { name: "Halibut", rarity: "Rare" },
    { name: "Sturgeon", rarity: "Rare" },
    { name: "Kingfish", rarity: "Rare" },
    { name: "Tilefish", rarity: "Rare" },
    { name: "Mahi Mahi", rarity: "Rare" },
    { name: "Barracuda", rarity: "Rare" },
    { name: "Wahoo", rarity: "Rare" },
    { name: "Amberfin Snapper", rarity: "Rare" },
    { name: "Steelhead", rarity: "Rare" },
    { name: "Dusky Seabass", rarity: "Rare" },
    { name: "Gilt Tuna", rarity: "Rare" },
    { name: "Ocean Perch", rarity: "Rare" },
    { name: "Longjaw Mackerel", rarity: "Rare" },
    { name: "Crimson Dorado", rarity: "Rare" },
    { name: "Bristle Pike", rarity: "Rare" },
    { name: "Sapphire Ling", rarity: "Rare" },
    { name: "Ghost Halibut", rarity: "Rare" },
    { name: "Duskwater Zander", rarity: "Rare" },
    { name: "Thornfin Trevally", rarity: "Rare" },
    { name: "Icegill Marlin", rarity: "Rare" },
    { name: "Coralback Drum", rarity: "Rare" },

    //Legendary Fish
    { name: "Marlin", rarity: "Legendary" },
    { name: "Voltfish", rarity: "Legendary" },
    { name: "Seadrake", rarity: "Legendary" },
    { name: "Swordfish", rarity: "Legendary" },
    { name: "Titan Bass", rarity: "Legendary" },
    { name: "Bluefin Tuna", rarity: "Legendary" },
    { name: "Krakenfin", rarity: "Legendary" },
    { name: "Abyssal Grouper", rarity: "Legendary" },
    { name: "Stormtail Leviathan", rarity: "Legendary" },
    { name: "Solar Pike", rarity: "Legendary" },
    { name: "Thunderjaw Sturgeon", rarity: "Legendary" },
    { name: "Runeblade Eel", rarity: "Legendary" },
    { name: "Emperor Snapper", rarity: "Legendary" },
    { name: "Skywhale Fry", rarity: "Legendary" },
    { name: "Whirlpool Catfish", rarity: "Legendary" },
    { name: "Mythscale Betta", rarity: "Legendary" },
    { name: "Voidfin", rarity: "Legendary" },
    { name: "Zephyr Tuna", rarity: "Legendary" },
    { name: "Hellmaw Trout", rarity: "Legendary" },
    { name: "Spectral Sailfish", rarity: "Legendary" },
    { name: "Twilight Coelacanth", rarity: "Legendary" },

    //Mythical Fish
    { name: "Nebulark", rarity: "Mythical" },
    { name: "Phoenix Carp", rarity: "Mythical" },
    { name: "Leviathan Fry", rarity: "Mythical" },
    { name: "Celestial Koi", rarity: "Mythical" },
    { name: "Dreamscale Eel", rarity: "Mythical" },
    { name: "Voidfin Serpent", rarity: "Mythical" },
    { name: "Moonlit Axolotl", rarity: "Mythical" },
    { name: "Eclipscale Trout", rarity: "Mythical" },
    { name: "Star-Eater Guppy", rarity: "Mythical" },
    { name: "Aurorafin Dragonet", rarity: "Mythical" },
    { name: "Whisperscale Wraith", rarity: "Mythical" },
    { name: "Galaxian Carp", rarity: "Mythical" },
    { name: "Solarflare Pike", rarity: "Mythical" },
    { name: "Astral Leviathan", rarity: "Mythical" },
    { name: "Ethereal Mirage", rarity: "Mythical" },
    { name: "Nebula Seraph", rarity: "Mythical" },
    { name: "Cosmos Ray", rarity: "Mythical" },
    { name: "Starfire Marlin", rarity: "Mythical" },
    { name: "Lunar Tide Betta", rarity: "Mythical" },
    { name: "Voidwave Snapper", rarity: "Mythical" },
    { name: "Dreamweaver Guppy", rarity: "Mythical" },
    { name: "Celestial Emberfin", rarity: "Mythical" },
    { name: "Phantom Starfish", rarity: "Mythical" },
    { name: "Spectral Tidefish", rarity: "Mythical" },
    { name: "Astral Bloom Bass", rarity: "Mythical" },
    { name: "Corona Sturgeon", rarity: "Mythical" },
    { name: "Startailed Koi", rarity: "Mythical" },

    //Frozen Fish
    { name: "Glacier Ray", rarity: "Frozen" },
    { name: "Icefin Tetra", rarity: "Frozen" },
    { name: "Frostbite Eel", rarity: "Frozen" },
    { name: "Aurora Salmon", rarity: "Frozen" },
    { name: "Snowscale Carp", rarity: "Frozen" },
    { name: "Crystal Haddock", rarity: "Frozen" },
    { name: "Shiverfin Tuna", rarity: "Frozen" },
    { name: "Permafrost Pike", rarity: "Frozen" },
    { name: "Hailstream Minnow", rarity: "Frozen" },
    { name: "Blizzard Loach", rarity: "Frozen" },
    { name: "Snowveil Flounder", rarity: "Frozen" },
    { name: "Frostscale Guppy", rarity: "Frozen" },
    { name: "Chillgill Bass", rarity: "Frozen" },
    { name: "Crystalfin Lanternfish", rarity: "Frozen" },
    { name: "Icicle Snapper", rarity: "Frozen" },
    { name: "Tundra Barracuda", rarity: "Frozen" },
    { name: "Gelid Catfish", rarity: "Frozen" },
    { name: "Icehook Marlin", rarity: "Frozen" },
    { name: "Polar Sole", rarity: "Frozen" },
    { name: "Frostreel", rarity: "Frozen" },
    { name: "Hoarfrost Koi", rarity: "Frozen" },

    //Fireproof Fish
    { name: "Magmafin", rarity: "Fireproof" },
    { name: "Lava Koi", rarity: "Fireproof" },
    { name: "Cinder Eel", rarity: "Fireproof" },
    { name: "Infernapleco", rarity: "Fireproof" },
    { name: "Ashscale Pike", rarity: "Fireproof" },
    { name: "Blazegill Grouper", rarity: "Fireproof" },
    { name: "Charflare Snapper", rarity: "Fireproof" },
    { name: "Emberdrift Carp", rarity: "Fireproof" },
    { name: "Smoketail Loach", rarity: "Fireproof" },
    { name: "Scorchfin Darter", rarity: "Fireproof" },
    { name: "Pyrobelly Trout", rarity: "Fireproof" },
    { name: "Volcanic Lanternfish", rarity: "Fireproof" },
    { name: "Moltenwhisker Catfish", rarity: "Fireproof" },
    { name: "Firestripe Betta", rarity: "Fireproof" },
    { name: "Glowcoal Angler", rarity: "Fireproof" },
    { name: "Seardrake Minnow", rarity: "Fireproof" },
    { name: "Crimson Cusk", rarity: "Fireproof" },
    { name: "Flarejaw Tetra", rarity: "Fireproof" },
    { name: "Furnace Ray", rarity: "Fireproof" },
    { name: "Heatscale Swordfish", rarity: "Fireproof" },
    { name: "Kindlefin Sprat", rarity: "Fireproof" },

    //Twilight Fish
    { name: "Twilight Ray", rarity: "Twilight" },
    { name: "Lanternbelly", rarity: "Twilight" },
    { name: "Duskgill Carp", rarity: "Twilight" },
    { name: "Moonshadow Eel", rarity: "Twilight" },
    { name: "Stargazer Minnow", rarity: "Twilight" },
    { name: "Nocturne Catfish", rarity: "Twilight" },
    { name: "Nightlight Tetra", rarity: "Twilight" },
    { name: "Gloamfin Barracuda", rarity: "Twilight" },
    { name: "Velvet Pike", rarity: "Twilight" },
    { name: "Midnight Grouper", rarity: "Twilight" },
    { name: "Duskmouth Snapper", rarity: "Twilight" },
    { name: "Lunafin Darter", rarity: "Twilight" },
    { name: "Waning Bass", rarity: "Twilight" },
    { name: "Obsidian Flounder", rarity: "Twilight" },
    { name: "Shadowlace Loach", rarity: "Twilight" },
    { name: "Nova Lanternfish", rarity: "Twilight" },
    { name: "Umbral Scad", rarity: "Twilight" },
    { name: "Starfin Betta", rarity: "Twilight" },
    { name: "Dreamscale Haddock", rarity: "Twilight" },
    { name: "Phantom Koi", rarity: "Twilight" },
    { name: "Glimmersnout", rarity: "Twilight" },
    { name: "Nightwhisker Cod", rarity: "Twilight" },
    { name: "Selenic Salmon", rarity: "Twilight" },

    //Ethereal Fish
    { name: "Phantom Guppy", rarity: "Ethereal" },
    { name: "Celestail Koi", rarity: "Ethereal" },
    { name: "Moonlit Glider", rarity: "Ethereal" },
    { name: "Mistveil Minnow", rarity: "Ethereal" },
    { name: "Ghostscale Carp", rarity: "Ethereal" },
    { name: "Veilfin Serpent", rarity: "Ethereal" },
    { name: "Luminous Wispfin", rarity: "Ethereal" },
    { name: "Shimmerdrift Eel", rarity: "Ethereal" },
    { name: "Whispering Tetra", rarity: "Ethereal" },
    { name: "Dusklace Ribbonfish", rarity: "Ethereal" },
    { name: "Auroral Darter", rarity: "Ethereal" },
    { name: "Silvershade Betta", rarity: "Ethereal" },
    { name: "Eclipsed Lanternfish", rarity: "Ethereal" },
    { name: "Spiritfin Sole", rarity: "Ethereal" },
    { name: "Willowtail", rarity: "Ethereal" },
    { name: "Translucent Sturgeon", rarity: "Ethereal" },
    { name: "Halolure Pike", rarity: "Ethereal" },
    { name: "Wraithscale Snapper", rarity: "Ethereal" },
    { name: "Echofin Swimmer", rarity: "Ethereal" },
    { name: "Nimbus Loach", rarity: "Ethereal" },
    { name: "Mirage Cod", rarity: "Ethereal" },
    { name: "Driftwill Carp", rarity: "Ethereal" },
    { name: "Glimmersoul Tuna", rarity: "Ethereal" },

    //Chromatic Fish
    //{ name: "Prismscale Guppy", rarity: "Chromatic" },
    //{ name: "Rainbowfin Tetra", rarity: "Chromatic" },
    //{ name: "Spectrum Snapper", rarity: "Chromatic" },
    //{ name: "Kaleidoscale Koi", rarity: "Chromatic" },
    //{ name: "Iridescent Minnow", rarity: "Chromatic" },
    //
    ////Crystalline Fish
    //{ name: "Quartz Pike", rarity: "Crystalline" },
    //{ name: "Emerald Eel", rarity: "Crystalline" },
    //{ name: "Topaz Trout", rarity: "Crystalline" },
    //{ name: "Diamondback Carp", rarity: "Crystalline" },
    //{ name: "Sapphire Grouper", rarity: "Crystalline" },
    //
    ////Cursed Fish
    //{ name: "Wraith Pike", rarity: "Cursed" },
    //{ name: "Hauntgill Eel", rarity: "Cursed" },
    //{ name: "Bloodfin Catfish", rarity: "Cursed" },
    //{ name: "Shadowscale Bass", rarity: "Cursed" },
    //{ name: "Doomtail Snapper", rarity: "Cursed" },

    { name: "Chest", rarity: "Item" },
    { name: "Key", rarity: "Item" },
    { name: "Forgotten Note", rarity: "Item" },
];

for (const fish of fishdex) {
    fish.caught = 0; //i didn't wanna write "caught" a hundred times :P
}

function saveCaughtFish() {
    const caughtData = fishdex.map(fish => fish.caught || 0);
    save("caughtFish", caughtData);
}

function loadCaughtFish() {
    const caughtData = load("caughtFish", []);
    for (let i = 0; i < fishdex.length; i++) {
        fishdex[i].caught = caughtData[i] || 0;
    }
}

const rarityInfo = {
    Common: {
        order: 11, price: 1, color: [250, 250, 250],
        quote: "A humble fish, common but dependable.",
        hint: "Just a fishy little guy.",
        place: "Nibbling near the surface."
    },

    Uncommon: {
        order: 10, price: 5, color: [180, 245, 200],
        quote: "A little rarer, showing promise beneath the waves.",
        hint: "Curious, but not shy.",
        place: "Often seen near lily pads."
    },

    Rare: {
        order: 9, price: 15, color: [180, 190, 255],
        quote: "A prize catch that few have the skill to reel in.",
        hint: "Shimmering scales.",
        place: "Lurks in deeper parts of any pond."
    },

    Frozen: {
        order: 8, price: 25, color: [100, 180, 255],
        quote: "Chilled by icy waters, with a frost-kissed glow.",
        hint: "Brrr... it's cold!",
        place: "Only found in icy depths."
    },

    Fireproof: {
        order: 7, price: 28, color: [255, 100, 70],
        quote: "Forged in fiery currents, it defies the flames.",
        hint: "Kinda spicy.",
        place: "Found in the blistering heat of a lava pool."
    },

    Twilight: {
        order: 6, price: 30, color: [80, 80, 120],
        quote: "This fish shines softly under the moon's watchful eye.",
        hint: "Only under fading skies.",
        place: "Appears only at dusk."
    },

    Ethereal: {
        order: 5, price: 30, color: [210, 210, 255],
        quote: "A shimmering spirit of the water, barely caught between worlds.",
        hint: "You swear it vanished.",
        place: "Drifts through the mist in a ghostly pond."
    },

    Cursed: {
        order: 4, price: 35, color: [140, 0, 50],
        quote: "Beware the shadows it carries, for fortune has a price.",
        hint: "It blinked at you.",
        place: "Fished from the cursed waters."
    },

    Crystalline: {
        order: 3, price: 40, color: [190, 255, 255],
        quote: "Sparkling like gemstones, it's a treasure from the depths.",
        hint: "Looks like a gem.",
        place: "Found in __"
    },

    Chromatic: {
        order: 2, price: 45, color: [255, 180, 255],
        quote: "A dazzling burst of colors, ever-changing and mesmerizing.",
        hint: "Every color at once!",
        place: "Found in __"
    },

    Legendary: {
        order: 1, price: 50, color: [255, 200, 150],
        quote: "A legendary catch, tales will be told of this one.",
        hint: "A tale yet untold.",
        place: "May appear to experts at any pond."
    },

    Mythical: {
        order: 0, price: 70, color: [200, 150, 255],
        quote: "A creature of legend, almost too magical to be real.",
        hint: "Was that... real?",
        place: "Said to emerge in rare moments at some ponds."
    },

    Item: {
        order: 12, price: 70, color: [200, 150, 255],
        quote: "What could this be...?"
    }
};

const poolWeights = {
	base: {
		item: 1,
		legendary: 3,
		rare: 10,
		uncommon: 22,
		common: 65,
	},

	frozen: {
		item: 1,
		mythical: 1,
		legendary: 4,
		rare: 8,
		frozen: 20,
		uncommon: 22,
		common: 25,
	},

	fireproof: {
		item: 1,
		mythical: 1,
		legendary: 5,
		rare: 7,
		fireproof: 22,
		uncommon: 22,
		common: 23,
	},

	twilight: {
		item: 1,
		mythical: 1,
		legendary: 6,
		rare: 9,
		twilight: 25,
		uncommon: 18,
		common: 30,
	},

	ethereal: {
		item: 1,
		mythical: 1,
		legendary: 6,
		rare: 9,
		ethereal: 10,
		twilight: 25,
		uncommon: 18,
		common: 30,
	}
};