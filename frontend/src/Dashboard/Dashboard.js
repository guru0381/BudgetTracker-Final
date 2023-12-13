import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <main className="center" id="main" aria-label="main" style={styles.mainContainer}>
      <div>
        <h2 style={styles.heading}>Welcome to the Dashboard!</h2>
        
        <Link to="/configure-budgets">
          <button style={styles.button}>Configure Budgets</button>
        </Link>

        <Link to="/add-expense">
          <button style={styles.button}>Manage Expenses</button>
        </Link>
      </div>
    </main>
  );
}

const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    marginRight: '20px',
    marginBottom: '10px',
    cursor: 'pointer',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    textDecoration: 'none',
    textAlign: 'center',
  },
};

export default Dashboard;
