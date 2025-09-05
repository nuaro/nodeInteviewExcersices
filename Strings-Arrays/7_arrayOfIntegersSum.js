// Solution 1: Using Hash Map - O(n) time complexity
function findPairsHashMap(numbers, targetSum) {
    const pairs = [];
    const seen = new Map();

    for (const num of numbers) {
        const complement = targetSum - num;

        if (seen.has(complement)) {
            pairs.push([complement, num]);
        }

        seen.set(num, true);
    }

    return pairs;
}

function findPairsHashMap2(numbers, targetSum)
{
    const pairs = [];

    for (let i = 0; i < numbers.length; i++)
    {
        for (let j = i + 1; j < numbers.length; j++)
        {
            if (numbers[i] + numbers[j] === targetSum)
            {
                pairs.push([numbers[i], numbers[j]]);
            }
        }
    }
    return pairs;
}

// Solution 2: Using Two Pointers - O(n log n) time complexity
function findPairsTwoPointers(numbers, targetSum) {
    const pairs = [];
    const sortedNumbers = [...numbers].sort((a, b) => a - b);

    let left = 0;
    let right = sortedNumbers.length - 1;

    while (left < right) {
        const currentSum = sortedNumbers[left] + sortedNumbers[right];

        if (currentSum === targetSum) {
            pairs.push([sortedNumbers[left], sortedNumbers[right]]);
            left++;
            right--;
        } else if (currentSum < targetSum) {
            left++;
        } else {
            right--;
        }
    }

    return pairs;
}

// Function to test and compare both approaches
function testPairFinding() {
    const testCases = [
        {
            numbers: [1, 4, 2, 3, 5, 8, 9, 6, 7],
            targetSum: 10,
            description: "Multiple pairs summing to 10"
        },
        {
            numbers: [1, 2, 3, 4, 5],
            targetSum: 7,
            description: "Few pairs summing to 7"
        },
        {
            numbers: [1, 1, 2, 2, 3, 3],
            targetSum: 4,
            description: "Array with duplicates"
        },
        {
            numbers: [-2, -1, 0, 1, 2],
            targetSum: 0,
            description: "Array with negative numbers"
        },
        {
            numbers: [1, 2, 3],
            targetSum: 10,
            description: "No pairs sum to target"
        }
    ];

    testCases.forEach(({ numbers, targetSum, description }) => {
        console.log(`\nTest Case: ${description}`);
        console.log(`Array: [${numbers.join(', ')}]`);
        console.log(`Target Sum: ${targetSum}`);

        console.log('\nHash Map Solution:');
        const hashMapPairs = findPairsHashMap(numbers, targetSum);
        console.log(formatPairs(hashMapPairs));

        console.log('\nTwo Pointers Solution:');
        const twoPointersPairs = findPairsTwoPointers(numbers, targetSum);
        console.log(formatPairs(twoPointersPairs));
    });
}

// Helper function to format pairs for output
function formatPairs(pairs) {
    if (pairs.length === 0) {
        return "No pairs found";
    }
    return pairs.map(pair => `(${pair[0]}, ${pair[1]})`).join(', ');
}

// Run the tests
testPairFinding();

// Example usage with custom input
const numbers = [1, 4, 2, 3, 5, 8, 9, 6, 7];
const targetSum = 10;

console.log('\nCustom Test:');
console.log(`Finding pairs that sum to ${targetSum} in [${numbers.join(', ')}]`);
console.log('Result:', formatPairs(findPairsHashMap(numbers, targetSum)));

console.log('\nCustom Test: 2');
console.log(`Finding pairs that sum to ${targetSum} in [${numbers.join(', ')}]`);
console.log('Result:', formatPairs(findPairsHashMap2(numbers, targetSum)));