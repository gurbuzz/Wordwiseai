"use client";
import React from "react";

function WelcomePanel({ onPlay, darkMode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-lg">
      <div
        className={`p-10 rounded-lg text-center ${
          darkMode
            ? "bg-gray-800/70 text-white"
            : "bg-white/70 text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Welcome to WordWise AI</h2>
        <p className="mb-4">
           WordWise AI is an artificial intelligence-powered Wordle game. The logic of the game is based on guessing the 5-letter word in the correct order. With each guess, the correct letters are shown in the correct position (GREEN) and the correct letters in the wrong position (YELLOW). The AI ​​gives you clues via chat.
        </p>    
        <p className="mb-4">
           This game aims to compare artificial intelligence models and teach how to enter prompts.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onPlay}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Play
          </button>
          <button
            disabled
            className="px-6 py-2 bg-gray-400 text-white rounded opacity-50 cursor-not-allowed"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePanel;
