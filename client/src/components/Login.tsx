import React, { useState } from 'react';
import setTitle from '../utils/setTitle';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  setTitle('Login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  //const navigate = useNavigate();
  const loginUrl = 'http://localhost:5000/login';

  const login = () => {
    if (username.trim() == '') {
      setMessage('Please enter a username');
      return;
    }

    if (password.trim() == '') {
      setMessage('Please enter a password');
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    };

    fetch(loginUrl, requestOptions)
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
      <button onClick={login}>Login</button>
      <p className="message fail">{message}</p>
    </main>
  );
};

export default Login;
