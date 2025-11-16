import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";

export default function EditTransactionModal({ txn, onClose }) {
  const { editTransaction } = useContext(TransactionContext);
  const [form, setForm] = useState({
    category: txn.category || "",
    amount: txn.amount || "",
    type: txn.type || "expense",
    date: txn.date ? txn.date.slice(0,10) : new Date().toISOString().slice(0,10)
  });
  const [saving, setSaving] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await editTransaction(txn._id, { ...form, amount: Number(form.amount) });
    setSaving(false);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Edit Transaction</h3>
        <form className="modal-form" onSubmit={submit}>
          <input name="category" value={form.category} onChange={change} required />
          <input name="amount" type="number" value={form.amount} onChange={change} required />
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