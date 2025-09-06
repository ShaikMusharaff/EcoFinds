import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Feed() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      setProducts(res.data);

      // Get unique categories from products
      const uniqueCategories = [
        ...new Set(res.data.map((p) => p.category).filter(Boolean)),
      ];
      setCategories(uniqueCategories);
    } catch (err) {
      setErrorMessage("Failed to fetch products");
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesKeyword = p.title.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    return matchesKeyword && matchesCategory;
  });

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h2 className="text-2xl font-bold text-center mb-6">Product Feed</h2>

      {errorMessage && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          {errorMessage}
        </div>
      )}

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/4"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((p) => (
          <Link
            to={`/product/${p._id}`}
            key={p._id}
            className="block border p-3 rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={p.imageUrl || "https://via.placeholder.com/300"}
              alt={p.title}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-gray-600">${p.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
