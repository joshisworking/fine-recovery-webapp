import React, { useEffect, useState } from 'react';
import setTitle from '../utils/setTitle';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';

const Login: React.FC = () => {
  setTitle('Login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [cookie, setCookie, removeCookie] = useCookies(['frpToken']);
  const navigate = useNavigate();
  const loginUrl = 'http://localhost:5000/login';

  // Delete token if logout
  useEffect(() => {
    if (window.location.href.toLowerCase().endsWith('logout')) {
      removeCookie('frpToken');
      navigate('/login');
    }
  }, []);

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
      .then(response => {
        if (response.status == 400) {
          setMessage('Invalid username/password combination.');
        } else if (response.status == 500) {
          setMessage('Server error. Please contact your administrator.');
        }
        return response.json();
      })
      .then(data => {
        if (data.token) {
          setCookie('frpToken', data.token);
          navigate('/fine');
        }
      });
  };

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyUp={e => {
              if (e.key == 'Enter') {
                login();
              }
            }}
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
            onKeyUp={e => {
              if (e.key == 'Enter') {
                login();
              }
            }}
          />
        </div>
        <button onClick={login}>Login</button>
        <p className="register-message fail">{message}</p>
        <p className="alternate">
          {cookie.frpToken ? '' : 'You must log in to view data.'}
        </p>
        <p className="alternate">
          Don't have an account? <NavLink to="/register">Register</NavLink>
        </p>
      </div>
    </main>
  );
};

export default Login;
