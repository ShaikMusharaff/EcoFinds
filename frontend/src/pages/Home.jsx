import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { getProducts } from "../services/productService";
import CategoryFilter from "../components/CategoryFilter";
import SortFilter from "../components/SortFilter";
import Pagination from "../components/Pagination";


function Home() {

   const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

const [search, setSearch] = useState("");
const [debouncedSearch, setDebouncedSearch] = useState("");

const [category, setCategory] = useState("");
const [sort, setSort] = useState("");

const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
     // 1️⃣ Debounce Effect
    useEffect(() => {

        const timer = setTimeout(() => {

            setDebouncedSearch(search);

        }, 500);

        return () => {

            clearTimeout(timer);

        };

    }, [search]);

useEffect(() => {
    setPage(1);
}, [debouncedSearch, category, sort]);
// 2️⃣ Fetch Products Effect
    useEffect(() => {

        async function fetchProducts() {

            try {

                const { data } = await getProducts({
                    search: debouncedSearch,
                    category: category,
                    sort: sort,
                    page: page,
                    limit: 10
                });

                setProducts(data.products);
                setTotalPages(data.totalPages);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        }
        

        fetchProducts();

    }, [debouncedSearch, category, sort, page]);

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

           <div className="flex flex-col md:flex-row gap-4 mb-6">

    <SearchBar
        search={search}
        setSearch={setSearch}
    />

    <CategoryFilter
        category={category}
        setCategory={setCategory}
    />

    <SortFilter
        sort={sort}
        setSort={setSort}
    />

</div>
            {products.length === 0 ? (

    <h2>No Products Found</h2>

) : (

    <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {products.map((product) => (

                <ProductCard
                    key={product._id}
                    product={product}
                />

            ))}

        </div>

        <Pagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
        />

    </>

)}
        </MainLayout>

    );
}

export default Home;