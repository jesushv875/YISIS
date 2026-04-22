import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext(null);

// players = [{ name: string, gender: 'male' | 'female' }, { name, gender }]
export function GameProvider({ children, players }) {
  const [diceTurn, setDiceTurn] = useState(0);
  const [gameTurn, setGameTurn] = useState(0);

  return (
    <GameContext.Provider value={{ players, diceTurn, setDiceTurn, gameTurn, setGameTurn }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
}
