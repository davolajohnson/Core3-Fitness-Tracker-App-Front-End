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
  return res.json();
};

export { index, create };