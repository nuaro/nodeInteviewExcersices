class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}
function createBinaryTreeFromArray(arr)
{
    if (arr ===null || arr.length <= 0) return null;

    let root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;

    while (queue.length > 0 && i < arr.length) {
        const current = queue.shift();

        // Left child
        if (i < arr.length && arr[i] !== null) {
            current.left = new TreeNode(arr[i]);
            queue.push(current.left);
        }
        i++;

        // Right child
        if (i < arr.length && arr[i] !== null) {
            current.right = new TreeNode(arr[i]);
            queue.push(current.right);
        }
        i++;
    }

    return root;
}

function levelOrder(root) {
    if (!root) return [];

    const result = [];
    const queue = [[root, 0]];

    while (queue.length > 0) {
        const [current, level] = queue.shift();

        if (result.length === level) {
            result.push([]);
        }

        result[level].push(current.val);

        if (current.left) queue.push([current.left, level + 1]);
        if (current.right) queue.push([current.right, level + 1]);
    }

    return result;
}

var levelOrderReturn = function(root) {
    let tree = createBinaryTreeFromArray(root);
    return levelOrder(tree);
};

console.log(levelOrderReturn([3, 9, 20, 10, null, 15, 7]));

