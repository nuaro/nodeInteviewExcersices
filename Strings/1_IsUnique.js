//check if a string has only unique characters
function IsUnique(stringTocheck)
{
    let charMap = new Map();
    for (const char of stringTocheck)
    {
        if (!charMap.has(char))
        {
            charMap.set(char, true);
        }
        else
        {
            return false;
        }
    }
    return true;
}

var isUniqueString = IsUnique("is unoqe");
console.log(isUniqueString);