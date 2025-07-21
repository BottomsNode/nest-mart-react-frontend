import type { FC } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { ShoppingCart, Heart, PackageCheck } from "lucide-react";
import { CalendarDays, IndianRupee } from "lucide-react";
import { useSaleByEmail } from "@/features/orders/hooks";

export const UserDashboard: FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const email = user?.email || "user@example.com";
    const username = "@" + user?.name.split(" ")[0];


    const { data: sales, isLoading } = useSaleByEmail(email);
    const sortedSales = sales
        ?.slice()
        .sort((a, b) => new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime());

    const lastOrder = sortedSales?.[0] || null;

    const cardClass =
        "bg-white p-4 rounded-xl shadow hover:shadow-md transition hover:bg-gray-50 flex items-center space-x-3";

    return (
        <div className="p-6 max-w-8xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome {username}
            </h1>

            <p className="text-sm text-gray-500 mb-5">
                Logged in as {email}
            </p>

            {/* Last Order Section */}
            <div className="bg-white p-4 rounded-xl shadow mb-6 flex items-center space-x-4">
                {isLoading ? (
                    <div className="text-gray-500">Loading your last order...</div>
                ) : lastOrder ? (
                    <>
                        <img
                            src={"https://via.assets.so/game.png?id=105&w=300&h=200"}
                            alt={"Product Image"}
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

            {/* Main Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link to="/orders" className={cardClass}>
                    <PackageCheck className="text-indigo-500" size={24} />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">
                            My Orders
                        </h2>
                        <p className="text-sm text-gray-500">
                            View and manage your orders
                        </p>
                    </div>
                </Link>

                <Link to="/wishlist" className={cardClass}>
                    <Heart className="text-pink-500" size={24} />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">
                            Wishlist
                        </h2>
                        <p className="text-sm text-gray-500">
                            View your favorite products
                        </p>
                    </div>
                </Link>

                <Link to="/cart" className={cardClass}>
                    <ShoppingCart className="text-green-500" size={24} />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">
                            My Cart
                        </h2>
                        <p className="text-sm text-gray-500">
                            Review and checkout your cart items
                        </p>
                    </div>
                </Link>
            </section>

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
                                <p className="text-green-600 font-semibold">₹{order.totalAmount}</p>
                            </div>
                        </Link>
                    ))}
            </div>

            <h2 className="text-lg font-semibold text-gray-800 mt-10 mb-4">
                Recommended For You
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array(3).fill(0).map((_, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-4 rounded-xl shadow hover:shadow-md transition hover:bg-gray-50 flex flex-col items-center"
                    >
                        <img
                            src={`https://via.assets.so/game.png?id=${idx + 1}&w=300&h=200`}
                            alt="Recommended"
                            className="rounded mb-2"
                        />
                        <p className="text-sm font-medium text-gray-700">
                            Product {idx + 1}
                        </p>
                        <Link
                            to="/products">
                            <button className="mt-2 text-indigo-600 text-sm font-medium hover:underline">
                                View Product
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
            <section className="mt-10">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Quick Settings
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Link
                        to="/account/addresses"
                        className="bg-white p-4 rounded-xl shadow hover:shadow-md transition hover:bg-gray-50 text-center"
                    >
                        Manage Addresses
                    </Link>
                    <Link
                        to="/account/payment-methods"
                        className="bg-white p-4 rounded-xl shadow hover:shadow-md transition hover:bg-gray-50 text-center"
                    >
                        Payment Methods
                    </Link>
                    <Link
                        to="/account/settings"
                        className="bg-white p-4 rounded-xl shadow hover:shadow-md transition hover:bg-gray-50 text-center"
                    >
                        Account Settings
                    </Link>
                </div>
            </section>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-10">
                🎉 You have <span className="font-semibold">420</span> reward points! Use them at checkout to save money.
            </div>

            <section className="bg-white p-4 rounded-xl shadow mt-10">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Reward Progress
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                    You're ₹3,500 away from reaching Gold Tier!
                </p>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                        className="bg-green-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: '65%' }} // Example progress
                    ></div>
                </div>

                <p className="text-sm font-medium text-gray-700">
                    Progress: ₹6,500 / ₹10,000
                </p>
            </section>
            <section className="bg-white p-4 rounded-xl shadow mt-10">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    Latest Updates
                </h2>

                <ul className="space-y-3">
                    <li className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Order #1234 has been shipped.
                    </li>
                    <li className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        ₹500 discount unlocked for your next purchase.
                    </li>
                    <li className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                        New arrivals in Electronics — check them out!
                    </li>
                </ul>
            </section>
            <section className="mt-10">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Recently Viewed
                </h2>

                <div className="flex space-x-4 overflow-x-auto pb-2">
                    {Array(4).fill(0).map((_, idx) => (
                        <div
                            key={idx}
                            className="min-w-[140px] bg-white p-3 rounded-xl shadow hover:shadow-md transition hover:bg-gray-50 flex-shrink-0"
                        >
                            <img
                                src={`https://via.assets.so/game.png?id=${idx + 1}&w=300&h=200`}
                                alt="Recently Viewed"
                                className="rounded mb-2"
                            />
                            <p className="text-xs font-medium text-gray-700 truncate">
                                Product {idx + 1}
                            </p>
                            <p className="text-xs text-gray-500">₹{999 + idx * 100}</p>
                        </div>
                    ))}
                </div>
            </section>


        </div>
    );
};
