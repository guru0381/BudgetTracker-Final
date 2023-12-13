import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = (props) => {
  const history = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    axios
      .post('http://159.203.127.58:3002/login', formData)
      .then((response) => {
        setSuccessMessage(response.data.message);
        if (response.data.user) {
          localStorage.setItem('userId', response.data.user._id.toString());
        }
        localStorage.setItem('token', response.data.token);
        login();
        setIsLoggedIn(true);
        props.callBack(true);
        history('/');
      })
      .catch((error) => {
        setError('');
        setSuccessMessage('Invalid username or password');
      });
  };

  return (
    <section style={styles.container}>
      <section style={styles.formContainer}>
        <h2 style={styles.heading}>Login</h2>

        {error && <p style={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleLogin} style={styles.form}>
          <label htmlFor="username" style={{ ...styles.label, width: '150px' }}>
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
          <br />
          <label htmlFor="password" style={{ ...styles.label, width: '150px' }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            style={styles.input}
          />
          <br />
          <button type="submit" id="login" style={styles.button}>
            Login
          </button>
        </form>
      </section>
    </section>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    position: 'relative',
  },
  formContainer: {
    display: 'inline-block',
    textAlign: 'left',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
  },
  heading: {
    marginLeft: '50px',
    fontSize: '20px',
    marginBottom: '20px',
  },
  form: {
    marginLeft: '50px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#555',
    width: '150px', // Increase label width as needed
  },
  input: {
    width: '20em',
    padding: '8px',
    fontSize: '14px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    marginLeft: '90px',
    fontWeight: '600',
    letterSpacing: '0.05em',
    padding: '12px 15px', // Adjust the padding for width and height
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },

  errorMessage: {
    color: 'red',
    marginTop: '10px',
    fontSize: '14px',
  },
  successMessage: {
    color: 'green',
    marginTop: '10px',
    fontSize: '14px',
  },
};

export default LoginPage;
