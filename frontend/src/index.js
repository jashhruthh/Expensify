import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import ThemeProvider from "./context/ThemeContext";
import TransactionProvider from "./context/TransactionContext";
import "./app.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ThemeProvider>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </ThemeProvider>
  </AuthProvider>
);