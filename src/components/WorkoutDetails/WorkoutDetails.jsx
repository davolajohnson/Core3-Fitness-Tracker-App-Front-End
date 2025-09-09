import {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router'
import * as workoutService from '../../services/workoutService'
import { UserContext } from '../../contexts/UserContext'
const WorkoutDetails = ({handleDeleteWorkout}) => {
    const { workoutId } = useParams();
    
    console.log('workoutId', workoutId)
    const [workout, setWorkout] = useState(null)
    const { user } = useContext(UserContext);
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
        <button onClick={() => handleDeleteWorkout(workout._id)}>Delete Workout</button>
      </div>
    ) : (
      <p>Loading workout...</p>
    )}
  </div>
  )
}

export default WorkoutDetails