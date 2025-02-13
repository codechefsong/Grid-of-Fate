"use client";

import React, { useState } from "react";
import { Circle, X } from "lucide-react";

interface Cell {
  selected: boolean;
  destroyed: boolean;
  playerNumber?: number;
}

const BoardGame = () => {
  const [board, setBoard] = useState<Cell[]>(
    Array(25)
      .fill(null)
      .map(() => ({ selected: false, destroyed: false })),
  );
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<number | null>(null);
  const [activePlayers, setActivePlayers] = useState<Set<number>>(new Set([1, 2, 3, 4]));

  const handleCellClick = (id: number) => {
    if (gameOver || board[id].selected || board[id].destroyed) return;

    const newBoard = [...board];
    newBoard[id] = {
      ...newBoard[id],
      selected: true,
      playerNumber: currentPlayer,
    };
    setBoard(newBoard);
  };

  const resetGame = () => {
    setBoard(
      Array(25)
        .fill(null)
        .map(() => ({ selected: false, destroyed: false })),
    );
    setCurrentPlayer(1);
    setGameOver(false);
    setWinner(null);
    setActivePlayers(new Set([1, 2, 3, 4]));
  };

  const getPlayerColor = (playerNumber: number) => {
    switch (playerNumber) {
      case 1:
        return "text-blue-500";
      case 2:
        return "text-green-500";
      case 3:
        return "text-yellow-500";
      case 4:
        return "text-purple-500";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {!gameOver && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 rounded">
          <p>Player {currentPlayer}&quot;s turn</p>
        </div>
      )}
      {gameOver && winner && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
          <p>Player {winner} wins!</p>
        </div>
      )}

      <div className="grid grid-cols-5 gap-2">
        {board.map((cell, rowIndex) => (
          <button
            key={`${rowIndex}`}
            onClick={() => handleCellClick(rowIndex)}
            disabled={cell.selected || cell.destroyed || gameOver}
            className={`
              w-16 h-16 border-2 rounded-lg flex items-center justify-center
              ${cell.selected ? "border-gray-300" : "border-gray-200"}
              ${!cell.selected && !cell.destroyed ? "hover:bg-gray-100" : ""}
              ${cell.destroyed ? "bg-red-100" : "bg-white"}
              transition-colors duration-200
            `}
          >
            {cell.selected && !cell.destroyed && cell.playerNumber && (
              <Circle className={`w-8 h-8 ${getPlayerColor(cell.playerNumber)}`} />
            )}
            {cell.destroyed && <X className="w-8 h-8 text-red-500" />}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
      >
        Reset Game
      </button>

      <div className="mt-4 text-sm text-gray-600">Active Players: {[...activePlayers].sort().join(", ")}</div>
    </div>
  );
};

export default BoardGame;
