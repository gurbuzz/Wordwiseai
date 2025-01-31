"use client";
import React from "react";

const colorMap = {
  GREEN: "#22c55e",   // Green
  YELLOW: "#facc15",  // Yellow
  WHITE: "#ffffff",   // White
};

function WordleBoard({ guesses, colors, darkMode }) {
  const boardStyle = {
    flex: 1,
    padding: "40px",
    backgroundColor: darkMode ? "#1e293b" : "#ffffff",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.08)",
    borderRadius: "12px",
  };

  const headingStyle = {
    fontSize: "28px",
    fontWeight: "700",
    color: darkMode ? "#e2e8f0" : "#1e293b",
    marginBottom: "28px",
  };

  const gridStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "400px",
    margin: "0 auto",
  };

  const cellStyle = (bgColor) => ({
    width: "64px",
    height: "64px",
    textAlign: "center",
    fontSize: "28px",
    border: darkMode ? "2px solid #374151" : "2px solid #e2e8f0",
    borderRadius: "12px",
    background: bgColor,
    color: darkMode ? "#e2e8f0" : "#1e293b",
    fontWeight: "700",
    transition: "border-color 0.2s, box-shadow 0.2s",
    outline: "none",
    fontFamily: "inherit",
  });

  return (
    <div style={boardStyle}>
      <h2 style={headingStyle}>
        Find the Word Using the Chat Panel
      </h2>
      
      <div style={gridStyle}>
        {guesses.map((row, rowIndex) => (
          <div 
            key={rowIndex}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "16px"
            }}
          >
            {row.map((letter, colIndex) => {
              const colorKey = colors[rowIndex][colIndex];
              const bgColor = colorMap[colorKey] || (darkMode ? "#1e293b" : "#ffffff");

              return (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  value={letter}
                  readOnly
                  maxLength="1"
                  style={cellStyle(bgColor)}
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
