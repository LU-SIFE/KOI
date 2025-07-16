// === Inventory Helpers ===

function addItem(type, name, amount = 1) {
  // Auto-correct type for items miscategorized as fish
  if (type === "fish" && getFishRarity(name) === "Item") {
    type = "items";
  }
  if (!inventory[type][name]) inventory[type][name] = 0;
  inventory[type][name] += amount;
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

  // Gradient backgrounds and border styles
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

  // Buttons: fish have Sell + Inspect, items have Use or Inspect
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

function renderInventory() {
  const fishContainer = document.getElementById("inventory_fish_content");
  fishContainer.innerHTML = "";

  // Sort fish by rarity order then name
  const fishEntries = Object.entries(inventory.fish).sort(([a], [b]) => {
    const rarityCompare = rarityInfo[getFishRarity(a)].order - rarityInfo[getFishRarity(b)].order;
    return rarityCompare !== 0 ? rarityCompare : a.localeCompare(b);
  });

  for (const [name, amount] of fishEntries) {
    const rarity = getFishRarity(name);
    const fishItem = createInventoryItemElement(name, amount, rarity, true);
    fishContainer.appendChild(fishItem);
  }

  renderItems();
  updateMoneyDisplay();
}

function renderItems() {
  const itemContainer = document.getElementById("inventory_item_content");
  itemContainer.innerHTML = "";

  for (const [name, amount] of Object.entries(inventory.items)) {
    const rarity = getFishRarity(name);
    const itemElement = createInventoryItemElement(name, amount, rarity, false);
    itemContainer.appendChild(itemElement);
  }
}

// === Inspect & Use ===
function inspectItem(name) {
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
      quote = rarityInfo[rarity]?.quote || "A fine catch, well worth admiring";
  }

  showFishInspect(`<h3>${name} [${rarity}]</h3><br>${quote}`, color);
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

      // Reward logic 🎁
      const rewardMoney = Math.floor(Math.random() * 50) + 50;
      inventory.money += rewardMoney;

      const chestColor = rarityInfo[getFishRarity("Chest")]?.color || [255, 223, 0];
      showFishInspect(`<h3>${name}</h3><br>You got $${rewardMoney}!`, chestColor);
    } else {
      console.log("You need a Key to open the Chest!");
    }
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
    inventory.fish = data.fish || {};
    inventory.items = data.items || {};
    inventory.money = data.money || 0;
  }
}

// === UI Toggle Example ===
let alert_state = true;
function toggleAlerts() {
  alert_state = !alert_state;
  document.getElementById("fishAlert").style.display = alert_state ? "block" : "none";
}

// Refresh all inventory UI & save
function refreshInventory() {
  renderInventory();
  updateMoneyDisplay();
  saveInventory();
}
