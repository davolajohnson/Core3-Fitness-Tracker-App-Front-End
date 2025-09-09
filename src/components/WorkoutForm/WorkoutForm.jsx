import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExerciseForm from "../ExerciseForm/ExerciseForm";

export default function WorkoutForm({ handleAddWorkout, user }) {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    notes: "",
    date: new Date().toISOString().split("T")[0],
    duration: "",
  });
  const [exercises, setExercises] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddExercise = (exercise) => {
    const newExercise = {
      name: exercise.exname,
      sets: Number(exercise.sets),
      reps: Number(exercise.reps),
      weight: Number(exercise.weight || 0),
    };
    setExercises([...exercises, newExercise]);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setErr("");
    setLoading(true);

    try {
      const workout = {
        ...form,
        exercises,
        date: new Date(form.date).getTime(),
        duration: Number(form.duration),
      };
      await handleAddWorkout(workout);
      nav(`/${user._id}/workouts`);
    } catch (error) {
      setErr(error.message || "Failed to save workout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main">
      <div className="container">
        <form className="card stack form" onSubmit={handleSubmit}>
          <h2>New Workout</h2>
          {err && <div className="pill">⚠️ {err}</div>}

          <div className="form-row">
            <label htmlFor="name">Workout Name</label>
            <input
              id="name"
              name="name"
              className="input"
              placeholder="e.g., Push Day"
              autoComplete="off"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              className="textarea"
              rows="4"
              placeholder="Optional…"
              autoComplete="off"
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="duration">Duration (minutes)</label>
            <input
              id="duration"
              name="duration"
              type="number"
              min="1"
              value={form.duration}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <ExerciseForm handleAddExercise={handleAddExercise} />

          {exercises.length > 0 && (
            <ul>
              <h3>Exercises:</h3>
              {exercises.map((ex, idx) => (
                <li key={idx}>
                  {ex.name} — {ex.sets} sets × {ex.reps} reps{" "}
                  {ex.weight > 0 && ` @ ${ex.weight} lbs`}
                </li>
              ))}
            </ul>
          )}

          <div style={{ display: "flex", gap: ".6rem" }}>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Workout"}
            </button>
            <Link
              className="btn btn--ghost"
              to={user ? `/${user._id}/workouts` : "/"}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

