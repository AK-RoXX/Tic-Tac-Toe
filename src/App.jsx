import React, { useState } from 'react';
import Board from './components/Board';

function App() {
  const [gameMode, setGameMode] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const handleBack = () => {
    setGameMode(null);
    resetGame();
  };

  if (!gameMode) {
    return (
      <div className="text-center">
        <h1 className="text-6xl font-black mb-12 tracking-tighter">
          TIC <span className="text-cyan-400">TAC</span> TOE
        </h1>
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => setGameMode('friend')}
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 shadow-lg"
          >
            Play with Friend
          </button>
          <button 
            onClick={() => setGameMode('computer')}
            className="bg-pink-600 hover:bg-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 shadow-lg"
          >
            Play with AI (Unbeatable)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full justify-between items-center mb-8 px-4 max-w-md">
        <button onClick={handleBack} className="text-slate-400 hover:text-white transition">
          ← Menu
        </button>
        <button onClick={resetGame} className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-bold transition">
          Restart
        </button>
      </div>

      <Board 
        board={board} 
        setBoard={setBoard} 
        isXNext={isXNext} 
        setIsXNext={setIsXNext} 
        gameMode={gameMode} 
      />
      
      <p className="mt-8 text-slate-500 text-sm">
        Mode: <span className="capitalize text-slate-300 font-semibold">{gameMode}</span>
      </p>
    </div>
  );
}

export default App;