"use client";
import React, { useState } from "react";
import { sendOllamaChat, log } from "../services/chatService";

// Harf harf kayan animasyonu uygulayan küçük bir bileşen
function SlidingText({ text }) {
  return (
    <div className="sliding-text-container">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="sliding-letter"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {char}
        </span>
      ))}
      <style jsx>{`
        .sliding-text-container {
          display: inline-block;
        }
        .sliding-letter {
          opacity: 0;
          transform: translateX(-20px);
          animation: slideIn 0.5s forwards;
        }
        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

function WordleChatPanel({ onWordParsed, darkMode }) {
  const [prompt, setPrompt] = useState("");
  const [promptResult, setPromptResult] = useState("");
  const [loading, setLoading] = useState(false);
  const WORKSPACE_SLUG = "deepseek";

  const parseWord = (response) => {
    if (!response) return "";
    let trimmed = response.trim();
    if (trimmed.endsWith(".")) {
      trimmed = trimmed.slice(0, -1);
    }
    return trimmed;
  };

  const handleTextareaKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault();
      handlePromptSubmit();
    }
  };

  const handlePromptSubmit = async () => {
    if (loading || !prompt.trim()) return;

    setLoading(true);
    try {
      const data = await sendOllamaChat(WORKSPACE_SLUG, {
        message: prompt,
        sessionId: "wordle-session"
      });

      if (data?.textResponse) {
        const responseText = data.textResponse;
        setPromptResult(responseText);

        const parsed = parseWord(responseText);
        if (parsed.length === 5) {
          onWordParsed(parsed.toUpperCase().split(""));
          setPrompt("");
        }
      } else if (data?.error) {
        setPromptResult(`Error: ${data.error}`);
      }
    } catch (error) {
      setPromptResult(error.message || "An error occurred. Please try again.");
      log("ERROR", "handlePromptSubmit error", error);
    } finally {
      setLoading(false);
    }
  };

  // Genel panel stili
  const panelStyle = {
    flex: 1,
    padding: "40px",
    borderRight: darkMode ? "1px solid #334155" : "1px solid #e2e8f0",
    backgroundColor: darkMode ? "#1e293b" : "#ffffff",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.08)",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  };

  // Girdi ve butonların bulunduğu bölüm
  const inputSectionStyle = {
    marginBottom: "24px",
  };

  // Textarea stili
  const textareaStyle = {
    width: "100%",
    height: "160px",
    marginBottom: "20px",
    padding: "16px",
    borderRadius: "12px",
    border: darkMode ? "1px solid #4b5563" : "1px solid #e2e8f0",
    fontSize: "18px",
    resize: "none",
    outline: "none",
    transition: "border-color 0.2s",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
    backgroundColor: darkMode ? "#374151" : "#ffffff",
    color: darkMode ? "#e2e8f0" : "#1e293b",
    fontFamily: "inherit",
  };

  // Buton stili
  const buttonStyle = {
    padding: "14px 28px",
    cursor: "pointer",
    backgroundColor: loading ? "#94a3b8" : (darkMode ? "#2563eb" : "#3b82f6"),
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "18px",
    transition: "background-color 0.2s",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
  };

  // Cevap (response) alanı stili
  const responseAreaStyle = {
    flex: 1,
    padding: "20px",
    background: darkMode ? "#374151" : "#f1f5f9",
    border: darkMode ? "1px solid #4b5563" : "1px solid #e2e8f0",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
    color: darkMode ? "#e2e8f0" : "#475569",
    fontSize: "18px",
    lineHeight: 1.6,
    overflowY: "auto",
  };

  return (
    <div style={panelStyle}>
      <div style={inputSectionStyle}>
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: darkMode ? "#e2e8f0" : "#1e293b",
            marginBottom: "24px"
          }}
        >
          Chat Panel
        </h2>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleTextareaKeyDown}
          placeholder="Enter your guess here..."
          style={textareaStyle}
          onFocus={(e) => e.target.style.borderColor = darkMode ? "#3b82f6" : "#3b82f6"}
          onBlur={(e) => e.target.style.borderColor = darkMode ? "#4b5563" : "#e2e8f0"}
        />
        <button
          onClick={handlePromptSubmit}
          style={buttonStyle}
          disabled={loading}
        >
          {loading ? "Waiting for Response..." : "Send"}
        </button>
      </div>

      {/* Cevap alanı: Eğer prompt gönderildiyse loading durumunda animasyonlu metin, değilse gerçek cevap */}
      <div style={responseAreaStyle}>
        {loading ? <SlidingText text="Awaiting response..." /> : (promptResult || "")}
      </div>
    </div>
  );
}

export default WordleChatPanel;
