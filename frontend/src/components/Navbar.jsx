import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="logo">💰 Expensify</div>
        <Link to="/analytics" className="text-link">Analytics</Link>
      </div>

      <div className="navbar-right">
        <button className="theme-toggle" onClick={toggleTheme}>{theme === "dark" ? "Light" : "Dark"}</button>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ fontWeight: 600 }}>{user?.name}</div>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </div>
    </header>
  );
}