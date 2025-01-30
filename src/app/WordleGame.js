"use client";
import React, { useState } from "react";
import WordleChatPanel from "../components/WordleChatPanel";
import WordleBoard from "../components/WordleBoard";

function WordleGame() {
  // 5 satır x 5 sütun => 2 boyutlu array
  // Her row = ["", "", "", "", ""]
  // Toplam 5 row = 5 deneme
  const initialGuesses = Array(5).fill("").map(() => Array(5).fill(""));

  const [guesses, setGuesses] = useState(initialGuesses);
  const [currentRow, setCurrentRow] = useState(0);

  // WordleBoard'daki input değiştiğinde
  const handleGuessChange = (rowIndex, colIndex, value) => {
    // Manuel olarak ilgili kutuyu güncelle
    const updatedGuesses = [...guesses];
    // İç içe dizi kopyasını daha güvenli yapmak istersen slice kullanabilirsin
    updatedGuesses[rowIndex] = [...updatedGuesses[rowIndex]];

    updatedGuesses[rowIndex][colIndex] = value.toUpperCase();
    setGuesses(updatedGuesses);
  };

  // Soldaki panelden 5 harfli kelime gelince
  // 1) O kelimeyi mevcut satıra yaz
  // 2) Bir alt satıra geç (currentRow + 1)
  const handleWordParsed = (letters) => {
    // Örneğin letters = ["C","L","E","A","N"]
    if (currentRow < 5) {
      const updatedGuesses = [...guesses];
      updatedGuesses[currentRow] = letters;
      setGuesses(updatedGuesses);
      setCurrentRow(currentRow + 1); // Bir alt satıra geç
    }
  };

  return (
    <div style={{ 
      display: "flex", 
      height: "100vh", 
      fontFamily: "'Inter', sans-serif", 
      backgroundColor: "#f8fafc" 
    }}>
      {/* Sol taraf: Ollama Sohbet Arayüzü */}
      <WordleChatPanel onWordParsed={handleWordParsed} />

      {/* Sağ taraf: Wordle Oyunu */}
      <WordleBoard
        guesses={guesses}
        handleGuessChange={handleGuessChange}
      />
    </div>
  );
}

export default WordleGame;
