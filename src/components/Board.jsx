import React, { useEffect, useState } from 'react';
import Square from './Square';
import { checkWinner, getBestMove } from '../logic/gameLogic';

export default function Board({ board, setBoard, isXNext, setIsXNext, gameMode, names, onGameOver }) {
  const winner = checkWinner(board);
  const [hasReportedWinner, setHasReportedWinner] = useState(false);

  useEffect(() => {
    // Reset report status when board resets
    if (board.every(val => val === null)) {
      setHasReportedWinner(false);
    }
  }, [board]);

  useEffect(() => {
    if (winner && winner !== 'Draw' && !hasReportedWinner) {
      onGameOver(winner);
      setHasReportedWinner(true);
    }
  }, [winner, hasReportedWinner, onGameOver]);

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
      <div className="h-8"> {/* Fixed height to prevent jumpy layout */}
        {winner ? (
          <div className="text-xl font-bold text-yellow-400 uppercase tracking-tighter italic">
            {winner === 'Draw' ? "It's a Tie!" : `${winner === 'X' ? names.p1 : names.p2} Wins!`}
          </div>
        ) : (
          <div className="text-sm text-slate-400 font-medium">
            Turn: <span className={isXNext ? 'text-cyan-400 font-bold' : 'text-pink-500 font-bold'}>
              {isXNext ? names.p1 : names.p2}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 bg-slate-900/50 p-3 rounded-2xl border-2 border-slate-800 shadow-2xl">
        {board.map((val, i) => (
          <Square key={i} value={val} onClick={() => handleSquareClick(i)} />
        ))}
      </div>
    </div>
  );
}