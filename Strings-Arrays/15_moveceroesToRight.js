function moveZeros(arr)
{
    let left = 0;
    let right = arr.length - 1;
    while (left < right)
    {
        if (arr[left] === 0)
        {
            arr.splice(left, 1);
            arr.push(0);
            right--;
        }
        else
        {
            left++;
        }
    }
    return arr;
}


console.log(moveZeros([0,1,0,3,12]));
console.log(moveZeros([1,0,2,3,12,4]));