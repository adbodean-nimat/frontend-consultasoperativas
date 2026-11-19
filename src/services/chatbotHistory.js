import api from './api';
import { chatId, listParams, detailParams, validateList, validateDetail } from '@/utils/chatbotHistory';

// Solo el backend interno conoce la URL y la credencial del chatbot.
// Usa el cliente autenticado del sitio, sin cookies adicionales.
export function createChatbotHistoryService(http) {
  const options = signal => ({ signal, timeout: 15000, withCredentials: false, headers: { 'Cache-Control': 'no-cache, no-store' } });
  return {
    async list(params, signal) {
      const { data } = await http.get('/api/chatbot/chats', { ...options(signal), params: listParams(params) });
      return validateList(data);
    },
    async detail(id, before, signal) {
      const validId = chatId(id);
      const { data } = await http.get(`/api/chatbot/chats/${encodeURIComponent(validId)}`, { ...options(signal), params: detailParams(before) });
      return validateDetail(data, validId);
    },
  };
}

export const chatbotHistory = createChatbotHistoryService(api);
