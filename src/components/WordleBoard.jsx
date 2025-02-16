"use client";
import React, { useState, useEffect } from "react";

const colorMap = {
  GREEN: "#22c55e",   // Yeşil
  YELLOW: "#facc15",  // Sarı
  // "WHITE" mapping'ini kaldırdık, çünkü boş hücrelerde dark mode kontrolünü ayrı yapacağız.
};

function AnimatedCell({ letter, colorKey, delay, darkMode }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(false);
    const timer = setTimeout(() => {
      setRevealed(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [letter, delay]);

  // Eğer colorKey "WHITE" ise (yani renklendirme yoksa) dark mode durumuna göre ayarla.
  const finalBgColor =
    colorKey === "WHITE"
      ? darkMode
        ? "#1e293b"
        : "#ffffff"
      : colorMap[colorKey] || (darkMode ? "#1e293b" : "#ffffff");

  const initialBgColor = darkMode ? "#1e293b" : "#ffffff";

  const cellStyle = {
    width: "64px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "700",
    border: darkMode ? "2px solid #374151" : "2px solid #e2e8f0",
    borderRadius: "12px",
    background: revealed ? finalBgColor : initialBgColor,
    color: darkMode ? "#e2e8f0" : "#1e293b",
    transition: "opacity 0.5s ease, background-color 0.5s ease",
    opacity: revealed ? 1 : 0,
    fontFamily: "inherit",
  };

  return <div style={cellStyle}>{revealed ? letter : ""}</div>;
}

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

  return (
    <div style={boardStyle}>
      <h2 style={headingStyle}>Find the Word Using the Chat Panel</h2>
      <div style={gridStyle}>
        {guesses.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "16px",
            }}
          >
            {row.map((letter, colIndex) => {
              const delay = colIndex * 300;
              return (
                <AnimatedCell
                  key={`${rowIndex}-${colIndex}-${letter}`}
                  letter={letter}
                  colorKey={colors[rowIndex][colIndex]}
                  delay={delay}
                  darkMode={darkMode}
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
