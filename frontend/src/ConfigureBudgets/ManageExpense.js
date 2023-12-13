import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

function ManageExpense() {
  const { isLoggedIn } = useAuth();
  const [months, setMonths] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expense, setExpenseAmount] = useState('');
  const [month, setMonth] = useState({
    months: [
      'January', 'February', 'March', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ]
  });
  const [expenseAdded, setExpenseAdded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setMonths(month.months);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        const categoriesResponse = await axios.get(`http://159.203.127.58:3002/get-categories/${userId}?month=${selectedMonth}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("GOT USER CATEGORIES FOR SELECTED MONTH", categoriesResponse);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    if (selectedMonth) {
      fetchCategories();
    } else {
      setCategories([]);
    }
  }, [selectedMonth]);

  const handleAddExpense = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if (!selectedMonth || !selectedCategory || !expense) {
        console.error('Month, category, and expense amount are required');
        setError('Month, category, and expense amount are required');
        return;
      }

      await axios.post('http://159.203.127.58:3002/add-expense', {
        userId: userId,
        month: selectedMonth,
        category: selectedCategory,
        expense: parseFloat(expense),
      },
        {
          headers:
          { Authorization: `Bearer ${token}` }
        });

      console.log('Expense added successfully!');
      setExpenseAdded(true);
      setError('');
      setSelectedMonth('');
      setSelectedCategory('');
      setExpenseAmount('');
    } catch (error) {
      setExpenseAdded(false);
      setSelectedMonth('');
      setSelectedCategory('');
      setExpenseAmount('');
      setError('Error adding expense. Please try again.');
      console.error('Error adding expense:', error);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <main className="center" id="main" aria-label="main" style={styles.mainContainer}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Manage Expenses</h2>

        <div style={styles.formGroup}>
          <label htmlFor="month" style={styles.label}>Month:</label>
          <select
            id="month"
            onChange={(e) => setSelectedMonth(e.target.value)}
            value={selectedMonth}
            style={styles.select}
          >
            <option value="">Select Month</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="category" style={styles.label}>Category:</label>
          <select
            id="category"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
            style={styles.select}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="expenseAmount" style={styles.label}>Expense Amount:</label>
          <input
            type="number"
            id="expenseAmount"
            value={expense}
            onChange={(e) => setExpenseAmount(e.target.value)}
            style={styles.input}
          />
        </div>

        {expenseAdded && <p style={styles.successMessage}>Expense added successfully!</p>}
        {error && <p style={styles.errorMessage}>{error}</p>}

        <button onClick={handleAddExpense} style={styles.button}>Add Expense</button>
        <button type="button" onClick={handleBack} style={styles.button}>
          Back
        </button>
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
    height: '55vh',
  },
  formContainer: {
    width: '400px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '18px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '12px',
  },
  select: {
    width: '100%',
    padding: '8px',
    fontSize: '12px',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '12px',
  },
  successMessage: {
    color: 'green',
    marginTop: '10px',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '12px',
    cursor: 'pointer',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    marginTop: '10px',
  },
};

export default ManageExpense;
