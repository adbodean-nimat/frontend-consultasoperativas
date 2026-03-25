import axios from "axios";
import { getToken, clearToken } from "./auth";
import { isTokenExpired } from "@/services/jwt";
import router from "@/router";

const api = axios.create({
  baseURL: process.env.VUE_APP_API, // ej: http://localhost:3000/api (o http://api.nimat.com.ar)
  timeout: 20000,
});

// Request: adjunta token
api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    if (isTokenExpired(token)) {
      clearToken("expired");
      router.replace({ name: "SessionExpired" });
      return Promise.reject(new Error("Token expirado"));
    }

    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

// Response: si 401/403 -> logout
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401 || status === 403) {
      clearToken("expired");
      router.replace({ name: "SessionExpired" });      
    }
    return Promise.reject(err);
  }
);

export default api;
