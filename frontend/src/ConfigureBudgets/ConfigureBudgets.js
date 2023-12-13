import React, { useState, useEffect } from "react";
import axios from "axios";

function ConfigureBudgets() {
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [budgetList, setBudgetList] = useState([]);
  const [months, setMonths] = useState([
    "January", "February", "March", "May", "June", "July", "August", "September", "October", "November", "December",
  ]);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleAddBudget = async () => {
    if (category && budget && selectedMonth) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`http://159.203.127.58:3002/check-existing-budget/${userId}/${selectedMonth}/${category}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.exists) {
          setFeedbackMessage("Budget for this category already exists for the selected month.");
        } else {
          setBudgetList([...budgetList, { category, budget, month: selectedMonth }]);
          setCategory("");
          setBudget("");
          setFeedbackMessage("");
        }
      } catch (error) {
        console.error("Error checking existing budget:", error);
        setFeedbackMessage("Error checking existing budget.");
      }
    }
  };

  const handleEditBudget = (index) => {
    const editedBudget = budgetList[index];
    setCategory(editedBudget.category);
    setBudget(editedBudget.budget);

    const updatedBudgetList = [...budgetList];
    updatedBudgetList.splice(index, 1);
    setBudgetList(updatedBudgetList);
  };

  const handleSaveBudgets = async () => {
    try {
      if (budgetList.length === 0 || !selectedMonth) {
        console.error("Month or budget list is empty");
        return;
      }
      const token = localStorage.getItem("token");
      await axios.post(
        "http://159.203.127.58:3002/configure-budgets",
        {
          userId,
          months: selectedMonth,
          budgetList,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBudgetList([]);
      setSelectedMonth("");
      setFeedbackMessage("Budgets saved successfully!");
    } catch (error) {
      setBudgetList([]);
      setSelectedMonth("");
      setFeedbackMessage("Error saving budgets: " + error.message);
      console.error("Error saving budgets:", error);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <main className="center" id="main" aria-label="main" style={styles.mainContainer}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Configure Budgets</h2>

        <div style={styles.formGroup}>
          <label htmlFor="months" style={styles.label}>Month:</label>
          <select
            id="months"
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
          <input
            type="text"
            id="category"
            value={category}
            onChange={handleCategoryChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="budget" style={styles.label}>Budget:</label>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={handleBudgetChange}
            style={styles.input}
          />
        </div>

        <button onClick={handleAddBudget} style={styles.button}>Add Budget</button>
        {feedbackMessage && <p style={styles.errorMessage}>{feedbackMessage}</p>}
        <ul>
          {budgetList.map((item, index) => (
            <li key={index} style={styles.listItem}>
              {item.category}: {item.budget}
              <button
                type="button"
                onClick={() => handleEditBudget(index)}
                style={styles.editButton}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
        <button onClick={handleSaveBudgets} style={styles.saveButton}>Save Budgets</button>
        <button onClick={handleBack} style={styles.backButton}>Back</button>
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
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '12px',
    cursor: 'pointer',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    marginTop: '10px',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
    fontSize: '12px',
  },
  listItem: {
    marginBottom: '10px',
    padding: '5px',
    fontSize: '12px',
  },
  editButton: {
    marginLeft: '10px',
    padding: '5px',
    fontWeight: '600',
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  saveButton: {
    marginRight: '15px',
    padding: '10px',
    fontSize: '12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  backButton: {
    padding: '10px',
    fontSize: '12px',
    backgroundColor: '#808080',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default ConfigureBudgets;
