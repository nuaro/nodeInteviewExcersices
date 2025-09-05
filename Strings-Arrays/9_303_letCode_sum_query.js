function SumArray(arrayInt, left , right)
{
    return arrayInt.slice(left, right+1).reduce((a, b) => a + b); //javascript simple method

}

function SumArray2(arrayInt, left , right)
{
    var prefixSum = GetPrefixSum(arrayInt);
    return prefixSum[right] - prefixSum[left-1];


}

function GetPrefixSum(arrayInt)
{
    var prefixSum = [];
    var sum = 0;
    for (let i = 0; i < arrayInt.length; i++)
    {
        sum += arrayInt[i];
        prefixSum.push(sum);
    }
    return prefixSum;
}


test = SumArray([1,2,3,4,5], 1, 3);
console.log(test);
test2 = SumArray([1,2,3,4,5], 1, 3);
console.log(test2);