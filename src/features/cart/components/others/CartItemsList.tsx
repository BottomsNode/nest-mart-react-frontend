import { lazy } from "react";

interface Props {
    items: any[];
    onIncrement: (id: number, qty: number, stock: number) => void;
    onDecrement: (id: number, qty: number) => void;
    onRemove: (id: number, name: string) => void;
    onClear: () => void;
}
const CartItem = lazy(()=> import('./CartItem'));

const CartItemsList: React.FC<Props> = ({
    items,
    onIncrement,
    onDecrement,
    onRemove,
    onClear,
}) => (
    <div className="md:col-span-2 space-y-6">
        {items.map(item => (
            <CartItem
                key={item.id}
                {...item}
                onIncrement={() => onIncrement(item.id, item.qty, item.stock)}
                onDecrement={() => onDecrement(item.id, item.qty)}
                onRemove={() => onRemove(item.id, item.name)}
            />
        ))}
        <button
            onClick={onClear}
            className="text-sm text-red-500 hover:underline"
        >
            Clear Entire Cart
        </button>
    </div>
);

export default CartItemsList;
