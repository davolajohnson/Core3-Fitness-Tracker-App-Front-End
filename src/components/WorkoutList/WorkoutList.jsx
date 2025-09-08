export default function WorkoutList({ workouts = [] }) {
  return (
    <main className="main">
      <div className="container stack" style={{ "--gap": "1.25rem" }}>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Your Workouts</h2>
            <a className="btn" href="/workouts/new">New Workout</a>
          </div>
        </div>

        <div className="list">
          {workouts.length === 0 && (
            <div className="card">
              <p>No workouts yet. Click <strong>New Workout</strong> to add your first session.</p>
            </div>
          )}

          {workouts.map(w => (
            <div key={w._id} className="item">
              <div>
                <h3 style={{ margin: 0 }}>{w.name}</h3>
                <div className="item__meta">
                  {new Date(w.createdAt).toLocaleDateString()} · {w.exercises?.length || 0} exercises
                </div>
              </div>
              <a className="btn btn--ghost" href={`/workouts/${w._id}`}>Open</a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}