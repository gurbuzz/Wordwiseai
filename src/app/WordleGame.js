"use client";
import React, { useState } from "react";
import WordleChatPanel from "../components/WordleChatPanel";
import WordleBoard from "../components/WordleBoard";

function WordleGame() {
  // 5 kutu için:
  // const [guesses, setGuesses] = useState(["", "", "", "", ""]);

  // 25 kutu için:
  const [guesses, setGuesses] = useState(Array(25).fill(""));
  
  // Senin Wordle dizin kaç kutu olacaksa, ona göre ayarla. 
  // Bu örnekte 5 kutu tutalım:
  //const [guesses, setGuesses] = useState(["", "", "", "", ""]);


  // ChatPanel'den 5 harfli kelime gelince guesses'i otomatik doldur.
  const handleWordParsed = (letters) => {
    setGuesses(letters);
  };

  // WordleBoard'daki input değiştiğinde
  const handleGuessChange = (index, value) => {
    const newGuesses = [...guesses];
    newGuesses[index] = value.toUpperCase();
    setGuesses(newGuesses);
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
