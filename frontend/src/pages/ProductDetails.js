import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams(); // get product id from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="product-details-container">
      <div className="product-card">
        <img
          src={product.imageUrl || "https://via.placeholder.com/300"}
          alt={product.title}
          className="product-image"
        />
        <div className="product-info">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-description">{product.description}</p>
          <p><strong>Category:</strong> {product.category || "Not specified"}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Seller:</strong> {product.sellerId || "Anonymous"}</p>
        </div>
      </div>
    </div>
  );
}
