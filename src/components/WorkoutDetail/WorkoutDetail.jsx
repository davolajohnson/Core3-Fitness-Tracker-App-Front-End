// src/components/WorkoutDetail/WorkoutDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getWorkoutById } from "../../services/workoutServices";

export default function WorkoutDetail() {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const data = await getWorkoutById(id);
        setWorkout(data);
      } catch (e) {
        setErr(e.message || "Failed to load workout");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <main className="main"><div className="container">Loading…</div></main>;
  if (err) return <main className="main"><div className="container"><div className="pill">⚠️ {err}</div></div></main>;
  if (!workout) return <main className="main"><div className="container">Not found.</div></main>;

  return (
    <main className="main">
      <div className="container">
        <div className="card">
          <h2 style={{ marginBottom: "0.5rem" }}>{workout.name}</h2>
          <div className="item__meta mb-2">
            Created {new Date(workout.createdAt).toLocaleString()}
          </div>
          {workout.notes && <p>{workout.notes}</p>}

          <div className="mt-2">
            <Link className="btn btn--ghost" to="/workouts">← Back to workouts</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
