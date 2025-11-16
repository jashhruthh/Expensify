import React, { useState, useContext } from "react";
import EditTransactionModal from "./EditTransactionModal";
import { TransactionContext } from "../context/TransactionContext";

export default function TransactionCard({ t }) {
  const { deleteTransaction } = useContext(TransactionContext);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <div className="transaction-card">
        <div>
          <div style={{ fontWeight: 700 }}>{t.category || "Uncategorized"}</div>
          <div style={{ color: "var(--muted)" }}>{new Date(t.date).toLocaleDateString()}</div>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ fontWeight: 700, color: t.type === "income" ? "green" : "crimson" }}>
            {t.type === "income" ? "+" : "-"}₹{t.amount}
          </div>
          <button className="small-btn" onClick={() => setEditOpen(true)}>Edit</button>
          <button className="small-btn" onClick={() => { if (window.confirm("Delete?")) deleteTransaction(t._id); }}>Delete</button>
        </div>
      </div>

      {editOpen && <EditTransactionModal txn={t} onClose={() => setEditOpen(false)} />}
    </>
  );
}