import type { FC } from "react";
import { useRecentProducts, useRecentUsers } from "../../hooks";

const RecentActivity: FC = () => {
    const { users, loading: usersLoading, error: usersError } = useRecentUsers();
    const { products, loading: productsLoading, error: productsError } = useRecentProducts();

    const loading = usersLoading || productsLoading;
    const error = usersError || productsError;

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-5">Recent Activity</h2>

            {loading ? (
                <p className="text-sm text-gray-500">Loading recent activity...</p>
            ) : error ? (
                <p className="text-sm text-red-500">{error}</p>
            ) : (
                <div className="space-y-6 text-sm text-gray-700">
                    {/* Recent Users */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2">👥 New Users</h3>
                        <ul className="list-disc list-inside space-y-2">
                            {users.map((user) => (
                                <li key={user.id}>
                                    <strong>{user.name}</strong> registered with <em>{user.email}</em>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Recent Products */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2">🛒 New Products</h3>
                        <ul className="list-disc list-inside space-y-2">
                            {products.slice(0, 3).map((product) => (
                                <li key={product.id}>
                                    <strong>{product.name}</strong> was added for ₹
                                    {(product.price).toLocaleString("en-IN")}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecentActivity