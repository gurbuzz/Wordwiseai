"use client";
import React, { useState } from "react";
import WordleChatPanel from "../components/WordleChatPanel";
import WordleBoard from "../components/WordleBoard";
import SettingsPanel from "../components/SettingsPanel";

function WordleGame() {
  // Game states
  const initialGuesses = Array(5).fill("").map(() => Array(5).fill(""));
  const initialColors = Array(5).fill("").map(() => Array(5).fill("WHITE"));
  
  const [guesses, setGuesses] = useState(initialGuesses);
  const [colors, setColors] = useState(initialColors);
  const [currentRow, setCurrentRow] = useState(0);
  const solution = "CLEAN";

  // New state for dark mode, login and settings panel control
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Function to check a row's guess against the solution
  const checkRow = (rowIndex, rowLettersParam) => {
    const rowLetters = rowLettersParam || guesses[rowIndex];
    const solutionArray = solution.split('');
    const solutionFreq = solutionArray.reduce((acc, char) => {
      acc[char] = (acc[char] || 0) + 1;
      return acc;
    }, {});

    let rowResult = Array(5).fill("WHITE");

    // First pass: Green matches (correct letter and position)
    solutionArray.forEach((solutionChar, i) => {
      if (rowLetters[i] === solutionChar) {
        rowResult[i] = "GREEN";
        solutionFreq[solutionChar]--;
      }
    });

    // Second pass: Yellow matches (correct letter, wrong position)
    rowLetters.forEach((guessChar, i) => {
      if (rowResult[i] === "GREEN") return;
      if (solutionFreq[guessChar] > 0) {
        rowResult[i] = "YELLOW";
        solutionFreq[guessChar]--;
      }
    });

    setColors(prevColors => {
      const newColors = prevColors.map(row => [...row]);
      newColors[rowIndex] = rowResult;
      return newColors;
    });
  };

  // Handler for input changes
  const handleGuessChange = (rowIndex, colIndex, value) => {
    const updatedGuesses = [...guesses];
    updatedGuesses[rowIndex] = [...updatedGuesses[rowIndex]];
    updatedGuesses[rowIndex][colIndex] = value.toUpperCase();
    setGuesses(updatedGuesses);

    if (updatedGuesses[rowIndex].every(Boolean)) {
      checkRow(rowIndex, updatedGuesses[rowIndex]);
    }
  };

  // Handler when a word is parsed from the chat panel
  const handleWordParsed = (letters) => {
    if (currentRow < 5) {
      const updatedGuesses = [...guesses];
      updatedGuesses[currentRow] = letters;
      setGuesses(updatedGuesses);
      checkRow(currentRow, letters);
      setCurrentRow(currentRow + 1);
    }
  };

  return (
    <div className={`h-screen flex flex-col ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Top Navigation Bar */}
      <nav className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm fixed w-full z-10`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Left Side - Logo */}
            <div className="flex-1 text-center">
              <span className={`text-3xl font-bold ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>
                WORDWISE AI
              </span>
            </div>

            {/* Right Side - Navigation */}
            <div className="flex items-center space-x-6">
              <button 
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsLoggedIn(!isLoggedIn)}
              >
                <span className={`${darkMode ? "text-gray-200" : "text-gray-600"}`}>
                  {isLoggedIn ? "Logout" : "Login"}
                </span>
              </button>
              <button 
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setShowSettings(true)}
              >
                <svg 
                  className={`w-7 h-7 ${darkMode ? "text-gray-200" : "text-gray-600"}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Chat Panel */}
            <div className="lg:w-1/3">
              <WordleChatPanel onWordParsed={handleWordParsed} darkMode={darkMode} />
            </div>
            {/* Game Board */}
            <div className="flex-1">
              <WordleBoard
                guesses={guesses}
                colors={colors}
                handleGuessChange={handleGuessChange}
                darkMode={darkMode}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default WordleGame;
