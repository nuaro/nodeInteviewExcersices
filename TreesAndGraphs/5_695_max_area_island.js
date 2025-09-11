//You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.
//
// The area of an island is the number of cells with a value 1 in the island.
//
// Return the maximum area of an island in grid. If there is no island, return 0.

//Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
// Output: 6


function maxAreaOfIsland(grid)
{
    let maxArea = 0;
    for (let i = 0; i < grid.length; i++)
    {
        for (let j = 0; j < grid[0].length; j++)
        {
            if (grid[i][j] === 1)
            {
                let area = dfs(grid, i, j);
                if (area > maxArea)
                {
                    maxArea = area;
                }
            }
        }
    }
    return maxArea;
}

function dfs(grid, i, j)
{
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === 0)
    {
        return 0;
    }
    grid[i][j] = 0;
    return 1 + dfs(grid, i + 1, j) //up
            + dfs(grid, i - 1, j) //down
            + dfs(grid, i, j + 1) //right
            + dfs(grid, i, j - 1); //left
}

const grid = [
    [0,0,1,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,1,1,0,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,1,1,0,0,1,0,1,0,0],
    [0,1,0,0,1,1,0,0,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,1,1,0,0,0,0]];

console.log(maxAreaOfIsland(grid));