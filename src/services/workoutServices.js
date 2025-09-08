// src/services/workoutServices.js
import { getAuthHeader } from "./authServices";

const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

// ---- Create workout (needs auth) ----
export async function createWorkout(payload) {
  const res = await fetch(`${BASE}/workouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(), // includes Bearer token
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.err || "Failed to create workout");
  }
  return data;
}

// ---- Fetch workouts (public list) ----
export async function fetchWorkouts() {
  const res = await fetch(`${BASE}/workouts`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.err || "Failed to fetch workouts");
  return data;
}
