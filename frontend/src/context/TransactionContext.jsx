import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosClient";
import { AuthContext } from "./AuthContext";

export const TransactionContext = createContext();

export default function TransactionProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);

  const loadTransactions = async () => {
    if (!user) return;
    try {
      const res = await api.get("/transactions");
      setTransactions(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadSummary = async () => {
    if (!user) return;
    try {
      const res = await api.get("/transactions/summary");
      setSummary(res.data || null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTransactions();
    loadSummary();
  }, [user]);

  const addTransaction = async (data) => {
    const res = await api.post("/transactions", data);
    setTransactions((p) => [res.data, ...p]);
    await loadSummary();
    return res.data;
  };

  const editTransaction = async (id, data) => {
    const res = await api.put(`/transactions/${id}`, data);
    setTransactions((p) => p.map((t) => (t._id === id ? res.data : t)));
    await loadSummary();
    return res.data;
  };

  const deleteTransaction = async (id) => {
    await api.delete(`/transactions/${id}`);
    setTransactions((p) => p.filter((t) => t._id !== id));
    await loadSummary();
  };

  return (
    <TransactionContext.Provider value={{ transactions, summary, addTransaction, editTransaction, deleteTransaction, loadTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
}