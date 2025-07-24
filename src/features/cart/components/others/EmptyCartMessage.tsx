import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const EmptyCartMessage: React.FC = () => (
    <div className="flex flex-col items-center justify-center mt-20 text-center">
        <span className="animate-bounce text-4xl bg-amber-100 p-5 rounded-full shadow-md mb-10">
            🛒
        </span>

        <p className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty.</p>
        <p className="text-gray-500 mb-6 max-w-md">
            Browse our collection and start shopping!
        </p>

        <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform hover:scale-105"
        >
            <ShoppingBag size={20} /> Shop Now
        </Link>
    </div>
);

export default EmptyCartMessage;