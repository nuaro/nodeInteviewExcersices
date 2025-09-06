//Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.
//
// A subarray is a contiguous non-empty sequence of elements within an array.

function subarraySum(arr, k)
{
    let count = 0;
    for (let i = 0; i < arr.length; i++)
    {
        for (let j = i; j < arr.length; j++) {
            if (arr.slice(i, j + 1).reduce((a, b) => a + b) === k)
            {
                count++;
            }
        }
    }
    return count;
}

function subarraySum2(arr, k)
{
    // Map to store the frequency of cumulative sums
    const sumFreq = new Map();

    // Initialize variables
    let count = 0;
    let currentSum = 0;

    // Initialize map with sum 0 occurring once
    sumFreq.set(0, 1);

    for (const num of arr) {
        // Add current number to running sum
        currentSum += num;

        // If (currentSum - k) exists in map, add its frequency to count
        const complement = currentSum - k;
        if (sumFreq.has(complement)) {
            count += sumFreq.get(complement);
        }

        // Update frequency of current sum
        sumFreq.set(currentSum, (sumFreq.get(currentSum) || 0) + 1);
    }
    return count;
}

function sumFreqMap(arrayInt)
{
    const sumFreq = new Map();
    let currentSum = 0;
    for (const num of arrayInt)
    {
        currentSum += num;
        sumFreq.set(currentSum, (sumFreq.get(currentSum) || 0) + 1);
    }
    return sumFreq;
}

function sumFrequency3(arrayInt, k)
{
    let count = 0
    const sumFreq = sumFreqMap(arrayInt);
    let sum = 0;
    sumFreq.set(0, 1);
    for (const value of arrayInt)
    {   sum += value;
        //console.log(sum - k);
        if (sumFreq.has(sum - k))
        {
            count += sumFreq.get(sum-k);
        }
    }
    return count;
}


// var test = subarraySum([1, 1, 1], 2); //n^2
// console.log(test);
// var test1_1 = subarraySum2([1, 1, 1], 2);
// console.log(test1_1);
// var test2 = subarraySum([3,4,7,-2,2,1,4,2] , 7); //n why ???
// console.log(test2);

// var test2_1 = subarraySum2([3,4,7,-2,2,1,4,2], 7);
// console.log(test2_1);

var test2_2 = sumFrequency3([3,4,7,-2,2,1,4,2], 7);
console.log(test2_2);