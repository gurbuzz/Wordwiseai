import axios from "axios";

const OLLAMA_URL = "http://localhost:11434/api/generate";
// Örnek: .env dosyanda şöyle bir satır var:
// NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyDe... 

// chatService.js veya benzeri yerde:
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`;

// Basit log fonksiyonu
export const log = (type, message, data = null) => {
  console.log(`[${new Date().toISOString()}] [${type}] ${message}`, data || "");
};

/**
 * Ollama API Çağrısı
 */
export const sendOllamaChat = async (prompt) => {
  log("INFO", "Ollama chat started.", { prompt });

  // Ollama için kullanılan prefixInstruction
  const prefixInstruction =
    "If you are asked to test a word, then only respond with the word as your answer and nothing else. Otherwise, respond normally.";

  const finalPrompt = `${prefixInstruction}\n\nPrompt: ${prompt}`;

  const requestBody = {
    model: "llama3.1:8b",
    prompt: finalPrompt,
    stream: false,
    max_tokens: 300,
    options: {
      "temperature": 0.2
    },

  };

  log("DEBUG", "Ollama API request body", requestBody);

  try {
    log("INFO", "Sending request to Ollama API", { url: OLLAMA_URL });
    const response = await axios.post(OLLAMA_URL, requestBody, {
      headers: { "Content-Type": "application/json" },
    });

    log("INFO", "Received response from Ollama API", {
      status: response.status,
      data: response.data,
    });

    return response.data;
  } catch (error) {
    log("ERROR", "Error during Ollama API request", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw new Error(error.response?.data?.error || "Server error");
  }
};

/**
 * Gemini API Çağrısı
 */
export const sendGeminiChat = async (prompt) => {
  log("INFO", "Gemini chat started.", { prompt });

  // Ollama'daki prefixInstruction'ı Gemini'ye de uyguluyoruz
  const prefixInstruction =
    "If you are asked to test a word, then only respond with the word as your answer and nothing else. Otherwise, respond normally.";

  const finalPrompt = `${prefixInstruction}\n\nPrompt: ${prompt}`;  

  // Gemini isteği için gövde
  const requestBody = {
    contents: [
      {
        parts: [{ text: finalPrompt }],
      },
    ],
  };

  log("DEBUG", "Gemini API request body", requestBody);
  log("DEBUG", "Gemini API URL", GEMINI_API_URL);

  try {
    log("INFO", "Sending request to Gemini API", {
      url: GEMINI_API_URL,
      headers: { "Content-Type": "application/json" },
    });

    const response = await axios.post(GEMINI_API_URL, requestBody, {
      headers: { "Content-Type": "application/json" },
    });

    log("INFO", "Received response from Gemini API", {
      status: response.status,
      data: response.data,
    });

    return response.data;
  } catch (error) {
    log("ERROR", "Error during Gemini API request", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw new Error(error.response?.data?.error || "Server error");
  }
};

/**
 * Seçilen modele göre doğru API fonksiyonu çağıran fonksiyon
 */
export const sendChatRequest = async (selectedModel, prompt) => {
  log("INFO", "sendChatRequest called.", { selectedModel, prompt });
  if (selectedModel === "Gemini") {
    return await sendGeminiChat(prompt);
  } else {
    return await sendOllamaChat(prompt);
  }
};
