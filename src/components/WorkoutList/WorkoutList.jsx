// src/components/WorkoutList/WorkoutList.jsx
import { Link } from "react-router-dom";
import { deleteWorkout } from "../../services/workoutService";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function WorkoutList({ workouts, onDeleted }) {
  const [error, setError] = useState("");
  const { user } = useContext(UserContext);

  if (!workouts || workouts.length === 0) {
    return (
      <main className="main">
        <div className="container">No workouts yet. Start a new one!</div>
      </main>
    );
  }

  async function handleDelete(e, id) {
    e.preventDefault();
    setError("");
    try {
      await deleteWorkout(id);
      onDeleted?.(id);
    } catch (err) {
      setError(err.message || "Failed to delete workout");
    }
  }

  return (
    <main className="main">
      <div className="container">
        <h2>Your Workouts</h2>
        {error && <div className="pill mt-1">⚠️ {error}</div>}
        <ul className="list mt-2">
          {workouts.map((w) => (
            <li key={w._id}>
              <Link to={`/${user._id}/workouts/${w._id}`} className="item" style={{ textDecoration: "none" }}>
                <div>
                  <div className="item__title">{w.name}</div>
                  <div className="item__meta">{new Date(w.createdAt).toLocaleString()}</div>
                </div>
                {/* <div style={{ display: "flex", gap: ".5rem" }}>
                  <Link className="btn btn--ghost" to={`/workouts/${w._id}`}>Open</Link>
                  <button className="btn btn--warn" onClick={(e) => handleDelete(e, w._id)}>Delete</button>
                </div> */}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
