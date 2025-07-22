function swap_menu(menu_value) {

    // Check if the menu requested is already open
    if (
        (menu_value === "settings" && settings_state) ||
        (menu_value === "market" && market_state) ||
        (menu_value === "inventory" && inventory_state) ||
        (menu_value === "upgrade" && upgrade_state) ||
        (menu_value === "compendium" && compendium_state)
    ) {
        // Menu is already open, no need to swap or rebuild
        return;
    }

    hide_current_menu();

    // Now show the new menu
    if (menu_value == "settings") {
        document.getElementById("settings").style.display = "block";
        settings_state = true;

    } else if (menu_value == "market") {
        document.getElementById("market").style.display = "block";
        market_state = true;

    } else if (menu_value == "inventory") {
        document.getElementById("inventory").style.display = "block";
        document.getElementById("menu").classList.add("wide");
        inventory_state = true;

    } else if (menu_value == "upgrade") {
        document.getElementById("upgrades").style.display = "block";
        upgrade_state = true;

    } else if (menu_value == "compendium") {
        build_compendium();
        document.getElementById("compendium").style.display = "block";
        compendium_state = true;
        document.getElementById("menu").classList.add("wide");
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
    } else if (compendium_state === true) {
        document.getElementById("compendium").style.display = "none";
        document.getElementById("menu").classList.remove("wide");
        compendium_state = false;
    } else if (upgrade_state === true) {
        document.getElementById("upgrades").style.display = "none";
        upgrade_state = false;
    }
}