import {useState} from 'react'
import ExerciseForm from '../ExerciseForm/ExerciseForm'

const WorkoutForm = ({handleAddWorkout}) => {
    const [formData, setFormData] = useState({
        date: '',
        notes: '',
        duration: '',
      });
    const [exercises, setExercises] = useState([]);

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
      };
    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleAddWorkout(formData)
      };
      const handleAddExercise = (exercise) => {
        setExercises([...exercises, exercise]);
      };
 
 
 return (
   <main>
    <form onSubmit={handleSubmit}>
      <label htmlFor='date'>Date</label>  
      <input 
      required
      type='date'
      id='date'
      value={FormData.date}
      onChange={handleChange}
      />
      <label htmlFor='notes'>Notes</label>
      <textarea
      type='text'
      name='notes'
      id='notes'
      value={formData.notes}
      onChange={handleChange}
      />
      <label htmlFor='duration'>Duration (minutes)</label>
      <input
      id='duration'
      type='number'
      min='1'
      />

      <ExerciseForm handleAddExercise={handleAddExercise}/>
      {exercises.length > 0 && (
    <ul>
        <h3>Exercises:</h3>
      {exercises.map((ex, idx) => (
        <li key={idx}>
          {ex.name} — {ex.sets} sets × {ex.reps} reps @ {ex.weight} lbs
        </li>
      ))}
    </ul>
  )}
      <button type='submit'>Add</button>
    </form>
    </main>
  )
}

export default WorkoutForm