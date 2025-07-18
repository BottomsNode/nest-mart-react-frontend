import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/handler";
import { useCartHandlers } from "../hooks/useCartHandlers";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

export const useCheckout = () => {
    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const navigate = useNavigate();
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const {
        cartItems,
        popupOpen,
        setPopupOpen,
        incrementQty,
        decrementQty,
        handleRemove,
        handleClearCart,
        total,
    } = useCartHandlers();

    const handleCheckout = async () => {
        if (!userId) {
            setPopupMessage("Please log in to place your order.");
            setPopupOpen(true);
            return;
        }

        const orderPayload = {
            customerId: userId,
            items: cartItems.map(item => ({
                id: item.id,
                quantity: item.qty,
                priceAtPurchase: item.price,
            })),
        };

        try {
            setIsPlacingOrder(true);
            await axiosInstance.post("/sale", orderPayload);
            localStorage.setItem("lastOrder", JSON.stringify(orderPayload));
            setPopupMessage("Order placed successfully!");
            setPopupOpen(true);
            handleClearCart();

            setTimeout(() => {
                navigate("/cart/order-confirmation");
            }, 1000);
        } catch (err) {
            console.error("Order failed:", err);
            setPopupMessage("Failed to place order. Please try again.");
            setPopupOpen(true);
        } finally {
            setIsPlacingOrder(false);
        }
    };

    return {
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
    };
};
