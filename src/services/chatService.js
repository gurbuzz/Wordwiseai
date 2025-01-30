// services/chatService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/v1/workspace'; // Dikkat: workspace (tekil)

const API_KEY = 'QQ199VG-D5F48RE-NRM0EZ7-B9YZSFW'; // Eğer gerekiyorsa

export const log = (type, message, data = null) => {
  console.log(`[${new Date().toISOString()}] [${type}] ${message}`, data || '');
};

// Güncellenmiş Ollama Sohbet Fonksiyonu
export const sendOllamaChat = async (workspaceSlug, body = {}) => {
  log('INFO', `Ollama sohbeti başlatılıyor: ${workspaceSlug}`, body);

  try {
    const response = await axios.post(
      `${BASE_URL}/${workspaceSlug}/chat`,
      {
        ...body,
        mode: 'chat' // Workspace konfigürasyonuyla uyumlu
      },
      {
        headers: {
          'Content-Type': 'application/json',
          ...(API_KEY && { Authorization: `Bearer ${API_KEY}` }) // Opsiyonel
        }
      }
    );

    log('INFO', 'Başarılı yanıt', response.data);
    return response.data;
  } catch (error) {
    log('ERROR', 'API hatası', {
      status: error.response?.status,
      data: error.response?.data
    });
    throw new Error(error.response?.data?.error || 'Sunucu hatası');
  }
};