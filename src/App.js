import React from 'react';
import './App.css';
import World from './components/World';
import Countries from './components/Countries';
import Charts from './components/Charts';

function App() {
  return (
    <div className="container">
      <World/>
      <Charts/>
      <Countries/>
    </div>
  );
}

export default App;
