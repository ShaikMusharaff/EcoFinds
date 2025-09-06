// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import "./Navbar.css"; // import the CSS file

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">EcoShop</div>
      <div className="nav-links">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/my-listings" className="nav-link">My Listings</Link>
        <Link to="/add-product" className="nav-link">Add Product</Link>
        <Link to="/cart" className="nav-link">Cart</Link>
        <Link to="/purchases" className="nav-link">Purchases</Link>
      </div>
    </nav>
  );
}
