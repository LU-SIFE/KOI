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

  if (rarityPrices.hasOwnProperty(fishRarity)) {
    inventory.money += rarityPrices[fishRarity];
  } else {
    console.warn(`Unknown fish rarity: ${fishRarity}`);
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

function sellAllFish() {
  for (const name in inventory.fish) {
    const count = inventory.fish[name];
    const rarity = getFishRarity(name);

    for (let i = 0; i < count; i++) {
      sellFish(rarity); // adds money
    }

    // Clean up after selling
    delete inventory.fish[name];
  }

  renderInventory();
  updateMoneyDisplay();
  saveInventory();
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
    item.className = "inventory-item"; item.style.backgroundImage = `linear-gradient(to left, rgba(${r}, ${g}, ${b}, 0.1) 0%, rgba(${r}, ${g}, ${b}, 0.2) 100%)`;

    item.style.border = `2px solid rgba(${r}, ${g}, ${b}, 1)`;
    item.style.borderLeft = `12px solid rgba(${r}, ${g}, ${b}, 1)`;
    item.style.borderRight = 'none';

const styleColor = `style="color: rgba(${r}, ${g}, ${b}, 1)"`;

const btnStyle = `
  style="
    --btn-color: rgba(${r}, ${g}, ${b}, 1);
    --btn-hover-bg: rgba(${r}, ${g}, ${b}, 0.5);
    border: 2px solid var(--btn-color);
    color: var(--btn-color);
    transition: background-color 0.1s ease;
  "
  class="button-hover"
`;

item.innerHTML = `
  <span class="item-name" ${styleColor}>${amount}x ${name}</span>
  <span class="item-actions">
    <small class="item-rarity" ${styleColor}>[${rarity}]</small>
    <button ${btnStyle} onclick="sellItem('${name}')">Sell</button>
    <button ${btnStyle} onclick="inspectItem('${name}')">Inspect</button>
  </span>
`;



    container.appendChild(item);
  }

  updateMoneyDisplay();
}

function inspectItem(name) {
  const rarity = getFishRarity(name);
  const quote = inspect_quotes[rarity] || "A fine catch, well worth admiring";
  showFishInspect(`<h3>${name} [${rarity}]</h3><br>${quote}`);
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

let alert_state = true;
function toggleAlerts() {
  if (alert_state == true) {
    alert_state = false;
    document.getElementById("fishAlert").style.display = "none";
  } else {
    alert_state = true;
    document.getElementById("fishAlert").style.display = "block";
  }
}