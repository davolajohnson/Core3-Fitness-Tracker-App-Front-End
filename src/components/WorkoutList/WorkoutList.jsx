import { Link } from 'react-router'
import { useContext } from 'react'
import { UserContext  } from '../../contexts/UserContext';
 

export default function WorkoutList({ workouts = [] }) {
  const { user } = useContext(UserContext);


  return (
    <main className="main">
      <div className="container stack" style={{ "--gap": "1.25rem" }}>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Your Workouts</h2>
            {user && (
              <Link className="btn" to={`/${user._id}/workouts/new`}>
                New Workout
              </Link>
            )}
          </div>
        </div>

        <div className="list">
          {workouts.length === 0 && (
            <div className="card">
              <p>No workouts yet. Click <strong>New Workout</strong> to add your first session.</p>
            </div>
          )}

          {workouts.map(workout => (
            <Link key={workout._id} to={`${workout._id}`} className="item">
              <article>
                <h3 style={{ margin: 0 }}>{workout.name}</h3>
                <div className="item__meta">
                  {new Date(workout.createdAt).toLocaleDateString()} · {workout.exercises?.length || 0} exercises
                </div>
              </article>
          
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}