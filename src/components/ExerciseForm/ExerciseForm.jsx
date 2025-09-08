import {useState} from 'react'


const ExerciseForm = ({handleAddExercise}) => {
  const [exercise, setExercise] = useState ({
    name: '',
    sets: '',
    reps:'',
    weight:''
  })
  const handleChange = (evt) => {
    setExercise({ ...exercise, [evt.target.id]: evt.target.value });
  };


const handleSubmit = (evt) => {
    evt.preventDefault();
    if (exercise.name && exercise.sets && exercise.reps ) {
      handleAddExercise(exercise)
    setExercise({ name: '', sets: '', reps: '', weight: '' }); 
    }};
  
    return (
    <fieldset>
        <label htmlFor='name'>Exercise:</label>
        <input
        type="text"
        id='name'
        value={exercise.name}
        onChange={handleChange}

      />
      <label htmlFor='sets'>Sets:</label>
      <input
        type="number"
        id="sets"
        value={exercise.sets}
        onChange={handleChange}
      />
      <label htmlFor='reps'>Reps:</label>
      <input
        type="number"
        id="reps"
        value={exercise.reps}
        onChange={handleChange}
      />
      <label htmlFor='weight'>Weight:</label>
      <input
        type="number"
        id="weight"
        placeholder="Weight (lbs)"
        value={exercise.weight}
        onChange={handleChange}
      />
      <button type="button" onClick={handleSubmit}>Add Exercise</button>

    </fieldset>
  )
}

export default ExerciseForm