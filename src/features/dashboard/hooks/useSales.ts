import { useEffect, useState } from "react";
import axiosInstance from "@/api/handler";

type SaleItem = {
    quantity: number;
    priceAtPurchase: string;
};

type Sale = {
    saleDate: string;
    items: SaleItem[];
};

type SalesChartData = {
    date: string;
    revenue: number;
};

export const useSales = () => {
    const [sales, setSales] = useState<SalesChartData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axiosInstance
            .get<Sale[]>("/sale")
            .then((res) => {
                const grouped: Record<string, number> = {};

                res.data.forEach((sale) => {
                    const date = sale.saleDate.split("T")[0];
                    const total = sale.items.reduce((sum, item) => {
                        return sum + Number(item.priceAtPurchase) * item.quantity;
                    }, 0);

                    grouped[date] = (grouped[date] || 0) + total;
                });

                const chartData = Object.entries(grouped).map(([date, revenue]) => ({
                    date,
                    revenue: Math.round(revenue * 100) / 100,
                }));

                setSales(chartData);
            })
            .catch((_err) => {
                setError("No sales data yet..");
            })
            .finally(() => setLoading(false));
    }, []);

    return { sales, loading, error };
};
