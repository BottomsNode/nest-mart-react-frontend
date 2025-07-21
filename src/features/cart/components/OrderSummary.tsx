import React from "react";
import { type OrderDetails, calculateOrderTotal, calculateTotalQuantity, formatCurrency } from "../hooks";

interface OrderSummaryProps {
    orderDetails: OrderDetails;
    user: {
        name: string;
        email: string;
    };
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ orderDetails, user }) => {
    const totalAmount = calculateOrderTotal(orderDetails.items);
    const totalQuantity = calculateTotalQuantity(orderDetails.items);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h3 className="font-medium text-gray-700 mb-2">Customer Information</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Name:</span> {user.name}</p>
                        <p><span className="font-medium">Email:</span> {user.email}</p>
                        <p><span className="font-medium">Order ID:</span> #{orderDetails.customerId}</p>
                        <p><span className="font-medium">Date:</span> {new Date().toLocaleDateString("en-IN")}</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-medium text-gray-700 mb-2">Order Details</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Items:</span> {orderDetails.items.length}</p>
                        <p><span className="font-medium">Total Quantity:</span> {totalQuantity}</p>
                        <p className="text-lg font-bold text-gray-800">
                            <span className="font-medium">Total Amount:</span> {formatCurrency(totalAmount)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-t pt-4">
                <h3 className="font-medium text-gray-700 mb-3">Items Ordered</h3>
                <div className="space-y-2">
                    {orderDetails.items.map((item, index) => (
                        <div key={item.id} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
                            <div className="flex items-center space-x-3">
                                <span className="text-sm text-gray-500">#{index + 1}</span>
                                <span className="font-medium">Product ID: {item.id}</span>
                                {item.name && <span className="text-gray-600">- {item.name}</span>}
                            </div>
                            <div className="text-right">
                                <div className="font-medium">{formatCurrency(item.priceAtPurchase * item.quantity)}</div>
                                <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};