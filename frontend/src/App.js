import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import CartPage from "./pages/Cart";
import MyListings from "./pages/Mylistings";
import logo from "./assets/logo.jpg";
import ProductDetails from "./pages/ProductDetails";
import Feed from "./pages/Feed";


function HomeRedirect() {
  // For this demo, redirect to signup on home
  return <Navigate to="/signup" replace />;
}

export default function App() {
  const [user, setUser] = useState(null);

  function onSignupSuccess() {
    // For demo, just alert + set dummy user
    alert("User signed up successfully!");
    setUser({ displayName: "DemoUser", userId: "12345" });
  }

  return (
    <Router>
      <nav style={{ padding: 16, backgroundColor: "#eee" }}>
        <Link to="/signup" style={{ marginRight: 12 }}>
          Signup
        </Link>
        <Link to="/login" style={{ marginRight: 12 }}>
          Login
        </Link>
        <Link to="/my-listings" style={{ marginRight: 12 }}>
          My Listings
        </Link>
        <Link to="/cart">Cart</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/signup" element={<SignupPage onSignup={onSignupSuccess} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/my-listings" element={<MyListings userId={user?._Id || "12345"} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="*" element={<p>404: Page not found</p>} />
      </Routes>
    </Router>
  );
}
