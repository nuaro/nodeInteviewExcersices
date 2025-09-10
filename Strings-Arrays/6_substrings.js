function findLargestEqualSubstring(str) {
    // Map to store the first occurrence of each difference
    const diffMap = new Map();

    // Initialize variables to track counts
    let starCount = 0;
    let poundCount = 0;
    let maxLength = 0;
    let startIndex = 0;
    let endIndex = -1;

    // Add initial difference of 0 at position -1
    diffMap.set(0, -1);

    // Iterate through the string once
    for (let i = 0; i < str.length; i++) {
        // Update counts
        if (str[i] === '*') {
            starCount++;
        } else if (str[i] === '#') {
            poundCount++;
        }

        // Calculate current difference
        const diff = starCount - poundCount;

        // If we've seen this difference before
        if (diffMap.has(diff)) {
            const length = i - diffMap.get(diff);
            if (length > maxLength) {
                console.log(`${diff} => ${diffMap.get(diff)}`);
                maxLength = length;
                startIndex = diffMap.get(diff) + 1;
                endIndex = i;
            }
        } else {
            // Store first occurrence of this difference
            diffMap.set(diff, i);
        }
    }
    console.log(diffMap);
    return str.slice(startIndex, endIndex + 1);
}

function findLargestConsecutiveEqualSubstring(str) {
    let maxLength = 0;
    let startIndex = 0;
    let endIndex = -1;

    // Try each possible starting position
    for (let i = 0; i < str.length; i++) {
        let starCount = 0;
        let poundCount = 0;

        // Check consecutive characters starting from position i
        for (let j = i; j < str.length; j++) {
            // Update counts
            if (str[j] === '*') {
                starCount++;
            } else if (str[j] === '#') {
                poundCount++;
            }

            // If we found equal counts and length is greater than current max
            if (starCount === poundCount && (j - i + 1) > maxLength) {
                maxLength = j - i + 1;
                startIndex = i;
                endIndex = j;
            }
        }
    }

    return maxLength > 0 ? str.slice(startIndex, endIndex + 1) : ''
}



// Test cases
const testCases = [
    '*#*#',           // Should return the whole string
    '##***#******',         // Should return '##***#'
    '*###**',         // Should return '*###**'
    '***###***###',   // Should return '***###***###'
    '*#',             // Should return '*#'
    '***' ,            // Should return ''
    '*#####***'
];

// testCases.forEach(test => {
//     const result = findLargestEqualSubstring(test);
//     console.log(`Input: ${test}`);
//     console.log(`Result: ${JSON.stringify(result, null, 2)}\n`);
// });

// testCases.forEach(test => {
//     const result = findLargestConsecutiveEqualSubstring(test);
//     console.log(`Input2: ${test}`);
//     console.log(`Result2: ${JSON.stringify(result, null, 2)}\n`);
// });

console.log(findLargestEqualSubstring('*####**'));
//first past i =0
// start = 1
// pound = 0
// diff = 1

