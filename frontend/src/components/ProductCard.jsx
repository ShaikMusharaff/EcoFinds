import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (
        <Link
            to={`/products/${product._id}`}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
        >
            <img
                src={
                    product.images?.length
                        ? product.images[0]
                        : "https://placehold.co/400x300?text=No+Image"
                }
                alt={product.title}
                className="w-full h-56 object-cover"
            />

            <div className="p-4">

                <h2 className="font-semibold text-lg line-clamp-1">
                    {product.title}
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                    {product.category}
                </p>

                <p className="text-2xl font-bold text-green-600 mt-3">
                    ₹{product.price}
                </p>

                <p className="mt-2 text-gray-600">
                    {product.condition}
                </p>

            </div>

        </Link>
    );
}

export default ProductCard;