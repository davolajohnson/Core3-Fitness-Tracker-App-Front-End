// // src/services/workoutServices.js
// const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

// // small helpers reused across services
// export function getToken() {
//   return localStorage.getItem("token");
// }
// export function authHeader() {
//   const t = getToken();
//   return t ? { Authorization: `Bearer ${t}` } : {};
// }

// // CREATE workout
// export async function createWorkout(payload) {
//   const res = await fetch(`${BASE}/workouts`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json", ...authHeader() },
//     body: JSON.stringify(payload),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.err || "Failed to create workout");
//   return data; // the created workout
// }

// // LIST workouts (for the signed-in user)
// export async function listWorkouts() {
//   const res = await fetch(`${BASE}/workouts`, {
//     headers: { ...authHeader() },
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.err || "Failed to fetch workouts");
//   return data; // array
// }
