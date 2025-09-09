import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signIn } from "../../services/authServices";
import { UserContext } from "../../contexts/UserContext";

export default function SignInForm() {
  const nav = useNavigate();
  const { setUser } = useContext(UserContext);

  const [form, setForm] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const signedInUser = await signIn(form); // expects { username, password }
      setUser(signedInUser);                  // update context immediately
      nav(`/${signedInUser._id}/workouts`);   // redirect to user-specific dashboard
    } catch (e) {
      setErr(e.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="main">
      <div className="container">
        <form className="card stack form" onSubmit={handleSubmit} noValidate>
          <h2>Sign In</h2>

          {err && <div className="pill" role="alert">⚠️ {err}</div>}

          <div className="form-row">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="input"
              autoComplete="username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="input"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="mt-2">
            Don’t have an account? <Link to="/sign-up">Create one</Link>
          </p>
        </form>
      </div>
    </main>
  );
}