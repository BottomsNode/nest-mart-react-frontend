import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { OrderDetails } from "./helpers";

export const useOrderData = () => {
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const order = localStorage.getItem("lastOrder");
        if (!order) {
            navigate("/cart");
            return;
        }

        try {
            const parsedOrder: OrderDetails = JSON.parse(order);
            setOrderDetails(parsedOrder);
            localStorage.removeItem("lastOrder");
        } catch (err) {
            console.error("Failed to parse order:", err);
            navigate("/cart");
        }
    }, [navigate]);

    return { orderDetails };
};