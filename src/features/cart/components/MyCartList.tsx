import { CartItemsList } from "./CartItemsList";
import { CartSummary } from "./CartSummary";
import { EmptyCartMessage } from "./EmptyCartMessage";
import { Popup } from "@/components";
import { useCheckout } from "../hooks/useCheckout";

export const MyCartList: React.FC = () => {
    const {
        cartItems,
        total,
        popupOpen,
        setPopupOpen,
        popupMessage,
        isPlacingOrder,
        handleCheckout,
        incrementQty,
        decrementQty,
        handleRemove,
        handleClearCart,
    } = useCheckout();

    const isEmpty = cartItems.length === 0;

    return (
        <div className="min-h-[70vh] bg-gray-50 py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Your Shopping Cart
                </h1>

                {isEmpty ? (
                    <EmptyCartMessage />
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        <CartItemsList
                            items={cartItems}
                            onIncrement={incrementQty}
                            onDecrement={decrementQty}
                            onRemove={handleRemove}
                            onClear={handleClearCart}
                        />
                        <CartSummary
                            total={total}
                            isPlacingOrder={isPlacingOrder}
                            onCheckout={handleCheckout}
                        />
                    </div>
                )}

                <Popup
                    open={popupOpen}
                    onClose={() => setPopupOpen(false)}
                    severity="info"
                    message={popupMessage}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                />
            </div>
        </div>
    );
};
