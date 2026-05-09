import { useState } from "react";
import { addTransaction } from "../api";

function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "", amount: "", category: "", type: "income", note: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.category) return;
    await addTransaction({ ...form, amount: parseFloat(form.amount) });
    setForm({ title: "", amount: "", category: "", type: "income", note: "" });
    onAdd(); // refresh dashboard data
  };

  const inputStyle = {
    width: "100%", padding: "10px", borderRadius: "8px",
    border: "1px solid #333", background: "#2a2a3e",
    color: "#fff", marginBottom: "12px", boxSizing: "border-box",
  };

  return (
    <div style={{ background: "#1e1e2e", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem" }}>
      <h3 style={{ color: "#fff", marginTop: 0 }}>Add Transaction</h3>
      <input style={inputStyle} name="title" placeholder="Title e.g. Salary" value={form.title} onChange={handleChange} />
      <input style={inputStyle} name="amount" placeholder="Amount e.g. 5000" type="number" value={form.amount} onChange={handleChange} />
      <input style={inputStyle} name="category" placeholder="Category e.g. Food" value={form.category} onChange={handleChange} />
      <select style={inputStyle} name="type" value={form.type} onChange={handleChange}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input style={inputStyle} name="note" placeholder="Note (optional)" value={form.note} onChange={handleChange} />
      <button
        onClick={handleSubmit}
        style={{
          width: "100%", padding: "12px", background: "#3b82f6",
          color: "#fff", border: "none", borderRadius: "8px",
          cursor: "pointer", fontWeight: "bold", fontSize: "15px",
        }}
      >
        + Add Transaction
      </button>
    </div>
  );
}

export default TransactionForm;