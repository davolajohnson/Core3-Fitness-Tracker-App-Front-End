export default function Landing() {
  return (
    <main className="main">
      <div className="container hero">
        <section className="hero__panel">
          <h1>Welcome to <span>Core3</span> 🎯</h1>
          <p>Track workouts, visualize progress, and stay consistent. Simple, fast, and made for your daily flow.</p>
          <div className="mt-2">
            <a href="/sign-up" className="btn">Get Started</a>
            <a href="/workouts" className="btn btn--ghost" style={{ marginLeft: ".6rem" }}>Browse Workouts</a>
          </div>
          <div className="mt-3">
            <span className="pill">No ads</span>
            <span className="pill" style={{ marginLeft: ".5rem" }}>Privacy-first</span>
            <span className="pill" style={{ marginLeft: ".5rem" }}>Free plan</span>
          </div>
        </section>

        <aside className="card">
          <h3 className="mb-1">Today’s Snapshot</h3>
          <div className="grid" style={{ "--gap": "0.75rem" }}>
            <div className="surface" style={{ padding: "1rem" }}>
              <h3>Streak</h3>
              <p className="item__meta">4 days 🔥</p>
            </div>
            <div className="surface" style={{ padding: "1rem" }}>
              <h3>Last Workout</h3>
              <p className="item__meta">Upper body • 42m</p>
            </div>
            <div className="surface" style={{ padding: "1rem" }}>
              <h3>Volume (7d)</h3>
              <p className="item__meta">24,300 lbs</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}