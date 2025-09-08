const { slidingWindow_fixedSize } = require('../CodeUtils/sliding_window.js');


const array = [1, 4, 2, 9, 5, 10, 13, 3, 8];

function findMaxSum(currentMax, window) {
    const windowSum = window.reduce((sum, num) => sum + num, 0);
    return currentMax === undefined ? windowSum : Math.max(currentMax, windowSum);
}

function TreeSumm(arrayResp, window)
{
    window.sort();
    const windowSum = window.reduce((sum, num) => sum + num, 0);
    if (windowSum === 0)
    {
        if( arrayResp === undefined)
        {
            return [window.slice()];
        }
        for(array of arrayResp)
        {
            if ( array.every((value, index) => value === window[index]))
            {
                return arrayResp;
            }
            arrayResp.push(window.slice());

        }
    }
    return arrayResp === undefined ? []:arrayResp;

}
const array2 = [-1,0,1,2,-1,-4];
// const result = slidingWindow_fixedSize(array, 3, findMaxSum);
// console.log(result);
//only works for subarrays
const result2 = slidingWindow_fixedSize(array2, 3,TreeSumm);
console.log(result2);

function threeSum(nums) {
    const result = [];
    const n = nums.length;

    // Early return for arrays too small
    if (n < 3) return result;

    // Sort the array to enable two-pointer technique and handle duplicates
    nums.sort((a, b) => a - b);
    console.log(nums);
    for (let i = 0; i < n - 2; i++) {
        // Skip duplicates for the first element
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        // Early termination: if smallest element > 0, no solution possible
        if (nums[i] > 0) break;

        let left = i + 1;
        let right = n - 1;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                // Found a valid triplet
                result.push([nums[i], nums[left], nums[right]]);

                // Skip duplicates for left pointer
                while (left < right && nums[left] === nums[left + 1]) left++;
                // Skip duplicates for right pointer
                while (left < right && nums[right] === nums[right - 1]) right--;

                left++;
                right--;

            } else if (sum < 0) {
                left++; // Need larger sum
            } else {
                right--; // Need smaller sum
            }
        }
    }

    return result;
}

function threeSumNoSort(nums) {
    const result = [];
    const n = nums.length;
    const seeIt = new Map();
    for (let i = 0; i < n - 2; i++) {

    }
}

console.log(threeSum(array2));


