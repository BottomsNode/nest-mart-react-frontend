import { useDispatch, useSelector } from "react-redux";
import { HeartIcon, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { lazy, useState } from "react";
import type { RootState } from "@/store";
import { removeFromWishlist } from "@/store/wishlistSlice";
import { addToCart } from "@/store/cartSlice";

const Popup = lazy(()=> import("@/components/Popup/Popup"));
const WishListItem = lazy(()=> import("./WishListItem"));

const WishList: React.FC = () => {
    const dispatch = useDispatch();
    const wishlist = useSelector((state: RootState) => state.wishlist.items);

    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const handleRemove = (productId: number) => {
        dispatch(removeFromWishlist(productId));
    };

    const handleAddToCart = (product: typeof wishlist[number]) => {
        dispatch(
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                qty: 1,
                stock: product.stock,
            })
        );
        setPopupMessage(`${product.name} added to cart`);
        setPopupOpen(true);
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center font-serif">My Wishlist</h1>

            {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 text-center">
                    <div className="animate-bounce bg-pink-100 p-5 rounded-full shadow-md mb-10">
                        <HeartIcon className="text-pink-500" size={56} />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-500 mb-6 max-w-md">
                        Start adding your favorite products. Tap the ❤️ icon on any product to save it here.
                    </p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-transform hover:scale-103"
                    >
                        <ShoppingBag size={20} /> Browse Products
                    </Link>
                </div>
            ) : (
                <ul className="space-y-4 mt-6">
                    {wishlist.map((product) => (
                        <WishListItem
                            key={product.id}
                            product={product}
                            onRemove={handleRemove}
                            onAddToCart={handleAddToCart}
                        />
                    ))}

                </ul>
            )}

            <Popup
                open={popupOpen}
                onClose={() => setPopupOpen(false)}
                severity="success"
                message={popupMessage}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
        </div>
    );
};

export default WishList