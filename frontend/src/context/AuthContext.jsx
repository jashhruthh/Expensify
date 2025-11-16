import React, { createContext, useState } from "react";
import api from "../api/axiosClient";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return localStorage.getItem("exp_user") ? JSON.parse(localStorage.getItem("exp_user")) : null;
    } catch {
      return null;
    }
  });

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("exp_token", res.data.token);
    localStorage.setItem("exp_user", JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res.data;
  };

  const register = async (name, email, password) => {
    return await api.post("/auth/register", { name, email, password });
  };

  const logout = () => {
    localStorage.removeItem("exp_token");
    localStorage.removeItem("exp_user");
    setUser(null);
  };

  const updateBudget = async (budget) => {
    const res = await api.put("/auth/budget", { budget });
    localStorage.setItem("exp_user", JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res.data;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateBudget }}>
      {children}
    </AuthContext.Provider>
  );
}