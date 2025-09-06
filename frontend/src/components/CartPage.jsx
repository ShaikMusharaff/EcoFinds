import React from "react";
import logo from "../assets/logo.png"; // Adjust path as needed

// Dummy cart items data
const cartItems = [
  { id: 1, name: "Eco Product 1", price: 250, img: logo },
  { id: 2, name: "Eco Product 2", price: 180, img: logo },
  { id: 3, name: "Eco Product 3", price: 320, img: logo },
  // Add/remove as needed
];

export default function CartPage() {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

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
        boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
        padding: "34px 24px 40px 24px",
        maxWidth: 420,
        width: "100%",
        position: "relative",
      }}>
        {/* Header with logo and profile */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 22,
        }}>
          <div style={{ fontSize: 18, fontFamily: "monospace", color: "#eee" }}>
            <img src={logo} alt="Logo" style={{ width: 65, height: 30, objectFit: "contain" }} />
          </div>
          <div style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            background: "#222",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #161820"
          }}>
            <img src={profilePic} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        <h2 style={{
          color: "#eee",
          fontFamily: "monospace",
          marginBottom: 18,
          marginLeft: 5,
        }}>
          Cart Page
        </h2>

        {/* Cart Items */}
        <div style={{ marginBottom: 22 }}>
          {cartItems.map(item => (
            <div key={item.id} style={{
              background: "#181924",
              borderRadius: 11,
              marginBottom: 14,
              padding: "14px",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 1px 7px rgba(0,0,0,0.19)",
            }}>
              <img src={item.img} alt={item.name} style={{
                width: 40,
                height: 40,
                objectFit: "cover",
                borderRadius: "6px",
                marginRight: 16,
                background: "#222"
              }} />
              <div style={{ flexGrow: 1 }}>
                <div style={{
                  fontSize: 17,
                  fontFamily: "monospace",
                  color: "#fafbff",
                  marginBottom: 4,
                }}>
                  {item.name}
                </div>
                <div style={{ fontSize: 15, color: "#b1dcbd" }}>
                  Rs. {item.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total price */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "monospace",
          marginBottom: 24,
          fontSize: 17,
        }}>
          <span>Total price to pay:</span>
          <span>Rs. {total.toLocaleString()}</span>
        </div>

        {/* Checkout button */}
        <button
          style={{
            width: "100%",
            padding: "14px",
            background: "#127c47",
            border: "none",
            color: "#fff",
            borderRadius: 9,
            fontWeight: "bold",
            fontSize: 21,
            fontFamily: "monospace",
            letterSpacing: 1,
            cursor: "pointer",
            marginTop: 5,
          }}
          onClick={() => alert("Proceed to checkout")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
