const getItemType = (item) =>
    item?.rarity?.toLowerCase() === 'item' ? 'items' : 'fish';

const getRarityKey = (name, type = 'fish') =>
    getFishRarity(name, type) || (type === 'items' ? 'Item' : 'Common');

const updateMoneyDisplay = () => {
    document.getElementById('money').innerHTML = `$${inventory.money}`;
};

function addItem(item, amount = 1) {
    const type = getItemType(item);

    if (type === 'fish') {
        item.caught = (item.caught || 0) + 1;
        entities.player.catchCount++;
        save('catchCount', entities.player.catchCount);
    }

    inventory[type][item.name] = (inventory[type][item.name] || 0) + amount;
    updateInventory(item, type);
}

function sellItem(name, type) {
    if (!inventory[type][name]) return;

    const rarityKey = getRarityKey(name, type);
    let price = rarityInfo[rarityKey]?.price ?? 0;

    if (rarityKey === 'Cursed' && states.items.cursed) price = -300;
    else if (rarityKey === 'Void' && states.items.void) price = -1500;

    inventory[type][name]--;

    const container = document.getElementById(`${type}-${name}`);
    if (inventory[type][name] <= 0) {
        delete inventory[type][name];
        container?.remove(); // clean up if it still exists
    } else {
        const span = container?.querySelector('.count');
        if (span) span.textContent = `x${inventory[type][name]} ${name}`;
    }

    inventory.money = Math.max(0, (inventory.money || 0) + price);
    save(inventory, inventory);
    updateMoneyDisplay();
}

function sellAll(type) {
    if (!inventory[type]) return;

    let total = 0;

    for (const name in inventory[type]) {
        const count = inventory[type][name];
        if (count <= 0) continue;

        const rarityKey = getRarityKey(name, type);
        const price = rarityInfo[rarityKey]?.price ?? 0;

        total += price * count;
        delete inventory[type][name];
        document.getElementById(`${type}-${name}`)?.remove();
    }

    inventory.money = (inventory.money || 0) + total;
    save(inventory, inventory);
    updateMoneyDisplay();
    renderInventory();
}

function useItem(name) {
    const type = 'items';
    if (!inventory[type][name]) return;

    switch (name) {
        case 'Forgotten Note':
            showLore(states.extras.loreIndex++);
            if (states.extras.loreIndex >= loreArray.length) states.extras.loreIndex = 0;
            break;

        case 'Chest':
            if ((inventory.items['Key'] ?? 0) < 1) return;
            const cash = Math.floor(Math.random() * 41) + 80;
            fishInspect({ name, rarity: 'Item' }, cash);
            decrementInventory('items', 'Key');
            inventory.money += cash;
            updateMoneyDisplay();
            updateInventory({ name: 'Key', rarity: 'Item' }, 'items');
            break;

        case 'Motor Oil':
            states.items.oiled = true;
            clearTimeout(states.items.oilTimeout);
            states.items.oilTimeout = setTimeout(() => {
                states.items.oiled = false;
                states.items.oilTimeout = null;
            }, 120000);
            break;

        case 'Curse Remover':
            states.items.cursed = false;
            save('curseState', false);
            showLore(0, 'curse');
            break;

        case 'Void Stabilizer':
            states.items.void = false;
            save('voidState', false);
            showLore(0, 'void');
            break;
    }

    decrementInventory(type, name);
    save(inventory, inventory);
    updateInventory({ name, rarity: 'Item' }, type);
}

function decrementInventory(type, name, amount = 1) {
    if (!inventory[type][name]) return;
    inventory[type][name] -= amount;
    if (inventory[type][name] <= 0) delete inventory[type][name];
}

function createInventoryEntry(name, type) {
    const rarityKey = getRarityKey(name, type);
    const rarity = rarityInfo[rarityKey];
    const [r, g, b] = rarity.color;

    const container = document.createElement('div');
    container.className = 'inventoryEntry';
    container.id = `${type}-${name}`;
    container.style.borderColor = `rgb(${r}, ${g}, ${b})`;
    container.style.backgroundImage = `linear-gradient(to right, rgba(${r},${g},${b},0.1), rgba(${r},${g},${b},0.05))`;
    container.style.color = `rgb(${r}, ${g}, ${b})`;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'count';
    nameSpan.textContent = `x${inventory[type][name]} ${name}`;

    const safe = name.replace(/\s+/g, '-');
    let button = null;

    if (type === 'fish' || (type === 'items' && name.toLowerCase() !== 'key')) {
        button = document.createElement('button');
        button.textContent = type === 'fish' ? 'Sell' : 'Use';
        button.style.cursor = 'pointer';
        button.style.borderColor = `rgb(${r}, ${g}, ${b})`;
        button.classList.add(`${type === 'fish' ? 'sell' : 'use'}-btn-${safe}-${type}`);
        button.onclick = () => (type === 'fish' ? sellItem(name, type) : useItem(name));

        const btnStyle = document.createElement('style');
        btnStyle.textContent = `
            .${button.className}:hover {
                background-color: rgba(${r}, ${g}, ${b}, 0.5);
            }
        `;
        document.head.appendChild(btnStyle);
    }

    const img = document.createElement('img');
    img.src = `/assets/fishAssets/${name.toLowerCase().replace(/\s+/g, '')}.png`;
    img.alt = name;
    img.className = 'inspectImage';
    img.onclick = () => fishInspect({ name, type });

    img.onerror = () => {
        img.onerror = null;
        img.src = '/assets/fishAssets/hidden.png';
    };

    const imgClass = `inspect-img-${type}-${safe}`;
    img.classList.add(imgClass);

    const imgStyle = document.createElement('style');
    imgStyle.textContent = `
        .${imgClass}:hover {
            filter: brightness(1.2) drop-shadow(0 0 6px rgba(${r}, ${g}, ${b}, 1));
        }
    `;
    document.head.appendChild(imgStyle);

    container.appendChild(img);

    const infoWrap = document.createElement('div');
    infoWrap.appendChild(nameSpan);
    container.appendChild(infoWrap);

    if (type === 'fish') {
        const raritySpan = document.createElement('span');
        raritySpan.className = 'entryRarity';
        raritySpan.textContent = `[${rarityKey}]`;
        container.appendChild(raritySpan);
    }

    if (button) container.appendChild(button);
    return container;
}

function renderInventory() {
    const fishContainer = document.getElementById('fishContainer');
    const itemContainer = document.getElementById('itemContainer');

    fishContainer.innerHTML = '';
    itemContainer.innerHTML = '';

    const sortEntries = (obj, type) => {
        return Object.keys(obj).map(name => {
            const rarityKey = getRarityKey(name, type);
            return { name, order: rarityInfo[rarityKey]?.order ?? 99 };
        }).sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
    };

    for (const { name } of sortEntries(inventory.fish, 'fish')) {
        fishContainer.appendChild(createInventoryEntry(name, 'fish'));
    }

    for (const { name } of sortEntries(inventory.items, 'items')) {
        itemContainer.appendChild(createInventoryEntry(name, 'items'));
    }
}

function updateInventory(item, forcedType = null) {
    const type = forcedType || getItemType(item);
    const id = `${type}-${item.name}`;
    const container = document.getElementById(id);
    const count = inventory[type]?.[item.name] ?? 0;

    if (count <= 0) {
        container?.remove();
        return;
    }

    const rarityKey = getRarityKey(item.name, type);
    const order = rarityInfo[rarityKey]?.order ?? 99;

    if (container) {
        const span = container.querySelector('.count');
        if (span) span.textContent = `x${count} ${item.name}`;
    } else {
        const newEntry = createInventoryEntry(item.name, type);
        const parent = document.getElementById(type === 'fish' ? 'fishContainer' : 'itemContainer');

        let inserted = false;
        for (const child of parent.children) {
            const [existingType, ...parts] = child.id.split('-');
            const existingName = parts.join('-');
            const existingOrder = rarityInfo[getRarityKey(existingName, existingType)]?.order ?? 99;

            if (order < existingOrder || (order === existingOrder && item.name < existingName)) {
                parent.insertBefore(newEntry, child);
                inserted = true;
                break;
            }
        }

        if (!inserted) parent.appendChild(newEntry);
    }
}