import React, { useEffect, useCallback } from 'react';
import Square from './Square';
import { checkWinner, getBestMove } from '../logic/gameLogic';

export default function Board({ board, setBoard, isXNext, setIsXNext, gameMode }) {
  const winner = checkWinner(board);
  const status = winner 
    ? winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`
    : `Next Player: ${isXNext ? 'X' : 'O'}`;

  const handleSquareClick = useCallback((i) => {
    if (board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }, [board, winner, isXNext, setBoard, setIsXNext]);

  // Handle Computer Move
  useEffect(() => {
    // Only move if it's Computer mode, it's O's turn (false), and no winner yet
    if (gameMode === 'computer' && !isXNext && !winner) {
      const timer = setTimeout(() => {
        const bestMove = getBestMove([...board]);
        if (bestMove !== undefined) {
          handleSquareClick(bestMove);
        }
      }, 600); // 600ms delay makes it feel like the computer is "thinking"
      return () => clearTimeout(timer);
    }
  }, [isXNext, gameMode, winner, board, handleSquareClick]);
 

  return (
    <div className="flex flex-col items-center gap-6">
      <div className={`text-2xl font-bold ${winner ? 'text-yellow-400 animate-bounce' : 'text-slate-300'}`}>
        {status}
      </div>

      <div className="grid grid-cols-3 gap-3 bg-slate-700 p-3 rounded-xl shadow-2xl">
        {board.map((value, i) => (
          <Square 
            key={i} 
            value={value} 
            onClick={() => handleSquareClick(i)} 
          />
        ))}
      </div>
    </div>
  );
}