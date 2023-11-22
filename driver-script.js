// generate array of random numbers
function generateRandomArray(size) {
    let array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100));
    }
    return array;
}

// create a binary search tree from an array of random numbers < 100
let randomArray = generateRandomArray(10);
let bst = createTree(randomArray);

// print the initial tree visually
console.log('Initial Tree Structure:');
prettyPrint(bst);

// confirm that the tree is balanced
console.log('Is the tree balanced initially?', isBalanced(bst));

// print out all elements in level, pre, post, and in order
console.log('Level Order:', levelOrder(bst));
console.log('Pre Order:', preOrder(bst));
console.log('Post Order:', postOrder(bst));
console.log('In Order:', inOrder(bst));

// unbalance the tree by adding several numbers > 100
bst = insertNode(101, bst);
bst = insertNode(102, bst);
bst = insertNode(103, bst);

// print the tree visually after unbalancing
console.log('Tree Structure After Adding Elements:');
prettyPrint(bst);

// confirm that the tree is unbalanced
console.log('Is the tree balanced after adding elements?', isBalanced(bst));

// balance the tree
bst = rebalance(bst);

// print the tree visually after rebalancing
console.log('Tree Structure After Rebalancing:');
prettyPrint(bst);

// confirm that the tree is balanced
console.log('Is the tree balanced after rebalancing?', isBalanced(bst));

// print out all elements again in level, pre, post, and in order
console.log('Level Order after rebalancing:', levelOrder(bst));
console.log('Pre Order after rebalancing:', preOrder(bst));
console.log('Post Order after rebalancing:', postOrder(bst));
console.log('In Order after rebalancing:', inOrder(bst));
