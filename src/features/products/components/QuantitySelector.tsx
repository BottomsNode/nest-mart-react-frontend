import { Minus, Plus } from "lucide-react";

type QuantitySelectorProps = {
    quantity: number;
    stock: number;
    onIncrement: () => void;
    onDecrement: () => void;
};

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
    quantity,
    stock,
    onIncrement,
    onDecrement,
}) => {
    return (
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <button
                onClick={onDecrement}
                className="px-2 py-1 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                disabled={quantity <= 1}
            >
                <Minus size={16} />
            </button>
            <span className="px-4 py-1 text-sm font-medium">{quantity}</span>
            <button
                onClick={onIncrement}
                className="px-2 py-1 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                disabled={quantity >= stock}
            >
                <Plus size={16} />
            </button>
        </div>
    );
};
