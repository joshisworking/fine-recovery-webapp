import React, { useState } from 'react';
import setTitle from '../utils/setTitle';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  setTitle('Register');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [message, setMessage] = useState('');
  //const navigate = useNavigate();
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
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  };

  return (
    <main>
      <h1>Login</h1>
      <label htmlFor="username">Username</label>
      <input
        name="username"
        id="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <label htmlFor="passwordConf">Confirm Password</label>
      <input
        type="password"
        name="passwordConf"
        id="passwordConf"
        value={passwordConf}
        onChange={e => setPasswordConf(e.target.value)}
      />
      <button onClick={registerUser}>Register</button>
      <p className="message fail">{message}</p>
    </main>
  );
};

export default Register;
