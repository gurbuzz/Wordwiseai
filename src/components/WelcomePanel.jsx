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
          WordWise AI is a daily AI-powered word-guessing challenge. Each day, 
          there's a single secret word determined by the server. You have a 
          limited number of attempts to guess it, and each guess counts as a 
          prompt. The fewer prompts and attempts you use, the higher your 
          position on the leaderboard.
        </p>
        <p className="mb-4">
          With each guess, letters in the correct position are shown in 
          <span className="font-bold text-green-600"> GREEN</span>, and 
          correct letters in the wrong position appear in 
          <span className="font-bold text-yellow-500"> YELLOW</span>. 
          Letters not in the word are shown in gray. Our AI can provide hints 
          to guide you through the game.
        </p>
        <p className="mb-4">
          Whether you're logged in or just playing as a guest, you can enjoy 
          the puzzle. However, only registered users can permanently save 
          stats and compete for the top ranks. Have fun exploring different AI 
          models and see how they help improve your guessing strategy.
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
