import api from "./api";
import { setToken } from "./auth";
import store from "@/store";

export async function login(username, password) {
  // Ajustá el path y el body según tu backend
  const { data } = await api.post('/login', { username, password });
  console.log(data);
  // Supongamos que backend devuelve { token: "..." }
  if (!data?.token) throw new Error("No vino token");
  setToken(data.token);
  //setAvatar(data.avatar);
  //store.dispatch('login', { token: data.token, user: data.user });
  return data;
}
