"use client";
import React, { useState } from "react";
import WordleChatPanel from "../components/WordleChatPanel";
import WordleBoard from "../components/WordleBoard";

function WordleGame() {
  // Oyun state'leri
  const initialGuesses = Array(5).fill("").map(() => Array(5).fill(""));
  const initialColors = Array(5).fill("").map(() => Array(5).fill("WHITE"));
  
  const [guesses, setGuesses] = useState(initialGuesses);
  const [colors, setColors] = useState(initialColors);
  const [currentRow, setCurrentRow] = useState(0);
  const solution = "CLEAN";

  // Satır kontrol fonksiyonu
  const checkRow = (rowIndex, rowLettersParam) => {
    const rowLetters = rowLettersParam || guesses[rowIndex];
    const solutionArray = solution.split('');
    const solutionFreq = solutionArray.reduce((acc, char) => {
      acc[char] = (acc[char] || 0) + 1;
      return acc;
    }, {});

    let rowResult = Array(5).fill("WHITE");

    // 1. Pass: Yeşil eşleşmeler
    solutionArray.forEach((solutionChar, i) => {
      if (rowLetters[i] === solutionChar) {
        rowResult[i] = "GREEN";
        solutionFreq[solutionChar]--;
      }
    });

    // 2. Pass: Sarı eşleşmeler
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

  // Input değişiklik handler'ı
  const handleGuessChange = (rowIndex, colIndex, value) => {
    const updatedGuesses = [...guesses];
    updatedGuesses[rowIndex] = [...updatedGuesses[rowIndex]];
    updatedGuesses[rowIndex][colIndex] = value.toUpperCase();
    setGuesses(updatedGuesses);

    if (updatedGuesses[rowIndex].every(Boolean)) {
      checkRow(rowIndex, updatedGuesses[rowIndex]);
    }
  };

  // Kelime parse edildiğinde
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
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Sol Taraf - Logo */}
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-indigo-600">WORDWISE AI</span>
            </div>

            {/* Sağ Taraf - Navigasyon */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-gray-600">Login</span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <svg 
                  className="w-6 h-6 text-gray-600" 
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
      <main className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sohbet Paneli */}
            <div className="lg:w-96">
              <WordleChatPanel onWordParsed={handleWordParsed} />
            </div>
            {/* Oyun Tahtası */}
            <div className="flex-1">
              <WordleBoard
                guesses={guesses}
                colors={colors}
                handleGuessChange={handleGuessChange}
              />
            </div>


          </div>
        </div>
      </main>
    </div>
  );
}

export default WordleGame;