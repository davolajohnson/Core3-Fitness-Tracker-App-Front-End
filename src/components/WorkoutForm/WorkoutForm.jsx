import { useState } from 'react';

const WorkoutForm = ({ handleAddWorkout }) => {
  const [formData, setFormData] = useState({
    date: '',
    notes: '',
    duration: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddWorkout(formData);
    setFormData({ date: '', notes: '', duration: '' }); // reset form
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date</label>
          <input
            required
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="duration">Duration (minutes)</label>
          <input
            id="duration"
            type="number"
            name="duration"
            min="1"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add</button>
      </form>
    </main>
  );
};

export default WorkoutForm;