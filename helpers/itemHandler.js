function addItem(item, amount = 1) {
    let type;
    if (item.rarity?.toLowerCase() === "item") {
        type = "items";
    } else {
        type = "fish";
        item.caught = (item.caught || 0) + 1;
        entities.player.catchCount++;
        save("catchCount", entities.player.catchCount);
    }

    if (!inventory[type][item.name]) inventory[type][item.name] = 0;
    inventory[type][item.name] += amount;

    updateInventory(item, type);
}

function sellItem(name, type) {
    if (!inventory[type][name]) return;

    const rarityKey = getFishRarity(name, type) || 'Item';  // <-- use 'name' here!
    const price = rarityInfo[rarityKey]?.price ?? 0;

    // Decrease count
    inventory[type][name]--;

    // Add money
    inventory.money = (inventory.money || 0) + price;
    save(inventory, inventory);

    // Remove or update entry
    const container = document.getElementById(`${type}-${name}`);
    if (inventory[type][name] <= 0) {
        delete inventory[type][name];
        if (container) container.remove();
    } else {
        const countSpan = container?.querySelector('.count');
        if (countSpan) countSpan.textContent = inventory[type][name];
    }

    document.getElementById('money').innerHTML = `$${inventory.money}`;
}

function sellAll(type) {
    if (!inventory[type]) return;

    let totalMoney = 0;

    // Go through all items/fish in the specified type
    for (const name in inventory[type]) {
        if (!inventory[type].hasOwnProperty(name)) continue;

        const count = inventory[type][name];
        if (count <= 0) continue;

        const rarityKey = getFishRarity(name, type) || (type === 'items' ? 'Item' : 'Common');
        const price = rarityInfo[rarityKey]?.price ?? 0;

        totalMoney += price * count;

        // Remove all of that item from inventory
        delete inventory[type][name];

        // Also remove DOM element if present
        const container = document.getElementById(`${type}-${name}`);
        if (container) container.remove();
    }

    // Add total money to your inventory
    inventory.money = (inventory.money || 0) + totalMoney;

    save(inventory, inventory);

    // Update money display
    document.getElementById('money').innerHTML = `$${inventory.money}`;

    // Re-render inventory just in case (optional)
    renderInventory();
}

function useItem(itemName) {
    const type = 'items';
    if (!inventory[type][itemName]) return;

    if (itemName === 'Forgotten Note') {
        showLore(states.extras.loreIndex);
        states.extras.loreIndex++;
        if (states.extras.loreIndex >= loreArray.length) {
            states.extras.loreIndex = 0;
        }

    } else if (itemName === 'Chest') {
        if ((inventory.items["Key"] ?? 0) < 1) {
            return;
        }

        const randomMoney = Math.floor(Math.random() * (120 - 80 + 1)) + 80;
        fishInspect({ name: itemName, rarity: 'Item' }, randomMoney);
        decrementInventory('items', 'Key');
        updateInventory({ name: 'Key', rarity: 'Item' }, type);
        inventory.money += randomMoney;
        document.getElementById('money').innerHTML = `$${inventory.money}`;
    }

    inventory[type][itemName]--;

    if (inventory[type][itemName] <= 0) {
        delete inventory[type][itemName];
    }

    save(inventory, inventory);

    updateInventory({ name: itemName, rarity: 'Item' }, type);
}

function decrementInventory(type, name, amount = 1) {
    if (!inventory[type][name]) return;
    inventory[type][name] -= amount;
    if (inventory[type][name] <= 0) {
        delete inventory[type][name];
    }
}

function createInventoryEntry(itemName, type) {
    const rarityKey = getFishRarity(itemName, type) || 'Item';
    const rarity = rarityInfo[rarityKey] || rarityInfo.Common;
    const [r, g, b] = rarity.color;

    const container = document.createElement('div');
    container.classList.add('inventoryEntry');
    container.id = `${type}-${itemName}`;

    container.style.borderColor = `rgb(${r}, ${g}, ${b})`;
    container.style.backgroundImage = `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0.1), rgba(${r}, ${g}, ${b}, 0.05))`;
    container.style.color = `rgb(${r}, ${g}, ${b})`;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'count';
    nameSpan.textContent = `x${inventory[type][itemName]} ${itemName}`;

    // Button element (Sell or Use or none)
    let actionButton = null;

    if (type === 'fish') {
        // For fish, SELL button as before
        actionButton = document.createElement('button');
        actionButton.textContent = 'Sell';
        actionButton.style.cursor = 'pointer';
        actionButton.style.borderColor = `rgb(${r}, ${g}, ${b})`;
        actionButton.onclick = () => sellItem(itemName, type);
    } else if (type === 'items') {
        // For items except "Key", add USE button
        if (itemName.toLowerCase() !== 'key') {
            actionButton = document.createElement('button');
            actionButton.textContent = 'Use';
            actionButton.style.cursor = 'pointer';
            actionButton.style.borderColor = `rgb(${r}, ${g}, ${b})`;
            actionButton.style.marginLeft = 'auto';
            actionButton.onclick = () => {
                // Your useItem logic here
                useItem(itemName);
            };
        }
        // If item is a "Key", no button at all
    }

    // Thumbnail image for inspect
    const normalizedName = itemName.toLowerCase().replace(/\s+/g, '');

    const fishImg = document.createElement('img');
    fishImg.src = `/assets/fishAssets/${normalizedName}.png`;
    fishImg.alt = `${itemName}`;
    fishImg.className = 'inspectImage';
    fishImg.onclick = () => fishInspect({ name: itemName, type });

    // 🛟 graceful fallback to hidden.png
    fishImg.onerror = () => {
        fishImg.onerror = null;
        fishImg.src = '/assets/fishAssets/hidden.png';
    };

    // Hover effect with dynamic style
    const safeClass = name => name.replace(/\s+/g, '-');
    const imgClass = `inspect-img-${type}-${safeClass(itemName)}`;
    fishImg.classList.add(imgClass);

    const style = document.createElement('style');
    style.textContent = `
        .${imgClass}:hover {
            filter: brightness(1.2) drop-shadow(0 0 6px rgba(${r}, ${g}, ${b}, 1));
        }
    `;
    document.head.appendChild(style);

    const infoWrap = document.createElement('div');

    container.appendChild(fishImg);
    infoWrap.appendChild(nameSpan);

    container.appendChild(infoWrap);

    // Add rarity span only for fish, NOT for items
    if (type === 'fish') {
        const raritySpan = document.createElement('span');
        raritySpan.textContent = `[${rarityKey}]`;
        raritySpan.className = 'entryRarity';
        container.appendChild(raritySpan);
    }

    // Append button if it exists
    if (actionButton) {
        container.appendChild(actionButton);
    }

    return container;
}

function renderInventory() {
    const fishContainer = document.getElementById('fishContainer');
    const itemContainer = document.getElementById('itemContainer');

    fishContainer.innerHTML = '';
    itemContainer.innerHTML = '';

    const fishEntries = Object.keys(inventory.fish).map(name => {
        const rarityKey = getFishRarity(name, 'fish');
        const order = rarityInfo[rarityKey]?.order ?? 99;
        return { name, rarity: rarityKey, order };
    }).sort((a, b) => {
        if (a.order !== b.order) return a.order - b.order;
        return a.name.localeCompare(b.name);
    });

    const itemEntries = Object.keys(inventory.items).map(name => {
        const rarityKey = 'Item';
        const order = rarityInfo[rarityKey]?.order ?? 99;
        return { name, rarity: rarityKey, order };
    }).sort((a, b) => {
        if (a.order !== b.order) return a.order - b.order;
        return a.name.localeCompare(b.name);
    });


    fishEntries.forEach(entry => {
        fishContainer.appendChild(createInventoryEntry(entry.name, 'fish'));
    });

    itemEntries.forEach(entry => {
        itemContainer.appendChild(createInventoryEntry(entry.name, 'items'));
    });
}

function updateInventory(item, forcedType = null) {
    const type = forcedType || (item.rarity?.toLowerCase() === 'item' ? 'items' : 'fish');
    const containerId = `${type}-${item.name}`;
    const container = document.getElementById(containerId);

    // Get current count safely, 0 if missing
    const currentCount = inventory[type]?.[item.name] ?? 0;

    // If count is 0 or less, remove the container and return early
    if (currentCount <= 0) {
        if (container) container.remove();
        return;
    }

    const rarityKey = getFishRarity(item.name, type) || (type === 'items' ? 'Item' : 'Common');
    const newOrder = rarityInfo[rarityKey]?.order ?? 99;

    if (container) {
        const countSpan = container.querySelector('.count');
        if (countSpan) {
            countSpan.textContent = `x${currentCount} ${item.name}`;
        }
    } else {
        const newEntry = createInventoryEntry(item.name, type);
        const parentContainer = document.getElementById(type === 'fish' ? 'fishContainer' : 'itemContainer');

        let inserted = false;
        for (const existingEntry of parentContainer.children) {
            const [existingType, ...existingNameParts] = existingEntry.id.split('-');
            const existingName = existingNameParts.join('-');

            const existingRarityKey = getFishRarity(existingName, existingType);
            const existingOrder = rarityInfo[existingRarityKey]?.order ?? 99;

            if (
                newOrder < existingOrder ||
                (newOrder === existingOrder && item.name.localeCompare(existingName) < 0)
            ) {
                parentContainer.insertBefore(newEntry, existingEntry);
                inserted = true;
                break;
            }
        }

        if (!inserted) {
            parentContainer.appendChild(newEntry);
        }
    }
}
