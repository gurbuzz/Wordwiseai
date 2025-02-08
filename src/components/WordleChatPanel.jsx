"use client";
import React, { useState } from "react";
import { sendOllamaChat, log } from "../services/chatService";
import { useApp } from "../context/AppContext";
import ChatInput from "./ChatInput";
import ChatOutput from "./ChatOutput";

const WordleChatPanel = ({ onWordParsed, darkMode }) => {
  const [prompt, setPrompt] = useState("");
  const [promptResult, setPromptResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { refreshChat } = useApp();

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
      const data = await sendOllamaChat(prompt);
      if (data?.response) {
        const responseText = data.response;
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

  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshChat();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

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
      />
      <ChatOutput promptResult={promptResult} loading={loading} darkMode={darkMode} />
    </div>
  );
};

export default WordleChatPanel;
