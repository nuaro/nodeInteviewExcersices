//binary search
// sorted array or monotonic condition
function binarySearch(array, value)
{
    let left =0 ;
    let right = array.length -1;
    while(left <= right)
    {
        let mid = Math.floor((left + right)/2);
        if (array[mid] === value)
        {
            return mid;
        }
        else if (array[mid] < value)
        {
            left = mid + 1;
        }
        else
        {
            right = mid - 1;
        }
    }
    return -1;
}

function binarySearchWithValidator(array, value, validator)
{
    let left =0 ;
    let right = array.length -1;
    let first_true_index = -1;
    while(left <= right)
    {
        let mid = Math.floor((left + right)/2);
        if (validator(mid))
        {
            first_true_index = mid;
            right = mid - 1;
        }
        else
        {
            left = mid + 1;
        }
    }
    return first_true_index;
}