import React, { useState } from 'react';

function App() {
  const [gameMode, setGameMode] = useState(null); // 'friend' or 'computer'

  if (!gameMode) {
    return (
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-8">Tic Tac Toe</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setGameMode('friend')}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition"
          >
            Play with Friend
          </button>
          <button 
            onClick={() => setGameMode('computer')}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-bold transition"
          >
            Play with Computer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <button 
        onClick={() => setGameMode(null)}
        className="mb-4 text-sm text-slate-400 hover:text-white"
      >
        ← Back to Menu
      </button>
      {/* Game Board will go here */}
      <h2 className="text-2xl italic">Mode: {gameMode}</h2>
    </div>
  );
}

export default App;