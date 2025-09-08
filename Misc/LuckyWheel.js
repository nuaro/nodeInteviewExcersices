const RandomSeed = require('../CodeUtils/RandomSeed.js');

class LuckyWheel {
    constructor(seed) {
        this.randomSeed = new RandomSeed(seed);

    }
    // Select an item based on weights
    spin(items, weights) {
        if (!items || !weights || items.length !== weights.length) {
            throw new Error('Items and weights arrays must exist and have the same length');
        }

        // Calculate total weight
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

        // Generate random number between 0 and total weight
        let random = this.randomSeed.random() * totalWeight;

        // Find the selected item
        for (let i = 0; i < items.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                return items[i];
            }
        }

        // Fallback to last item (should rarely happen, only due to floating-point precision)
        return items[items.length - 1];
    }
}


// Create a new lucky wheel with a seed
const wheel = new LuckyWheel(12345);

// Example items and their weights
const items = ['Prize 1', 'Prize 2', 'Prize 3', 'Prize 4'];
const weights = [10, 20, 5, 1];  // Prize 2 is most likely to be selected

// Spin the wheel
const result = wheel.spin(items, weights);
console.log('Selected item:', result);

// You can spin multiple times with the same seed for reproducible results

for (let i = 0; i < 20; i++) {
    console.log('Spin', i + 1, ':', wheel.spin(items, weights));
}
