export default class NameGenerator {
    constructor() {
        this.firstNames = [
            "Swiftly",
            "Slitheringly",
            "Hissingly",
            "Coiledly",
            "Forkedly",
            "Sneakily",
            "Silently",
            "Smoothly",
            "Rapidly",
            "Slinkily",
            "Twistingly",
            "Windingly",
            "Undulatingly",
            "Serpentinely",
            "Viciously",
            "Venomously",
            "Dangerously",
            "Elusively",
            "Cryptically",
            "Evasively",
			"Slinking",
			"Constricting",
			"Venomous",
			"Scaley",
			"Slithery",
			"Reptilian",
			"Coiling",
			"Hissing",
			"Fanged",
			"Serpentine",
			"Viperine",
			"Rattling",
			"Cold",
			"Pythonesque",
			"Slithering",
			"Snakey",
			"Fork",
			"Creeping",
			"Crawling",
			"Sidewinding",
        ];

        this.lastNames = [
            "Pythonson",
			"Cobra-Craft",
			"Python-Pike",
			"Viper-Vogue",
			"Boa-Banner",
			"Anaconda-Atlas",
			"Mamba-Majesty",
			"Garter-Gala",
			"Rattler-Rune",
			"Adder-Adage",
			"Serpent-Scribe",
			"Cottonmouth-Canticle",
			"Copperhead-Crafter",
			"Kingcobra-Kingpin",
			"Racer-Ringleader",
			"Asp-Author",
			"Coral-Courier",
			"Vine-Virtuoso",
			"Krait-Knight",
			"Python-Paragon",
			"Slither-Sage",
            "Boa-Constrictorberg",
            "Cobra-Coyle",
            "Viper-Vance",
            "Adder-Anderson",
            "Rattler-Roberts",
            "Mamba-Magnus",
            "Garter-Green",
            "Asp-Ashton",
            "Serpent-Snyder",
            "Anacond-Allen",
            "Copperhead-Cooper",
            "Cottonmouth-Carter",
            "Hissler",
            "Slitherton",
            "Fang-Ferguson",
            "Venom-Vinson",
            "Curl-Carson",
            "Scales-Simpson",
            "Pitviper-Pitt",
        ];

        this.usedNames = [];
    }

    nameExists(name) {
        return this.usedNames.includes(name);
    }

    generateName() {
        const maxNames = this.firstNames.length * this.lastNames.length;

        if (this.usedNames.length >= maxNames) {
            throw new Error('All possible name combinations have been generated');
        }
        
        let name;
        do {
            let firstName = this.firstNames[Math.floor(Math.random() * this.firstNames.length)];
            let lastName = this.lastNames[Math.floor(Math.random() * this.lastNames.length)];
            name = firstName + " " + lastName;
        } while (this.nameExists(name));
        
        this.usedNames.push(name);
        return name;
    }
}