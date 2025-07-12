function swap_menu(menu_value) {
    if (!start_state) {return;}
    if (menu_value == "settings" && !settings_state) {
        hide_current_menu();
        document.getElementById("settings").style.display = "block";
        settings_state = true;
    } else if (menu_value == "market" && !market_state) {
        hide_current_menu();
        document.getElementById("market").style.display = "block";
        market_state = true;
    } else if (menu_value == "inventory" && !inventory_state) {
        hide_current_menu();
        document.getElementById("inventory").style.display = "block";
        document.getElementById("menu").classList.add("wide");
        inventory_state = true;

    } else if (menu_value == "upgrade" && !upgrade_state) {
        hide_current_menu();
        document.getElementById("upgrades").style.display = "block";
        upgrade_state = true;
    }
}

function hide_current_menu() {
    if (settings_state === true) {
        document.getElementById("settings").style.display = "none";
        settings_state = false;
    } else if (market_state === true) {
        document.getElementById("market").style.display = "none";
        market_state = false;
    } else if (inventory_state === true) {
        document.getElementById("inventory").style.display = "none";
        document.getElementById("menu").classList.remove("wide");
        inventory_state = false;
    } else if (upgrade_state === true) {
        document.getElementById("upgrades").style.display = "none";
        upgrade_state = false;
    }
}