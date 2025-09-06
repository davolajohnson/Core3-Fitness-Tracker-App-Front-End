import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import WorkoutList from './components/WorkoutList/WorkoutList';
import WorkoutForm from './components/WorkoutForm/WorkoutForm';
import * as workoutService from './services/workoutService'

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate()
  const [workouts, setWorkouts] = useState([
    {
      _id: '1',
      date: '2025-09-01',
      notes: 'Leg day! Squats and lunges',
      duration: 45,
    },
    {
      _id: '2',
      date: '2025-09-02',
      notes: 'Chest + Triceps workout',
      duration: 60,
    },
  ])

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
  }
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/workouts/new' element={<WorkoutForm handleAddWorkout={handleAddWorkout} />} />
        <Route path='/workouts' element={<WorkoutList workouts={workouts}/>} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
      </Routes>
    </>
  );
};

export default App;
