import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { AuthContext } from "../context/AuthContext";
import TransactionCard from "../components/TransactionCard";
import AddTransactionModal from "../components/AddTransactionModal";
import BudgetModal from "../components/BudgetModal";
import { Link } from "react-router-dom";

// --------------------------------------
// MONTH vs LAST MONTH using NET BALANCE
// --------------------------------------

function calculateBalanceComparisons(transactions) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let thisMonthBalance = 0;
  let lastMonthBalance = 0;

  transactions.forEach(t => {
    const date = new Date(t.date);
    const m = date.getMonth();
    const y = date.getFullYear();
    const amount = Number(t.amount);

    const isIncome = t.type === "income";
    const signedAmount = isIncome ? amount : -amount;

    // This month
    if (m === currentMonth && y === currentYear) {
      thisMonthBalance += signedAmount;
    }

    // Last month (handling Jan → Dec/year-1 rollover)
    const lastMonthIndex = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    if (m === lastMonthIndex && y === lastMonthYear) {
      lastMonthBalance += signedAmount;
    }
  });

  return {
    thisMonthBalance,
    lastMonthBalance,
    difference: thisMonthBalance - lastMonthBalance
  };
}

export default function Dashboard() {
  const { transactions } = useContext(TransactionContext);
  const { user } = useContext(AuthContext);

  const [openAdd, setOpenAdd] = useState(false);
  const [openBudget, setOpenBudget] = useState(false);

  // Total income & expense (entire list)
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((s, t) => s + Number(t.amount), 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((s, t) => s + Number(t.amount), 0);

  const balance = income - expense;

  const budget = user?.budget || 0;
  const usedPct = budget > 0 ? Math.min(100, Math.round((expense / budget) * 100)) : 0;

  // --------------------------------------
  // APPLY UPDATED MONTH COMPARISON
  // --------------------------------------
  const monthStats = calculateBalanceComparisons(transactions);

  return (
    <div className="page-root">
      <main className="dashboard">

        {/* Top actions */}
        <section className="top-actions">
          <div>
            <button className="primary-btn" onClick={() => setOpenAdd(true)}>
              + Add Transaction
            </button>
            <button
              className="secondary-btn"
              style={{ marginLeft: 8 }}
              onClick={() => setOpenBudget(true)}
            >
              Set Budget
            </button>

            <Link to="/analytics" className="text-link" style={{ marginLeft: 12 }}>
              View Analytics
            </Link>
          </div>

          {/* Month comparison */}
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "var(--muted)" }}>This month vs last</div>

            <div
              style={{
                color: monthStats.difference >= 0 ? "green" : "crimson",
                fontWeight: 700
              }}
            >
              {monthStats.difference >= 0 ? "Improved" : "Declined"} ₹
              {Math.abs(monthStats.difference)}
            </div>

            <div style={{ color: "var(--muted)" }}>
              This month: ₹{monthStats.thisMonthBalance} · Last month: ₹
              {monthStats.lastMonthBalance}
            </div>
          </div>
        </section>

        {/* Summary cards */}
        <section className="summary-container">
          <div className="summary-card">
            <h4>Income</h4>
            <div className="summary-amount">₹{income}</div>
          </div>

          <div className="summary-card">
            <h4>Expense</h4>
            <div className="summary-amount">₹{expense}</div>
          </div>

          <div className="summary-card">
            <h4>Balance</h4>
            <div className="summary-amount">₹{balance}</div>
          </div>
        </section>

        {/* Transactions */}
        <section className="transactions-section">
          <div className="transactions-header">
            <h3>Recent Transactions</h3>

            <div style={{ maxWidth: 260, textAlign: "right" }}>
              <div style={{ color: "var(--muted)" }}>Budget: ₹{budget}</div>

              <div
                style={{
                  background: "linear-gradient(90deg,#ddd,#eee)",
                  height: 8,
                  borderRadius: 8,
                  margin: "8px 0"
                }}
              >
                <div
                  style={{
                    width: `${usedPct}%`,
                    background: "var(--accent)",
                    height: "100%",
                    borderRadius: 8
                  }}
                />
              </div>

              <div style={{ color: "var(--muted)" }}>{usedPct}% used</div>
            </div>
          </div>

          {transactions.length === 0 ? (
            <div className="empty-text">
              No transactions yet — use the + button to add.
            </div>
          ) : (
            transactions.map(t => <TransactionCard key={t._id} t={t} />)
          )}
        </section>

        {/* Floating button */}
        <button className="floating-add" onClick={() => setOpenAdd(true)}>
          +
        </button>

        {/* Modals */}
        {openAdd && <AddTransactionModal onClose={() => setOpenAdd(false)} />}
        {openBudget && <BudgetModal onClose={() => setOpenBudget(false)} />}
      </main>
    </div>
  );
}