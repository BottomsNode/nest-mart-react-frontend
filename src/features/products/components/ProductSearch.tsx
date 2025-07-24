import { useState, useMemo, useCallback } from "react";
import { Search } from "lucide-react";
import { debounce } from "lodash";

interface Props {
    onSearch: (term: string) => void;
}

const ProductSearch: React.FC<Props> = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState("");

    const debouncedSearch = useMemo(() => debounce(onSearch, 500), [onSearch]);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            setInputValue(val);
            debouncedSearch(val.trim());
        },
        [debouncedSearch]
    );

    return (
        <div className="relative w-4xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
                name="search"
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
        </div>
    );
};

export default ProductSearch;