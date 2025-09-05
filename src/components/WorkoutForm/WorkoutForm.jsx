import {useState} from 'react'

const WorkoutForm = ({handleAddWorkout}) => {
    const [formData, setFormData] = useState({
        date: '',
        notes: '',
        duration: '',
      });
    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
      };
 
 
    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleAddWorkout(formData)
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
      <button type='submit'>Add</button>
    </form>
    </main>
  )
}

export default WorkoutForm