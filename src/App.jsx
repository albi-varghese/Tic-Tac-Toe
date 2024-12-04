import React from 'react';
import Board from './Components/Board';
import './App.css'; // Optional for general app-wide styling

function App() {
  return (
    <div className="game">
      <h1 style={{ fontSize: '36px', color: '#2c3e50' }}>Tic-Tac-Toe</h1>
      <Board />
    </div>
  );
}

export default App;
