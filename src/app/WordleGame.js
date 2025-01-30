"use client";
import React, { useState } from "react";
import WordleChatPanel from "../components/WordleChatPanel";
import WordleBoard from "../components/WordleBoard";

function WordleGame() {
  // 5 satır x 5 sütun
  const initialGuesses = Array(5).fill("").map(() => Array(5).fill(""));
  const initialColors = Array(5).fill("").map(() => Array(5).fill("WHITE"));

  const [guesses, setGuesses] = useState(initialGuesses);
  const [colors, setColors] = useState(initialColors);
  const [currentRow, setCurrentRow] = useState(0);

  // Sabit hedef kelime (Tümü büyük harf)
  const solution = "CLEAN";

  // === 1) Satır Kontrol Fonksiyonu ===
  // Burada "2-pass" algoritması kullanıyoruz.
  const checkRow = (rowIndex, rowLettersParam) => {
    // Parametreden gelen rowLetters'ı kullan veya state'ten al
    const rowLetters = rowLettersParam || guesses[rowIndex];
    const solutionArray = solution.split(''); // Çözümü harf dizisine çevir
  
    // Derin kopya ile frekans objesi oluştur
    const solutionFreq = solutionArray.reduce((acc, char) => {
      acc[char] = (acc[char] || 0) + 1;
      return acc;
    }, {});
  
    let rowResult = Array(5).fill("WHITE");
  
    // 1. Pass: Yeşil eşleşmeler
    solutionArray.forEach((solutionChar, i) => {
      if (rowLetters[i] === solutionChar) {
        rowResult[i] = "GREEN";
        solutionFreq[solutionChar]--; // Kullanılan harfin frekansını azalt
      }
    });
  
    // 2. Pass: Sarı eşleşmeler
    rowLetters.forEach((guessChar, i) => {
      if (rowResult[i] === "GREEN") return;
      
      // Çözümde harf varsa ve frekans > 0 ise sarı yap
      if (solutionFreq[guessChar] > 0) {
        rowResult[i] = "YELLOW";
        solutionFreq[guessChar]--;
      }
    });
  
    // State'i güvenli şekilde güncelle
    setColors(prevColors => {
      const newColors = prevColors.map(row => [...row]);
      newColors[rowIndex] = rowResult;
      return newColors;
    });
  };

  // === 2) Kullanıcı manuel yazdığında ===
// Kelime panelden geldiğinde
const handleWordParsed = (letters) => {
  if (currentRow < 5) {
    const updatedGuesses = [...guesses];
    updatedGuesses[currentRow] = letters;
    setGuesses(updatedGuesses);
    
    // GÜNCELLEME: Yeni harfleri parametre olarak gönder
    checkRow(currentRow, letters); 
    setCurrentRow(currentRow + 1);
  }
};

// Kullanıcı manuel giriş yaptığında
const handleGuessChange = (rowIndex, colIndex, value) => {
  const updatedGuesses = [...guesses];
  updatedGuesses[rowIndex] = [...updatedGuesses[rowIndex]];
  updatedGuesses[rowIndex][colIndex] = value.toUpperCase();
  setGuesses(updatedGuesses);

  // GÜNCELLEME: Güncel satırı parametre olarak gönder
  if (updatedGuesses[rowIndex].every(Boolean)) {
    checkRow(rowIndex, updatedGuesses[rowIndex]);
  }
};

  return (
    <div 
      style={{ 
        display: "flex", 
        height: "100vh", 
        fontFamily: "'Inter', sans-serif", 
        backgroundColor: "#f8fafc" 
      }}
    >
      {/* Sol taraf: Ollama Sohbet Arayüzü */}
      <WordleChatPanel onWordParsed={handleWordParsed} />

      {/* Sağ taraf: Wordle Oyunu */}
      <WordleBoard
        guesses={guesses}
        colors={colors}
        handleGuessChange={handleGuessChange}
      />
    </div>
  );
}

export default WordleGame;
