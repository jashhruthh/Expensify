import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import AuthPage from "./pages/AuthPage";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        {!user ? (
          <>
            <Route path="/" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}