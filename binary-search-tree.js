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

// insert new node function
// takes 2 params:
// - value: The value to be inserted into the tree
// - node: The current node to compare with (defaults to 'root' for the initial call)
function insertNode(value, node = root) {
    // if the current node is null (i.e., empty tree or leaf reached), create & return a new node to be linked by the parent
    if (node === null) return createNode(value);
    // if value is less than the current node's data, recursively insert in the left subtree
    if (value < node.data) {
        node.leftChild = insert(value, node.leftChild);
    // If value is greater, recursively insert in the right subtree
    } else if (value > node.data) {
        node.rightChild = insert(value, node.rightChild);
    }
    // return the node after potentially updating its children, ensuring the tree structure is maintained during recursion
    return node;
}

// Delete node function
// takes 2 params:
// - value: The value to be deleted from the tree
// - node: The current node to compare with
function deleteNode(value, node) {
    // base case: if the current node is null, value is not found
    if (node === null) return null;
    // if value is less than the current number, go to the left to find it
    if (value < node.data) {
        node.leftChild = deleteNode(value, node.leftChild);
    // else, if the value is more than the current number, go right to find it
    } else if (value > node.data) {
        node.rightChild = deleteNode(value, node.rightChild);
    } else {
        // Case 1: Node with no children
        if (node.leftChild === null && node.rightChild === null) {
            return null;
        }
        // Case 2: Node with only one child
        if (node.leftChild === null) {
            return node.rightChild; // Only right child exists, return it to replace the current node
        }
        if (node.rightChild === null) {
            console.log('rh-node', node.leftChild);
            return node.leftChild; // Only left child exists, return it to replace the current node
        }
        // Case 3: Node with two children
        else {
             // Find the smallest node in the right subtree
            const smallestNode = findMinNode(node.rightChild);
            // Replace node.data with the smallest node's data
            node.data = smallestNode.data;
            // Then delete the smallest node using deleteNode function
            node.rightChild = deleteNode(smallestNode.data, node.rightChild);
        }
    }
    // return the node after potentially updating its children
    return node;
}

// Helper function for deleteNode which finds min node in right subtree
function findMinNode(node) {
    // variable to track node position
    let current = node;
    // traverse to leftmost node, leftmost node will have the smallest value
    while (current && current.leftChild !== null) {
        current = current.leftChild;
    }
    return current; // This is leftmost node with min value in subtree
}

// findValue function - searches for a specific value in the tree
function findValue(searchValue, node) {
    // base case: if the node is null, value is not found in the tree
    if (node === null) return null;
    // if the searchValue is less than the current node's data, the searchValue is in the left subtree (if it exists)
    if (searchValue < node.data) {
        return findValue(searchValue, node.leftChild);
     //  if the searchValue is greater than the current node's data, the target must be in the right subtree 
    } else if (searchValue > node.data) {
        return findValue(searchValue, node.rightChild);
    }
    // If the current node's data matches the search value, return it, as it represents the search value in the tree
    return node;
}

// Breadth-first traversal: visit nodes level by level
// Parameters:
// - root: The root element from which to start the traversal
// - callback (optional): An optional callback function to apply to each visited node
function levelOrder(root, callback = null) {
    // If root node is null (indicating an empty tree), return an empty array
    if (root === null) return [];
    // Initialize a queue with root node to keep track of nodes to visit
    const queue = [root];
    // Initialize an empty array to store traversal result
    const result = [];
    // while queue has something in it...
    while (queue.length) {
        const currentNode = queue.shift(); // Dequeue the current node
        if (callback) {
            callback(currentNode.data); // If a callback is present, perform the callback function on the data
        } else {
            result.push(currentNode.data); // push the data from the node into results
        }
        // Enqueue child nodes if they exist, this adds any child nodes to the queue for processing
        if (currentNode.leftChild) {
            queue.push(currentNode.leftChild);
        }
        if (currentNode.rightChild) {
            queue.push(currentNode.rightChild);
        }
    }
    // return the final traversal result
    return result;
}

// "inOrder" traversal: recursively visit leftmost node first, then the current node, and then the right subtree
// Parameters:
// - root: The root element from which to start the traversal
// - callback (optional): An optional callback function to apply to each visited node
function inOrder(root, callback = null) {
    // If the root node is null (indicating an empty tree), return an empty array
    if (root === null) return [];
    
    // initialize an empty array to store traversal result
    let result = [];
    
    // traverse the left subtree first
    result.push(...inOrder(root.leftChild, callback));

    // visit current node
    if (callback) {
        callback(root.data); // apply callback to current node's data if provided
    } else {
        result.push(root.data); // push current node's data to the result array if no callback is provided
    }

    // Traverse the right subtree
    result.push(...inOrder(root.rightChild, callback));

    return result; // return result containing the nodes in ascending order
}

// "postOrder" traversal: start from the leftmost child, then visit the right subtree, and finally visit the current node
// Parameters:
// - root: The root element from which to start the traversal
// - callback (optional): An optional callback function to apply to each visited node
function postOrder(root, callback = null) {
    // If the root node is null (indicating an empty tree), return an empty array
    if (root === null) return [];
    
    // initialize an empty array to store traversal result
    let result = [];
    
    // traverse the left subtree first
    result.push(...postOrder(root.leftChild, callback));

    // traverse the right subtree
    result.push(...postOrder(root.rightChild, callback));

    // visit current node
    if (callback) {
        callback(root.data); // apply callback to the current node's data if provided
    } else {
        result.push(root.data); // push the current node's data to the result array if no callback is provided
    }

    return result; // return the result containing the nodes in postOrder
}

// "preOrder" traversal: start from the current node, then visit the left subtree, and finally visit the right subtree
// Parameters:
// - root: The root element from which to start the traversal
// - callback (optional): An optional callback function to apply to each visited node
function preOrder(root, callback = null) {
    // If the root node is null (indicating an empty tree), return an empty array
    if (root === null) return [];
    
    // initialize an empty array to store traversal result
    let result = [];

    // visit current node
    if (callback) {
        callback(root.data); // apply callback to the current node's data if provided
    } else {
        result.push(root.data); // push the current node's data to the result array if no callback is provided
    }
    
    // traverse the left subtree first
    result.push(...preOrder(root.leftChild, callback));

    // traverse the right subtree
    result.push(...preOrder(root.rightChild, callback));

    return result; // return the result containing the nodes in preOrder
}

// find total height of test tree
function getTreeHeight(node) {
    // base case: If the node is null, return 0 (height of an empty tree)
    if (node === null) {
        return 0;
    }
    // Recursive case: calculate height of the left and right subtrees
    const leftHeight = getTreeHeight(node.leftChild);
    const rightHeight = getTreeHeight(node.rightChild);

    // compare the heights and return the greater height, plus 1 for the current node (counting levels)
    if (leftHeight > rightHeight) {
        return leftHeight + 1;
    } else {
        return rightHeight + 1;
    }
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
console.log(prettyPrint(testTree));

// Test inserting a new node into the tree
// testTreeInsert = insert(15, testTree);
// prettyPrint(testTreeInsert);

// Test deleting a node
// console.log("Original tree:");
// prettyPrint(testTree); // Print the original tree

// let testTreeDel = deleteNode(67, testTree); // Delete a node from the tree
// console.log("Tree after deleting node 67:");
// prettyPrint(testTree); // Print the tree after deletion

//Testing findValue
// console.log('Find value that exists');
// console.log(findValue(324, testTree));

// console.log('Find value that does not exist');
// console.log(findValue(99999, testTree)); 

// Testing levelOrder
// console.log('level order traversal', levelOrder(testTree)); // should output [8, 4, 67, 1, 5, 9, 324, 3, 7, 23, 6345]

// Testing inOrder traversal
console.log('inOrder (depth first) traversal', inOrder(testTree)); // should output [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]

// Testing postOrder traversal
console.log('postOrder (depth first) traversal', postOrder(testTree)); // should output [3, 1, 7, 5, 4, 23, 9, 6345, 324, 67, 8]

// Testing preOrder traversal
console.log('preOrder (depth first) traversal', preOrder(testTree)); // should output [8, 4, 1, 3, 5, 7, 67, 9, 23, 324, 6345]

// Testing getTreeHeight
console.log('Tree height is:', getTreeHeight(testTree)); // should return 4