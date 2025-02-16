"use client";
import React, { useState } from "react";
import { useApp } from "../context/AppContext";

import AiModelPanel from "../components/AiModelPanel";
import WordleChatPanel from "../components/WordleChatPanel";
import WordleBoard from "../components/WordleBoard";
import ResultPanel from "../components/ResultPanel";
import GameOverPanel from "../components/GameOverPanel";
import WelcomePanel from "../components/WelcomePanel";

export default function Home() {
  return <HomeContent />;
}

function HomeContent() {
  const { darkMode } = useApp();

  // İlk girişte WelcomePanel'in gösterilmesi için state
  const [showWelcome, setShowWelcome] = useState(true);

  // Wordle için gerekli state'ler
  const [guesses, setGuesses] = useState(
    Array(5)
      .fill("")
      .map(() => Array(5).fill(""))
  );
  const [colors, setColors] = useState(
    Array(5)
      .fill("")
      .map(() => Array(5).fill("WHITE"))
  );
  const [currentRow, setCurrentRow] = useState(0);

  // Örnek çözüm kelimesi
  const solution = "CLEAN";

  // İstatistik için state'ler
  const [promptCount, setPromptCount] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);

  // Oyun sonuç durumları
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  // Panelleri sadece kapatmak (oyun state'i resetlenmiyor)
  const closeWinPanel = () => {
    setGameWon(false);
  };
  const closeLosePanel = () => {
    setGameLost(false);
  };

  /**
   * Her satırdaki harflerin doğru/yanlış konumlarını renklendiren mantık.
   */
  const checkRow = (rowIndex, rowLettersParam) => {
    const rowLetters = rowLettersParam || guesses[rowIndex];
    const solutionArray = solution.split("");

    const solutionFreq = solutionArray.reduce((acc, char) => {
      acc[char] = (acc[char] || 0) + 1;
      return acc;
    }, {});

    let rowResult = Array(5).fill("WHITE");

    // GREEN kontrolü
    solutionArray.forEach((solutionChar, i) => {
      if (rowLetters[i] === solutionChar) {
        rowResult[i] = "GREEN";
        solutionFreq[solutionChar]--;
      }
    });

    // YELLOW kontrolü
    rowLetters.forEach((guessChar, i) => {
      if (rowResult[i] === "GREEN") return;
      if (solutionFreq[guessChar] > 0) {
        rowResult[i] = "YELLOW";
        solutionFreq[guessChar]--;
      }
    });

    setColors((prev) => {
      const newColors = prev.map((row) => [...row]);
      newColors[rowIndex] = rowResult;
      return newColors;
    });
  };

  /**
   * Yapay zekadan gelen 5 harfli tahmini yakalayan fonksiyon.
   */
  const handleWordParsed = (letters) => {
    if (currentRow < 5 && !gameWon && !gameLost) {
      setPromptCount((prev) => prev + 1);
      setAttemptCount((prev) => prev + 1);

      const updatedGuesses = [...guesses];
      updatedGuesses[currentRow] = letters;
      setGuesses(updatedGuesses);

      checkRow(currentRow, letters);

      if (letters.join("") === solution) {
        setGameWon(true);
      }

      const nextRow = currentRow + 1;
      setCurrentRow(nextRow);

      if (nextRow === 5 && letters.join("") !== solution) {
        setGameLost(true);
      }
    }
  };

  return (
    <div className={`h-screen flex flex-col ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* AI Model Paneli */}
            <div className="lg:w-1/5">
              <AiModelPanel />
            </div>

            {/* Sohbet Paneli (AI tahmin girişi) */}
            <div className="lg:w-1/3">
              <WordleChatPanel
                onWordParsed={handleWordParsed}
                darkMode={darkMode}
                gameOver={gameWon || gameLost}
              />
            </div>

            {/* Wordle Tahtası */}
            <div className="lg:w-1/2">
              <WordleBoard guesses={guesses} colors={colors} darkMode={darkMode} />
            </div>
          </div>
        </div>
      </main>

      {gameWon && (
        <ResultPanel
          promptCount={promptCount}
          attemptCount={attemptCount}
          onClose={closeWinPanel}
          darkMode={darkMode}
        />
      )}
      {gameLost && (
        <GameOverPanel
          solution={solution}
          promptCount={promptCount}
          attemptCount={attemptCount}
          onClose={closeLosePanel}
          darkMode={darkMode}
        />
      )}

      {/* İlk girişte gösterilecek WelcomePanel */}
      {showWelcome && (
        <WelcomePanel onPlay={() => setShowWelcome(false)} darkMode={darkMode} />
      )}
    </div>
  );
}
