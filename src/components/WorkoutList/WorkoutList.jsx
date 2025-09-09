import { Link, useParams } from 'react-router'
import { useContext, useState, useEffect } from 'react'
import { UserContext  } from '../../contexts/UserContext';
import * as workoutService from '../../services/workoutService'
 

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

          {workouts.map((workout, idx) => (
            <Link key={workout._id || idx} to={`/${user._id}/workouts/${workout._id}`} className="item">
              <article>
                <h3 style={{ margin: 0 }}>{new Date(workout.createdAt).toLocaleDateString()}</h3>
                <div className="item__meta">
                {workout.notes && `${workout.notes} · `}
                 {workout.exercises?.length || 0} exercises
              </div>

              </article>
          
            </Link>
          ))}
          {!items.length && !err && <div className="card">No workouts yet.</div>}
        </div>
      </div>
    </main>
  );
}
