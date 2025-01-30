"use client";
import React, { useState } from "react";
import { sendOllamaChat, log } from "../services/chatService"; // Ollama fonksiyonunu içe aktar

function WordleGame() {
  const [prompt, setPrompt] = useState("");
  const [promptResult, setPromptResult] = useState("");
  const [guesses, setGuesses] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const WORKSPACE_SLUG = "deepseek"; // Sabit workspace slug

  // Gelen yanıttan 5 harfli bir kelimeyi ayıklayan basit yardımcı fonksiyon
  const parseWord = (response) => {
    if (!response) return "";
    // Önce baştaki/sondaki boşlukları temizle
    let trimmed = response.trim();

    // Sona nokta varsa çıkaralım
    if (trimmed.endsWith(".")) {
      trimmed = trimmed.slice(0, -1);
    }

    // Geriye kalan kelimeyi döndürelim
    return trimmed;
  };

  const handlePromptSubmit = async () => {
    setLoading(true);
    try {
      const data = await sendOllamaChat(WORKSPACE_SLUG, {
        message: prompt,
        sessionId: "wordle-session" // Oturum ID'sini sabit tut
      });

      if (data?.textResponse) {
        const responseText = data.textResponse;
        setPromptResult(responseText);

        // Burada otomatik olarak wordle tahmin kutucuklarını dolduruyoruz
        const parsed = parseWord(responseText);
        // Kelime tam 5 harfse ve sadece harflerden oluşuyorsa dolduralım
        if (parsed.length === 5) {
          setGuesses(parsed.toUpperCase().split(""));
        }
      } else if (data?.error) {
        setPromptResult(`Hata: ${data.error}`);
      } else {
        setPromptResult("Geçersiz yanıt formatı alındı.");
      }
    } catch (error) {
      setPromptResult(error.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
      log("ERROR", "handlePromptSubmit hata", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGuessChange = (index, value) => {
    const newGuesses = [...guesses];
    newGuesses[index] = value.toUpperCase();
    setGuesses(newGuesses);
  };

  return (
    <div style={{ 
      display: "flex", 
      height: "100vh", 
      fontFamily: "'Inter', sans-serif", 
      backgroundColor: "#f8fafc" 
    }}>
      {/* Sol taraf: Ollama Sohbet Arayüzü */}
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
          Ollama Sohbet
        </h2>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ollama'ya sorunuzu yazın..."
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
          {loading ? "Yanıt Bekleniyor..." : "Ollama'ya Sor"}
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

      {/* Sağ taraf: Wordle Oyunu */}
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
    </div>
  );
}

export default WordleGame;
