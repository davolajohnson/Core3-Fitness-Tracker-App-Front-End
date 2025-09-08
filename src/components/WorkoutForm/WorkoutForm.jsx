import ExerciseForm from '../ExerciseForm/ExerciseForm'
import {useState} from 'react'


export default function WorkoutForm({ handleAddWorkout }){
  async function onSubmit(e){
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const workout = {
      name: form.get("name"),
      notes: form.get("notes")
    };
    await handleAddWorkout(workout);
  }
  const [exercises, setExercises] = useState([])
  const handleAddExercise = (exercise) => {
    setExercises([...exercises, exercise]);
  };


  return (
    <main className="main">
      <div className="container">
        <form className="card stack" style={{"--gap":"1rem"}} onSubmit={onSubmit}>
          <h2>Create Workout</h2>

          <div className="form-row">
            <label htmlFor="name">Workout Name</label>
            <input id="name" name="name" className="input" placeholder="e.g., Push Day" required />
          </div>

          <div className="form-row">
            <label htmlFor="notes">Notes</label>
            <textarea id="notes" name="notes" className="textarea" rows="4" placeholder="Optional…"></textarea>
          </div>
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
          {ex.name} — {ex.sets} sets × {ex.reps} reps {ex.weight > 0 && ` @ ${ex.weight} lbs`}
        </li>
      ))}
    </ul>
  )}
          <div style={{display:"flex", gap:".6rem"}}>
            <button className="btn" type="submit">Save Workout</button>
            <a className="btn btn--ghost" href="/workouts">Cancel</a>
          </div>
        </form>
      </div>
    </main>
  );
}