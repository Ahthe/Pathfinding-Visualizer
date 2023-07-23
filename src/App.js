// Import the React library
import React from 'react';
// Import the App.css file for styling
import './App.css';
// Import the PathfindingVisualizer component
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';

// Define the App component as a function component
function App() {
  // The return statement specifies what the component should render
  return (
    // Render a div with the class name "App"
    <div className="App">
      {/*Render the PathfindingVisualizer component inside the div*/}
      <PathfindingVisualizer></PathfindingVisualizer>
    </div>
  );
}

// Export the App component as the default export
export default App;
