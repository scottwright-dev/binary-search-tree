// NOTE: comments have been removed from the file, to view comments, explaining the code line by line, refer to previous commit

// Node factory function to create a new node with data, left child, and right child
function createNode(data) {
    return {
        data,
        leftChild: null,
        rightChild: null
    };
}

// Function to create a new binary search tree from an array
function createTree(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    return buildTree(sortedArray);
}

// Build function which turns the array into a balanced binary tree
function buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const rootNode = createNode(array[mid]);

    rootNode.leftChild = buildTree(array, start, mid - 1);
    rootNode.rightChild = buildTree(array, mid + 1, end);

    return rootNode;
}

// Insert new node function
function insertNode(value, node) {
    if (node === null) return createNode(value);

    if (value < node.data) {
        node.leftChild = insertNode(value, node.leftChild);
    } else if (value > node.data) {
        node.rightChild = insertNode(value, node.rightChild);
    }

    return node;
}

// Delete node function
function deleteNode(value, node) {
    if (node === null) return null;

    if (value < node.data) {
        node.leftChild = deleteNode(value, node.leftChild);
    } else if (value > node.data) {
        node.rightChild = deleteNode(value, node.rightChild);
    } else {
        if (node.leftChild === null && node.rightChild === null) return null;
        if (node.leftChild === null) return node.rightChild;
        if (node.rightChild === null) return node.leftChild;

        const smallestNode = findMinNode(node.rightChild);
        node.data = smallestNode.data;
        node.rightChild = deleteNode(smallestNode.data, node.rightChild);
    }

    return node;
}

// Helper function for deleteNode which finds min node in right subtree
function findMinNode(node) {
    let current = node;
    while (current && current.leftChild !== null) current = current.leftChild;
    return current;
}

// FindValue function - searches for a specific value in the tree
function findValue(searchValue, node) {
    if (node === null) return null;

    if (searchValue < node.data) return findValue(searchValue, node.leftChild);
    if (searchValue > node.data) return findValue(searchValue, node.rightChild);

    return node;
}

// Breadth-first traversal: visit nodes level by level
function levelOrder(root, callback = null) {
    if (root === null) return [];

    const queue = [root];
    const result = [];

    while (queue.length) {
        const currentNode = queue.shift();
        if (callback) callback(currentNode.data);
        else result.push(currentNode.data);

        if (currentNode.leftChild) queue.push(currentNode.leftChild);
        if (currentNode.rightChild) queue.push(currentNode.rightChild);
    }

    return result;
}

// "inOrder" traversal: recursively visit leftmost node first, then the current node, and then the right subtree
function inOrder(root, callback = null) {
    if (root === null) return [];

    let result = [];
    result.push(...inOrder(root.leftChild, callback));
    if (callback) callback(root.data);
    else result.push(root.data);
    result.push(...inOrder(root.rightChild, callback));

    return result;
}

// "postOrder" traversal: start from the leftmost child, then visit the right subtree, and finally visit the current node
function postOrder(root, callback = null) {
    if (root === null) return [];

    let result = [];
    result.push(...postOrder(root.leftChild, callback));
    result.push(...postOrder(root.rightChild, callback));
    if (callback) callback(root.data);
    else result.push(root.data);

    return result;
}

// "preOrder" traversal: start from the current node, then visit the left subtree, and finally visit the right subtree
function preOrder(root, callback = null) {
    if (root === null) return [];

    let result = [];
    if (callback) callback(root.data);
    else result.push(root.data);
    result.push(...preOrder(root.leftChild, callback));
    result.push(...preOrder(root.rightChild, callback));

    return result;
}

// Find total height of tree
function getTreeHeight(node) {
    if (node === null) return 0;

    const leftHeight = getTreeHeight(node.leftChild);
    const rightHeight = getTreeHeight(node.rightChild);

    return Math.max(leftHeight, rightHeight) + 1;
}

// Find depth of a node in the tree
function getNodeDepth(rootNode, targetValue, currentDepth = 0) {
    if (rootNode === null) return -1;
    if (rootNode.data === targetValue) return currentDepth;

    const leftSubTreeDepth = getNodeDepth(rootNode.leftChild, targetValue, currentDepth + 1);
    if (leftSubTreeDepth !== -1) return leftSubTreeDepth;

    const rightSubTreeDepth = getNodeDepth(rootNode.rightChild, targetValue, currentDepth + 1);
    if (rightSubTreeDepth !== -1) return rightSubTreeDepth;

    return -1;
}

// isBalanced: Check if the tree is balanced
function isBalanced(node) {
    if (node === null) return true;

    const leftSubTreeHeight = getTreeHeight(node.leftChild);
    const rightSubTreeHeight = getTreeHeight(node.rightChild);
    const heightDifference = leftSubTreeHeight - rightSubTreeHeight;

    return Math.abs(heightDifference) <= 1 && isBalanced(node.leftChild) && isBalanced(node.rightChild);
}

// Rebalance an unbalanced tree
function rebalance(root) {
    const sortedElements = inOrder(root);
    return buildTree(sortedElements);
}

// prettyPrint function
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) return;
    if (node.rightChild !== null) {
        prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftChild !== null) {
        prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};
