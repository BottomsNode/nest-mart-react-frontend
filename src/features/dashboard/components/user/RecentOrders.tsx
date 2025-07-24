import type { FC } from "react";
import { Link } from "react-router-dom";

const RecentOrders: FC<{ sales: any[] }> = ({ sales }) => (
    <>
        <h2 className="text-lg font-semibold text-gray-800 mt-10 mb-4">
            Recent Orders
        </h2>
        <div className="space-y-4">
            {sales
                ?.slice()
                .sort((a, b) => new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime())
                .slice(0, 3)
                .map((order) => (
                    <Link
                        key={order.id}
                        to={`/orders`}
                        className="block bg-white p-4 rounded-xl shadow hover:shadow-md transition hover:bg-gray-50"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-800 font-medium">Order #{order.id}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(order.saleDate).toLocaleDateString()}
                                </p>
                            </div>
                            <p className="text-green-700 font-semibold">
                                ₹{order.totalAmount}
                            </p>
                        </div>
                    </Link>
                ))}
        </div>
    </>
);

export default RecentOrders