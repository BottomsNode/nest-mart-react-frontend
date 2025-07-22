import { Link } from "react-router-dom";
import { ShoppingCart, Heart, PackageCheck } from "lucide-react";

export const DashboardLinks = () => {
    const cardClass =
        "bg-white p-4 rounded-xl shadow hover:shadow-md transition hover:bg-gray-50 flex items-center space-x-3";

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/orders" className={cardClass}>
                <PackageCheck className="text-indigo-500" size={24} />
                <div>
                    <h2 className="text-lg font-semibold text-gray-700">My Orders</h2>
                    <p className="text-sm text-gray-500">View and manage your orders</p>
                </div>
            </Link>

            <Link to="/wishlist" className={cardClass}>
                <Heart className="text-pink-500" size={24} />
                <div>
                    <h2 className="text-lg font-semibold text-gray-700">Wishlist</h2>
                    <p className="text-sm text-gray-500">View your favorite products</p>
                </div>
            </Link>

            <Link to="/cart" className={cardClass}>
                <ShoppingCart className="text-green-500" size={24} />
                <div>
                    <h2 className="text-lg font-semibold text-gray-700">My Cart</h2>
                    <p className="text-sm text-gray-500">
                        Review and checkout your cart items
                    </p>
                </div>
            </Link>
        </section>
    );
};
