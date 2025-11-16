import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function BudgetModal({ onClose }) {
  const { user, updateBudget } = useContext(AuthContext);
  const [value, setValue] = useState(user?.budget || 0);
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updateBudget(Number(value));
    setSaving(false);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Set Monthly Budget</h3>
        <form onSubmit={submit}>
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} min="0" />
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button className="primary-btn" type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
            <button type="button" className="secondary-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}