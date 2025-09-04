//create a method that perform a basic string compression example aaccc should return
// a2c3 if the compresed string is not smaller return original
function stringCompression(stringTocheck)
{
    var compresedString = "";
    let prevchar = "";
    let count = 0;
    for (let i = 0; i < stringTocheck.length; i++) {
    {
        var char = stringTocheck[i];
    }
        if (prevchar === "")
        {
            prevchar = char;
        }
        if (char === prevchar)
        {
            count ++;
        }
        if (char !== prevchar || i === stringTocheck.length - 1)
        {
            compresedString += prevchar + count;
            prevchar = char;
            count = 1;
        }
    }
    console.log(process.memoryUsage());
    if (compresedString.length < stringTocheck.length)
        return compresedString;
    return stringTocheck;
}

function stringCompressionMemefficient(stringTocheck)
{
    var stringParts = [];
    var compresedString = "";
    let prevchar = "";
    let count = 0;
    for (let i = 0; i < stringTocheck.length; i++) {
        {
            var char = stringTocheck[i];
        }
        if (prevchar === "")
        {
            prevchar = char;
        }
        if (char === prevchar)
        {
            count ++;
        }
        if (char !== prevchar || i === stringTocheck.length - 1)
        {
            stringParts.push(prevchar);
            stringParts.push(count);
            prevchar = char;
            count = 1;
        }
    }
    compresedString = stringParts.join("");
    console.log(process.memoryUsage());
    if (compresedString.length < stringTocheck.length)
        return compresedString;
    return stringTocheck;
}


var test = stringCompression("aabcccc");
console.log(test);
var test2 = stringCompressionMemefficient("aabcccc");
console.log(test2);
