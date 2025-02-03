import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1/workspace";
const API_KEY = "QQ199VG-D5F48RE-NRM0EZ7-B9YZSFW";

export const log = (type, message, data = null) => {
  console.log(`[${new Date().toISOString()}] [${type}] ${message}`, data || "");
};

export const sendOllamaChat = async (workspaceSlug, body = {}) => {
  log("INFO", `Ollama sohbeti başlatılıyor: ${workspaceSlug}`, body);

  try {
    const response = await axios.post(
      `${BASE_URL}/${workspaceSlug}/chat`,
      {
        ...body,
        mode: "chat",
      },
      {
        headers: {
          "Content-Type": "application/json",
          ...(API_KEY && { Authorization: `Bearer ${API_KEY}` }),
        },
      }
    );

    log("INFO", "Başarılı yanıt", response.data);
    return response.data;
  } catch (error) {
    log("ERROR", "API hatası", {
      status: error.response?.status,
      data: error.response?.data,
    });
    throw new Error(error.response?.data?.error || "Sunucu hatası");
  }
};
