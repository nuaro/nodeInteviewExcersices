function columnToTitle(columnNumber) {
    let columnTitle = '';

    while (columnNumber > 0) {
        columnNumber--; // Decrease columnNumber by 1 to align with 0-index
        const charCode = (columnNumber % 26) + 65; // Get the ASCII code for A-Z
        columnTitle = `${String.fromCharCode(charCode)}${columnTitle}`;
        columnNumber = Math.floor(columnNumber / 26); // Move to the next digit
    }

    return columnTitle;
}

var columnTitle = columnToTitle(1000);
console.log(columnTitle);