let inventory = {
  fish: {},
  items: {},
  money: 0
};

const rarityOrder = {
  Legendary: 0,
  Rare: 1,
  Uncommon: 2,
  Common: 3
};

function addItem(type, name, amount = 1) {
  if (!inventory[type][name]) {
    inventory[type][name] = 0;
  }
  inventory[type][name] += amount;
}

function spendMoney(amount) {
  if (inventory.money >= amount) {
    inventory.money -= amount;
    return true;
  } else {
    // Optional: show an alert or feedback
    console.log("Not enough money!");
    return false;
  }
}

function sellFish(fishRarity) {
  switch (fishRarity) {
    case "Common":
      inventory.money += 1;
      break;
    case "Uncommon":
      inventory.money += 3;
      break;
    case "Rare":
      inventory.money += 7;
      break;
    case "Legendary":
      inventory.money += 15;
      break;
  }

  document.getElementById("money").innerHTML = `$${inventory.money}`;
}

function sellItem(name) {
  if (inventory.fish[name] > 0) {
    const rarity = getFishRarity(name);
    sellFish(rarity); // adds money
    inventory.fish[name]--;
    if (inventory.fish[name] === 0) {
      delete inventory.fish[name];
    }

    renderInventory();
    updateMoneyDisplay();
    saveInventory();
  }
}

function updateMoneyDisplay() {
  document.getElementById("money").innerHTML = `$${inventory.money}`;
}



function renderInventory() {
  const container = document.getElementById("inventory_fish_content");
  container.innerHTML = "";

  const fishData = Object.entries(inventory.fish);

  // 🧠 Sort by rarity and then alphabetically
  fishData.sort(([aName], [bName]) => {
    const aRarity = getFishRarity(aName);
    const bRarity = getFishRarity(bName);
    const rarityCompare = rarityOrder[aRarity] - rarityOrder[bRarity];

    if (rarityCompare !== 0) return rarityCompare;
    return aName.localeCompare(bName); // fallback to name
  });

  for (const [name, amount] of fishData) {
    const rarity = getFishRarity(name);
    const [r, g, b] = rarityColorsRgb[rarity] || [255, 255, 255];

    const item = document.createElement("div");
    item.className = "inventory-item";
    item.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.15)`;
    item.style.borderLeft = `12px solid rgba(${r}, ${g}, ${b}, 1)`;

item.innerHTML = `
  <span class="item-name">${amount}x ${name}</span>
  <span class="item-actions">
    <small class="item-rarity" style="color: rgba(${r}, ${g}, ${b}, 1)">[${rarity}]</small>
    <button onclick="sellItem('${name}')">Sell</button>
    <button onclick="inspectItem('${name}')">Inspect</button>
  </span>
`;


    container.appendChild(item);
  }

  updateMoneyDisplay();
}

function inspectItem(name) {
  const rarity = getFishRarity(name);
  showFishInspect(`${name} (${rarity})<br>A fine catch, well worth admiring`);
}

function saveInventory() {
  const data = {
    fish: inventory.fish,
    money: inventory.money
  };
  localStorage.setItem("inventoryData", JSON.stringify(data));
}

function loadInventory() {
  const saved = localStorage.getItem("inventoryData");
  if (saved) {
    const data = JSON.parse(saved);
    inventory.fish = data.fish || {};
    inventory.money = data.money || 0;
  }
}
