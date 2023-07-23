// Import the React library and the Component class
import React, { Component } from 'react';
// Import the Node component
import Node from './Node/Node';
// Import the dijkstra function and the getNodesInShortestPathOrder function
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
// Import the PathfindingVisualizer.css file for styling
import './PathfindingVisualizer.css';

// Define constants for the start and finish nodes' row and column
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

// Define the PathfindingVisualizer component as a class component
export default class PathfindingVisualizer extends Component {
  // Define the constructor method
  constructor() {
    // Call the super method to invoke the parent class's constructor
    super();
    // Initialize the state of the component
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  // Define the componentDidMount lifecycle method
  componentDidMount() {
    // Create an initial grid
    const grid = getInitialGrid();
    // Update the state with the initial grid
    this.setState({ grid });
  }

  // Define a method for handling mouse down events on nodes
  handleMouseDown(row, col) {
    // Create a new grid with a wall toggled at the specified row and column
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    // Update the state with the new grid and set mouseIsPressed to true
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  // Define a method for handling mouse enter events on nodes
  handleMouseEnter(row, col) {
    // If the mouse is not pressed, return early
    if (!this.state.mouseIsPressed) return;
    // Create a new grid with a wall toggled at the specified row and column
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    // Update the state with the new grid
    this.setState({ grid: newGrid });
  }

  // Define a method for handling mouse up events on nodes
  handleMouseUp() {
    // Set mouseIsPressed to false in the state
    this.setState({ mouseIsPressed: false });
  }

  // Define a method for animating Dijkstra's algorithm
  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    // Loop over all visited nodes in order
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      // If we've reached the end of visited nodes in order,
      if (i === visitedNodesInOrder.length) {
        // Set a timeout to call animateShortestPath after a delay
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      // Set a timeout to animate each visited node after a delay
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  // Define a method for animating the shortest path between start and finish nodes
  animateShortestPath(nodesInShortestPathOrder) {
    // Loop over all nodes in shortest path order
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      // Set a timeout to animate each node in shortest path order after a delay
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  // Define a method for visualizing Dijkstra's algorithm on the grid
  visualizeDijkstra() {
    // Get the current grid from state
    const { grid } = this.state;
    // Get the start and finish nodes from the grid using their row and column constants
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    // Call dijkstra with the grid, startNode, and finishNode as arguments,
    // and receive an array of visited nodes in order.
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    // Call getNodesInShortestPathOrder with finishNode as an argument,
    // and receive an array of nodes in shortest path order.
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    // Call animateDijkstra with visitedNodesInOrder and nodesInShortestPathOrder as arguments
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  // Define the render method
  render() {
    // Get the grid and mouseIsPressed from state
    const { grid, mouseIsPressed } = this.state;
    // Return a JSX element
    return (
      <>
        {/* Render a button that calls visualizeDijkstra when clicked */}
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
        {/* Render a div with the class name "grid" */}
        <div className="grid">
          {/* Map over each row in the grid */}
          {grid.map((row, rowIdx) => {
            // Return a div for each row
            return (
              <div key={rowIdx}>
                {/* Map over each node in the row */}
                {row.map((node, nodeIdx) => {
                  // Destructure properties from the node
                  const { row, col, isFinish, isStart, isWall } = node;
                  // Return a Node component for each node
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

// Define a function for creating an initial grid of nodes
const getInitialGrid = () => {
  // Create an empty array to represent the grid
  const grid = [];
  // Loop over each row in the grid
  for (let row = 0; row < 20; row++) {
    // Create an empty array to represent the current row
    const currentRow = [];
    // Loop over each column in the current row
    for (let col = 0; col < 50; col++) {
      // Push a new node onto the current row
      currentRow.push(createNode(col, row));
    }
    // Push the current row onto the grid
    grid.push(currentRow);
  }
  // Return the grid
  return grid;
};

// Define a function for creating a new node object
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

// Define a function for creating a new grid with a wall toggled at a specific row and column
const getNewGridWithWallToggled = (grid, row, col) => {
  // Create a shallow copy of the grid using slice
  const newGrid = grid.slice();
  // Get the node at the specified row and column from the newGrid
  const node = newGrid[row][col];
  // Create a new node object with all properties of node except isWall,
  // which is set to the opposite of its current value using !
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  // Set the newNode at the specified row and column in newGrid
  newGrid[row][col] = newNode;
  // Return newGrid
  return newGrid;
};