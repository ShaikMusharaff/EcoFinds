import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

function Home() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchProducts() {

            try {

                const { data } = await getProducts();

                setProducts(data.products);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        }

        fetchProducts();

    }, []);

    if (loading) {

        return (
            <MainLayout>
                <h1 className="text-center mt-20">
                    Loading Products...
                </h1>
            </MainLayout>
        );

    }

    return (

        <MainLayout>

            <h1 className="text-3xl font-bold mb-8">
                Latest Products
            </h1>

            {products.length === 0 ? (

                <h2>No Products Found</h2>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {products.map((product) => (

                        <ProductCard
                            key={product._id}
                            product={product}
                        />

                    ))}

                </div>

            )}

        </MainLayout>

    );
}

export default Home;