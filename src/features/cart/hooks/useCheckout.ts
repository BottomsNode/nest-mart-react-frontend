import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/handler";
import { useCartHandlers } from "../hooks/useCartHandlers";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

// Interfaces
interface SaleItem {
    id: number;
    product: {
        id: number;
        name: string;
    };
    quantity: number;
    priceAtPurchase: string;
}

interface CartItem {
    id: number;
    name: string;
    price: number;
    qty: number;
}

interface OrderPayload {
    customerId: number;
    items: {
        id: number;
        quantity: number;
        priceAtPurchase: number;
    }[];
}

interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    priceAtPurchase: number;
}

export interface FullOrderDetails {
    orderId: number;
    saleDate: string;
    totalAmount: number;
    customer: {
        id: number;
        name?: string;
        email?: string;
    };
    items: OrderItem[];
}

export const useCheckout = () => {
    const user = useSelector((state: RootState) => state.auth.user);
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
    } = useCartHandlers(setPopupMessage);

    const handleCheckout = async () => {
        if (!user?.id) {
            setPopupMessage("Please log in to place your order.");
            setPopupOpen(true);
            return;
        }

        const orderPayload: OrderPayload = {
            customerId: user.id,
            items: cartItems.map((item: CartItem) => ({
                id: item.id,
                quantity: item.qty,
                priceAtPurchase: item.price,
            })),
        };

        try {
            setIsPlacingOrder(true);

            // Step 1: Create sale
            const { data: saleData } = await axiosInstance.post("/sale", orderPayload);
            const saleId = saleData.id;

            if (!saleId) throw new Error("Missing sale ID");

            // Step 2: Fetch sale items
            const saleItemsData: SaleItem[] = (await axiosInstance.get("/sale-item")).data;

            // Step 3: Filter matching items
            const itemIds = orderPayload.items.map(item => item.id);

            const items: OrderItem[] = saleItemsData
                .filter(item => itemIds.includes(item.product.id))
                .map(item => ({
                    id: item.product.id,
                    name: item.product.name,
                    quantity: item.quantity,
                    priceAtPurchase: parseFloat(item.priceAtPurchase),
                }));

            const fullOrderDetails: FullOrderDetails = {
                orderId: saleId,
                saleDate: saleData.saleDate,
                totalAmount: saleData.totalAmount,
                customer: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                items,
            };

            sessionStorage.setItem("lastOrder", JSON.stringify(fullOrderDetails));

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
