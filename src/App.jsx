import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";

// Components
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import WorkoutList from "./components/WorkoutList/WorkoutList";
import WorkoutDetails from "./components/WorkoutDetails/WorkoutDetails"
import WorkoutForm from "./components/WorkoutForm/WorkoutForm";
import SignInForm from "./components/SignInForm/SignInForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import Dashboard from "./components/Dashboard/Dashboard";
import * as workoutService from './services/workoutService'

// Example: user state could come from context or auth
import { useState, useEffect } from "react";

export default function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([
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
    navigate(`/${workoutService._id}/workouts`)
  };

  return (
    <div className="app-shell">
      {/* Navbar */}
      <NavBar user={user} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/:userId/workouts" element={<WorkoutList workouts={workouts} />} />
        <Route
          path="/:userId/workouts/new"
          element={<WorkoutForm handleAddWorkout={handleAddWorkout} />}
        />
        <Route 
        path="/:userId/workouts/:workoutId"
        element={<WorkoutDetails />}
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