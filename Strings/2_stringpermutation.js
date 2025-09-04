//check if given two string is a permutation
function IsPermutation(str1, str2)
{
    let noSpacestring1 = str1.replace(/\s/g, '');
    let noSpacestring2 = str2.replace(/\s/g, '');
    return noSpacestring1.split('').sort().join('') === noSpacestring2.split('').sort().join('');
}

var isperm = IsPermutation("abc", "bca");
console.log(isperm);