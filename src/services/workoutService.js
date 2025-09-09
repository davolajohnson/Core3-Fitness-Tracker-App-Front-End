const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/workouts`;

const index = async () => {
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return res.json();
};

const create = async (formData) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    const error = await res.text(); // see backend error
    throw new Error(error);
  }
  return res.json();
};
const show = async (workoutId) => {
  try {
    const res = await fetch(`${BASE_URL}/${workoutId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteWorkout = async (workoutId) => {
  try {
    const res = await fetch(`${BASE_URL}/${workoutId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) {
      const text = await res.text(); // read backend error message
      throw new Error(text || "Failed to delete workout");
    }

    return true; // success
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export { index, create, show, deleteWorkout};
