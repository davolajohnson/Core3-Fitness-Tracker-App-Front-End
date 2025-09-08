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

          <div style={{display:"flex", gap:".6rem"}}>
            <button className="btn" type="submit">Save Workout</button>
            <a className="btn btn--ghost" href="/workouts">Cancel</a>
          </div>
        </form>
      </div>
    </main>
  );
}