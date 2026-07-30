function CategoryFilter({ category, setCategory }) {
    return (
        <div className="mb-6">
            <select
                className="border rounded-md px-3 py-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Books">Books</option>
                <option value="Clothing">Clothing</option>
            </select>
        </div>
    );
}

export default CategoryFilter;