class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = { value, left: null, right: null };

        if (!this.root) {
            this.root = newNode; // If the tree is empty, set the root
            return;
        }

        const queue = [this.root];
        while (queue.length > 0) {
            const current = queue.shift();

            if (!current.left) {
                current.left = newNode; // Insert into the left child if empty
                return;
            } else {
                queue.push(current.left);
            }

            if (!current.right) {
                current.right = newNode; // Insert into the right child if empty
                return;
            } else {
                queue.push(current.right);
            }
        }
    }

    search(value) {
        if (!this.root) return false;

        const queue = [this.root];
        while (queue.length > 0) {
            const current = queue.shift();
            if (current.value === value) return true;

            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
        return false;
    }

    delete(value) {
        if (!this.root) return;

        const queue = [this.root];
        let nodeToDelete = null;
        let lastNode = null;

        while (queue.length > 0) {
            lastNode = queue.shift();

            if (lastNode.value === value) {
                nodeToDelete = lastNode;
            }

            if (lastNode.left) queue.push(lastNode.left);
            if (lastNode.right) queue.push(lastNode.right);
        }

        if (nodeToDelete) {
            nodeToDelete.value = lastNode.value;
            this.deleteDeepest(lastNode);
        }
    }

    deleteDeepest(deepestNode) {
        const queue = [this.root];
        while (queue.length > 0) {
            const current = queue.shift();

            if (current === deepestNode) {
                current = null;
                return;
            }

            if (current.right) {
                if (current.right === deepestNode) {
                    current.right = null;
                    return;
                } else {
                    queue.push(current.right);
                }
            }

            if (current.left) {
                if (current.left === deepestNode) {
                    current.left = null;
                    return;
                } else {
                    queue.push(current.left);
                }
            }
        }
    }

    inorder() {
        return this.inorderTraversal(this.root, []);
    }

    inorderTraversal(node, result) {
        if (node) {
            this.inorderTraversal(node.left, result);
            result.push(node.value);
            this.inorderTraversal(node.right, result);
        }
        return result;
    }

    preorder() {
        return this.preorderTraversal(this.root, []);
    }

    preorderTraversal(node, result) {
        if (node) {
            result.push(node.value);
            this.preorderTraversal(node.left, result);
            this.preorderTraversal(node.right, result);
        }
        return result;
    }

    postorder() {
        return this.postorderTraversal(this.root, []);
    }

    postorderTraversal(node, result) {
        if (node) {
            this.postorderTraversal(node.left, result);
            this.postorderTraversal(node.right, result);
            result.push(node.value);
        }
        return result;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = { value, left: null, right: null };

        if (!this.root) {
            this.root = newNode; // If the tree is empty, set the root
            return;
        }

        let current = this.root;

        while (true) {
            if (value === current.value) {
                // Prevent duplicate values in the BST
                return;
            }

            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode; // Insert into the left child
                    return;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode; // Insert into the right child
                    return;
                }
                current = current.right;
            }
        }
    }

    search(value) {
        let current = this.root;
        while (current) {
            if (value === current.value) return true;
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }

    delete(value) {
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(root, value) {
        if (!root) return root;

        if (value < root.value) {
            root.left = this.deleteNode(root.left, value);
        } else if (value > root.value) {
            root.right = this.deleteNode(root.right, value);
        } else {
            if (!root.left) return root.right;
            if (!root.right) return root.left;

            root.value = this.minValue(root.right);
            root.right = this.deleteNode(root.right, root.value);
        }
        return root;
    }

    minValue(node) {
        let current = node;
        while (current.left) {
            current = current.left;
        }
        return current.value;
    }

    inorder() {
        return this.inorderTraversal(this.root, []);
    }

    inorderTraversal(node, result) {
        if (node) {
            this.inorderTraversal(node.left, result);
            result.push(node.value);
            this.inorderTraversal(node.right, result);
        }
        return result;
    }

    preorder() {
        return this.preorderTraversal(this.root, []);
    }

    preorderTraversal(node, result) {
        if (node) {
            result.push(node.value);
            this.preorderTraversal(node.left, result);
            this.preorderTraversal(node.right, result);
        }
        return result;
    }

    postorder() {
        return this.postorderTraversal(this.root, []);
    }

    postorderTraversal(node, result) {
        if (node) {
            this.postorderTraversal(node.left, result);
            this.postorderTraversal(node.right, result);
            result.push(node.value);
        }
        return result;
    }
}


class Heap {
    constructor() {
        this.heap = [];
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let element = this.heap[index];
            let parentIndex = Math.floor((index - 1) / 2);
            let parent = this.heap[parentIndex];

            if (parent >= element) break;

            this.heap[index] = parent;
            this.heap[parentIndex] = element;
            index = parentIndex;
        }
    }

    extractMax() {
        const max = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.heapifyDown();
        }
        return max;
    }

    heapifyDown() {
        let index = 0;
        const length = this.heap.length;
        const element = this.heap[0];

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild > element) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild > element) ||
                    (swap !== null && rightChild > leftChild)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;

            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }

    delete(value) {
        const index = this.heap.indexOf(value);
        if (index === -1) return;

        const end = this.heap.pop();
        if (index === this.heap.length) return;

        this.heap[index] = end;
        this.heapifyDown(index);
        this.heapifyUp(index);
    }

    getHeap() {
        return this.heap;
    }

    convertToMinHeap() {
        for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            this.minHeapifyDown(i);
        }
    }

    minHeapifyDown(index) {
        const length = this.heap.length;
        const element = this.heap[index];

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild < element) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swap === null && rightChild < element) ||
                    (swap !== null && rightChild < leftChild)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;

            this.heap[index] = this.heap[swap];
            this.heap[swap] = element;
            index = swap;
        }
    }

    convertToMaxHeap() {
        for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            this.heapifyDown(i);
        }
    }
}

const bst = new BinarySearchTree();
const bt = new BinaryTree();
const heap = new Heap();
let lapTimesList = [];

function showAddLapTimeForm() {
    document.getElementById('addLapTimeForm').style.display = 'block';
    document.getElementById('searchLapTimeForm').style.display = 'none';
    document.getElementById('deleteLapTimeForm').style.display = 'none';
    localStorage.setItem('currentForm', 'add');
}

function showSearchLapTimeForm() {
    document.getElementById('searchLapTimeForm').style.display = 'block';
    document.getElementById('addLapTimeForm').style.display = 'none';
    document.getElementById('deleteLapTimeForm').style.display = 'none';
    localStorage.setItem('currentForm', 'search');
}

function showDeleteLapTimeForm() {
    document.getElementById('deleteLapTimeForm').style.display = 'block';
    document.getElementById('addLapTimeForm').style.display = 'none';
    document.getElementById('searchLapTimeForm').style.display = 'none';
    localStorage.setItem('currentForm', 'delete');
}

function restoreFormState() {
    const currentForm = localStorage.getItem('currentForm');
    if (currentForm === 'add') {
        showAddLapTimeForm();
    } else if (currentForm === 'search') {
        showSearchLapTimeForm();
    } else if (currentForm === 'delete') {
        showDeleteLapTimeForm();
    }
}

// Call restoreFormState on page load
window.onload = restoreFormState;

function addLapTime() {
    const lapTime = parseInt(document.getElementById('addLapTime').value);
    if (isNaN(lapTime)) {
        alert('Please enter a valid lap time.');
        return;
    }

    bst.insert(lapTime);
    bt.insert(lapTime);
    heap.insert(lapTime);
    lapTimesList.push(lapTime);  // Add the lap time to the list
    updateLapTimesList();  // Update the displayed list

    alert(`Lap time ${lapTime} added.`);
}

function updateLapTimesList() {
    const lapTimesUl = document.getElementById('lapTimes');
    lapTimesUl.innerHTML = '';  // Clear current list

    // Create a list item for each lap time
    lapTimesList.forEach(lapTime => {
        const li = document.createElement('li');
        li.textContent = lapTime;
        lapTimesUl.appendChild(li);
    });
}

function searchLapTime() {
    const lapTime = parseInt(document.getElementById('searchLapTime').value);
    const result = bst.search(lapTime) ? `Lap time ${lapTime} found.` : `Lap time ${lapTime} not found.`;
    document.getElementById('searchResult').innerText = result;
}

function deleteLapTime() {
    const lapTime = parseInt(document.getElementById('deleteLapTime').value);
    if (isNaN(lapTime)) {
        alert('Please enter a valid lap time.');
        return;
    }

    bst.delete(lapTime);
    bt.delete(lapTime);
    heap.delete(lapTime);
    lapTimesList = lapTimesList.filter(item => item !== lapTime);  // Remove lap time from the list
    updateLapTimesList();  // Update the displayed list

    alert(`Lap time ${lapTime} deleted.`);
    updateTraversals();  // Update traversal results
    updateHeap();  // Update heap results
}

function updateTraversals() {
    showInorder();
    showPreorder();
    showPostorder();
    showBTInorder();
    showBTPreorder();
    showBTPostorder();
}

function updateHeap() {
    heapify();
    showMinHeap();
    showMaxHeap();
}

function showInorder() {
    const inorderResult = bst.inorder();
    document.getElementById('inorderResult').innerText = 'Inorder Traversal: ' + inorderResult.join(', ');
}

function showPreorder() {
    const preorderResult = bst.preorder();
    document.getElementById('preorderResult').innerText = 'Preorder Traversal: ' + preorderResult.join(', ');
}

function showPostorder() {
    const postorderResult = bst.postorder();
    document.getElementById('postorderResult').innerText = 'Postorder Traversal: ' + postorderResult.join(', ');
}

function showBTInorder() {
    const inorderResult = bt.inorder();
    document.getElementById('btInorderResult').innerText = 'Inorder Traversal: ' + inorderResult.join(', ');
}

function showBTPreorder() {
    const preorderResult = bt.preorder();
    document.getElementById('btPreorderResult').innerText = 'Preorder Traversal: ' + preorderResult.join(', ');
}

function showBTPostorder() {
    const postorderResult = bt.postorder();
    document.getElementById('btPostorderResult').innerText = 'Postorder Traversal: ' + postorderResult.join(', ');
}

function heapify() {
    document.getElementById('heapifyResult').innerText = 'Heap: ' + heap.getHeap().join(', ');
}

function showMinHeap() {
    heap.convertToMinHeap();
    document.getElementById('minHeapResult').innerText = 'Min-Heap: ' + heap.getHeap().join(', ');
}

function showMaxHeap() {
    heap.convertToMaxHeap();
    document.getElementById('maxHeapResult').innerText = 'Max-Heap: ' + heap.getHeap().join(', ');
}
