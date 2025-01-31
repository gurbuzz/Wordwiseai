// /home/ata/Projects/wordwise-ai/src/components/WordleBoard.jsx
"use client";
import React from "react";

const colorMap = {
  GREEN: "#22c55e",   // Yeşil
  YELLOW: "#facc15", // Sarı
  WHITE: "#ffffff",  // Renksiz
};

function WordleBoard({ guesses, colors, handleGuessChange }) {
  return (
    <div 
      style={{ 
        flex: 1, 
        padding: "32px", 
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
      }}
    >
      <h2 
        style={{ 
          fontSize: "24px", 
          fontWeight: "600", 
          color: "#1e293b", 
          marginBottom: "24px" 
        }}
      >
        Find the word using the CHAT panel
      </h2>
      
      {/* 5 satır x 5 sütun */}
      <div 
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "320px",
          margin: "0 auto"
        }}
      >
        {guesses.map((row, rowIndex) => (
          <div 
            key={rowIndex}
            style={{ 
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "12px"
            }}
          >
            {row.map((letter, colIndex) => {
              // colors parametresi de 5x5’lik bir 2D array
              const colorKey = colors[rowIndex][colIndex]; // "GREEN", "YELLOW", "WHITE"
              const bgColor = colorMap[colorKey] || "#ffffff";

              return (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  value={letter}
                  onChange={(e) => handleGuessChange(rowIndex, colIndex, e.target.value)}
                  maxLength="1"
                  style={{
                    width: "56px",
                    height: "56px",
                    textAlign: "center",
                    fontSize: "24px",
                    border: "2px solid #e2e8f0",
                    borderRadius: "8px",
                    background: bgColor,
                    color: "#1e293b",
                    fontWeight: "600",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    outline: "none"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WordleBoard;
