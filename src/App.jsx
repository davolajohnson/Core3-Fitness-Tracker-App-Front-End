import "./App.css";
import { Routes, Route } from "react-router-dom";

// Components
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import WorkoutList from "./components/WorkoutList/WorkoutList";
import WorkoutForm from "./components/WorkoutForm/WorkoutForm";
import SignInForm from "./components/SignInForm/SignInForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import Dashboard from "./components/Dashboard/Dashboard";

// Example: user state could come from context or auth
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  const handleAddWorkout = async (formData) => {
    // Fake add for now
    const newWorkout = {
      _id: Date.now(),
      name: formData.name || "Untitled Workout",
      createdAt: new Date().toISOString(),
      exercises: [],
    };
    setWorkouts([newWorkout, ...workouts]);
  };

  return (
    <div className="app-shell">
      {/* Navbar */}
      <NavBar user={user} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/workouts" element={<WorkoutList workouts={workouts} />} />
        <Route
          path="/workouts/new"
          element={<WorkoutForm handleAddWorkout={handleAddWorkout} />}
        />
        <Route path="/sign-in" element={<SignInForm setUser={setUser} />} />
        <Route path="/sign-up" element={<SignUpForm setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>

      {/* Footer */}
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