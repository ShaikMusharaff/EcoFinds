import React, { useState } from "react";
import logo from "../assets/logo.jpg"; // App logo
import profilePic from "../assets/profile.jpg"; // Profile image
import cartIcon from "../assets/cart.jpg";      // Cart icon

export default function UserProfilePage({ user = {} }) {
  // Assume incoming user object, or use local state for demo
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user.username || "EcoUser");
  const [email, setEmail] = useState(user.email || "user@ecoapp.com");
  const [phone, setPhone] = useState(user.phone || "");
  const [bio, setBio] = useState(user.bio || "");

  function handleSave() {
    setIsEditing(false);
    // Would update user in storage or backend here
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#161820",
      color: "#eee",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        background: "#22232b",
        borderRadius: 18,
        boxShadow: "0 4px 32px rgba(0,0,0,0.32)",
        padding: "32px 22px 40px 22px",
        maxWidth: 400,
        width: "100%",
      }}>
        {/* Top: logo & cart */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18,
        }}>
          <img src={logo} alt="App logo" style={{ width: 120, objectFit: "contain" }} />
          <img src={cartIcon} alt="Cart" style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "#fff", objectFit: "contain", padding: 4
          }} />
        </div>
        {/* Profile section */}
        <div style={{
          background: "#181924",
          borderRadius: 15,
          padding: "24px 14px 28px 14px",
          marginBottom: 26
        }}>
          <div style={{
            display: "flex", justifyContent: "center", alignItems: "flex-start", position: "relative"
          }}>
            <div style={{
              width: 85, height: 85, borderRadius: "50%",
              background: "#222", margin: "0 0 18px 0",
              overflow: "hidden", boxShadow: "0 0px 10px #191a1e"
            }}>
              <img src={profilePic} alt="Profile" style={{
                width: "100%", height: "100%", objectFit: "cover"
              }} />
            </div>
            <button style={{
              position: "absolute", right: 2, top: 2,
              background: "#127c47", color: "#fff", border: "none",
              borderRadius: 7, padding: "6px 14px", cursor: "pointer", fontWeight: "bold"
            }}
            onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
          {isEditing ? (
            <>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                style={{
                  width: "100%", padding: "9px",
                  background: "#222233", border: "1.5px solid #555",
                  borderRadius: 6, color: "#fff", marginBottom: 12,
                }}
              />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: "100%", padding: "9px",
                  background: "#222233", border: "1.5px solid #555",
                  borderRadius: 6, color: "#fff", marginBottom: 12,
                }}
              />
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{
                  width: "100%", padding: "9px",
                  background: "#222233", border: "1.5px solid #555",
                  borderRadius: 6, color: "#fff", marginBottom: 12,
                }}
              />
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="About you..."
                rows={2}
                style={{
                  width: "100%", padding: "9px",
                  background: "#222233", border: "1.5px solid #555",
                  borderRadius: 6, color: "#fff", marginBottom: 7,
                  resize: "vertical"
                }}
              />
              <button
                style={{
                  width: "100%", padding: "10px",
                  background: "#127c47", border: "none", color: "#fff",
                  borderRadius: 7, fontWeight: "bold", fontSize: 16, marginTop: 3
                }}
                onClick={handleSave}
              >Save</button>
            </>
          ) : (
            <>
              <div style={{
                background: "#222233", borderRadius: 6, padding: "10px", marginBottom: 9,
              }}>{username}</div>
              <div style={{
                background: "#222233", borderRadius: 6, padding: "10px", marginBottom: 9,
              }}>{email}</div>
              <div style={{
                background: "#222233", borderRadius: 6, padding: "10px", marginBottom: 9,
              }}>
                {phone ? phone : <span style={{ color: "#888" }}>Phone not set</span>}
              </div>
              <div style={{
                background: "#222233", borderRadius: 6, padding: "10px", marginBottom: 7,
              }}>
                {bio ? bio : <span style={{ color: "#888" }}>No bio</span>}
              </div>
            </>
          )}
        </div>
        {/* Navigation buttons */}
        <div style={{
          background: "#181924", borderRadius: 15, padding: "19px 13px", textAlign: "center"
        }}>
          <div style={{ fontSize: 17, color: "#cfcfff", fontFamily: "monospace", marginBottom: 18 }}>Navigations</div>
          <button
            style={{
              width: "100%", padding: "13px", marginBottom: 14,
              background: "#222233", border: "none", color: "#fff",
              borderRadius: 7, fontWeight: "bold",
              fontFamily: "monospace", fontSize: 17, cursor: "pointer",
              boxShadow: "0 2px 7px #161820"
            }}
            onClick={() => alert("Navigate to My Listings")}
          >
            My listings
          </button>
          <button
            style={{
              width: "100%", padding: "13px",
              background: "#222233", border: "none", color: "#fff",
              borderRadius: 7, fontWeight: "bold",
              fontFamily: "monospace", fontSize: 17, cursor: "pointer",
              boxShadow: "0 2px 7px #161820"
            }}
            onClick={() => alert("Navigate to My Purchases")}
          >
            My Purchases
          </button>
        </div>
      </div>
    </div>
  );
}
