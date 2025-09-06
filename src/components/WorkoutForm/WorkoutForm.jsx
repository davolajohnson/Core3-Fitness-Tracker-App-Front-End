import {useState} from 'react'

const WorkoutForm = ({handleAddWorkout}) => {}
    const [formData, setFormData] = useState({
        date: '',
        notes: '',
        duration: '',
      });
    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        handleAddWorkout(formData)
      };
 
 
 return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date</label>
        <input
          required
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />

        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <label htmlFor="duration">Duration (minutes)</label>
        <input
          id="duration"
          name="duration"
          type="number"
          min="1"
          value={formData.duration}
          onChange={handleChange}
        />

        <button type="submit">Add</button>
      </form>
    </main>
  );
};

export default WorkoutForm;