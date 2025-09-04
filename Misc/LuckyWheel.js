class LuckyWheel {
    constructor(seed) {
        this.seed = seed || Date.now();
        this.currentSeed = this.seed;

    }

    // Simple random number generator using seed
    //1. **Why These Numbers?**
    //Linear Congruential Generator (LCG),
    // - `X(n+1) = (a * X(n) + c) mod m`
    //     - These specific constants are from the "Numerical Recipes" implementation
    //     - `1664525` and `1013904223` are chosen because they produce good statistical properties
    //     - `4294967296` (2^32) is used as the modulus to keep numbers within a reasonable range
    random() {
        // Step 1: Multiply the current seed by the multiplier (1664525)
        const multiplied = 1664525 * this.currentSeed;

        // Step 2: Add the increment (1013904223)
        const incremented = multiplied + 1013904223;

        // Step 3: Take the modulus to keep the number within bounds
        this.currentSeed = incremented % 4294967296;

        // Step 4: Convert to a number between 0 and 1
        return this.currentSeed / 4294967296;
    }


    // Select an item based on weights
    spin(items, weights) {
        if (!items || !weights || items.length !== weights.length) {
            throw new Error('Items and weights arrays must exist and have the same length');
        }

        // Calculate total weight
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

        // Generate random number between 0 and total weight
        let random = this.random() * totalWeight;

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

    reset() {
        this.currentSeed = this.seed;
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
