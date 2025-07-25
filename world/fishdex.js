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
	{ name: "Forgotten Note", rarity: "Item"},
];

for (const fish of fishdex) {
	fish.caught = 0; //i didn't wanna write "caught" a hundred times :P
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
		quote: "A creature of legend, almost too magical to be real."
	}
};

const poolWeights = {
	Base: {
		Item: 1,
		Legendary: 3,
		Rare: 10,
		Uncommon: 22,
		Common: 65,
	},

	Frozen: {
		Item: 1,
		Mythical: 1,
		Legendary: 4,
		Rare: 8,
		Frozen: 20,
		Uncommon: 22,
		Common: 25,
	},

	Fireproof: {
		Item: 1,
		Mythical: 1,
		Legendary: 5,
		Rare: 7,
		Fireproof: 22,
		Uncommon: 22,
		Common: 23,
	},

	Twilight: {
		Item: 1,
		Mythical: 1,
		Legendary: 6,
		Rare: 9,
		Twilight: 25,
		Uncommon: 18,
		Common: 30,
	},

	Ethereal: {
		Item: 1,
		Mythical: 1,
		Legendary: 6,
		Rare: 9,
		Ethereal: 10,
		Twilight: 25,
		Uncommon: 18,
		Common: 30,
	}
};


function getFishRarity(name) {
	const fish = fishdex.find(f => f.name === name);
	return fish?.rarity ?? "Common"; // default fallback
}

function buildWeights(pond) {
	weightedFish = [];
	cumulativeWeight = 0;

	for (const fish of fishdex) {
		const weight = poolWeights[pond][fish.rarity] ?? 0;
		if (weight > 0) {
			cumulativeWeight += weight;
			weightedFish.push({ fish, cumulativeWeight });
		}
	}
}

// Build cumulative weight array once for efficient weighted random selection
let weightedFish = [];
let cumulativeWeight = 0;

function rollFishWeighted() {
	const rand = Math.random() * cumulativeWeight; // cumulativeWeight and weightedFish from fishdex.js
	for (const entry of weightedFish) {
		if (rand < entry.cumulativeWeight) {
			return entry.fish;
		}
	}
}
function createPopupHandler(elementId) {
	const element = document.getElementById(elementId);
	let timeout;

	return function showPopup(message, color, imagePath, type, name = "", rarity = "") {
		if (timeout) clearTimeout(timeout);

		// Apply color styles if provided
		if (color) {
			let r = color[0];
			let g = color[1];
			let b = color[2];
			element.style.color = `rgba(${r}, ${g}, ${b}, 1)`;
			element.style.borderColor = `rgba(${r}, ${g}, ${b}, 1)`;
		} else {
			element.style.color = '';
			element.style.borderColor = '';
		}

		// Build inner HTML with flex layout
		if (imagePath && type !== 'Item') {
			element.innerHTML = `
				<div style="display: flex; gap: 1em; justify-content: center; align-items: center;">
					<img src="${imagePath}" 
						onerror="this.onerror=null;this.src='../assets/fish_assets/hidden.png';">
					<div style="display: flex; flex-direction: column; justify-content: center; overflow: hidden;">
						<div style="font-weight: bold;">
							${name} <span style="font-weight: normal; opacity: 0.7;">${rarity}</span>
						</div>
						<div>${message}</div>
					</div>
				</div>
			`;
		} else {
			// fallback layout without image
			element.innerHTML = `
				<div>
					<div style="font-weight: bold; margin-bottom: 4px;">
						${name} <span style="font-weight: normal; opacity: 0.7;">${rarity}</span>
					</div>
					<div>${message}</div>
				</div>
			`;
		}

		element.classList.remove("hide");
		element.classList.add("show");

		// Trigger reflow for CSS animation restart
		void element.offsetWidth;

		timeout = setTimeout(() => {
			element.classList.remove("show");
			element.classList.add("hide");
		}, 3000);
	};
}




const showFishAlert = createPopupHandler("fishAlert");
const showFishInspect = createPopupHandler("fishInspect");

function saveFishdex() {
	// Only save the `caught` count for each fish
	const caughtCounts = fishdex.map(fish => fish.caught);
	localStorage.setItem("fishdexCaught", JSON.stringify(caughtCounts));
}


function loadFishdex() {
	const saved = localStorage.getItem("fishdexCaught");
	if (saved) {
		const caughtCounts = JSON.parse(saved);
		for (let i = 0; i < fishdex.length; i++) {
			if (caughtCounts[i] !== undefined) {
				fishdex[i].caught = caughtCounts[i];
			}
		}
	}
}

function build_compendium() {
	const container = document.getElementById("compendium_content");
	container.innerHTML = ""; // Clear previous content

	const fragment = document.createDocumentFragment();

	const sortedFish = fishdex
		.filter(fish => fish.rarity !== "Item")
		.sort((a, b) => {
			const orderA = rarityInfo[a.rarity]?.order ?? 0;
			const orderB = rarityInfo[b.rarity]?.order ?? 0;
			return orderB - orderA;
		});

	sortedFish.forEach(fish => {
		const entry = create_fish_entry(fish);
		fragment.appendChild(entry);
	});

	container.appendChild(fragment);
}

function create_fish_entry(fish) {
	const [r, g, b] = rarityInfo[fish.rarity]?.color || [255, 255, 255];
	const isCaught = fish.caught > 0;

	const entry = document.createElement("div");
	entry.className = "fish-entry";
	entry.id = `fish-entry-${fish.name.toLowerCase().replace(/\s+/g, "")}`;
	entry.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.1)`;
	entry.style.border = `2px solid rgba(${r}, ${g}, ${b}, 1)`;
	entry.style.opacity = isCaught ? "1" : "0.5";
	entry.style.cursor = isCaught ? "pointer" : "default";
	entry.style.transition = "transform 0.1s ease";

	entry.style.display = "flex";
	entry.style.alignItems = "center";
	entry.style.gap = "12px";

	entry.addEventListener("mouseover", () => {
		entry.style.transform = "scale(1.02)";
	});
	entry.addEventListener("mouseout", () => {
		entry.style.transform = "scale(1)";
	});

	entry.onclick = () => {
		if (isCaught) {
			inspectItem(fish.name);
		} else {
			inspectItem(fish.name, rarityInfo[fish.rarity].place);
		}
	};

	// Text container
	const textContainer = document.createElement("div");

	const name = document.createElement("h3");
	name.className = "fish-name";
	name.textContent = isCaught ? fish.name : "???";
	name.style.color = `rgba(${r}, ${g}, ${b}, 1)`;
	name.style.margin = "0";

	const caught = document.createElement("p");
	caught.className = "fish-caught";
	caught.textContent = isCaught
		? `Caught: ${fish.caught}`
		: rarityInfo[fish.rarity]?.hint || "";
	caught.style.color = `rgba(${r}, ${g}, ${b}, 1)`;
	caught.style.margin = "0";

	textContainer.appendChild(name);
	textContainer.appendChild(caught);
	entry.appendChild(textContainer);

	// Fish image
	const img = document.createElement("img");
	const fishImageName = fish.name.toLowerCase().replace(/\s+/g, "");
	img.src = isCaught
		? `./assets/fish_assets/${fishImageName}.png`
		: `./assets/fish_assets/hidden.png`;

	img.style.width = "48px";
	img.style.height = "48px";
	img.style.imageRendering = "pixelated";
	img.style.borderRadius = "6px";
	img.style.filter = `drop-shadow(0px 0px 6px rgba(${r}, ${g}, ${b}, 0.3))`;
	img.loading = "lazy";

	img.onerror = () => {
		if (img.parentNode) {
			img.src = './assets/fish_assets/hidden.png'
		}
	};

	entry.appendChild(img);

	return entry;
}

function update_compendium(fishName) {
	const entryId = `fish-entry-${fishName.toLowerCase().replace(/\s+/g, "")}`;
	const existing = document.getElementById(entryId);
	const fish = fishdex.find(f => f.name.toLowerCase() === fishName.toLowerCase());

	if (!fish || !existing) return;

	const newEntry = create_fish_entry(fish);
	existing.replaceWith(newEntry);
}
