function urlfy(str)
{
    return str.replace(/\s/g, '%20').toLowerCase();
}

var test1 = urlfy("Hello World");
console.log(test1);