import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AuthPage() {
  const { login, register } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
        alert("Registered successfully. Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      console.log(err);
      alert("Authentication failed");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "var(--bg)",
        padding: "16px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "var(--card)",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "var(--shadow)",
          border: "1px solid var(--border)",
          animation: "fadeIn .4s ease"
        }}
      >
        <h2 style={{ marginBottom: "4px", textAlign: "center" }}>💰 Expensify</h2>
        <p style={{ color: "var(--muted)", textAlign: "center" }}>
          {isLogin ? "Login to continue" : "Create your account"}
        </p>

        <form onSubmit={submit} style={{ marginTop: "22px" }}>
          {/* Name - only in Signup */}
          {!isLogin && (
            <input
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={change}
              required
              style={inputStyle}
            />
          )}

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={change}
            type="email"
            required
            style={inputStyle}
          />

          <input
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={change}
            type="password"
            required
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "var(--accent)",
              color: "#fff",
              borderRadius: "10px",
              border: "none",
              fontSize: "16px",
              fontWeight: 600,
              marginTop: "10px",
              cursor: "pointer"
            }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setForm({ name: "", email: "", password: "" });
            }}
            style={{
              width: "100%",
              padding: "12px",
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--text)",
              borderRadius: "10px",
              fontSize: "15px",
              marginTop: "10px",
              cursor: "pointer"
            }}
          >
            {isLogin ? "Create new account" : "Have an account? Login"}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid var(--border)",
  background: "transparent",
  color: "var(--text)"
};