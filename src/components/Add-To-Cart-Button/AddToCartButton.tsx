import React from "react";

type AddToCartButtonProps = {
    isAvailable: boolean;
    quantity?: number;
    maxStock?: number;
    onAddToCart: () => void;
};

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
    isAvailable,
    quantity = 1,
    maxStock = 1,
    onAddToCart,
}) => {
    const isDisabled = !isAvailable || quantity > maxStock;

    return (
        <button
            disabled={isDisabled}
            onClick={onAddToCart}
            className={`w-full px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors duration-200
                ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
        >
            {isAvailable ? "Add To Cart" : "Out of Stock"}
        </button>
    );
};
