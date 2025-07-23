import { memo, useMemo, useCallback, useState } from "react";
import { Heart, HeartIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist, type Product } from "@/store/wishlistSlice";
import type { RootState } from "@/store";
import { AddToCartButton, Popup } from "@/components";
import { usePopup } from "../hooks";
import { StatusBadge } from "./StatusBadge";
import { QuantitySelector } from "./QuantitySelector";

type ProductCardProps = {
    product: Product;
    onPurchase: (id: number, qty: number) => void;
};

const ProductCardComponent: React.FC<ProductCardProps> = ({ product, onPurchase }) => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
    const [qty, setQty] = useState(1);
    const [imageLoading, setImageLoading] = useState(true);

    const { popupOpen, popupMessage, showPopup, closePopup } = usePopup();

    const isFavorite = useMemo(
        () => wishlistItems.some((item) => item.id === product.id),
        [wishlistItems, product.id]
    );

    const toggleFavorite = useCallback(() => {
        if (isFavorite) {
            dispatch(removeFromWishlist(product.id));
        } else {
            dispatch(addToWishlist(product));
        }
    }, [dispatch, isFavorite, product]);

    const isAvailable = product.stock > 0 && product.status === 1;

    const handleAddToCart = () => {
        onPurchase(product.id, qty);
        showPopup(`Added "${product.name}" (x${qty}) to cart`);
    };

    return (
        <li className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
            {/* Favorite Button */}
            <button
                onClick={toggleFavorite}
                className={`absolute top-3 left-3 z-10 p-2 rounded-full shadow-md transition-all
                    ${isFavorite
                        ? "bg-red-100 text-red-600"
                        : "bg-white text-gray-400 hover:bg-red-100 hover:text-red-500"}
                    hover:scale-110`}
            >
                {isFavorite ? <HeartIcon size={20} /> : <Heart size={20} />}
            </button>

            {/* Status Badge */}
            <div className="absolute top-3 right-3 z-10">
                <StatusBadge status={product.status} />
            </div>

            {/* Product Image */}
            <div className="w-full h-48 relative">
    {imageLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-2xl flex items-center justify-center">
            <span className="text-gray-400 text-sm">Loading image...</span>
        </div>
    )}
    <img
        src={`https://via.assets.so/game.png?id=${product.id}&w=1080&h=720`}
        alt={product.name}
        className={`w-full h-48 object-cover rounded-t-2xl transition-opacity duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setImageLoading(false)}
    />
</div>


            {/* Product Info */}
            <div className="p-4 flex flex-col justify-between flex-grow">
                <div className="space-y-1 mb-3">
                    <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                    <p className="text-sm text-gray-600">
                        Price: ₹/{(product.price).toFixed(2)}
                    </p>
                    <p className="text-sm">
                        Stock:{" "}
                        {isAvailable ? (
                            <span className="text-green-600 font-medium">{product.stock - qty} available</span>
                        ) : (
                            <span className="text-red-600 font-medium">Out of stock</span>
                        )}
                    </p>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">Qty:</span>
                    <QuantitySelector
                        quantity={qty}
                        stock={product.stock}
                        onIncrement={() => setQty((q) => Math.min(q + 1, product.stock))}
                        onDecrement={() => setQty((q) => Math.max(q - 1, 1))}
                    />
                </div>

                {/* Add To Cart Button */}
                <AddToCartButton
                    isAvailable={isAvailable}
                    quantity={qty}
                    maxStock={product.stock}
                    onAddToCart={handleAddToCart}
                />
            </div>

            {/* Popup */}
            <Popup
                open={popupOpen}
                onClose={closePopup}
                severity="success"
                message={popupMessage}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
        </li>
    );
};

export const ProductCard = memo(ProductCardComponent);
