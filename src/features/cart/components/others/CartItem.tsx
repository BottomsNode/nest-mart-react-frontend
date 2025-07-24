import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";

type CartItemProps = {
    id: number;
    name: string;
    price: number;
    qty: number;
    stock: number;
    onIncrement: () => void;
    onDecrement: () => void;
    onRemove: () => void;
};

const CartItem: React.FC<CartItemProps> = ({
    name,
    price,
    qty,
    stock,
    onIncrement,
    onDecrement,
    onRemove,
}) => {
    const subtotal = price * qty;

    return (
        <div className="bg-white shadow-sm rounded-lg p-4 flex flex-col md:flex-row items-center justify-between transition hover:shadow-md">
            {/* Product Info */}
            <div className="flex-1 w-full md:w-auto mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-500">
                    ${price.toFixed(2)} × {qty}{" "}
                    <span className="text-gray-700 font-medium">
                        = ${subtotal.toFixed(2)}
                    </span>
                </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center border rounded overflow-hidden shadow-sm">
                    <button
                        onClick={onDecrement}
                        disabled={qty <= 1}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                        title="Decrease quantity"
                    >
                        <Minus size={16} />
                    </button>
                    <span className="px-3 py-1 text-gray-800 font-medium">
                        {qty}
                    </span>
                    <button
                        onClick={onIncrement}
                        disabled={qty >= stock}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                        title="Increase quantity"
                    >
                        <Plus size={16} />
                    </button>
                </div>

                {/* Remove Button */}
                <button
                    onClick={onRemove}
                    className="ml-2 text-red-500 hover:text-red-600 transition"
                    title="Remove item"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
};

export default CartItem;