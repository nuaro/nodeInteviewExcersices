// remove all island not conected to a border given a matrix
// explample
// [
//   [1,1,0,0,0],
//   [1,1,0,0,0],
//   [0,0,1,0,0],
//   [0,0,0,1,1],
//   [0,0,0,0,1]
// ]
// output
// [
//   [1,1,0,0,0],
//   [1,1,0,0,0],
//   [0,0,0,0,0],
//   [0,0,0,1,1],
//   [0,0,0,0,1]
// exampl 2
// [
//   [1,0,0,0,0,0],
//   [0,1,0,1,1,1],
//   [0,0,1,0,1,0],
//   [1,1,0,0,1,0],
//   [1,0,0,0,0,1],
//   [1,0,0,0,0,1]
// ]
// output
// [
///  [1,0,0,0,0,0],
//   [0,0,0,1,1,1],
//   [0,0,0,0,1,0],
//   [1,1,0,0,0,0],
//   [1,0,0,0,0,1],
//   [1,0,0,0,0,1]

//1.- create a set with the ids {r,c} the ones that are part of a island that touch a border
//2,- then iterate trout the matrix and check all the 1 that are not on the set and set it to 0

function getNeighbors(row, col, image)
{
    const neighbors = [];
    if (row > 0) neighbors.push([row - 1, col]);
    if (row < image.length - 1) neighbors.push([row + 1, col]);
    if (col > 0) neighbors.push([row, col - 1]);
    if (col < image[0].length - 1) neighbors.push([row, col + 1]);
    return neighbors;
}
function bfs (rowstart, colstart, matrix, partsOfIsland)
{
    const land =1;
    const queue = [];
    queue.push([rowstart, colstart]);
    //const partsOfIsland = new Set();
    if (matrix[rowstart][colstart] === land) {
        partsOfIsland.add(`${rowstart}${colstart}`);
    }
    while (queue.length > 0)
    {
        let [row, col] = queue.shift();
        let neigbours = getNeighbors(row, col, matrix);
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

    return partsOfIsland;

}

function dfs (rowstart, colstart, matrix, partsOfIsland)
{
    const land =1;
    if (matrix[rowstart][colstart] === land) {
        partsOfIsland.add(`${rowstart},${colstart}`);
    }

    let neigbours = getNeighbors(rowstart, colstart, matrix);
    for (const neighbor of neigbours)
    {
        let [r,c] = neighbor;
        if (matrix[r][c] === land && !partsOfIsland.has(`${r},${c}`))
        {
            partsOfIsland.add(`${r},${c}`);
            dfs(r, c, matrix, partsOfIsland);

        }
    }
}

const matrix =  [
  [1,1,0,0,0],
  [1,1,0,0,0],
  [1,0,1,0,0],
  [0,0,0,1,1],
  [0,0,0,0,1]
];
const matrix2 =  [
    [1,1,0,0,0],
    [1,1,0,0,0],
    [1,0,1,0,0],
    [0,0,0,1,1],
    [0,0,0,0,1]
];
function IsABorder(row, col, matrix)
{
    if (row === 0 || row === matrix.length - 1 || col === 0 || col === matrix[0].length - 1)
    {
        return true;
    }
    return false;
}
function removeIslands(matrix)
{
    const partsOfIsland = new Set();
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (IsABorder(i, j, matrix) && !partsOfIsland.has(`${i},${j}`))
            {
                bfs(i, j, matrix, partsOfIsland);
            }
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (!partsOfIsland.has(`${i},${j}`))
            {
                matrix[i][j] = 0;
            }
        }
    }
}

function removeIslandsDfs(matrix)
{
    const partsOfIsland = new Set();
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (IsABorder(i, j, matrix) && !partsOfIsland.has(`${i},${j}`))
            {
                dfs(i, j, matrix, partsOfIsland);
            }
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (!partsOfIsland.has(`${i},${j}`))
            {
                matrix[i][j] = 0;
            }
        }
    }
}

removeIslandsDfs(matrix2);
console.log(matrix2);