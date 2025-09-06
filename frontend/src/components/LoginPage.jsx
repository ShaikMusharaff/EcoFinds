import React, { useState } from "react";
import logo from "../assets/logo.png"; // Adjust path as needed

// Dummy login simulation checking localStorage users
function handleLogin({ identifier, password }) {
  const users = JSON.parse(localStorage.getItem("eco_users") || "[]");
  // Match either email or username
  const foundUser = users.find(
    u => (u.email === identifier || u.username === identifier)
  );
  // For demo: no password check
  if (foundUser) {
    localStorage.setItem("eco_user", JSON.stringify(foundUser));
    return foundUser;
  }
  return null;
}

export default function LoginPage({ onLogin }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!identifier.trim()) {
      setError("Please enter your email or username.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    const user = handleLogin({ identifier: identifier.trim(), password });
    if (user) {
      alert("Login successful!");
      if (onLogin) onLogin(user);
    } else {
      setError("Invalid email/username or password.");
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#161820",
      color: "#eee",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        background: "#22232b",
        borderRadius: 18,
        boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
        padding: "40px 30px",
        maxWidth: 350,
        width: "100%",
      }}>
        {/* Profile/logo image */}
        <div style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "#222",
          margin: "0 auto 22px auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ color: "#eee" }}>Email / Username:</label>
            <input
              type="text"
              value={identifier}
              autoComplete="off"
              onChange={e => setIdentifier(e.target.value)}
              style={{
                width: "100%",
                padding: "7px",
                background: "#181924",
                border: "1.5px solid #444",
                borderRadius: 6,
                color: "#eee",
                marginTop: 4,
              }}
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ color: "#eee" }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "7px",
                background: "#181924",
                border: "1.5px solid #444",
                borderRadius: 6,
                color: "#eee",
                marginTop: 4,
              }}
            />
          </div>
          {error && <div style={{ color: "#f77", fontSize: "0.93em", marginBottom: 12 }}>{error}</div>}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "11px",
              background: "#127c47",
              border: "none",
              color: "#fff",
              borderRadius: 7,
              fontWeight: "bold",
              fontSize: 17,
              letterSpacing: 1,
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
