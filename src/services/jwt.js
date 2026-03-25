export function decodeJwt(jwtToken) {
  try {
    const payload = jwtToken.split(".")[1];
    
    return { 
      token: JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))).token,  
      user: JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))).user, 
      avatar: JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))).avatar,
      exp: JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))).exp
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function isTokenExpired(token) {
  if (!token) return true;

  const payload = decodeJwt(token);
  if (!payload?.exp) return false; // si no trae exp, no lo consideramos vencido acá

  const nowInSeconds = Math.floor(Date.now() / 1000);
  return payload.exp <= nowInSeconds;
}
