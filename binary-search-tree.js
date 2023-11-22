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

// find depth of a node in the tree: The depth of a node is the number of edges from the node to the tree's root node
// 3 parameters:  
// rootNode - root node of the tree
// targetValue - the value of the node whose depth we want to find
// currentDepth - The current depth from the root node, starts at 0
function getNodeDepth(rootNode, targetValue, currentDepth = 0) {
    if (rootNode === null) return -1; // node not found
    if (rootNode.data === targetValue) return currentDepth; // If the current node is the target, return the current depth

    // search in the left subtree, increasing the depth recursively
    const leftSubTree = getNodeDepth(rootNode.leftChild, targetValue, currentDepth + 1);
    // if node is found in the left subtree, return its depth
    if (leftSubTree !== -1) return leftSubTree; // node found in left subtree

    // search in the right subtree, increasing the depth recursively
    const rightSubTree = getNodeDepth(rootNode.rightChild, targetValue, currentDepth + 1);
        // if node is found in the right subtree, return its depth
    if (rightSubTree !== -1) return rightSubTree; // node found in right subtree

    return -1; // node not found in either subtree
}

// isBalanced: A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1
function isBalanced(node) {
    // base case, a null tree is balanced
    if (node === null) return true;

    // get heights of right & left subtrees
    const leftSubTreeHeight = getTreeHeight(node.leftChild);
    const rightSubTreeHeight = getTreeHeight(node.rightChild);

      // check if the current node is balanced
      const heightDifference =  leftSubTreeHeight - rightSubTreeHeight;
      // check if the current node is balanced - diff in height should not exceed 1
      // The tree is balanced if the height difference is between -1 and 1, inclusive
      const isCurrentNodeBalanced = (heightDifference <= 1) && (heightDifference >= -1);

    // Recursively check if the left and right subtrees are also balanced
    return isCurrentNodeBalanced && isBalanced(node.leftChild) && isBalanced(node.rightChild); 

}

// rebalance an unbalanced tree
function rebalance(root) {
    // Step 1: Traverse the tree using the inOrder to collect the elements in a sorted order
    const sortedElements = inOrder(root);

    // Step 2: Rebuild the tree using the sorted elements
    return buildTree(sortedElements);
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

// Testing getNodeDepth
console.log('Root node depth is:', getNodeDepth(testTree, testTree.data)); // should return 0, root is always 0
console.log('Depth of node with value 23:', getNodeDepth(testTree, 23));// should be 3
console.log('Depth of node with value 67:', getNodeDepth(testTree, 67));// should be 1
console.log('Depth of node with value 6677:', getNodeDepth(testTree, 6677));// should be -1 to indicate value not present

// Testing isBalanced
console.log('is the tree balanced?', isBalanced(testTree)); // true

// test an unbalanced tree
let unbalancedTree = createNode(1);
unbalancedTree.rightChild = createNode(2); // Adding a right child
unbalancedTree.rightChild.rightChild = createNode(3); // Adding a right child to the right child

// Testing if the imbalanced tree is balanced
console.log('Is the tree balanced?', isBalanced(unbalancedTree)); //false

// Testing the rebalance function
console.log('is the unbalanced tree balanced?', isBalanced(unbalancedTree)); // false
const rebalancedTree = rebalance(unbalancedTree);
console.log('is the rebalanced tree balanced?', isBalanced(rebalancedTree)); // should be true

