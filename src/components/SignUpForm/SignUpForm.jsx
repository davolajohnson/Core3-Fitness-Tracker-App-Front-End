import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/authServices';
import { UserContext } from '../../contexts/UserContext';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (e) => {
    setMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormInvalid = () => !(username && password && password === passwordConf);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await signUp({ username, password });
      setUser(newUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <h1>Sign Up</h1>
      {message && <p role="alert">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            required
            minLength={8}
          />
        </div>
        <div>
          <label htmlFor="passwordConf">Confirm Password:</label>
          <input
            id="passwordConf"
            name="passwordConf"
            type="password"
            value={passwordConf}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={isFormInvalid()}>Sign Up</button>
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm;
