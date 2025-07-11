let inventory = {
  fish: {},
  items: {},
  money: 0
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