// src/components/Dashboard/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {index as listWorkouts } from "../../services/workoutService";

export default function Dashboard({ user }) {
  const name = user?.name || user?.username || "Athlete";

  const [recent, setRecent] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const data = await listWorkouts();     // already sorted newest -> oldest
        setRecent(data.slice(0, 3));           // show top 3
      } catch (e) {
        setErr(e.message || "Failed to load recent workouts");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const stats = [
    { label: "Current Streak", value: "4 days 🔥" },
    { label: "Workouts (7d)", value: "5 sessions" },
    { label: "Total Volume (7d)", value: "24,300 lbs" },
    { label: "Avg. Duration", value: "38 min" },
  ];

  return (
    <main className="main">
      <div className="container stack" style={{ "--gap": "1.25rem" }}>
        <div className="card">
          <h2 style={{ marginBottom: ".25rem" }}>Welcome back, {name} 👋</h2>
          <p className="item__meta">Here’s your snapshot and recent activity.</p>
          <div className="mt-2" style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
            <Link className="btn" to="/workouts/new">Start New Workout</Link>
            <Link className="btn btn--ghost" to="/workouts">View All Workouts</Link>
          </div>
        </div>

        <section className="grid" style={{ "--gap": "1rem" }}>
          {stats.map((s, i) => (
            <div key={i} className="surface" style={{ padding: "1rem" }}>
              <h3 style={{ marginBottom: ".25rem" }}>{s.label}</h3>
              <p className="item__meta">{s.value}</p>
            </div>
          ))}
        </section>

        <section className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
            <h2 style={{ margin: 0 }}>Recent Workouts</h2>
            <Link className="btn btn--ghost" to="/workouts">See All</Link>
          </div>

          {loading && <div className="mt-2 item__meta">Loading…</div>}
          {err && <div className="pill mt-2">⚠️ {err}</div>}

          {!loading && !err && (
            <div className="list mt-2">
              {recent.length === 0 ? (
                <div className="item">
                  <div>
                    <h3 style={{ margin: 0 }}>No recent workouts</h3>
                    <div className="item__meta">Create your first workout to see it here.</div>
                  </div>
                  <Link className="btn" to="/workouts/new">Start</Link>
                </div>
              ) : (
                recent.map((r) => (
                  <div key={r._id} className="item">
                    <div>
                      <h3 style={{ margin: 0 }}>{r.name}</h3>
                      <div className="item__meta">
                        {new Date(r.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <Link className="btn btn--ghost" to={`/workouts/${r._id}`}>Open</Link>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
