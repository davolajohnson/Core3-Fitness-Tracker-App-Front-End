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
    

      console.log('workout state:', workout);
      const handleDeleteExercise = async (workoutId, exerciseId) => {
        try {
          await workoutService.deleteExercise(workoutId, exerciseId);

          setWorkout(prev => ({
            ...prev,
            exercises: prev.exercises.filter(ex => ex._id !== exerciseId),
          }));
        } catch (err) {
          console.error("Failed to delete exercise", err);
        }
      };
      const deleteExercise = (exerciseIndex) => {
        setWorkout((prev) => ({
          ...prev,
          exercises: prev.exercises.filter((_, i) => i !== exerciseIndex),
        }));
      };

  return (
<div>
  {workout ? (
    <div>
      <h2>{new Date(workout.date).toLocaleDateString()}</h2>
      <p>Notes: {workout.notes}</p>
      <p>Duration: {workout.duration} minutes</p>

      <h3>Exercises ({workout.exercises?.length || 0})</h3>
      {workout.exercises && workout.exercises.length > 0 ? (
        <ul>
          {workout.exercises.map((ex, idx) => (
            <li key={idx}>
              <strong>{ex.name}</strong> — {ex.sets} sets × {ex.reps} reps
              {ex.weight > 0 && ` @ ${ex.weight} lbs`}
              <button 
                onClick={() => deleteExercise(idx)} 
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No exercises added.</p>
      )}

      <button onClick={() => handleDeleteWorkout(workout._id)}>
        Delete Workout
      </button>
    </div>
  ) : (
    <p>Loading workout...</p>
  )}
</div>
  )
}

export default WorkoutDetails