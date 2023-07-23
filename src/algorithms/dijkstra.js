// Define the dijkstra function, which performs Dijkstra's algorithm on a grid
// and returns an array of all nodes in the order in which they were visited.
export function dijkstra(grid, startNode, finishNode) {
  // Create an array to store the visited nodes in order
  const visitedNodesInOrder = [];
  // Set the distance of the startNode to 0
  startNode.distance = 0;
  // Create an array of all nodes in the grid
  const unvisitedNodes = getAllNodes(grid);
  // While there are still unvisited nodes,
  while (!!unvisitedNodes.length) {
    // Sort the unvisited nodes by distance
    sortNodesByDistance(unvisitedNodes);
    // Get the closest node by removing it from the front of the unvisitedNodes array
    const closestNode = unvisitedNodes.shift();
    // If the closest node is a wall, skip it and continue to the next iteration
    if (closestNode.isWall) continue;
    // If the closest node has a distance of Infinity,
    // all remaining unvisited nodes are unreachable, so return visitedNodesInOrder
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    // Set isVisited to true for the closest node
    closestNode.isVisited = true;
    // Push the closest node onto visitedNodesInOrder
    visitedNodesInOrder.push(closestNode);
    // If the closest node is the finishNode, return visitedNodesInOrder
    if (closestNode === finishNode) return visitedNodesInOrder;
    // Update the distances of the closest node's unvisited neighbors
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

// Define a function for sorting an array of nodes by their distance property
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

// Define a function for updating the distances of a node's unvisited neighbors
function updateUnvisitedNeighbors(node, grid) {
  // Get an array of the node's unvisited neighbors
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  // Loop over each neighbor in unvisitedNeighbors
  for (const neighbor of unvisitedNeighbors) {
    // Set the neighbor's distance to the node's distance + 1
    neighbor.distance = node.distance + 1;
    // Set the neighbor's previousNode to the node
    neighbor.previousNode = node;
  }
}

// Define a function for getting an array of a node's unvisited neighbors
function getUnvisitedNeighbors(node, grid) {
  // Create an array to store the neighbors
  const neighbors = [];
  // Destructure the col and row properties from node
  const { col, row } = node;
  // If row is greater than 0, push the node above onto neighbors
  if (row > 0) neighbors.push(grid[row - 1][col]);
  // If row is less than grid.length - 1, push the node below onto neighbors
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  // If col is greater than 0, push the node to the left onto neighbors
  if (col > 0) neighbors.push(grid[row][col - 1]);
  // If col is less than grid[0].length - 1, push the node to the right onto neighbors
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  // Return only those neighbors that have not been visited yet
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

// Define a function for getting an array of all nodes in a grid
function getAllNodes(grid) {
  // Create an array to store all nodes in the grid
  const nodes = [];
  // Loop over each row in grid,
  for (const row of grid) {
    // then loop over each node in row,
    for (const node of row) {
      // and push each node onto nodes.
      nodes.push(node);
    }
  }
  // Return nodes.
  return nodes;
}

// Define a function for backtracking from finishNode to find and return an array of nodes in shortest path order.
export function getNodesInShortestPathOrder(finishNode) {
   const nodesInShortestPathOrder = [];
   let currentNode = finishNode;
   while (currentNode !== null) {
     nodesInShortestPathOrder.unshift(currentNode);
     currentNode = currentNode.previousNode;
   }
   return nodesInShortestPathOrder;
}