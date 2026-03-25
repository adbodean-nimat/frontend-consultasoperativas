const TOKEN_KEY = "auth_token";
const LOGOUT_REASON_KEY = "logout_reason";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.removeItem(LOGOUT_REASON_KEY);
}

export function clearToken(reason = "") {
  localStorage.removeItem(TOKEN_KEY);

  if (reason) {
    localStorage.setItem(LOGOUT_REASON_KEY, reason);
  } else {
    localStorage.removeItem(LOGOUT_REASON_KEY);
  }
}

export function getLogoutReason() {
  return localStorage.getItem(LOGOUT_REASON_KEY);
}

export function clearLogoutReason() {
  localStorage.removeItem(LOGOUT_REASON_KEY);
}

export function isAuthed() {
  return !!getToken();
}
