import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { formatCurrency, generatePDFInvoice, useISTDate, type OrderDetails } from "../hooks";

const OrderConfirmation: React.FC = () => {
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        const order = sessionStorage.getItem("lastOrder");
        if (!order) {
            navigate("/cart");
            return;
        }

        try {
            const parsed: unknown = JSON.parse(order);
            if (!parsed || typeof parsed !== "object" || !Array.isArray((parsed as any).items)) {
                throw new Error("Invalid order data");
            }
            setOrderDetails(parsed as OrderDetails);
        } catch (err) {
            console.error("Failed to parse order:", err);
            navigate("/cart");
        }
    }, [navigate]);

    if (!orderDetails) {
        return (
            <div className="text-center py-12">
                <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full mx-auto mb-4"></div>
                <p>Loading order details...</p>
            </div>
        );
    }

    const { items, customer, orderId, saleDate, totalAmount } = orderDetails;
    const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
    const { formatToIST } = useISTDate();
    const formattedSaleDate = formatToIST(saleDate);


    return (
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-green-700">Order Confirmed!</h1>
                <p className="text-gray-600 mt-2">
                    Thank you for your purchase. Your order has been successfully placed.
                </p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
                {/* Customer and Order Info */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">👤 Customer Info</h2>
                        <p><span className="font-medium">Name:</span> {user?.name || customer.name || "N/A"}</p>
                        <p><span className="font-medium">Email:</span> {user?.email || customer.email || "N/A"}</p>
                        <p><span className="font-medium">Customer ID:</span> #{customer.id}</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">🧾 Order Details</h2>
                        <p><span className="font-medium">Order ID:</span> #{orderId}</p>
                        <p><span className="font-medium">Placed On:</span> {formattedSaleDate} IST</p>
                        <p><span className="font-medium">Items:</span> {items.length}</p>
                        <p><span className="font-medium">Total Quantity:</span> {totalQty}</p>
                        <p><span className="font-medium">Total Amount:</span> {formatCurrency(totalAmount)}</p>
                    </div>
                </div>

                {/* Item List */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">📦 Items in Your Order</h2>
                    <ul className="divide-y divide-gray-200">
                        {items.map((item, index) => (
                            <li key={index} className="py-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-500">
                                            Article No: #{item.id} — Qty: {item.quantity}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-800">{formatCurrency(item.priceAtPurchase)}</p>
                                        <p className="text-sm text-gray-500">
                                            Subtotal: {formatCurrency(item.priceAtPurchase * item.quantity)}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="flex justify-center mt-6">
                <button
                    onClick={() => user && generatePDFInvoice(orderDetails, user)}
                    disabled={!user}
                    className={`px-6 py-2 rounded-lg transition ${user ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-200 cursor-not-allowed"
                        }`}
                >
                    Download Invoice (PDF)
                </button>
            </div>

        </div>
    );
};

export default OrderConfirmation;