"use client";
import React from "react";

function WordleBoard({ guesses, handleGuessChange }) {
  return (
    <div style={{ 
      flex: 1, 
      padding: "32px", 
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
    }}>
      <h2 style={{ 
        fontSize: "24px", 
        fontWeight: "600", 
        color: "#1e293b", 
        marginBottom: "24px" 
      }}>
        Wordle Oyunu
      </h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "12px",
        maxWidth: "320px",
        margin: "0 auto"
      }}>
        {guesses.map((guess, index) => (
          <input
            key={index}
            value={guess}
            onChange={(e) => handleGuessChange(index, e.target.value)}
            maxLength="1"
            style={{
              width: "56px",
              height: "56px",
              textAlign: "center",
              fontSize: "24px",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              background: "#ffffff",
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
        ))}
      </div>
    </div>
  );
}

export default WordleBoard;
