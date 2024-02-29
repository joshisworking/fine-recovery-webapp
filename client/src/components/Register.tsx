import React, { useState } from 'react';
import setTitle from '../utils/setTitle';
import { NavLink, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  setTitle('Register');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const registerUrl = 'http://localhost:5000/register';

  const registerUser = () => {
    if (username.trim() == '') {
      setMessage('Please enter a username');
      return;
    }

    if (password.trim() == '') {
      setMessage('Please enter a password');
      return;
    }

    if (password.trim() !== passwordConf.trim()) {
      setMessage('Passwords do not match');
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, passwordConf }),
    };

    fetch(registerUrl, requestOptions)
      .then(response => {
        if (response.ok) {
          alert(
            'Your registrations was successful. You will be redirected to the login page'
          );
          navigate('/login');
        }
        return response.json();
      })
      .then(data => {
        setMessage(data.error);
      });
  };

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="passwordConf">Confirm Password</label>
          <input
            type="password"
            name="passwordConf"
            id="passwordConf"
            value={passwordConf}
            onChange={e => setPasswordConf(e.target.value)}
          />
        </div>
        <button onClick={registerUser}>Register</button>
        <p className="register-message fail">{message}</p>
        <p className="alternate">
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </main>
  );
};

export default Register;
