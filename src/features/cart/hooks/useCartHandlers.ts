import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "@/store";
import { removeFromCart, updateCartQty, clearCart } from "@/store/cartSlice";

export function useCartHandlers() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const showPopup = (message: string) => {
        setPopupMessage(message);
        setPopupOpen(true);
    };

    const incrementQty = (id: number, qty: number, stock: number) => {
        if (qty < stock) {
            dispatch(updateCartQty({ id, qty: qty + 1 }));
        }
    };

    const decrementQty = (id: number, qty: number) => {
        if (qty > 1) {
            dispatch(updateCartQty({ id, qty: qty - 1 }));
        }
    };

    const handleRemove = (id: number, name: string) => {
        dispatch(removeFromCart(id));
        showPopup(`Removed "${name}" from cart`);
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        showPopup("Cart cleared");
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    return {
        cartItems,
        popupOpen,
        popupMessage,
        setPopupOpen,
        showPopup,
        incrementQty,
        decrementQty,
        handleRemove,
        handleClearCart,
        total,
    };
}
