"use client";
import React, { useState } from "react";
import { AppProvider, useApp } from "../context/AppContext";

import AiModelPanel from "../components/AiModelPanel";
import WordleChatPanel from "../components/WordleChatPanel";
import WordleBoard from "../components/WordleBoard";
import SettingsPanel from "../components/SettingsPanel";
import ResultPanel from "../components/ResultPanel";
import GameOverPanel from "../components/GameOverPanel";

export default function Home() {
  return (
    <AppProvider>
      <HomeContent />
    </AppProvider>
  );
}

function HomeContent() {
  const { darkMode } = useApp();

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

  // Panelleri yalnızca kapatmak için fonksiyonlar (oyun state'i korunuyor)
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
    // Oyun bitmediyse ve hâlâ 5 deneme hakkımız varsa
    if (currentRow < 5 && !gameWon && !gameLost) {
      // prompt/tahmin istatistiklerini güncelle
      setPromptCount((prev) => prev + 1);
      setAttemptCount((prev) => prev + 1);

      // guesses array'ini güncelle
      const updatedGuesses = [...guesses];
      updatedGuesses[currentRow] = letters;
      setGuesses(updatedGuesses);

      // renk kontrolü
      checkRow(currentRow, letters);

      // doğru kelimeyse
      if (letters.join("") === solution) {
        setGameWon(true);
      }

      // bir sonrakine geç
      const nextRow = currentRow + 1;
      setCurrentRow(nextRow);

      // 5. denemeden sonra hala doğru tahmin edilmediyse
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

      <SettingsPanel />

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
    </div>
  );
}
