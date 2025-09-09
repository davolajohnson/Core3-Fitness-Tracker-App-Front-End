import {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import * as workoutService from '../../services/workoutService'

const WorkoutDetails = () => {
    const { workoutId } = useParams();
    console.log('workoutId', workoutId)
    const [workout, setWorkout] = useState(null)
    useEffect(() => {
        const fetchWorkout = async () => {
          const workoutData = await workoutService.show(workoutId);
          setWorkout(workoutData);
        };
        fetchWorkout();
      }, [workoutId]);
    
      // Verify the hoot state is set correctly:
      console.log('workout state:', workout);

  return (
    <div>
    {workout ? (
      <div>
        <h2>{new Date(workout.date).toLocaleDateString()}</h2>
        <p>Notes: {workout.notes}</p>
        <p>Duration: {workout.duration} minutes</p>
        <p>Exercises: {workout.exercises?.length || 0}</p>
      </div>
    ) : (
      <p>Loading workout...</p>
    )}
  </div>
  )
}

export default WorkoutDetails