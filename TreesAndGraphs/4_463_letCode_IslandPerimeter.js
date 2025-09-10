//You are given row x col grid representing a map where grid[i][j] = 1 represents land and grid[i][j] = 0 represents water.
//
// Grid cells are connected horizontally/vertically (not diagonally). The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).
//
// The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

//input
//[
// [0,1,0,0],
// [1,1,1,0],
// [0,1,0,0],
// [1,1,0,0]
//]
//output
//16

function GetNeigbors(row, col, grid)
{
    const neighbors = [];
    let perimeter = 0;
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // up, down, left, right
    for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow < 0 || newRow >= rows ||
            newCol < 0 || newCol >= cols ||
            grid[newRow][newCol] === 0) {
            perimeter++;
        }
        else  {
            neighbors.push([newRow, newCol]);
        }
    }

    return [neighbors, perimeter];
}

function getPerimeter(rowstart, colstart, matrix)
{
    const land =1;
    const queue = [];
    const partsOfIsland = new Set();
    let totalperimeter = 0;
    queue.push([rowstart, colstart]);
    partsOfIsland.add(`${rowstart}${colstart}`);

    while (queue.length > 0)
    {
        let [row, col] = queue.shift();
        const [neigbours, perimeter] = GetNeigbors(row, col, matrix);
        totalperimeter += perimeter;
        for (const neighbor of neigbours)
        {
            let [r,c] = neighbor;
            if (matrix[r][c] === land && !partsOfIsland.has(`${r}${c}`))
            {
                partsOfIsland.add(`${r}${c}`);
                queue.push(neighbor);

            }
        }
    }

    return totalperimeter;
}

function islandPerimeter(grid)
{
    let perimeter = 0;
    for (let i = 0; i < grid.length; i++)
    {
        for (let j = 0; j < grid[0].length; j++)
        {
            if (grid[i][j] === 1)
            {
                perimeter = getPerimeter(i, j, grid);
                return perimeter;
            }
        }
    }
    return perimeter;
}

function islandPerimeter2(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const visited = new Set();
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // up, down, left, right

    // Find first land cell
    let startRow = -1, startCol = -1;
    for (let i = 0; i < rows && startRow === -1; i++) {
        for (let j = 0; j < cols && startCol === -1; j++) {
            if (grid[i][j] === 1) {
                startRow = i;
                startCol = j;
            }
        }
    }

    if (startRow === -1) return 0; // No land found

    // BFS traversal
    const queue = [[startRow, startCol]];
    visited.add(`${startRow},${startCol}`);
    let totalPerimeter = 0;

    while (queue.length > 0) {
        const [row, col] = queue.shift();
        let cellPerimeter = 0;

        // Check all 4 directions
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            // Count exposed edges (water or boundary)
            if (newRow < 0 || newRow >= rows ||
                newCol < 0 || newCol >= cols ||
                grid[newRow][newCol] === 0) {
                cellPerimeter++;
            }
            // Add unvisited land to queue
            else if (grid[newRow][newCol] === 1 &&
                !visited.has(`${newRow},${newCol}`)) {
                visited.add(`${newRow},${newCol}`);
                queue.push([newRow, newCol]);
            }
        }

        totalPerimeter += cellPerimeter;
    }

    return totalPerimeter;
}

function islandPerimeterDFS(grid)
{
    const rows = grid.length;
    const cols = grid[0].length;
    const visitedelements = new Set();

    function dfstest(row, col)
    {
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === 0) {
            return 1;
        }

        // If already visited, don't count
        if (visitedelements.has(`${row},${col}`)) {
            return 0;
        }


        visitedelements.add(`${row},${col}`);
        let islandperimeter = 0;
        for (const [dr, dc] of directions) {
            islandperimeter += dfstest(row + dr, col + dc);
        }
        return islandperimeter;

    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 1) {
                let value = dfstest(i, j);

                return value;
            }
        }
    }
    return 0;

}


function islandPerimeter4(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const visited = new Set();

    function dfs(row, col) {
        // If out of bounds or water, count as perimeter
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === 0) {
            return 1;
        }

        // If already visited, don't count
        if (visited.has(`${row},${col}`)) {
            return 0;
        }

        // Mark as visited
        visited.add(`${row},${col}`);

        // Check all 4 directions
        return dfs(row - 1, col) + // up
            dfs(row + 1, col) + // down
            dfs(row, col - 1) + // left
            dfs(row, col + 1);  // right
    }

    // Find the first land cell and start DFS
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 1) {
                return dfs(i, j);
            }
        }
    }

    return 0;
}

const matrix =  [
    [0,0,1,1,1],
    [0,0,1,0,1],
    [0,0,1,1,1],
    [0,0,0,0,0],
    [0,0,0,0,0]
];
// const matrix =  [
//     [0,1,0,0,0],
//     [1,1,1,0,0],
//     [0,1,1,0,0],
//     [1,1,1,1,0],
//     [0,0,1,0,0]
// ];
// test matric 2
const matrix2 =
    [
        [0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,1,0,1,1,0],
        [0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,0,0,1,0],
        [0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,1,0],
        [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
        [1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
        [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
        [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
        [0,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
        [0,0,1,1,1,0,1,1,1,1,1,1,0,0,1,1,0,0,0,0],
        [0,0,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
        [0,0,1,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0]];

const finalPerimeter = islandPerimeterDFS(matrix2);
console.log(finalPerimeter);