# binary-search-tree

# Currently work in progress

My solution to the [Binary Search Tree Assignment](https://www.theodinproject.com/lessons/javascript-binary-search-trees) from the Odin Project curriculum.

## Assignment

The objective is to implement a balanced binary search tree data structure using vanilla JavaScript. This assignment is designed to deepen understanding of binary search trees, which are efficient for operations like lookup, insertion, and deletion of data items.

## Binary Search Tree Structure

A binary search tree is a node-based binary tree data structure which has the following properties:

- **Node**: The basic unit of a BST, containing data, and references to its left and right children.
- **Left Child**: In a BST, the left child of a node contains a value less than its parent node.
- **Right Child**: In a BST, the right child of a node contains a value greater than its parent node.

The tree starts with a "root node" and any node with no children is called a “leaf node”.

## Features

- **insert(value)** - Inserts a new node with the specified `value` into the tree, maintaining the BST property.
- **delete(value)** - Removes the node with the specified `value` from the tree, if it exists.
- **find(value)** - Searches for a node with the specified `value` and returns it.
- **levelOrder(callback)** - Traverses the tree in breadth-first level order and performs a `callback` on each node.
- **inOrder(callback)** - Traverses the tree using in-order depth-first traversal and performs a `callback` on each node.
- **preOrder(callback)** - Traverses the tree using pre-order depth-first traversal and performs a `callback` on each node.
- **postOrder(callback)** - Traverses the tree using post-order depth-first traversal and performs a `callback` on each node.
- **height(node)** - Returns the height of the tree from the specified `node`.
- **depth(node)** - Returns the depth of the specified `node` in the tree.
- **isBalanced** - Checks if the tree is balanced, where the difference in height between the left and right subtrees of any node is no more than 1.
- **rebalance** - Re-balances an unbalanced tree.
