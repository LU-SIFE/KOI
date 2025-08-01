const states = {
    containers: {
        mainMenuOpen: false,
        blurMenuOpen: false,
        pondMenuOpen: false,
        tutorialMenuOpen: false,
        loreMenuOpen: false,
        cooldowns: {}
    },

    content: {
        inventoryMenu: false,
        settingsMenu: false,
        marketMenu: false,
        upgradesMenu: false,
        compendiumMenu: false,
    },

    ui: {
        wideMenus: ["inventoryMenu", "compendiumMenu"]
    },

    extras: {
        startState: false,
        alertTimeout: null,
        inspectTimeout: null,
        quoteInterval: null,
        loreIndex: 0
    },

    settings: {
        alerts: true,
        sounds: true,
        ambience: true,
        quotes: true
    },

    ponds: {
        currentPond: 'base',
        list: ['base', 'frozen', 'fireproof', 'twilight', 'ethereal'],
        unlockedPonds: ['base']
    },
}