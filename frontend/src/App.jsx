import { useEffect, useState } from "react";
import { getSummary, getByCategory, getMonthly, getTransactions } from "./api";
import Summary from "./components/Summary";
import CategoryChart from "./components/CategoryChart";
import MonthlyChart from "./components/MonthlyChart";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  const [summary, setSummary] = useState(null);
  const [categories, setCategories] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const fetchAll = async () => {
    try {
      const [s, c, m, t] = await Promise.all([
        getSummary(),
        getByCategory(),
        getMonthly(),
        getTransactions(),
      ]);
      setSummary(s.data);
      setCategories(c.data);
      setMonthly(m.data);
      setTransactions(t.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleExport = () => {
    window.open("http://127.0.0.1:8000/export-csv", "_blank");
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#13131f",
        padding: "2rem",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.25rem",
        }}
      >
        <h1 style={{ color: "#fff", margin: 0 }}>💰 Finance Dashboard</h1>
        <button
          onClick={handleExport}
          style={{
            padding: "10px 20px",
            background: "#22c55e",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          ⬇️ Export CSV
        </button>
      </div>

      <p style={{ color: "#888", marginBottom: "2rem" }}>
        Track your income and expenses
      </p>

      {/* Summary Cards */}
      <Summary data={summary} />

      {/* Add Transaction Form */}
      <TransactionForm onAdd={fetchAll} />

      {/* Charts */}
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        <CategoryChart data={categories} />
        <MonthlyChart data={monthly} />
      </div>

      {/* Transaction Table */}
      <TransactionList transactions={transactions} onDelete={fetchAll} />
    </div>
  );
}

export default App;