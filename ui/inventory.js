// === Inventory Helpers ===

function addItem(type, name, amount = 1) {
  if (type === "fish" && getFishRarity(name) === "Item") {
    type = "items";
  }
  if (!inventory[type][name]) inventory[type][name] = 0;
  inventory[type][name] += amount;
  dirtyInventory = true;
}

function spendMoney(amount) {
  if (inventory.money >= amount) {
    inventory.money -= amount;
    updateMoneyDisplay();
    return true;
  }
  console.log("Not enough money!");
  return false;
}

function updateMoneyDisplay() {
  document.getElementById("money").textContent = `$${inventory.money}`;
}

// === Selling Logic ===

function sellFish(fishRarity) {
  if (rarityInfo.hasOwnProperty(fishRarity)) {
    inventory.money += rarityInfo[fishRarity].price;
    updateMoneyDisplay();
  } else {
    console.warn(`Unknown fish rarity: ${fishRarity}`);
  }
}

function sellItem(name) {
  if (inventory.fish[name] > 0) {
    const rarity = getFishRarity(name);
    sellFish(rarity);
    decrementInventory("fish", name);
    refreshInventory();
  }
}

function sellAllFish() {
  for (const name in inventory.fish) {
    const count = inventory.fish[name];
    const rarity = getFishRarity(name);
    for (let i = 0; i < count; i++) {
      sellFish(rarity);
    }
    delete inventory.fish[name];
  }
  refreshInventory();
}

function decrementInventory(type, name, amount = 1) {
  if (!inventory[type][name]) return;
  inventory[type][name] -= amount;
  if (inventory[type][name] <= 0) {
    delete inventory[type][name];
  }
}

// === Rendering Helpers ===

function createInventoryItemElement(name, amount, rarity, isFish = true) {
  const [r, g, b] = rarityInfo[rarity]?.color || [255, 255, 255];
  const item = document.createElement("div");
  item.className = "inventory-item";

  const gradientSide = isFish ? "left" : "right";
  const borderLeft = isFish ? `12px solid rgba(${r}, ${g}, ${b}, 1)` : "none";
  const borderRight = isFish ? "none" : `12px solid rgba(${r}, ${g}, ${b}, 1)`;

  item.style.backgroundImage = `linear-gradient(to ${gradientSide}, rgba(${r}, ${g}, ${b}, 0.1) 0%, rgba(${r}, ${g}, ${b}, 0.2) 100%)`;
  item.style.border = `2px solid rgba(${r}, ${g}, ${b}, 1)`;
  item.style.borderLeft = borderLeft;
  item.style.borderRight = borderRight;

  const styleColor = `color: rgba(${r}, ${g}, ${b}, 1)`;
  const btnStyle = `
    --btn-color: rgba(${r}, ${g}, ${b}, 1);
    --btn-hover-bg: rgba(${r}, ${g}, ${b}, 0.5);
    border: 2px solid var(--btn-color);
    color: var(--btn-color);
    transition: background-color 0.1s ease;
  `;

  let buttonsHTML;
  if (isFish) {
    buttonsHTML = `
      <button style="${btnStyle}" class="button-hover" onclick="sellItem('${name}')">Sell</button>
      <button style="${btnStyle}" class="button-hover" onclick="inspectItem('${name}')">Inspect</button>
    `;
  } else {
    if (name === "Key") {
      buttonsHTML = `<button style="${btnStyle}" class="button-hover" onclick="inspectItem('${name}')">Inspect</button>`;
    } else {
      buttonsHTML = `<button style="${btnStyle}" class="button-hover" onclick="useItem('${name}')">Use</button>`;
    }
  }

  item.innerHTML = `
    <span class="item-name" style="${styleColor}">${amount}x ${name}</span>
    <span class="item-actions">
      <small class="item-rarity" style="${styleColor}">[${rarity}]</small>
      ${buttonsHTML}
    </span>
  `;

  return item;
}

//rendering functions
function renderInventory() {
  const fishContainer = document.getElementById("inventory_fish_content");

  // Get a sorted list of what should be displayed
  const sortedFish = Object.entries(inventory.fish).sort(([a], [b]) => {
    const rarityCompare = rarityInfo[getFishRarity(a)].order - rarityInfo[getFishRarity(b)].order;
    return rarityCompare !== 0 ? rarityCompare : a.localeCompare(b);
  });

  const seen = new Set();

  sortedFish.forEach(([name, amount], index) => {
    seen.add(name);
    const rarity = getFishRarity(name);
    const id = `fish-${name}`;
    const existing = document.getElementById(id);

    if (existing) {
      // If amount changed, update it
      if (parseInt(existing.dataset.amount) !== amount) {
        const updated = createInventoryItemElement(name, amount, rarity, true);
        updated.id = id;
        updated.dataset.amount = amount;
        fishContainer.replaceChild(updated, existing);
      } else {
        // If it's already correct, move it into the right position if needed
        if (fishContainer.children[index] !== existing) {
          fishContainer.insertBefore(existing, fishContainer.children[index]);
        }
      }
    } else {
      // New item
      const newEl = createInventoryItemElement(name, amount, rarity, true);
      newEl.id = id;
      newEl.dataset.amount = amount;
      fishContainer.insertBefore(newEl, fishContainer.children[index]);
    }
  });

  // Remove any old items not in the inventory anymore
  Array.from(fishContainer.children).forEach(child => {
    const key = child.id?.replace("fish-", "");
    if (key && !seen.has(key)) {
      fishContainer.removeChild(child);
    }
  });

  renderItems();
  updateMoneyDisplay();
}

function renderItems() {
  const itemContainer = document.getElementById("inventory_item_content");

  const entries = Object.entries(inventory.items);
  const seen = new Set();

  entries.forEach(([name, amount], index) => {
    seen.add(name);
    const rarity = getFishRarity(name);
    const id = `item-${name}`;
    const existing = document.getElementById(id);

    if (existing) {
      if (parseInt(existing.dataset.amount) !== amount) {
        const updated = createInventoryItemElement(name, amount, rarity, false);
        updated.id = id;
        updated.dataset.amount = amount;
        itemContainer.replaceChild(updated, existing);
      } else {
        if (itemContainer.children[index] !== existing) {
          itemContainer.insertBefore(existing, itemContainer.children[index]);
        }
      }
    } else {
      const newEl = createInventoryItemElement(name, amount, rarity, false);
      newEl.id = id;
      newEl.dataset.amount = amount;
      itemContainer.insertBefore(newEl, itemContainer.children[index]);
    }
  });

  // Remove old items not in inventory
  Array.from(itemContainer.children).forEach(child => {
    const key = child.id?.replace("item-", "");
    if (key && !seen.has(key)) {
      itemContainer.removeChild(child);
    }
  });
}

function inspectItem(name, place) {
  const rarity = getFishRarity(name);
  const color = rarityInfo[rarity]?.color || [255, 255, 255];
  let quote;

  switch (name) {
    case "Key":
      quote = "Could open a chest if you had one...";
      break;
    case "Chest":
      quote = "A locked chest, waiting to be opened.";
      break;

    default:
      quote = rarityInfo[rarity]?.quote || "A fine catch, well worth admiring.";
  }

  if (place) {
    quote = place;
    showFishInspect(`<h3>??? [${rarity}]</h3><br>${quote}`, color);
    return;
  }

  const fish_img_path = name.toLowerCase().replace(/\s+/g, "")
  showFishInspect(`<h3>${name} [${rarity}]</h3>${quote}`, color, `../assets/fish_assets/${fish_img_path}.png` ,rarity);
}

function useItem(name) {
  if (!inventory.items[name] || inventory.items[name] <= 0) {
    console.log(`No ${name} to use!`);
    return;
  }

  if (name === "Chest") {
    if (inventory.items["Key"] > 0) {
      decrementInventory("items", "Chest");
      decrementInventory("items", "Key");

      const rewardMoney = Math.floor(Math.random() * 50) + 50;
      inventory.money += rewardMoney;

      const chestColor = rarityInfo[getFishRarity("Chest")]?.color || [255, 223, 0];
      showFishInspect(`<h3>${name}</h3><br>You got $${rewardMoney}!`, chestColor);
    } else {
      console.log("You need a Key to open the Chest!");
    }
  } else if (name === "Forgotten Note") {
      decrementInventory("items", "Forgotten Note");
      showLore(Math.floor(Math.random() * loreArray.lore.length));
  }

  if (inventory.items[name] === 0) {
    delete inventory.items[name];
  }

  refreshInventory();
}

// === Save & Load ===

function saveInventory() {
  localStorage.setItem("inventoryData", JSON.stringify(inventory));
}

function loadInventory() {
  const saved = localStorage.getItem("inventoryData");
  if (saved) {
    const data = JSON.parse(saved);
    // Create a Set of valid fish names from fishdex for quick lookup
    const validFishNames = new Set(fishdex.map(f => f.name));

    // Filter inventory fish to only include valid fish names
    const loadedFish = data.fish || {};
    const filteredFish = {};

    for (const fishName in loadedFish) {
      if (validFishNames.has(fishName)) {
        filteredFish[fishName] = loadedFish[fishName];
      }
    }

    inventory.fish = filteredFish;
    inventory.items = data.items || {};
    inventory.money = data.money || 0;
  }
}


// === UI Toggle ===

let alert_state = true;
function toggleAlerts() {
  alert_state = !alert_state;
  document.getElementById("fishAlert").style.display = alert_state ? "block" : "none";
}

// Refresh all inventory UI & save immediately
function refreshInventory() {
  renderInventory();
  updateMoneyDisplay();
  saveInventory();
  dirtyInventory = false; // Reset dirty flag here to avoid double saving
}
