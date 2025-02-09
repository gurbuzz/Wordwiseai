"use client";
import React from "react";

function ResultPanel({ promptCount, attemptCount, onRestart, darkMode }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`p-10 rounded-lg text-center ${
          darkMode
            ? "bg-gray-800 bg-opacity-90 text-white"
            : "bg-white bg-opacity-90 text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
        <p className="mb-2">You found the correct word.</p>
        <p className="mb-2">Prompts Sent: {promptCount}</p>
        <p className="mb-4">Word Attempts: {attemptCount}</p>
        <button
          onClick={onRestart}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Come Back
        </button>
      </div>
    </div>
  );
}

export default ResultPanel;
