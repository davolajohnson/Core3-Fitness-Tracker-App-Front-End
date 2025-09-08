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
import { useState, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      name: "Push Day",
      notes: "Focus on chest and triceps",
      exercises: [
        { name: "Bench Press", sets: 4, reps: 8, weight: 185 },
        { name: "Overhead Press", sets: 3, reps: 10, weight: 95 },
        { name: "Tricep Dips", sets: 3, reps: 12 }
      ]
    },
    {
      id: 2,
      name: "Leg Day",
      notes: "Heavy compound lifts",
      exercises: [
        { name: "Squat", sets: 5, reps: 5, weight: 225 },
        { name: "Lunges", sets: 3, reps: 12, weight: 50 },
        { name: "Calf Raises", sets: 4, reps: 20 }
      ]
    }
  ]);

  useEffect(() => {
    const fetchAllWorkouts = async () => {
      const workoutsData = await workoutService.index()
      setWorkouts(workoutsData)
    }
    if(user) fetchAllWorkouts()    
  }, [user])
  const handleAddWorkout = async (formData) => {
    const newWorkout = await workoutService.create(formData)
    setWorkouts([newWorkout, ...workouts])
    navigate('/workouts')
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