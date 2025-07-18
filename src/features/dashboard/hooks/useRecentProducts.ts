import { useEffect, useState } from "react";
import axiosInstance from "@/api/handler";
import type { Product } from "@/store/wishlistSlice";

export const useRecentProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axiosInstance
            .get("/products?page=1&limit=5")
            .then((res) => {
                const recent = res.data?.products || [];
                setProducts(recent);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setError("Failed to fetch recent products");
            })
            .finally(() => setLoading(false));
    }, []);

    return { products, loading, error };
};
