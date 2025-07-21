import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "@/assets/web_logo.jpg";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

type OrderItem = {
    id: number;
    quantity: number;
    priceAtPurchase: number;
    name?: string;
};

type OrderDetails = {
    customerId: number;
    items: OrderItem[];
};

export const OrderConfirmation: React.FC = () => {
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);

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

    const generatePDF = () => {
        if (!orderDetails || !user) return;

        const doc = new jsPDF();

        // Header with logo
        const img = new Image();
        img.src = logo;
        doc.addImage(img, "PNG", 14, 10, 30, 30);
        doc.setFontSize(18);
        doc.text("Billing Invoice", 105, 20, { align: "center" });

        // Customer Info
        doc.setFontSize(12);
        doc.text(`Customer Name: ${user.name}`, 14, 50);
        doc.text(`Email: ${user.email}`, 14, 57);
        doc.text(`Order ID: #${orderDetails.customerId}`, 14, 64);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 71);

        // Items Table
        autoTable(doc, {
            startY: 80,
            head: [["Product ID", "Quantity", "Unit Price (₹)", "Total (₹)"]],
            body: orderDetails.items.map(item => [
                item.id,
                item.quantity,
                item.priceAtPurchase.toFixed(2),
                (item.quantity * item.priceAtPurchase).toFixed(2),
            ]),
        });

        const total = orderDetails.items.reduce(
            (sum, item) => sum + item.priceAtPurchase * item.quantity,
            0
        );

        const finalY = (doc as any).lastAutoTable.finalY || 100;
        doc.setFontSize(14);
        doc.text(`Grand Total: ₹${total.toFixed(2)}`, 14, finalY + 10);

        doc.save("invoice.pdf");
    };

    return (
        <div className="max-w-xl mx-auto text-center py-12">
            <h1 className="text-3xl font-bold mb-4 text-green-700">Order Confirmed!</h1>
            <p className="text-gray-700 mb-6">
                Thank you for your purchase. Your order has been placed successfully.
            </p>

            <div className="bg-white p-6 rounded shadow mb-6 text-left">
                <h2 className="text-lg font-semibold mb-2">Customer Info</h2>
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            </div>

            <button
                onClick={generatePDF}
                className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
            >
                Download Invoice (PDF)
            </button>
        </div>
    );
};
