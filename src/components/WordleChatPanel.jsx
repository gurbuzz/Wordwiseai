"use client";
import React, { useState } from "react";
// Ollama yerine bu sefer sendChatRequest'i import ediyoruz
import { sendChatRequest, log } from "../services/chatService";
import { useApp } from "../context/AppContext";
import ChatInput from "./ChatInput";
import ChatOutput from "./ChatOutput";

const WordleChatPanel = ({ onWordParsed, darkMode, gameOver }) => {
  const [prompt, setPrompt] = useState("");
  const [promptResult, setPromptResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // AppContext'ten refreshChat ve selectedModel'i alıyoruz
  const { refreshChat, selectedModel } = useApp();

  // Ollama veya Gemini cevabını Wordle mantığına uygun parse edecek fonksiyon
  const parseWord = (response) => {
    if (!response) return "";
    let trimmed = response.trim();
    if (trimmed.endsWith(".")) {
      trimmed = trimmed.slice(0, -1);
    }
    return trimmed;
  };

  // Enter'a basınca otomatik gönderim
  const handleTextareaKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !loading && !gameOver) {
      e.preventDefault();
      handlePromptSubmit();
    }
  };

  // Asıl chat gönderim fonksiyonu
  const handlePromptSubmit = async () => {
    if (loading || !prompt.trim() || gameOver) return;
    setLoading(true);
    try {
      // Seçilen modele göre Ollama veya Gemini API çağrısı
      const data = await sendChatRequest(selectedModel, prompt);

      // Loglayalım ki ham veriyi görelim
      console.log("Ham veri:", data);

      // Ortak bir yanıt değişkeni
      let responseText = "";

      if (selectedModel === "Gemini") {
        // Gemini yanıt yapısı -> candidates[0].content.parts[0].text
        const candidate = data?.candidates?.[0];
        if (candidate?.content?.parts?.[0]?.text) {
          responseText = candidate.content.parts[0].text;
        } else {
          responseText = "Gemini’den beklenmeyen yapı veya boş yanıt.";
        }
      } else {
        // Ollama (ya da başka model) -> data.response
        if (data?.response) {
          responseText = data.response;
        } else if (data?.error) {
          responseText = `Error: ${data.error}`;
        } else {
          responseText = "Ollama’dan beklenmeyen yapı veya boş yanıt.";
        }
      }

      setPromptResult(responseText);

      // Wordle mantığı: 5 harfli kelimeyse onWordParsed
      const parsed = parseWord(responseText);
      if (parsed.length === 5) {
        onWordParsed(parsed.toUpperCase().split(""));
        setPrompt("");
      }
    } catch (error) {
      setPromptResult(error.message || "An error occurred. Please try again.");
      log("ERROR", "handlePromptSubmit error", error);
    } finally {
      setLoading(false);
    }
  };

  // Chat'i yenile
  const handleRefresh = () => {
    if (gameOver) return;
    setIsRefreshing(true);
    refreshChat();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Senin eski stil ayarlarını aynen koruyoruz
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

  return (
    <div style={panelStyle}>
      <h2
        style={{
          fontSize: "28px",
          fontWeight: "700",
          color: darkMode ? "#e2e8f0" : "#1e293b",
          marginBottom: "24px",
        }}
      >
        Chat Panel
      </h2>
      <ChatInput
        prompt={prompt}
        onPromptChange={setPrompt}
        onSend={handlePromptSubmit}
        onRefresh={handleRefresh}
        onTextareaKeyDown={handleTextareaKeyDown}
        loading={loading}
        isRefreshing={isRefreshing}
        darkMode={darkMode}
        disabled={gameOver}
      />
      <ChatOutput
        promptResult={promptResult}
        loading={loading}
        darkMode={darkMode}
      />
    </div>
  );
};

export default WordleChatPanel;
