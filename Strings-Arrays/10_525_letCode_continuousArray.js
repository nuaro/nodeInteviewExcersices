//Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.
function findMaxLength(nums)
{
    const diffMap = new Map();
    let onesCount = 0;
    let ceroCount = 0;
    let maxLength = 0;
    let startIndex = 0;
    let endIndex = 0;

    //addd the important diff 0 with value -1
    diffMap.set(0, -1);
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 1) {
            onesCount++;
        } else {
            ceroCount++;
        }
        if (diffMap.has(onesCount - ceroCount)) {
            const length = i - diffMap.get(onesCount - ceroCount);
            if (length > maxLength) {
                maxLength = length;
                startIndex = diffMap.get(onesCount - ceroCount) + 1;
                endIndex = i;
            }
        }
        else {
            diffMap.set(onesCount - ceroCount, i);
        }
    }
    return maxLength;
}


console.log(findMaxLength([0,1]));
console.log(findMaxLength([0,1,1,1,1,0,0,0,0]));