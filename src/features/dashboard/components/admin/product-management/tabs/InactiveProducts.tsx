import { useInactiveProducts } from "../hooks";
import { useEffect, useState } from "react";

const InactiveProducts = () => {
    const [imageLoadingMap, setImageLoadingMap] = useState<Record<number, boolean>>({});
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

    if (isLoading) return <p className="text-center text-gray-500">Loading inactive products...</p>;
    if (isError || !data) return <p className="text-center text-red-500">Failed to load inactive products.</p>;

    const allProducts = data.pages.flatMap((page) => page.products);

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {allProducts.map((product) => (
                    <div
                        key={product.id}
                        className="relative rounded-xl overflow-hidden shadow border border-gray-200 bg-white transition hover:shadow-md"
                    >
                        <div className="relative w-full h-[180px]">
                            {imageLoadingMap[product.id] && (
                                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-xl flex items-center justify-center z-10">
                                    <span className="text-gray-400 text-sm">Loading image...</span>
                                </div>
                            )}
                            <img
                                src={`https://via.assets.so/game.png?id=${product.id}&w=1080&h=720`}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-t-xl"
                                onLoad={() =>
                                    setImageLoadingMap((prev) => ({ ...prev, [product.id]: false }))
                                }
                                onError={() =>
                                    setImageLoadingMap((prev) => ({ ...prev, [product.id]: false }))
                                }
                                onLoadStart={() =>
                                    setImageLoadingMap((prev) => ({ ...prev, [product.id]: true }))
                                }
                            />
                        </div>

                        <div className="p-4 space-y-1">
                            <div className="flex justify-between items-center">
                                <h2 className="font-semibold text-lg text-gray-800">{product.name}</h2>
                                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-200 text-gray-700">
                                    Inactive
                                </span>
                            </div>
                            <p className="text-sm text-gray-600">₹{product.price}</p>
                            <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                        </div>
                    </div>
                ))}
            </div>

            {isFetchingNextPage && (
                <div className="mt-10 flex justify-center">
                    <p className="text-sm text-gray-500">Loading more...</p>
                </div>
            )}
        </div>
    );
};

export default InactiveProducts;