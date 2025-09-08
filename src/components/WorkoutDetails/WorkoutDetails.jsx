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
    <div></div>
  )
}

export default WorkoutDetails