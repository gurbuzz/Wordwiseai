"use client";
import { useApp } from "../context/AppContext";
import WordleChatPanel from "../components/WordleChatPanel";
import WordleBoard from "../components/WordleBoard";
import SettingsPanel from "../components/SettingsPanel";
import { useEffect, useState } from "react";

export default function Home() {
  const { darkMode } = useApp();
  const [guesses, setGuesses] = useState(Array(5).fill("").map(() => Array(5).fill("")));
  const [colors, setColors] = useState(Array(5).fill("").map(() => Array(5).fill("WHITE")));
  const [currentRow, setCurrentRow] = useState(0);
  const solution = "CLEAN";

  const checkRow = (rowIndex, rowLettersParam) => {
    const rowLetters = rowLettersParam || guesses[rowIndex];
    const solutionArray = solution.split('');
    const solutionFreq = solutionArray.reduce((acc, char) => {
      acc[char] = (acc[char] || 0) + 1;
      return acc;
    }, {});

    let rowResult = Array(5).fill("WHITE");

    solutionArray.forEach((solutionChar, i) => {
      if (rowLetters[i] === solutionChar) {
        rowResult[i] = "GREEN";
        solutionFreq[solutionChar]--;
      }
    });

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

  const handleGuessChange = (rowIndex, colIndex, value) => {
    const updatedGuesses = [...guesses];
    updatedGuesses[rowIndex] = [...updatedGuesses[rowIndex]];
    updatedGuesses[rowIndex][colIndex] = value.toUpperCase();
    setGuesses(updatedGuesses);

    if (updatedGuesses[rowIndex].every(Boolean)) {
      checkRow(rowIndex, updatedGuesses[rowIndex]);
    }
  };

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
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-1/3">
              <WordleChatPanel onWordParsed={handleWordParsed} darkMode={darkMode} />
            </div>
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
      <SettingsPanel />
    </div>
  );
}