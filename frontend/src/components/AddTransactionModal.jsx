import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";

export default function AddTransactionModal({ onClose }) {
  const { addTransaction } = useContext(TransactionContext);
  const [form, setForm] = useState({ category: "", amount: "", type: "expense", date: new Date().toISOString().slice(0,10) });
  const [saving, setSaving] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await addTransaction({ ...form, amount: Number(form.amount) });
    setSaving(false);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Add Transaction</h3>
        <form className="modal-form" onSubmit={submit}>
          <input name="category" placeholder="Category (e.g., Food)" value={form.category} onChange={change} required />
          <input name="amount" type="number" placeholder="Amount (₹)" value={form.amount} onChange={change} required />
          <select name="type" value={form.type} onChange={change}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input name="date" type="date" value={form.date} onChange={change} required />
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button className="primary-btn" type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
            <button type="button" className="secondary-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}