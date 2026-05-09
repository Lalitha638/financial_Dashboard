import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";

function MonthlyChart({ data }) {
  if (!data || data.length === 0) return <p>No monthly data yet.</p>;

  return (
    <div style={{ background: "#1e1e2e", borderRadius: "12px", padding: "1.5rem" }}>
      <h3 style={{ color: "#fff", marginTop: 0 }}>Monthly Trend</h3>
      <BarChart width={380} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="month" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#22c55e" />
        <Bar dataKey="expenses" fill="#ef4444" />
      </BarChart>
    </div>
  );
}

export default MonthlyChart;