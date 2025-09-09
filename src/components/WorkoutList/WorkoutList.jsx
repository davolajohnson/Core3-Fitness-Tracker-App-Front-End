import { useEffect, useState } from "react";
import { listWorkouts } from "../../services/workoutServices";

export default function WorkoutList() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await listWorkouts();
        setItems(data);
      } catch (e) {
        setErr(e.message || "Failed to load workouts");
      }
    })();
  }, []);

  return (
    <main className="main">
      <div className="container">
        <h2 className="mb-2">All Workouts</h2>
        {err && <div className="pill">⚠️ {err}</div>}
        <div className="list">
          {items.map(w => (
            <div key={w._id} className="item">
              <div>
                <strong>{w.name}</strong>
                <div className="item__meta">
                  {new Date(w.createdAt).toLocaleString()}
                </div>
              </div>
              <div className="item__meta">{w.notes}</div>
            </div>
          ))}
          {!items.length && !err && <div className="card">No workouts yet.</div>}
        </div>
      </div>
    </main>
  );
}
