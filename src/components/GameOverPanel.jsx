"use client";
import React from "react";

function GameOverPanel({ solution, promptCount, attemptCount, onClose, darkMode }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={`p-10 rounded-lg text-center ${
          darkMode
            ? "bg-gray-800/70 text-white"
            : "bg-white/70 text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
        <p className="mb-2">You ran out of tries.</p>
        <p className="mb-2">
          The correct word was: <strong>{solution}</strong>
        </p>
        <p className="mb-2">Prompts Sent: {promptCount}</p>
        <p className="mb-4">Word Attempts: {attemptCount}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Come Back
        </button>
      </div>
    </div>
  );
}

export default GameOverPanel;
