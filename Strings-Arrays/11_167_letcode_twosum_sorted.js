function twoSum(nums, target)
{
    let j = nums.length - 1;
    let i =0;
    while (i < j) {
        if (nums[i] + nums[j] === target) {
            return [i, j];
        }
        if (nums[i] + nums[j] > target) {
            j--;
        }
        if (nums[i] + nums[j] < target) {
            i++;
        }
    }
    return [0,0];
}

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([1,2, 3, 4, 6], 6));