import axios from "axios";
import { getToken, clearToken } from "./auth";
import router from "@/router";

const api = axios.create({
  baseURL: process.env.VUE_APP_API, // ej: http://localhost:3000/api (o http://api.nimat.com.ar)
  timeout: 20000,
});

// Request: adjunta token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response: si 401/403 -> logout
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401 || status === 403) {
      clearToken();
      // opcional: guardar a dónde quiso ir
      router.replace({ name: "Login", query: { redirect: router.currentRoute.value.fullPath } });
    }
    return Promise.reject(err);
  }
);

export default api;
