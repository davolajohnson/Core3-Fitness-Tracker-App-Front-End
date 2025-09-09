import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "./contexts/UserContext";

import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import WorkoutList from "./components/WorkoutList/WorkoutList";
import WorkoutDetails from "./components/WorkoutDetails/WorkoutDetails";
import WorkoutForm from "./components/WorkoutForm/WorkoutForm";
import SignInForm from "./components/SignInForm/SignInForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import Dashboard from "./components/Dashboard/Dashboard";

import * as workoutService from "./services/workoutService";

export default function App() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);

  // Load workouts if user exists
  useEffect(() => {
    const fetchAllWorkouts = async () => {
      if (!user) return;
      const workoutsData = await workoutService.index();
      setWorkouts(workoutsData);
    };
    fetchAllWorkouts();
  }, [user]);

  const handleAddWorkout = async (formData) => {
    if (!user) return;
    const newWorkout = await workoutService.create(formData);
    setWorkouts([newWorkout, ...workouts]);
    navigate(`/${user._id}/workouts`);
  };

  const handleDeleteWorkout = async (workoutId) => {
    try {
      await workoutService.deleteWorkout(workoutId);
      setWorkouts(workouts.filter((w) => w._id !== workoutId));
      navigate(`/${user?._id || ""}/workouts`);
    } catch (err) {
      console.error("Failed to delete workout:", err);
    }
  };

  return (
    <div className="app-shell">
      <NavBar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/:userId/workouts" element={<WorkoutList workouts={workouts} />} />
        <Route path="/:userId/workouts/new" element={<WorkoutForm handleAddWorkout={handleAddWorkout} />} />
        <Route path="/:userId/workouts/:workoutId" element={<WorkoutDetails handleDeleteWorkout={handleDeleteWorkout} />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
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