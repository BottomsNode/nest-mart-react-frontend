import { useEffect, useState } from "react";
import { useProducts } from "@/features/products/hooks";
import type { Product } from "@/store/wishlistSlice";

export const ActiveProducts = () => {
    const [searchTerm] = useState("");

    const {
        loaderRef,
        productList,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useProducts(searchTerm);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0 }
        );

        const node = loaderRef.current;
        if (node) observer.observe(node);

        return () => {
            if (node) observer.unobserve(node);
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, loaderRef]);

    if (isLoading) return <p>Loading active products...</p>;
    if (isError) return <p>Failed to load active products.</p>;

    return (
        <div className="space-y-4">
            {productList.length === 0 ? (
                <p>No active products found.</p>
            ) : (
                <>
                    {productList.map((product: Product) => (
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
                                    <span className="ml-2 inline-block bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full shadow">
                                        Active
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">₹{product.price}</p>
                                <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                            </div>
                        </div>
                    ))}

                    <div ref={loaderRef} className="h-10 flex justify-center items-center">
                        {isFetchingNextPage && <p>Loading more...</p>}
                    </div>
                </>
            )}
        </div>
    );
};
