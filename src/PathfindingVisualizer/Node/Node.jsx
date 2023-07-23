// Import the React library and the Component class
import React, { Component } from 'react';
// Import the Node.css file for styling
import './Node.css';

// Define the Node component as a class component
export default class Node extends Component {
  // Define the render method
  render() {
    // Destructure properties from this.props
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    // Determine the extra class name for the node based on its properties
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : '';

    // Return a JSX element
    return (
      // Render a div with an id and class name based on the node's properties and state
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        // Set event handlers for mouse events on the div
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
    );
  }
}