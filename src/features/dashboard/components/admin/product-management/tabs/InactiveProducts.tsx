// components/InactiveProducts.tsx
import { useInactiveProducts } from "../hooks";
import { useEffect } from "react";

export const InactiveProducts = () => {
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInactiveProducts();

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
                hasNextPage &&
                !isFetchingNextPage
            ) {
                fetchNextPage();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isLoading) return <p>Loading inactive products...</p>;
    if (isError || !data) return <p>Failed to load inactive products.</p>;

    const allProducts = data.pages.flatMap((page) => page.products);

    return (
        <div className="space-y-4">
            {allProducts.length === 0 ? (
                <p>No inactive products found.</p>
            ) : (
                allProducts.map((product) => (
                    <div
                        key={product.id}
                        className="flex items-start gap-4 p-4 border rounded-lg bg-white shadow hover:shadow-md transition"
                    >
                        <img
                            src={`https://via.assets.so/game.png?id=${product.id}&w=300&h=200`}
                            alt="Product"
                            className="w-[120px] h-[80px] object-cover rounded-md"
                        />

                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                                <span className="ml-2 inline-block bg-red-200 text-red-700 text-xs font-medium px-2.5 py-1 rounded-full shadow">
                                    Inactive
                                </span>
                            </div>
                            <p className="text-sm text-gray-600">₹{product.price}</p>
                            <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                        </div>
                    </div>
                ))
            )}

            {isFetchingNextPage && <p>Loading more...</p>}
        </div>
    );
};
