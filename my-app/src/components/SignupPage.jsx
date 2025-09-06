import React, { useState } from "react";
import logo from "../assets/logo.png";
// Dummy localStorage user check as backend simulation
function isEmailTaken(email) {
  const users = JSON.parse(localStorage.getItem("eco_users") || "[]");
  return users.some((u) => u.email === email);
}

function isUsernameTaken(username) {
  const users = JSON.parse(localStorage.getItem("eco_users") || "[]");
  return users.some((u) => u.username === username);
}

function handleSignup({ displayName, email, password }) {
  const users = JSON.parse(localStorage.getItem("eco_users") || "[]");
  const newUser = { id: Date.now().toString(), email, username: displayName };
  users.push(newUser);
  localStorage.setItem("eco_users", JSON.stringify(users));
  localStorage.setItem("eco_user", JSON.stringify(newUser)); // Log in immediately
}

export default function SignupPage({ onSignup }) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let errs = {};

    if (!displayName.trim()) {
      errs.displayName = "Display name required.";
    } else if (isUsernameTaken(displayName.trim())) {
      errs.displayName = "Username already taken.";
    }
    if (!email.trim()) {
      errs.email = "Email required.";
    } else if (!validateEmail(email.trim())) {
      errs.email = "Invalid email format.";
    } else if (isEmailTaken(email.trim())) {
      errs.email = "Email already registered.";
    }
    if (!password) {
      errs.password = "Password required.";
    } else if (password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }

    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      handleSignup({ displayName: displayName.trim(), email: email.trim(), password });
      alert("Signup successful!");
      if (onSignup) onSignup(); // Optional: redirect or callback
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
        position: "relative",
      }}>
      
        {/* Profile image placeholder */}
        <div style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "#222",
          margin: "0 auto 22px auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          
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
    alt="Profile placeholder" 
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
  />
</div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ color: "#eee" }}>Display Name:</label>
            <input
              type="text"
              value={displayName}
              autoComplete="off"
              onChange={e => setDisplayName(e.target.value)}
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
            {errors.displayName && <div style={{ color: "#f77", fontSize: "0.93em" }}>{errors.displayName}</div>}
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ color: "#eee" }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
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
            {errors.email && <div style={{ color: "#f77", fontSize: "0.93em" }}>{errors.email}</div>}
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
            {errors.password && <div style={{ color: "#f77", fontSize: "0.93em" }}>{errors.password}</div>}
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ color: "#eee" }}>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
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
            {errors.confirmPassword && <div style={{ color: "#f77", fontSize: "0.93em" }}>{errors.confirmPassword}</div>}
          </div>
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
              marginTop: "20px",
            }}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
