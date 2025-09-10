//You are given an image represented by an m x n grid of integers image, where image[i][j] represents the pixel value of the image. You are also given three integers sr, sc, and color. Your task is to perform a flood fill on the image starting from the pixel image[sr][sc].
//
// To perform a flood fill:
//
// Begin with the starting pixel and change its color to color.
// Perform the same process for each pixel that is directly adjacent (pixels that share a side with the original pixel, either horizontally or vertically) and shares the same color as the starting pixel.
// Keep repeating this process by checking neighboring pixels of the updated pixels and modifying their color if it matches the original color of the starting pixel.
// The process stops when there are no more adjacent pixels of the original color to update.
// Return the modified image after performing the flood fill.

function getNeighborsSameColor(row, col, image, color)
{
    const neighbors = [];
    if (row > 0 && image[row - 1][col] === color)
    {
        neighbors.push([row - 1, col]);
    }
    if (row < image.length - 1 && image[row + 1][col] === color)
    {
        neighbors.push([row + 1, col]);
    }
    if (col > 0 && image[row][col - 1] === color)
    {
        neighbors.push([row, col - 1]);
    }
    if (col < image[0].length - 1 && image[row][col + 1] === color)
    {
        neighbors.push([row, col + 1]);
    }
    return neighbors;
}

function bfs (rowstart, colstart, image, replaceColor)
{
    const queue = [];
    queue.push([rowstart, colstart]);
    const visited = new Set();
    color = image[rowstart][colstart];
    // if (color === replaceColor)
    //     return;
    image[rowstart][colstart] = replaceColor;
    visited.add(`${rowstart}${colstart}`);
    while (queue.length > 0)
    {
        let [row, col] = queue.shift();
        let neigbours = getNeighborsSameColor(row, col, image, color);
        for (const neighbor of neigbours)
        {
            let [r,c] = neighbor;
            if (visited.has(`${r}${c}`))
                continue;
            image[r][c] = replaceColor;
            queue.push(neighbor);
            visited.add(`${r}${c}`);
        }
    }
}

const image = [[1,1,1],[1,1,0],[1,0,1]];
const replaceColor = 2;
bfs(0,0,image,replaceColor);
console.log(image);
// const image = [[0,0,0],[0,0,0]];
// const replaceColor = 0;
// bfs(0,0,image,replaceColor);
// console.log(image);