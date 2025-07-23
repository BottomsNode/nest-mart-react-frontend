import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useProducts } from "../hooks";
import { ProductSearch } from "./ProductSearch";
import { ProductGrid } from "./ProductGrid";
import { ProductLoaderStatus } from "./ProductLoaderStatus";
import { addToCart } from "@/store/cartSlice";

const ProductsList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();

    const {
        loaderRef,
        productList,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        invalidateSearch,
    } = useProducts(searchTerm);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1 }
        );

        const current = loaderRef.current;
        if (current && searchTerm === "") observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, searchTerm]);

    const handleSearch = (term: string) => {
        setSearchTerm(term.trim());
        invalidateSearch();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePurchase = (id: number, qty: number) => {
        const product = productList.find((p) => p.id === id);
        if (!product) return;
        dispatch(
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                qty,
                stock: product.stock,
            })
        );
    };

    return (
        <div>
            {/* Sticky Header + Search */}
            <div className="sticky top-20 z-40 bg-white border-b border-gray-200 p-4 rounded-t-md">
                <h1 className="text-2xl font-bold mb-2 text-gray-800">Products</h1>
                <ProductSearch onSearch={handleSearch} />
            </div>

            {/* Content */}
            {isLoading ? (
                <p className="text-center mt-6">Loading products...</p>
            ) : isError ? (
                <p className="text-center text-red-500 mt-6">Failed to load products.</p>
            ) : productList.length === 0 ? (
                <p className="text-center mt-6 text-gray-500">No products found.</p>
            ) : (
                <ProductGrid products={productList} onPurchase={handlePurchase} />
            )}

            {/* Infinite Scroll Loader */}
            {searchTerm === "" && (
                <ProductLoaderStatus
                    isFetchingNextPage={isFetchingNextPage}
                    hasNextPage={hasNextPage}
                    loaderRef={loaderRef}
                />
            )}
        </div>
    );
};

export default ProductsList