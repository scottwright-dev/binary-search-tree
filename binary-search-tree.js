// Node factory function to create a new node with data, left child, and right child
function createNode(data) {
    const leftChild = null;
    const rightChild = null;

    return {
        data,
        leftChild,
        rightChild
    }
}

// Tree factory function to create a new binary search tree from an array
function createTree(array) {
    // Placeholder for buildTree function which will construct the tree
    const root = buildTree(array);

    return {
        root
    };
}
