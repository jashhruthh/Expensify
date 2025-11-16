import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { ThemeContext } from "../context/ThemeContext";
import { Pie, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function Analytics() {
  const { summary } = useContext(TransactionContext);
  const { theme } = useContext(ThemeContext);

  if (!summary) return <div style={{ padding: 24 }}>Loading analytics...</div>;

  // Theme-aware text colors
  const textColor = theme === "dark" ? "#ffffff" : "#1a1a1a";
  const gridColor = theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)";

  // Purple theme
  const pieColors = ["#6c5ce7", "#a29bfe", "#b388ff", "#9d4edd", "#7b2cbf"];

  // Pie data
  const categories = summary.byCategory || [];
  const pieLabels = categories.map((c) => c._id || "Other");
  const pieData = categories.map((c) => c.total || 0);

  // Bar data
  const months = summary.byMonth || [];
  const monthLabels = months.map((m) => m._id);
  const incomeData = months.map((m) => m.income || 0);
  const expenseData = months.map((m) => m.expense || 0);

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <h2 style={{ color: textColor }}>Analytics</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24
        }}
      >
        {/* PIE CHART */}
        <div className="chart-card">
          <h4 style={{ color: textColor }}>Expenses by Category</h4>
          <Pie
            data={{
              labels: pieLabels,
              datasets: [
                {
                  data: pieData,
                  backgroundColor: pieColors,
                  borderWidth: 0
                }
              ]
            }}
            options={{
              plugins: {
                legend: {
                  labels: { color: textColor }
                }
              }
            }}
          />
        </div>

        {/* BAR CHART */}
        <div className="chart-card">
          <h4 style={{ color: textColor }}>Income vs Expense (Monthly)</h4>
          <Bar
            data={{
              labels: monthLabels,
              datasets: [
                {
                  label: "Income",
                  data: incomeData,
                  backgroundColor: "#6c5ce7"
                },
                {
                  label: "Expense",
                  data: expenseData,
                  backgroundColor: "#ff7675"
                }
              ]
            }}
            options={{
              plugins: {
                legend: {
                  labels: { color: textColor }
                }
              },
              scales: {
                x: {
                  ticks: { color: textColor },
                  grid: { color: gridColor }
                },
                y: {
                  ticks: { color: textColor },
                  grid: { color: gridColor }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}