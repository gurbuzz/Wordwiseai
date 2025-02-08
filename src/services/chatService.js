import axios from "axios";

const OLLAMA_URL = "http://localhost:11434/api/generate";

export const log = (type, message, data = null) => {
  console.log(`[${new Date().toISOString()}] [${type}] ${message}`, data || "");
};

export const sendOllamaChat = async (prompt) => {
  log("INFO", "Ollama chat started.", { prompt });

  const prefixInstruction = "If you are asked to test a word, then only respond with the word as your answer and nothing else. Otherwise, respond normally.";
  const finalPrompt = `${prefixInstruction}\n\nPrompt: ${prompt}`;

  const requestBody = {
    model: "llama3.1:8b",
    prompt: finalPrompt,
    stream: false,
    max_tokens: 300,
  };

  log("DEBUG", "Ollama API request body", requestBody);

  try {
    log("INFO", "Sending request to Ollama API", { url: OLLAMA_URL });
    const response = await axios.post(OLLAMA_URL, requestBody, {
      headers: { "Content-Type": "application/json" },
    });
    log("INFO", "Received response from Ollama API", response.data);
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
