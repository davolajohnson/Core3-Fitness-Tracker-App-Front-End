const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const signUp = async (formData) => {
  const res = await fetch(`${BASE_URL}/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (data.err) throw new Error(data.err);
  if (!data.token) throw new Error('Invalid response from server');
  localStorage.setItem('token', data.token);
  return JSON.parse(atob(data.token.split('.')[1])).payload;
};

const signIn = async (formData) => {
  const res = await fetch(`${BASE_URL}/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (data.err) throw new Error(data.err);
  if (!data.token) throw new Error('Invalid response from server');
  localStorage.setItem('token', data.token);
  return JSON.parse(atob(data.token.split('.')[1])).payload;
};

export { signUp, signIn };