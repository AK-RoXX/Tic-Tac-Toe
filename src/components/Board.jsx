import React, { useEffect } from 'react';
import Square from './Square';
import { checkWinner, getBestMove } from '../logic/gameLogic';

export default function Board({ board, setBoard, isXNext, setIsXNext, gameMode, names }) {
  const winner = checkWinner(board);
  
  const currentPlayer = isXNext ? names.p1 : names.p2;

  useEffect(() => {
    if (gameMode === 'computer' && !isXNext && !winner) {
      const timer = setTimeout(() => {
        const move = getBestMove([...board]);
        if (move !== undefined) handleSquareClick(move);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isXNext, winner]);

  const handleSquareClick = (i) => {
    if (board[i] || winner) return;
    const nextBoard = [...board];
    nextBoard[i] = isXNext ? 'X' : 'O';
    setBoard(nextBoard);
    setIsXNext(!isXNext);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        {winner ? (
          <div className="text-2xl font-bold text-yellow-400 animate-pulse">
            {winner === 'Draw' ? "It's a Tie!" : `${winner === 'X' ? names.p1 : names.p2} Wins!`}
          </div>
        ) : (
          <div className="text-lg text-slate-300">
            <span className={isXNext ? 'text-cyan-400 font-bold' : 'text-pink-500 font-bold'}>
              {currentPlayer}'s
            </span> Turn
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 bg-slate-700/50 p-2 rounded-xl border border-slate-600 shadow-inner">
        {board.map((val, i) => (
          <Square key={i} value={val} onClick={() => handleSquareClick(i)} />
        ))}
      </div>
    </div>
  );
}