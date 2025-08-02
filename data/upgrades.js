const upgrades = {
    types: {
        speed: {
            available: ['base', 'frozen', 'fireproof', 'twilight', 'ethereal', 'crystalline', 'chromatic'],
            prices: [20, 40, 60, 80, 100, 120, 140, 160, 180],
            baseValue: 0,
            max: 9
        },
        ripples: {
            available: ['base', 'frozen', 'fireproof', 'twilight', 'ethereal', 'crystalline', 'chromatic'],
            prices: [80, 130, 180, 230, 280, 330, 380, 430, 480, 530],
            baseValue: 1,
            max: 10
        },
        autofishers: {
            available: ['base', 'frozen', 'fireproof', 'twilight', 'ethereal', 'crystalline', 'chromatic'],
            prices: [250, 450, 650, 850, 1050, 1250, 1450],
            baseValue: 0,
            max: 7
        },

        nextPond: {
            available: ['base', 'frozen', 'fireproof', 'twilight', 'ethereal', 'crystalline', 'chromatic'],
            prices: [5000, 6000, 7000, 8000, 9000, 12000, 17000],
            baseValue: 0,
            max: 7,
            labels: {base: "Beginner's", frozen: 'Frozen', fireproof: 'Lava', twilight: 'Twilight', ethereal: 'Ghost', crystalline: 'Crystal', chromatic: 'Chroma'}
        }
    },
};

let upgradeStats = {
    base: {
        values: {
            speed: 0,
            ripples: 1,
            autofishers: 0
        },
        priceMult: 1
    },

    frozen: {
        values: {
            speed: 0,
            ripples: 1,
            autofishers: 0
        },
        priceMult: 1.5
    },

    fireproof: {
        values: {
            speed: 0,
            ripples: 1,
            autofishers: 0
        },
        priceMult: 2.5
    },

    twilight: {
        values: {
            speed: 0,
            ripples: 1,
            autofishers: 0
        },
        priceMult: 4
    },

    ethereal: {
        values: {
            speed: 0,
            ripples: 1,
            autofishers: 0
        },
        priceMult: 6
    },

    crystalline: {
        values: {
            speed: 0,
            ripples: 1,
            autofishers: 0
        },
        priceMult: 9
    },

    chromatic: {
        values: {
            speed: 0,
            ripples: 1,
            autofishers: 0
        },
        priceMult: 15
    }
};