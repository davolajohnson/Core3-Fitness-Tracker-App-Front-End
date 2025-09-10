// src/services/workoutServices.js
const BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3001").replace(/\/+$/, "");

export function getToken() {
  return localStorage.getItem("token");
}
export function authHeader() {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

// List my workouts
export async function listWorkouts() {
  const res = await fetch(`${BASE}/workouts`, {
    headers: { ...authHeader() }
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.err || "Failed to fetch workouts");
  return data;
}

export async function getWorkoutById(id) {
  const res = await fetch(`${BASE}/workouts/${id}`, {
    headers: { ...authHeader() },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.err || "Failed to fetch workout");
  return data;
}

export async function createWorkout(payload) {
  const res = await fetch(`${BASE}/workouts`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.err || "Failed to create workout");
  return data;
}

export async function deleteWorkout(id) {
  const res = await fetch(`${BASE}/workouts/${id}`, {
    method: "DELETE",
    headers: { ...authHeader() },
  });
  if (res.status === 204) return true;
  const data = await res.json().catch(() => ({}));
  throw new Error(data.err || "Failed to delete workout");
}
