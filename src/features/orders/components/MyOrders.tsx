import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useSaleByEmail } from "../hooks";
import { SaleItemDetail } from "./SaleItemDetail";
import type { RootState } from "@/store";
import { ShoppingBag, IndianRupee, CalendarDays } from "lucide-react";

export const MyOrders = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const email = user?.email;

    // const { data: sales, isLoading, isError, refetch } = useSaleByEmail(email || "");
    const { data: sales, isLoading, isError, error, refetch } = useSaleByEmail(email || "");

    useEffect(() => {
        if (email) {
            refetch();
        }
    }, [email, refetch]);

    if (!email) {
        return (
            <p className="text-center text-gray-500 py-10">
                Please log in to view your orders.
            </p>
        );
    }

    if (isLoading) {
        return (
            <p className="text-center text-gray-500 py-10">
                Loading your orders...
            </p>
        );
    }

    if (isError) {
        return (
            <p className="text-center text-red-500 py-10">
                {error?.message || "Failed to load your orders."}
            </p>
        );
    }

    if (!sales || sales.length === 0) {
        return (
            <p className="text-center text-gray-500 py-10">
                No orders found.
            </p>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-indigo-600" />
                Your Orders
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sales.map((sale) => (
                    <div
                        key={sale.id}
                        className="group transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-100 bg-white p-6 rounded-2xl border border-gray-200 shadow-lg cursor-pointer"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Order #{sale.id}
                            </h2>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                <CalendarDays className="w-4 h-4" />
                                {new Date(sale.saleDate).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="mb-2 text-sm text-gray-600">
                            <span className="font-medium">Customer:</span>{" "}
                            {sale.customer.name} ({sale.customer.email})
                        </div>

                        <div className="mb-4 text-sm font-medium text-gray-700 flex items-center gap-1">
                            <IndianRupee className="w-4 h-4 text-green-600" />
                            ₹{sale.totalAmount}
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2 text-gray-800">
                                Items:
                            </h3>
                            <ul className="space-y-4">
                                {sale.items.map((item) => (
                                    <SaleItemDetail
                                        key={item.id}
                                        itemId={item.id}
                                        quantity={item.quantity}
                                        price={item.priceAtPurchase}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};
