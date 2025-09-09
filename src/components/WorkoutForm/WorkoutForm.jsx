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
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const created = await createWorkout(form); // <-- API call
      onCreated?.(created);
      nav("/workouts");
    } catch (e) {
      setErr(e.message || "Failed to create workout");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="main">
      <div className="container">
        <form className="card stack form" onSubmit={handleSubmit}>
          <h2>New Workout</h2>
          {err && <div className="pill">⚠️ {err}</div>}

          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              className="input"
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <button className="btn" disabled={loading}>
            {loading ? "Saving..." : "Create Workout"}
          </button>
        </form>
      </div>
    </main>
  );
}
