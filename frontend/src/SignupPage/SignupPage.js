import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://159.203.127.58:3002/Signup', formData);
      setSuccessMessage(response.data.message);
      setError('');
      history('/login');
    } catch (error) {
      setError('Error signing up. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <section style={styles.container}>
      <section style={styles.formContainer}>
        <h2 style={styles.heading}>Signup</h2>

        {error && <p style={styles.errorMessage}>{error}</p>}
        {successMessage && <p style={styles.successMessage}>{successMessage}</p>}

        <form onSubmit={handleSignup} style={styles.form}>
          <label htmlFor="username" style={styles.label}>
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

          <label htmlFor="password" style={styles.label}>
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

          <button type="submit" style={styles.button}>
            Signup
          </button>
        </form>
      </section>
    </section>
  );
}

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
  },
  input: {
    width: '100%',
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
    padding: '8px 15px',
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

export default SignupPage;
