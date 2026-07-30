import { Input } from "@/components/ui/input";

function SearchBar({ search, setSearch }) {

    return (

        <div className="mb-6">

            <Input

                placeholder="Search products..."

                value={search}

                onChange={(e) => setSearch(e.target.value)}

            />

        </div>

    );

}

export default SearchBar;