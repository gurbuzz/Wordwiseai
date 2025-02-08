import React, { useState } from "react";
import { sendOllamaChat, log } from "../services/chatService";
import { useApp } from "../context/AppContext";

const ChatComponent = () => {
  const { sessionId } = useApp();
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendPrompt = async () => {
    if (!prompt.trim()) {
      setResponse("Lütfen geçerli bir mesaj girin.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await sendOllamaChat(prompt);
      if (data?.response) {
        setResponse(data.response);
      } else if (data?.error) {
        setResponse(`Hata: ${data.error}`);
      }
    } catch (error) {
      setResponse(`Hata: ${error.message}`);
      log("ERROR", "İstek hatası", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="input-section">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Mesajınızı yazın..."
          disabled={isLoading}
        />
        <button onClick={handleSendPrompt} disabled={isLoading}>
          {isLoading ? "Gönderiliyor..." : "Gönder"}
        </button>
      </div>

      {response && (
        <div className="response-section">
          <h3>Yanıt:</h3>
          <div className="response-content">{response}</div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
