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
    // Filter out duplicates using the Set method, convert into a new array using spread operator
    // then call sort on the array to sort in ascending order
    const sortedArray = [...new Set(array)].sort((a,b) => a - b);
    // call buildTree to construct the tree from the sorted array and return the root node.
    // buildTree recursively divides array and creates a node from the middle element
    const root = buildTree(sortedArray);
    // Return the root node of the constructed binary search tree.
    return root;
}

// Build function which turns the array into a balanced binary tree full of node objects
function buildTree(array, start = 0, end = array.length -1) { 
    // if start index is greater than end index, return null. (Termination condition of recursion)
    if (start > end) return null;
    // find mid point index
    const mid = Math.floor((start + end) / 2);
    // create the root node with this element
    const rootNode = createNode(array[mid]);
    // recursively build the left and right subtrees and assign them
    rootNode.leftChild = (buildTree(array, start, mid -1));
    rootNode.rightChild = (buildTree(array, mid + 1, end));
    // Return the root node of this subtree
    return rootNode;

}

// prettyPrint function
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

// TESTING AREA
const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
console.log("test array is:", testArray);

let testTree = createTree(testArray);
console.log("testTree:", testTree);

console.log(prettyPrint(testTree));