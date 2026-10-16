import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  function addExpense(e) {
    e.preventDefault();

    if (name.trim() === "" || amount === "" || Number(amount) <= 0) {
      alert("Enter a valid expense name and amount");
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: name.trim(),
      amount: Number(amount),
    };

    setExpenses([...expenses, newExpense]);
    setName("");
    setAmount("");
  }

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  function deleteExpense(id) {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  }

  return (
    <main className="container">
      <h1>Smart Expense Calculator</h1>

      <form onSubmit={addExpense}>
        <input
          type="text"
          placeholder="Expense name"
          aria-label="Expense name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount in ₹"
          aria-label="Amount in rupees"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit">Add Expense</button>
      </form>

      <h2>Total Expenditure: ₹{total.toFixed(2)}</h2>

      <h3>Expense List</h3>

      {expenses.length === 0 ? (
        <p>No expenses added yet.</p>
      ) : (
        <ul className="expense-list">
          {expenses.map((expense) => (
            <li className="expense" key={expense.id}>
              <span>
                {expense.name} - ₹{expense.amount.toFixed(2)}
              </span>
              <button type="button" onClick={() => deleteExpense(expense.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
