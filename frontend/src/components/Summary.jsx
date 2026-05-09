function Summary({ data }) {
  if (!data) return <p>Loading...</p>;

  const cards = [
    { label: "Total Income", value: data.total_income, color: "#22c55e" },
    { label: "Total Expenses", value: data.total_expenses, color: "#ef4444" },
    { label: "Balance", value: data.balance, color: "#3b82f6" },
  ];

  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            flex: 1,
            background: "#1e1e2e",
            borderRadius: "12px",
            padding: "1.5rem",
            borderLeft: `4px solid ${card.color}`,
          }}
        >
          <p style={{ color: "#888", margin: 0, fontSize: "14px" }}>
            {card.label}
          </p>
          <h2 style={{ color: card.color, margin: "0.5rem 0 0" }}>
            ₹{card.value.toLocaleString()}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default Summary;