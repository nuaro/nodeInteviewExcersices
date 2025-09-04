//check if given two string it have at one edit, could be insert , remove, or swap.
function checkString(s1, s2)
{
    if (s1.length >= s2.length+2 || s1.length <= s2.length-2) {
        return false;
    }
    //check for permut or equeal
    if (s2.length == s1.length) {
        let count = 0;
        for (let i = 0; i < s2.length; i++) {
            if (s1.indexOf(s2[i]) === -1) {
                count++;
            }
        }
        if (count > 1)
        {
            return false;
        }
    }
    if (s2.length > s1.length) {
        for (let i = 0; i < s1.length; i++) {
            if (s2.indexOf(s1[i]) === -1) {
                return false;
            }
        }
    }
    if (s2.length < s1.length)
    {
        for (let i = 0; i < s2.length; i++)
        {
            if (s1.indexOf(s2[i]) === -1)
            {
                return false;
            }
        }
    }
    return true;
}

function checkString2(s1, s2)
{
    if (s1.length >= s2.length+2 || s1.length <= s2.length-2) {
        return false;
    }
    //check for permut or equeal
    let count = 0;
    let length = s2.length > s1.length ? s2.length : s1.length;
    for (let i = 0; i < length; i++) {
        if (s1.indexOf(s2[i]) === -1) {
            count++;
        }
    }
    if (count > 1)
    {
        return false;
    }
    return true;
}

var test = checkString("plea", "pake");
console.log(test);
var test2 = checkString2("pale", "bake");
console.log(test2);