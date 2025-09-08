class RandomSeed {
    constructor(seed) {
        this.seed = seed || Date.now();
        this.currentSeed = this.seed;
    }
    random() {
        //const value got from https://en.wikipedia.org/wiki/Linear_congruential_generator
        // they are values with high probality varianse //parameters from Knuth and H. W. Lewis
        let multiplier = 1664525;//9301;
        let increment = 1013904223;//49297;
        let modulus = 4294967296;//233280;
        this.currentSeed = (this.currentSeed * multiplier + increment) % modulus;
        return this.currentSeed / modulus;
    }

    reset() {
        this.currentSeed = this.seed;
    }
}

module.exports = RandomSeed;