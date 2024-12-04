import React, { useState } from 'react';
import Square from './Square';
import './Board.css'; // Custom styling for the board

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winningLine, setWinningLine] = useState(null);

  const winner = calculateWinner(squares);

  function handleClick(index) {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);

    const winInfo = calculateWinner(newSquares);
    if (winInfo) {
      setWinningLine(winInfo.line);
      setScores((prev) => ({
        ...prev,
        [winInfo.winner]: prev[winInfo.winner] + 1,
      }));
    }
  }

  function restartGame() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine(null);
  }

  const getClass = (index) => (winningLine?.includes(index) ? 'winning-square' : '');

  return (
    <div className="board-container">
      <div className="status">
        {winner
          ? `Winner: ${winner.winner}`
          : `Next Player: ${isXNext ? 'X' : 'O'}`}
      </div>
      <div className="scoreboard">
        <p>Scoreboard</p>
        <div className="scores">
          <span className="score">X: {scores.X}</span>
          <span className="score">O: {scores.O}</span>
        </div>
      </div>
      <div className="board">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
            className={getClass(index)}
          />
        ))}
      </div>
      <button className="restart-button" onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return null;
}

export default Board;
