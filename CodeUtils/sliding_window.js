function slidingWindow_fixedSize(arrayToCheck, sizeK, operator)
{
    let resp;
    let window = arrayToCheck.slice(0, sizeK);
    resp = operator(resp, window);
    for (let i = sizeK; i < arrayToCheck.length; i++)
    {
        window.shift();
        window.push(arrayToCheck[i]);
        resp = operator(resp, window);
    }
    return resp;
}

function slidingWindow_variableSize(arrayToCheck, operator, validator)
{
    let resp;
    let window = [];
    for (let i = 0; i < arrayToCheck.length; i++)
    {
        window.push(arrayToCheck[i]);
        while (!validator(window))
        {
            window.shift();
        }
        resp = operator(resp, window);
    }
    return resp;
}

module.exports = { slidingWindow_fixedSize, slidingWindow_variableSize };