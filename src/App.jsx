import React, { useState } from 'react';
import Board from './components/Board';

function App() {
  const [gameMode, setGameMode] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [names, setNames] = useState({ p1: 'Player 1', p2: 'Player 2' });
  const [isNaming, setIsNaming] = useState(false);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const startFriendMode = () => {
    setGameMode('friend');
    setIsNaming(true);
  };

  const startComputerMode = () => {
    setGameMode('computer');
    setNames({ p1: 'You', p2: 'AI' });
    setIsNaming(false);
    resetGame();
  };

  if (!gameMode) {
    return (
      <div className="text-center px-4">
        <h1 className="text-5xl font-black mb-10 tracking-tighter">TIC <span className="text-cyan-400">TAC</span> TOE</h1>
        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <button onClick={startFriendMode} className="bg-cyan-600 hover:bg-cyan-500 py-3 rounded-lg font-bold transition-all shadow-lg">Play with Friend</button>
          <button onClick={startComputerMode} className="bg-pink-600 hover:bg-pink-500 py-3 rounded-lg font-bold transition-all shadow-lg">Play with AI</button>
        </div>
      </div>
    );
  }

  if (isNaming) {
    return (
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-80 text-center">
        <h2 className="text-xl font-bold mb-6 text-cyan-400">Enter Names</h2>
        <input 
          className="w-full mb-3 p-2 rounded bg-slate-700 border border-slate-600 outline-none focus:border-cyan-400"
          placeholder="Player 1 (X)"
          onChange={(e) => setNames({...names, p1: e.target.value || 'Player 1'})}
        />
        <input 
          className="w-full mb-6 p-2 rounded bg-slate-700 border border-slate-600 outline-none focus:border-cyan-400"
          placeholder="Player 2 (O)"
          onChange={(e) => setNames({...names, p2: e.target.value || 'Player 2'})}
        />
        <button 
          onClick={() => setIsNaming(false)}
          className="w-full bg-cyan-600 py-2 rounded-lg font-bold"
        >
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-64 justify-between items-center mb-6">
        <button onClick={() => setGameMode(null)} className="text-xs text-slate-400 hover:text-white uppercase tracking-widest">← Menu</button>
        <button onClick={resetGame} className="text-xs bg-slate-800 px-3 py-1 rounded hover:bg-slate-700 transition font-bold">RESTART</button>
      </div>

      <Board 
        board={board} setBoard={setBoard} 
        isXNext={isXNext} setIsXNext={setIsXNext} 
        gameMode={gameMode} names={names}
      />
    </div>
  );
}

export default App;