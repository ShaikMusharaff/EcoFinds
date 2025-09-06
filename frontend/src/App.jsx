import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MyListings from "./pages/MyListings.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import Cart from "./pages/Cart.jsx";
import Purchases from "./pages/Purchases.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/"; // hide on login page

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideNavbar && <Navbar />}   {/* 👈 Navbar is here */}

      <div className="p-6">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
