import { useEffect, useState } from "react";
import axiosInstance from "@/api/handler";

export interface AdminDashboardMetrics {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
}

export const useAdminDashboardMetrics = () => {
    const [metrics, setMetrics] = useState<AdminDashboardMetrics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const [userRes, productRes, saleRes] = await Promise.all([
                    axiosInstance.get("/user"),
                    axiosInstance.get("/products?page=1&limit=1"),
                    axiosInstance.get("/sale"),
                ]);

                const totalUsers = Array.isArray(userRes.data) ? userRes.data.length : 0;
                const totalProducts = productRes.data?.totalRecords || 0;

                const sales = saleRes.data;
                const totalOrders = sales.length;
                const totalRevenue = sales.reduce(
                    (sum: number, sale: any) => sum + parseFloat(sale.totalAmount),
                    0
                );

                setMetrics({
                    totalUsers,
                    totalProducts,
                    totalOrders,
                    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
                });
            } catch (err: any) {
                console.error("Failed to fetch metrics:", err);
                setError("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    return { metrics, loading, error };
};
