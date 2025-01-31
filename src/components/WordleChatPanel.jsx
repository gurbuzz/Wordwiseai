"use client";
import React, { useState } from "react";
import { sendOllamaChat, log } from "../services/chatService";

function WordleChatPanel({ onWordParsed }) {
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

  // Enter tuşu için yeni handler
  const handleTextareaKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault(); // Yeni satır eklemeyi engelle
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
          setPrompt(""); // Input'u temizle
        }
      } else if (data?.error) {
        setPromptResult(`Hata: ${data.error}`);
      }
    } catch (error) {
      setPromptResult(error.message || "An error occurred. Please try again.");
      log("ERROR", "handlePromptSubmit error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      flex: 1, 
      padding: "32px", 
      borderRight: "1px solid #e2e8f0", 
      backgroundColor: "#ffffff",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)"
    }}>
      <h2 style={{ 
        fontSize: "24px", 
        fontWeight: "600", 
        color: "#1e293b", 
        marginBottom: "24px" 
      }}>
        CHAT panel
      </h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleTextareaKeyDown} // Yeni eklenen satır
        placeholder="You can try words by entering the prompt"
        style={{ 
          width: "100%", 
          height: "120px", 
          marginBottom: "16px",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          fontSize: "16px",
          resize: "none",
          outline: "none",
          transition: "border-color 0.2s",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
        }}
        onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
        onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
      />
      <button
        onClick={handlePromptSubmit}
        style={{ 
          padding: "12px 24px",
          cursor: "pointer",
          backgroundColor: loading ? "#94a3b8" : "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          fontSize: "16px",
          transition: "background-color 0.2s",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }}
        disabled={loading}
      >
        {loading ? "Waiting for Response..." : "Send"}
      </button>
      
      {promptResult && (
        <div style={{
          marginTop: "24px",
          padding: "16px",
          background: "#f1f5f9",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
        }}>
          <h3 style={{ 
            fontSize: "18px", 
            fontWeight: "600", 
            color: "#1e293b", 
            marginBottom: "12px" 
          }}>
            Ollama Yanıtı:
          </h3>
          <div style={{ 
            whiteSpace: "pre-wrap",
            lineHeight: "1.6",
            color: "#475569",
            fontSize: "16px"
          }}>
            {promptResult}
          </div>
        </div>
      )}
    </div>
  );
}

export default WordleChatPanel;