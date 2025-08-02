function buildCompendium() {
	const container = document.getElementById("compendiumContent");
	container.innerHTML = ""; // Clear previous content

	const fragment = document.createDocumentFragment();

	const sortedFish = fishdex
		.filter(fish => fish.rarity !== "Item")
		.sort((a, b) => {
			const orderA = rarityInfo[a.rarity]?.order ?? 0;
			const orderB = rarityInfo[b.rarity]?.order ?? 0;
			return orderB - orderA;
		});

	for (const fish of sortedFish) {
		const entry = createFishEntry(fish);
		fragment.appendChild(entry);
	}

	container.appendChild(fragment);
}

function createFishEntry(fish) {
	const { name, rarity, caught = 0 } = fish;
	const rarityData = rarityInfo[rarity] || {};
	const [r, g, b] = rarityData.color || [255, 255, 255];
	const isCaught = caught > 0;

	const entry = document.createElement("div");
	entry.className = "fish-entry";
	entry.id = `fish-entry-${name.toLowerCase().replace(/\s+/g, "")}`;
	entry.style.cssText = `
		background-color: rgba(${r}, ${g}, ${b}, 0.1);
		border: 2px solid rgba(${r}, ${g}, ${b}, 1);
		opacity: ${isCaught ? "1" : "0.5"};
		cursor: ${isCaught ? "pointer" : "default"};
		transition: transform 0.1s ease;
		display: flex;
		align-items: center;
		gap: 12px;
	`;

	entry.addEventListener("mouseover", () => {
		entry.style.transform = "scale(1.02)";
	});
	entry.addEventListener("mouseout", () => {
		entry.style.transform = "scale(1)";
	});

	entry.onclick = () => {
		if (isCaught) {
			fishInspect(fish);
		} else {
			fishInspect(fish, rarityData.place);
		}
	};

	// === TEXT CONTENT ===
	const textContainer = document.createElement("div");

	const nameEl = document.createElement("h3");
	nameEl.className = "fish-name";
	nameEl.textContent = isCaught ? name : "???";
	nameEl.style.cssText = `
		color: rgba(${r}, ${g}, ${b}, 1);
		margin: 0;
	`;

	const caughtEl = document.createElement("p");
	caughtEl.className = "fish-caught";
	caughtEl.textContent = isCaught ? `Caught: ${caught}` : (rarityData.hint || "");
	caughtEl.style.cssText = `
		color: rgba(${r}, ${g}, ${b}, 1);
		margin: 0;
	`;

	textContainer.append(nameEl, caughtEl);
	entry.appendChild(textContainer);

	// === IMAGE ===
	const img = document.createElement("img");
	const imgName = name.toLowerCase().replace(/\s+/g, "");
	img.src = isCaught
		? `./assets/fishAssets/${imgName}.png`
		: `./assets/fishAssets/hidden.png`;

	Object.assign(img.style, {
		width: "48px",
		height: "48px",
		imageRendering: "pixelated",
		borderRadius: "6px",
		filter: `drop-shadow(0px 0px 6px rgba(${r}, ${g}, ${b}, 0.3))`,
	});
	img.loading = "lazy";

	img.onerror = () => {
		this.onerror = null;
		img.src = './assets/fishAssets/hidden.png';
	};

	entry.appendChild(img);
	return entry;
}

function updateCompendium(fishName) {
	const entryId = `fish-entry-${fishName.toLowerCase().replace(/\s+/g, "")}`;
	const existing = document.getElementById(entryId);
	const fish = fishdex.find(f => f.name.toLowerCase() === fishName.toLowerCase());

	if (!fish || !existing) return;

	updateProgress();

	const updatedEntry = createFishEntry(fish);
	existing.replaceWith(updatedEntry);
}


function updateProgress() {
	const progress = fishdex.filter(fish => fish.caught >= 1 && fish.rarity !== "Item").length;
	const total = fishdex.filter(fish => fish.rarity !== "Item").length;
	document.getElementById('compendiumProgress').textContent = `${progress}/${total}`;
}
