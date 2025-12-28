import React, { useState, useEffect } from 'react';
import Board from './components/Board';

function App() {
  const [gameMode, setGameMode] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [names, setNames] = useState({ p1: 'Player 1', p2: 'Player 2' });
  const [isNaming, setIsNaming] = useState(false);
  const [scores, setScores] = useState({ p1: 0, p2: 0 });

  // Reset scores when changing modes
  useEffect(() => {
    setScores({ p1: 0, p2: 0 });
  }, [gameMode]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const handleWinner = (winner) => {
    if (winner === 'X') setScores(prev => ({ ...prev, p1: prev.p1 + 1 }));
    if (winner === 'O') setScores(prev => ({ ...prev, p2: prev.p2 + 1 }));
  };

  if (!gameMode) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-black mb-10 tracking-tighter">TIC <span className="text-cyan-400">TAC</span> TOE</h1>
        <div className="flex flex-col gap-3 w-64">
          <button onClick={() => { setGameMode('friend'); setIsNaming(true); }} className="bg-cyan-600 hover:bg-cyan-500 py-3 rounded-lg font-bold transition-all shadow-lg">Play with Friend</button>
          <button onClick={() => { setGameMode('computer'); setNames({ p1: 'You', p2: 'AI' }); setIsNaming(false); resetGame(); }} className="bg-pink-600 hover:bg-pink-500 py-3 rounded-lg font-bold transition-all shadow-lg">Play with AI</button>
        </div>
      </div>
    );
  }

  if (isNaming) {
    return (
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-80 text-center border border-slate-700">
        <h2 className="text-xl font-bold mb-6 text-cyan-400">Enter Names</h2>
        <input className="w-full mb-3 p-2 rounded bg-slate-700 border border-slate-600 outline-none focus:border-cyan-400" placeholder="Player 1 (X)" onChange={(e) => setNames({...names, p1: e.target.value || 'Player 1'})} />
        <input className="w-full mb-6 p-2 rounded bg-slate-700 border border-slate-600 outline-none focus:border-cyan-400" placeholder="Player 2 (O)" onChange={(e) => setNames({...names, p2: e.target.value || 'Player 2'})} />
        <button onClick={() => { setIsNaming(false); resetGame(); }} className="w-full bg-cyan-600 py-2 rounded-lg font-bold hover:bg-cyan-500 transition">Start Game</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10">
      {/* Top Bar */}
      <div className="flex w-72 justify-between items-center mb-8">
        <button onClick={() => setGameMode(null)} className="text-xs text-slate-400 hover:text-white uppercase tracking-widest font-bold">← Menu</button>
        <button onClick={resetGame} className="text-xs bg-slate-800 px-4 py-2 rounded hover:bg-slate-700 transition font-black border border-slate-700">RESTART</button>
      </div>

      {/* Scoreboard */}
      <div className="flex gap-8 mb-8 bg-slate-800/50 p-4 rounded-xl border border-slate-700 shadow-xl">
        <div className="text-center">
          <p className="text-[10px] uppercase text-slate-400 tracking-widest mb-1">{names.p1} (X)</p>
          <p className="text-3xl font-black text-cyan-400">{scores.p1}</p>
        </div>
        <div className="w-[1px] bg-slate-700"></div>
        <div className="text-center">
          <p className="text-[10px] uppercase text-slate-400 tracking-widest mb-1">{names.p2} (O)</p>
          <p className="text-3xl font-black text-pink-500">{scores.p2}</p>
        </div>
      </div>

      <Board 
        board={board} setBoard={setBoard} 
        isXNext={isXNext} setIsXNext={setIsXNext} 
        gameMode={gameMode} names={names}
        onGameOver={handleWinner}
      />
    </div>
  );
}

export default App;