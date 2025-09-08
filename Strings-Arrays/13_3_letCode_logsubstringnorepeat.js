const { slidingWindow_variableSize } = require('../CodeUtils/sliding_window.js');


function validate(str) {
    const charSet = new Set();
    for (const char of str) {
        if (charSet.has(char)) {
            return false; // Found a repeating character
        }
        charSet.add(char);
    }
    return true;
}

function checkResp(resp,window)
{
    if (resp === undefined)
    {
        return window.slice();
    }
    if (resp.length > window.length)
    {
        return resp;
    }
    return window.slice();
}

console.log(slidingWindow_variableSize('abcabcbb', checkResp, validate).join(""));

console.log(slidingWindow_variableSize('bbbb', checkResp, validate).join(""));

console.log(slidingWindow_variableSize('pwwkew', checkResp, validate).join(""));


