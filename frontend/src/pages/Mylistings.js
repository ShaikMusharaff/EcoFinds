import { useEffect, useState } from "react";
import axios from "axios";

function MyListings({ userId }) {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/products?sellerId=${userId}`);
      setProducts(res.data);
    } catch (error) {
      setErrorMessage("Failed to fetch products");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      fetchProducts();
    } catch (error) {
      setErrorMessage("Failed to delete product");
    }
  };

  const editProduct = async (id) => {
    const title = prompt("Enter new product title:");
    if (!title) return;
    try {
      await axios.put(`http://localhost:5000/products/${id}`, { title });
      fetchProducts();
    } catch (error) {
      setErrorMessage("Failed to update product");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-6">My Listings</h2>

      {errorMessage && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="border border-gray-200 rounded-xl p-4 bg-white shadow-md"
          >
            <img
              src={p.imageUrl ? `http://localhost:5000/${p.imageUrl}` : "https://via.placeholder.com/150"}
              alt={p.title}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-gray-600">{p.description}</p>
            <p className="font-bold text-green-600">${p.price}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => editProduct(p._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(p._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListings;
