import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../../services/authServices";

export default function SignUpForm() {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", name: "" });
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");

    if (form.password !== confirm) {
      setErr("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await signUp(form);        // expects { username, password, name? }
      nav("/dashboard");         // or wherever you want to land
    } catch (e) {
      setErr(e.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="main">
      <div className="container">
        <form className="card stack form" onSubmit={handleSubmit} noValidate>
          <h2>Create Account</h2>

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
            <label htmlFor="name">Display Name (optional)</label>
            <input
              id="name"
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="input"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              id="confirm"
              className="input"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </button>

          <p className="mt-2">
            Already have an account? <Link to="/sign-in">Sign in</Link>
          </p>
        </form>
      </div>
    </main>
  );
}