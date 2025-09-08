//bfs on treees
function bfs(root, checkCondition)
{
    const queue = [];
    queue.push(root);
    while(queue.length > 0)
    {
        let node = queue.shift();
        for (const child of node.children)
        {
            if (checkCondition(child))
            {
                return child;
            }
            queue.push(child);
        }

    }
    return undefined;
}


class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [];
    }

    addChild(child) {
        this.children.push(child);
    }
    addChildWithValue(value) {
        this.children.push(new TreeNode(value));
    }
}

//bfs on graph works great with grids, adjancent lists , or networks
// this should work for mostly every kind of graph , tree
// key thing getNeighbors function , should return on case on a tree , list of children ,
// on case a grid cell next to them
// on case of graph all the negigbors
//shortest number steps
// clean level order traversal

function bfsGeneric(start, condition, getNeighbors) {
    const queue = [[start]];
    const visited = new Set([start]);

    while (queue.length > 0) {
        const path = queue.shift();
        const current = path[path.length - 1];

        // Check if we found the target
        if (condition(current)) {
            return path;
        }

        // Get neighbors of current node
        const neighbors = getNeighbors(current);

        for (let neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([...path, neighbor]);
            }
        }
    }

    return null; // Path not found
}

export { bfs, bfsGeneric };