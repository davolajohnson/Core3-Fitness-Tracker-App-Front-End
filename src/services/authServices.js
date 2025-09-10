// src/services/authServices.js
const BASE = (import.meta.env.VITE_BACK_END_SERVER_URL || "http://localhost:3001").replace(/\/+$/, "");

// ---- Token helpers ----
export function getToken() {
  return localStorage.getItem("token");
}
export function setToken(t) {
  localStorage.setItem("token", t);
}
export function signOut() {
  localStorage.removeItem("token");
}
export function authHeader() {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

// ---- Auth API calls ----
export async function signUp({ username, password, name }) {
  const res = await fetch(`${BASE}/auth/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, name })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.err || "Sign up failed");
  setToken(data.token);
  return data.user;
}

export async function signIn({ username, password }) {
  const res = await fetch(`${BASE}/auth/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.err || "Sign in failed");
  setToken(data.token);
  return data.user;
}

export async function fetchMe() {
  const res = await fetch(`${BASE}/auth/me`, { headers: { ...authHeader() } });
  if (!res.ok) return null;
  return res.json();
}
