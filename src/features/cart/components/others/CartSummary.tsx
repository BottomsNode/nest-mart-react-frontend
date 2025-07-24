interface Props {
    total: number;
    isPlacingOrder: boolean;
    onCheckout: () => void;
}

const CartSummary: React.FC<Props> = ({ total, isPlacingOrder, onCheckout }) => (
    <div className="bg-white shadow-lg rounded-lg p-6 sticky top-24 h-fit">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
        <div className="flex justify-between text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 mb-4">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">Free</span>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between text-lg font-semibold text-gray-800">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
        </div>

        <button
            disabled={total === 0 || isPlacingOrder}
            onClick={onCheckout}
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
            {isPlacingOrder ? "Placing Order..." : "Proceed to Checkout"}
        </button>
    </div>
);

export default CartSummary