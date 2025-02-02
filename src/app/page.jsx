"use client";
import { useApp } from "../context/AppContext";
import WordleChatPanel from "../components/WordleChatPanel";
import WordleBoard from "../components/WordleBoard";
import SettingsPanel from "../components/SettingsPanel";
import { useState } from "react";

// Sonuç paneli bileşeni: oyunu kazandığında overlay olarak açılır
function ResultPanel({ promptCount, attemptCount, onRestart, darkMode }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`p-10 rounded-lg text-center ${
          darkMode ? "bg-gray-800 bg-opacity-90 text-white" : "bg-white bg-opacity-90 text-gray-900"
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
          Play Again
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const { darkMode } = useApp();
  const [guesses, setGuesses] = useState(
    Array(5).fill("").map(() => Array(5).fill(""))
  );
  const [colors, setColors] = useState(
    Array(5).fill("").map(() => Array(5).fill("WHITE"))
  );
  const [currentRow, setCurrentRow] = useState(0);
  const solution = "CLEAN";

  // Yeni durumlar: prompt ve attempt sayıları, oyunun kazanılmış olması
  const [promptCount, setPromptCount] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const checkRow = (rowIndex, rowLettersParam) => {
    const rowLetters = rowLettersParam || guesses[rowIndex];
    const solutionArray = solution.split("");
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

    setColors((prevColors) => {
      const newColors = prevColors.map((row) => [...row]);
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
    if (currentRow < 5 && !gameWon) {
      // Her geçerli kelime denemesinde prompt ve attempt sayılarını artırıyoruz
      setPromptCount((prev) => prev + 1);
      setAttemptCount((prev) => prev + 1);

      const updatedGuesses = [...guesses];
      updatedGuesses[currentRow] = letters;
      setGuesses(updatedGuesses);
      checkRow(currentRow, letters);

      // Doğru kelime bulunduysa oyunu kazanmış oluyoruz
      if (letters.join("") === solution) {
        setGameWon(true);
      }

      setCurrentRow(currentRow + 1);
    }
  };

  // Oyunu sıfırlamak için
  const resetGame = () => {
    setGuesses(Array(5).fill("").map(() => Array(5).fill("")));
    setColors(Array(5).fill("").map(() => Array(5).fill("WHITE")));
    setCurrentRow(0);
    setPromptCount(0);
    setAttemptCount(0);
    setGameWon(false);
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
      {gameWon && (
        <ResultPanel
          promptCount={promptCount}
          attemptCount={attemptCount}
          onRestart={resetGame}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}
