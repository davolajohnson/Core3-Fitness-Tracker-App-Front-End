// src/services/authServices.js
const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

// token helpers
export function getToken() {
  return localStorage.getItem("token");
}
export function signOut() {
  localStorage.removeItem("token");
}
export function getAuthHeader() {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

// sign up / sign in (you already have these)
export async function signUp({ username, password, name }) {
  const res = await fetch(`${BASE}/auth/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, name })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.err || "Sign up failed");
  localStorage.setItem("token", data.token);
  return data.user;
}

export async function signIn({ username, password }) {
  const res = await fetch(`${BASE}/auth/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.err || "Sign in failed");
  localStorage.setItem("token", data.token);
  return data.user;
}
