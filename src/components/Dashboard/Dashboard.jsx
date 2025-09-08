// src/components/Dashboard/Dashboard.jsx
export default function Dashboard({ user }) {
  const name = user?.name || "Athlete";

  const stats = [
    { label: "Current Streak", value: "4 days 🔥" },
    { label: "Workouts (7d)", value: "5 sessions" },
    { label: "Total Volume (7d)", value: "24,300 lbs" },
    { label: "Avg. Duration", value: "38 min" },
  ];

  const recent = [
    { id: 1, name: "Push Day", when: "Today · 42m · 6 exercises" },
    { id: 2, name: "Leg Day", when: "Tue · 55m · 5 exercises" },
    { id: 3, name: "Pull Day", when: "Sun · 40m · 5 exercises" },
  ];

  return (
    <main className="main">
      <div className="container stack" style={{ "--gap": "1.25rem" }}>
        <div className="card">
          <h2 style={{ marginBottom: ".25rem" }}>Welcome back, {name} 👋</h2>
          <p className="item__meta">Here’s your snapshot and recent activity.</p>
          <div className="mt-2" style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
            <a className="btn" href="/workouts/new">Start New Workout</a>
            <a className="btn btn--ghost" href="/workouts">View All Workouts</a>
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
            <a className="btn btn--ghost" href="/workouts">See All</a>
          </div>

          <div className="list mt-2">
            {recent.map(r => (
              <div key={r.id} className="item">
                <div>
                  <h3 style={{ margin: 0 }}>{r.name}</h3>
                  <div className="item__meta">{r.when}</div>
                </div>
                <a className="btn btn--ghost" href={`/workouts/${r.id}`}>Open</a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
