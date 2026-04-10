import api from "./api";
import { setToken } from "./auth";

export async function login(username, password) {
  // Ajustá el path y el body según tu backend
  const { data } = await api.post('/login', { username, password });
  
  // Supongamos que backend devuelve { token: "..." }
  if (!data?.token) throw new Error("No vino token");
  setToken(data.token);
  
  return data;
}
