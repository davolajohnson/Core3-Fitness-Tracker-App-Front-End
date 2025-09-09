import ExerciseForm from '../ExerciseForm/ExerciseForm'
import {useState} from 'react'
import { Link } from 'react-router'


export default function WorkoutForm({ handleAddWorkout }){
 
  const [exercises, setExercises] = useState([])
 
 
  const handleAddExercise = (exercise) => {
    const newExercise = {
      name: exercise.exname,
      sets: Number(exercise.sets),
      reps: Number(exercise.reps),
      weight: Number(exercise.weight || 0)
    };
    setExercises([...exercises, newExercise]);
  };
  
  async function onSubmit(e){
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const workout = {
      name: form.get("name"),
      date: form.get('date'),
      notes: form.get("notes"),
      duration: form.get('duration'),
      exercises
    };
    await handleAddWorkout(workout);
  }

  return (
    <main className="main">
      <div className="container">
        <form className="card stack" style={{"--gap":"1rem"}} onSubmit={onSubmit}>
          <h2>Create Workout</h2>

          <div className="form-row">
            <label htmlFor="name">Workout Name</label>
            <input 
            id="name" 
            name="name" 
            className="input" 
            placeholder="e.g., Push Day" 
            autoComplete="off"
            required />
          </div>
          <div className="form-row">
           <label htmlFor="date">Date</label>
          <input
          type="date"
          id="date"
          name="date"
          required
          defaultValue={new Date().toISOString().split('T')[0]} 
            />
          </div>

          <div className="form-row">
            <label htmlFor="notes">Notes</label>
            <textarea
             id="notes" 
             name="notes" 
             className="textarea" 
             rows="4" 
             placeholder="Optional…"
             autoComplete="off">
             </textarea>
          </div>
          <label htmlFor='duration'>Duration (minutes)</label>
           <input
          id='duration'
          name="duration"
          type='number'
          min='1'
          autoComplete="off"
          />

          <ExerciseForm handleAddExercise={handleAddExercise}/>
      {exercises.length > 0 && (
    <ul>
        <h3>Exercises:</h3>
      {exercises.map((ex, idx) => (
        <li key={idx}>
          {ex.name} — {ex.sets} sets × {ex.reps} reps {ex.weight > 0 && ` @ ${ex.weight} lbs`}
        </li>
      ))}
    </ul>
  )}
          <div style={{display:"flex", gap:".6rem"}}>
            <button className="btn" type="submit">Save Workout</button>
            <Link className="btn btn--ghost" to='/:userId/workouts'>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}