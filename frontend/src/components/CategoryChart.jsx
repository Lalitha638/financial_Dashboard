import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#8b5cf6", "#ec4899"];

function CategoryChart({ data }) {
  if (!data || data.length === 0) return <p>No category data yet.</p>;

  return (
    <div style={{ background: "#1e1e2e", borderRadius: "12px", padding: "1.5rem" }}>
      <h3 style={{ color: "#fff", marginTop: 0 }}>Spending by Category</h3>
      <PieChart width={380} height={300}>
        <Pie
          data={data}
          dataKey="total"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default CategoryChart;