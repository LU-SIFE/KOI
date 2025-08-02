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

    items: {
        oiled: false,
        cursed: true,
        void: true,
    },

    settings: {
        alerts: true,
        sounds: true,
        ambience: true,
        quotes: true
    },

    cosmetics: {
        outline: false,
        glow: false,
    },

    ponds: {
        currentPond: 'base',
        list: ['base', 'frozen', 'fireproof', 'twilight', 'ethereal', 'crystalline', 'chromatic'],
        unlockedPonds: ['base']
    },
}