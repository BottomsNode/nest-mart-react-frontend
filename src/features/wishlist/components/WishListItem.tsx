import { memo } from "react";
import { HeartIcon } from "lucide-react";
import { AddToCartButton } from "@/components";

type Props = {
    product: {
        id: number;
        name: string;
        price: number;
        stock: number;
        status: number;
    };
    onRemove: (id: number) => void;
    onAddToCart: (product: any) => void;
};

export const WishListItem = memo(({ product, onRemove, onAddToCart }: Props) => {
    const isAvailable = product.stock > 0 && product.status === 1;

    return (
        <li className="flex flex-col sm:flex-row items-center gap-4 bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow transition-all">
            <img
                src={`https://via.assets.so/game.jpg?id=${product.id}&w=300&h=300`}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg border"
            />

            <div className="flex-1 w-full">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600">
                    Price: <span className="text-gray-800 font-medium">${product.price.toFixed(2)}</span>
                </p>
                <p className="text-sm text-gray-600">
                    Stock:{" "}
                    {product.stock > 0 ? (
                        <span className="text-green-600 font-medium">{product.stock} available</span>
                    ) : (
                        <span className="text-red-600 font-medium">Out of stock</span>
                    )}
                </p>
                <span
                    className={`inline-block mt-1 w-fit px-2 py-0.5 rounded-full text-xs font-medium text-white ${product.status === 1 ? "bg-green-600" : "bg-gray-500"
                        }`}
                >
                    {product.status === 1 ? "Active" : "Inactive"}
                </span>
            </div>

            <div className="flex flex-col items-center gap-2 sm:items-end sm:justify-between sm:h-full">
                <button
                    onClick={() => onRemove(product.id)}
                    className="text-red-500 hover:text-red-600 transition p-1.5 rounded-full bg-red-50 hover:scale-110"
                    title="Remove from wishlist"
                >
                    <HeartIcon size={20} />
                </button>

                <AddToCartButton
                    isAvailable={isAvailable}
                    quantity={1}
                    maxStock={product.stock}
                    onAddToCart={() => onAddToCart(product)}
                />
            </div>
        </li>
    );
});
