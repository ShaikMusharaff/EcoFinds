function SortFilter({ sort, setSort }) {
    return (
        <div>
            <select
                className="border rounded-md px-3 py-2"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
            >
                <option value="newest">
                    Newest
                </option>

                <option value="oldest">
                    Oldest
                </option>

                <option value="price_asc">
                    Price: Low to High
                </option>

                <option value="price_desc">
                    Price: High to Low
                </option>
            </select>
        </div>
    );
}

export default SortFilter;