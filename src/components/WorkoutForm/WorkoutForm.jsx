<<<<<<< HEAD
import ExerciseForm from '../ExerciseForm/ExerciseForm'
import {useState} from 'react'


export default function WorkoutForm({ handleAddWorkout }){
  async function onSubmit(e){
=======
// src/components/WorkoutForm/WorkoutForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWorkout } from "../../services/workoutServices";

export default function WorkoutForm({ onCreated }) {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    notes: "",
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
>>>>>>> dj/css
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const newWorkout = await createWorkout({
        name: form.name,
        notes: form.notes,
      });

      // if parent wants to update state immediately
      if (onCreated) onCreated(newWorkout);

      // go somewhere after create
      nav("/workouts");
    } catch (e) {
      // Common case: 401 from backend when no/invalid token
      setErr(e.message || "Could not create workout");
    } finally {
      setLoading(false);
    }
  }
  const [exercises, setExercises] = useState([])
  const handleAddExercise = (exercise) => {
    setExercises([...exercises, exercise]);
  };


  return (
    <main className="main">
      <div className="container">
        <form className="card stack form" onSubmit={handleSubmit}>
          <h2>New Workout</h2>

          {err && <div className="pill" role="alert">⚠️ {err}</div>}

          <div className="form-row">
            <label htmlFor="name">Workout Name</label>
            <input
              id="name"
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g., Push Day, Leg Day"
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              className="input"
              rows={4}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Optional notes..."
            />
          </div>
          <label htmlFor='duration'>Duration (minutes)</label>
           <input
          id='duration'
          type='number'
          min='1'
          />

<<<<<<< HEAD
          <ExerciseForm handleAddExercise={handleAddExercise}/>
      {exercises.length > 0 && (
    <ul>
        <h3>Exercises:</h3>
      {exercises.map((ex, idx) => (
        <li key={idx}>
          {ex.name} — {ex.sets} sets × {ex.reps} reps {ex.weight > 0 && ` @ ${ex.weight} lbs`}
        </li>
      ))}
    </ul>
  )}
          <div style={{display:"flex", gap:".6rem"}}>
            <button className="btn" type="submit">Save Workout</button>
            <a className="btn btn--ghost" href="/workouts">Cancel</a>
          </div>
=======
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Create Workout"}
          </button>

          <p className="mt-2">
            (You must be signed in to create a workout.)
          </p>
>>>>>>> dj/css
        </form>
      </div>
    </main>
  );
}
