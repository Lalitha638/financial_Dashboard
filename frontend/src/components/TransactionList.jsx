import { deleteTransaction } from "../api";

function TransactionList({ transactions, onDelete }) {
  if (!transactions || transactions.length === 0)
    return <p style={{ color: "#888" }}>No transactions yet. Add one above!</p>;

  return (
    <div style={{ background: "#1e1e2e", borderRadius: "12px", padding: "1.5rem" }}>
      <h3 style={{ color: "#fff", marginTop: 0 }}>All Transactions</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #333" }}>
            {["Title", "Amount", "Category", "Type", "Date", ""].map((h) => (
              <th key={h} style={{ color: "#888", padding: "8px", textAlign: "left", fontSize: "13px" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id} style={{ borderBottom: "1px solid #222" }}>
              <td style={{ color: "#fff", padding: "10px 8px" }}>{t.title}</td>
              <td style={{ color: t.type === "income" ? "#22c55e" : "#ef4444", padding: "10px 8px" }}>
                {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString()}
              </td>
              <td style={{ color: "#aaa", padding: "10px 8px" }}>{t.category}</td>
              <td style={{ padding: "10px 8px" }}>
                <span style={{
                  padding: "3px 10px", borderRadius: "20px", fontSize: "12px",
                  background: t.type === "income" ? "#16a34a33" : "#dc262633",
                  color: t.type === "income" ? "#22c55e" : "#ef4444",
                }}>
                  {t.type}
                </span>
              </td>
              <td style={{ color: "#aaa", padding: "10px 8px" }}>{t.date}</td>
              <td style={{ padding: "10px 8px" }}>
                <button
                  onClick={async () => { await deleteTransaction(t.id); onDelete(); }}
                  style={{
                    background: "#dc262633", color: "#ef4444", border: "none",
                    borderRadius: "6px", padding: "4px 10px", cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;