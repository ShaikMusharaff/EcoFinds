import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import cart from "./components/CartPage";
import logo from "./assets/logo.png";

function HomeRedirect() {
  // For this demo, redirect to signup on home
  return <Navigate to="/signup" replace />;
}

export default function App() {
  const [user, setUser] = useState(null);

  function onSignupSuccess() {
    // For demo, just alert + set dummy user
    alert("User signed up successfully!");
    setUser({ displayName: "DemoUser" });
  }

  return (
    <Router>
      <nav style={{ padding: 16, backgroundColor: "#eee" }}>
        <Link to="/signup" style={{ marginRight: 12 }}>
          Signup
        </Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/signup" element={<SignupPage onSignup={onSignupSuccess} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<p>404: Page not found</p>} />
      </Routes>
    </Router>
  );
}
