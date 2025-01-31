"use client";
import React from "react";

function SettingsPanel({ darkMode, setDarkMode, isLoggedIn, setIsLoggedIn, onClose }) {
  // Overlay container: tüm ekranı kaplar, hafif saydam siyah arka plan
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // yarı saydam siyah
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Panel: overlay üzerinde ortalanmış, hafif saydam arka plan (dark mode'a göre değişiyor)
  const panelStyle = {
    width: "350px",
    padding: "40px",
    backgroundColor: darkMode ? "rgba(30, 41, 59, 0.9)" : "rgba(255, 255, 255, 0.9)",
    color: darkMode ? "#e2e8f0" : "#1e293b",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    position: "relative",
  };

  const headingStyle = {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "16px",
  };

  const labelStyle = {
    fontSize: "16px",
    fontWeight: "500",
    marginBottom: "8px",
  };

  const controlGroupStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const buttonStyle = {
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: darkMode ? "#2563eb" : "#3b82f6",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    transition: "background-color 0.2s",
    marginTop: "8px",
  };

  const checkboxStyle = {
    width: "20px",
    height: "20px",
  };

  return (
    // Tüm overlay'e tıklanınca kapatabilmek için overlay div'ine onClick ekliyoruz.
    <div style={overlayStyle} onClick={onClose}>
      {/* Panelin içine tıklanması durumunda overlay'in kapanmaması için stopPropagation */}
      <div style={panelStyle} onClick={(e) => e.stopPropagation()}>
        <h2 style={headingStyle}>Settings</h2>
        <div style={controlGroupStyle}>
          <label style={labelStyle}>Dark Mode</label>
          <input
            type="checkbox"
            style={checkboxStyle}
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
        </div>
        <div style={controlGroupStyle}>
          <label style={labelStyle}>User Login</label>
          {isLoggedIn ? (
            <button style={buttonStyle} onClick={() => setIsLoggedIn(false)}>
              Logout
            </button>
          ) : (
            <button style={buttonStyle} onClick={() => setIsLoggedIn(true)}>
              Login
            </button>
          )}
        </div>
        <button style={buttonStyle} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default SettingsPanel;
