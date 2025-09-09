// src/App.jsx
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import WorkoutList from "./components/WorkoutList/WorkoutList";
import WorkoutForm from "./components/WorkoutForm/WorkoutForm";
import SignInForm from "./components/SignInForm/SignInForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import Dashboard from "./components/Dashboard/Dashboard";
import WorkoutDetail from "./components/WorkoutDetail/WorkoutDetail";
import SignOut from "./components/Auth/SignOut";

import { useAuth } from "./context/AuthContext";
import { listWorkouts } from "./services/workoutServices";

export default function App() {
  const { user, hydrating } = useAuth();
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    (async () => {
      if (!user) {
        setWorkouts([]);
        return;
      }
      try {
        const data = await listWorkouts();
        setWorkouts(data);
      } catch (e) {
        console.error("Failed to load workouts:", e);
      }
    })();
  }, [user]);

  const handleCreated = (createdFromApi) => {
    setWorkouts((ws) => [createdFromApi, ...ws]);
  };

  const handleDeleted = (id) => {
    setWorkouts((ws) => ws.filter((w) => w._id !== id));
  };

  if (hydrating) return <p>Loading...</p>;

  return (
    <div className="app-shell">
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/workouts"
          element={<WorkoutList workouts={workouts} onDeleted={handleDeleted} />}
        />
        <Route path="/workouts/new" element={<WorkoutForm onCreated={handleCreated} />} />
        <Route path="/workouts/:id" element={<WorkoutDetail />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-out" element={<SignOut />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
      <footer className="footer">
        <div className="container footer__brand">
          <span className="footer__logoText">Core3</span>
          <span className="footer__dot">•</span>
          <span>Train. Track. Transform.</span>
        </div>
      </footer>
    </div>
  );
}
