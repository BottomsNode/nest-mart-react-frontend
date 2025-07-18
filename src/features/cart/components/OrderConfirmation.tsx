import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type OrderItem = {
    id: number;
    quantity: number;
    priceAtPurchase: number;
};

type OrderDetails = {
    customerId: number;
    items: OrderItem[];
};

export const OrderConfirmation: React.FC = () => {
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

    const generatePDF = () => {
        if (!orderDetails) return;

        const doc = new jsPDF();
        doc.text("Order Receipt", 14, 20);

        autoTable(doc, {
            startY: 30,
            head: [["Product ID", "Quantity", "Price"]],
            body: orderDetails.items.map(item => [
                item.id,
                item.quantity,
                `$${item.priceAtPurchase.toFixed(2)}`,
            ]),
        });

        const total = orderDetails.items.reduce(
            (sum, item) => sum + item.priceAtPurchase * item.quantity,
            0
        );

        const finalY = (doc as any).lastAutoTable?.finalY || 40;
        doc.text(`Total: $${total.toFixed(2)}`, 14, finalY + 10);

        doc.save("order-receipt.pdf");
    };

    return (
        <div className="max-w-xl mx-auto text-center py-12">
            <h1 className="text-3xl font-bold mb-4 text-green-700">Order Confirmed!</h1>
            <p className="text-gray-700 mb-6">
                Thank you for your purchase. Your order has been placed successfully.
            </p>

            {orderDetails && (
                <>
                    <div className="bg-white p-4 shadow rounded mb-6">
                        <h2 className="text-lg font-semibold mb-2">Order QR Code</h2>
                        <QRCode
                            value={JSON.stringify(orderDetails)}
                            size={160}
                            className="mx-auto"
                        />
                    </div>

                    <button
                        onClick={generatePDF}
                        className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
                    >
                        Download Invoice (PDF)
                    </button>
                </>
            )}
        </div>
    );
};
