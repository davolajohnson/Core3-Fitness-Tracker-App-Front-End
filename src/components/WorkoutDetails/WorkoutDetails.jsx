// src/components/WorkoutDetails/WorkoutDetails.jsx
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import * as workoutService from "../../services/workoutService";
import ExerciseForm from "../ExerciseForm/ExerciseForm";

export default function WorkoutDetails({ handleDeleteWorkout }) {
  const { workoutId } = useParams();
  const { user } = useContext(UserContext);
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    notes: "",
    date: new Date().toISOString().split("T")[0],
    duration: "",
  });
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Load workout data
  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const workoutData = await workoutService.show(workoutId);
        console.log("Workout fetched:", workoutData);

        // Map API fields to form fields
        const dateStr = workoutData.date
          ? new Date(workoutData.date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0];

        setForm({
          name: workoutData.name || workoutData.workout_name || "",
          notes: workoutData.notes || "",
          date: dateStr,
          duration: workoutData.duration || "",
        });

        setExercises(workoutData.exercises || []);
      } catch (error) {
        console.error(error);
        setErr("Failed to load workout");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [workoutId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddExercise = (exercise) => {
    const newEx = {
      name: exercise.exname,
      sets: Number(exercise.sets),
      reps: Number(exercise.reps),
      weight: Number(exercise.weight || 0),
    };
    setExercises([...exercises, newEx]);
  };

  const handleDeleteExercise = (idx) => {
    setExercises((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setErr("");
    setLoading(true);

    try {
      const updatedWorkout = {
        ...form,
        exercises,
        date: new Date(form.date).getTime(),
        duration: Number(form.duration),
      };

      // Make sure your service has an "update" function
      await workoutService.update(workoutId, updatedWorkout);
      nav(`/${user._id}/workouts`);
    } catch (error) {
      console.error(error);
      setErr(error.message || "Failed to update workout");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading workout…</p>;

  return (
    <main className="main">
      <div className="container">
        <form className="card stack form" onSubmit={handleSubmit}>
          <h2>Edit Workout</h2>
          {err && <div className="pill">⚠️ {err}</div>}

          <div className="form-row">
            <label htmlFor="name">Workout Name</label>
            <input
              id="name"
              name="name"
              className="input"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              className="textarea"
              rows="4"
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="duration">Duration (minutes)</label>
            <input
              id="duration"
              name="duration"
              type="number"
              min="1"
              value={form.duration}
              onChange={handleChange}
            />
          </div>

          <ExerciseForm handleAddExercise={handleAddExercise} />

          {exercises.length > 0 && (
            <ul>
              <h3>Exercises:</h3>
              {exercises.map((ex, idx) => (
                <li key={idx}>
                  {ex.name} — {ex.sets} sets × {ex.reps} reps{" "}
                  {ex.weight > 0 && ` @ ${ex.weight} lbs`}
                  <button
                    type="button"
                    onClick={() => handleDeleteExercise(idx)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div style={{ display: "flex", gap: ".6rem" }}>
            <button className="btn" type="submit">
              Save Changes
            </button>
            <button
              className="btn btn--warn"
              type="button"
              onClick={() => handleDeleteWorkout(workoutId)}
            >
              Delete Workout
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
