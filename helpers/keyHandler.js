const keys = {};

function handleKeys(e, keyState) {
    keys[e.key.toLowerCase()] = keyState;

    if (keys['e']) {
        toggleMenu('mainMenu', 'container');
    }

    if (keys['f']) {
        toggleMenu('pondMenu', 'container');
    }

    if (keys['c']) {

        if (!states.containers.mainMenuOpen) {
            toggleMenu('mainMenu', 'container');
        } else if (states.content.compendiumMenu === true) {
            toggleMenu('mainMenu', 'container');
        }

        toggleMenu('compendiumMenu', 'content')
    }

    if (keys['q']) {
        if (!states.containers.mainMenuOpen) {
            toggleMenu('mainMenu', 'container');
        } else if (states.content.inventoryMenu === true) {
            toggleMenu('mainMenu', 'container');
        }

        toggleMenu('inventoryMenu', 'content')
    }

    if (keys['t']) {
        if (!states.containers.mainMenuOpen) {
            toggleMenu('mainMenu', 'container');
        } else if (states.content.marketMenu === true) {
            toggleMenu('mainMenu', 'container');
        }

        toggleMenu('marketMenu', 'content')
    }

    if (keys['r']) {
        if (!states.containers.mainMenuOpen) {
            toggleMenu('mainMenu', 'container');
        } else if (states.content.upgradesMenu === true) {
            toggleMenu('mainMenu', 'container');
        }

        toggleMenu('upgradesMenu', 'content')
    }
}

function addKeyListeners() {
    window.addEventListener("keydown", e => handleKeys(e, true));
    window.addEventListener("keyup", e => handleKeys(e, false));
}