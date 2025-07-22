import { CalendarDays, IndianRupee } from "lucide-react";
import type { FC } from "react";

export const LastOrderCard: FC<{ sales: any[]; isLoading: boolean }> = ({
    sales,
    isLoading,
}) => {
    const lastOrder = sales
        ?.slice()
        .sort((a, b) => new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime())[0];

    return (
        <div className="bg-white p-4 rounded-xl shadow mb-6 flex items-center space-x-4">
            {isLoading ? (
                <div className="text-gray-500">Loading your last order...</div>
            ) : lastOrder ? (
                <>
                    <img
                        src="https://via.assets.so/game.png?id=105&w=300&h=200"
                        alt="Product"
                        className="w-16 h-16 rounded object-cover"
                    />
                    <div>
                        <p className="text-gray-600 text-sm">Last Order</p>
                        <h2 className="font-semibold text-gray-800 mb-1">
                            Order #{lastOrder.id}
                        </h2>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                            <CalendarDays className="w-4 h-4 text-gray-400" />
                            {new Date(lastOrder.saleDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-700 font-medium flex items-center gap-1">
                            <IndianRupee className="w-4 h-4 text-green-600" />
                            ₹{lastOrder.totalAmount}
                        </p>
                    </div>
                </>
            ) : (
                <div className="text-gray-500">No orders found.</div>
            )}
        </div>
    );
};
