import React from 'react'
import { Link } from 'react-router'

const WorkoutList = ({workouts}) => {
  return (
    <main>
    {workouts.map((workout) => (
        <Link key={workout._id} to={`/workouts/${workout._id}`}>
            <article>
                <header>
                    <h2>{workout.date}</h2> 
                 </header>
            </article>
        </Link>
    ))}
    </main>
  )
}

export default WorkoutList