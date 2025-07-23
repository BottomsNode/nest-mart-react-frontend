import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "@/assets/web_logo.jpg";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import axiosInstance from "@/api/handler";
import axios from "axios";

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

export const loadImageAsBase64 = (src: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.onerror = reject;
        img.src = src;
    });
};

export const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
    }).format(amount);

export const generateQRCode = (url: string): string => {
    const size = 160;
    const encodedUrl = encodeURIComponent(url);
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedUrl}`;
};

const OrderConfirmation: React.FC = () => {
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

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


    const generatePDF = async () => {
        if (!orderDetails || !user) return;

        setIsGenerating(true);
        setError(null);

        try {
            const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

            // Watermark
            doc.setTextColor(230);
            doc.setFontSize(60);
            doc.setFont("helvetica", "bold");
            doc.text("PAID", 105, 150, { align: "center", angle: 45 });
            doc.setTextColor(0);

            // Load and add logo
            try {
                const logoBase64 = await loadImageAsBase64(logo);
                doc.addImage(logoBase64, "JPEG", 14, 10, 30, 30);
            } catch (err) {
                console.warn('Logo loading failed:', err);
                // Continue without logo
            }

            // Title
            doc.setFontSize(18);
            doc.setFont("helvetica", "bold");
            doc.text("TAX INVOICE", 105, 20, { align: "center" });

            // Company Info
            doc.setFontSize(10);
            doc.text("Your Company Name", 150, 15);
            doc.text("123 Business Street,", 150, 20);
            doc.text("Mumbai, MH - 400001", 150, 25);
            doc.text("GSTIN: 27ABCDE1234F2Z5", 150, 30);

            doc.setDrawColor(180);
            doc.line(14, 44, 196, 44);

            // Buyer Info
            const dateStr = new Date().toLocaleDateString("en-IN");
            doc.setFontSize(12);
            doc.setTextColor(40);
            doc.text(`Customer Name: ${user.name}`, 14, 50);
            doc.text(`Email: ${user.email}`, 14, 56);
            doc.text(`Order ID: #${orderDetails.customerId}`, 14, 62);
            doc.text(`Invoice Date: ${dateStr}`, 14, 68);
            doc.setTextColor(0);

            // Table
            autoTable(doc, {
                startY: 78,
                margin: { left: 14, right: 14 },
                head: [["S.No", "Product ID", "Quantity", "Unit Price", "Total"]],
                body: orderDetails.items.map((item, i) => [
                    i + 1,
                    item.id.toString(),
                    item.quantity.toString(),
                    formatCurrency(item.priceAtPurchase),
                    formatCurrency(item.priceAtPurchase * item.quantity),
                ]),
                styles: { fontSize: 10 },
                headStyles: { fillColor: [22, 160, 133], textColor: 255, halign: "center" },
                columnStyles: {
                    0: { halign: "center" },
                    1: { halign: "center" },
                    2: { halign: "center" },
                    3: { halign: "right" },
                    4: { halign: "right" },
                },
            });

            const total = orderDetails.items.reduce(
                (sum, item) => sum + item.quantity * item.priceAtPurchase,
                0
            );
            const finalY = (doc as any).lastAutoTable.finalY || 120;

            doc.setFontSize(13);
            doc.setFont("helvetica", "bold");
            doc.text(`Grand Total: ${formatCurrency(total)}`, 150, finalY + 10, {
                align: "right",
            });

            doc.setDrawColor(180);
            doc.line(14, finalY + 20, 196, finalY + 20);

            doc.setFontSize(10);
            doc.setFont("helvetica", "italic");
            doc.setTextColor(100);
            doc.text(
                "This is a computer-generated invoice and does not require a signature.",
                105,
                finalY + 28,
                { align: "center" }
            );
            doc.text("Thank you for your purchase!", 105, finalY + 34, { align: "center" });

            // Convert PDF to Blob
            const pdfBlob = doc.output("blob");

            // Upload to Cloudinary
            const { data: sigData } = await axiosInstance.get("/profile/signature");
            console.log(sigData)
            const formData = new FormData();
            formData.append("file", pdfBlob);
            formData.append("api_key", sigData.apiKey);
            formData.append("timestamp", sigData.timestamp.toString());
            formData.append("signature", sigData.signature);
            formData.append("folder", sigData.folder);
            console.log("<<<<<<<<<<<<<<<<<", formData)

            const uploadResponse = await axios.post(
                `https://api.cloudinary.com/v1_1/${sigData.cloudName}/auto/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const { secure_url } = uploadResponse.data;
            console.log("Uploaded to Cloudinary:", secure_url);

            if (secure_url) {
                setPdfUrl(secure_url);
                const qrUrl = generateQRCode(secure_url);
                setQrCodeUrl(qrUrl);
                doc.save(`invoice-${orderDetails.customerId}.pdf`);
            } else {
                throw new Error("Upload failed: No URL returned");
            }
        } catch (err) {
            console.error("PDF generation/upload error:", err);
            setError(err instanceof Error ? err.message : "Failed to generate or upload PDF");
        } finally {
            setIsGenerating(false);
        }
    };

    if (!orderDetails) {
        return (
            <div className="max-w-xl mx-auto text-center py-12">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4">Loading order details...</p>
            </div>
        );
    }

    const totalAmount = orderDetails.items.reduce(
        (sum, item) => sum + item.quantity * item.priceAtPurchase,
        0
    );

    return (
        <div className="max-w-2xl mx-auto py-12 px-4">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold mb-2 text-green-700">Order Confirmed!</h1>
                <p className="text-gray-600">
                    Thank you for your purchase. Your order has been placed successfully.
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <h3 className="font-medium text-gray-700 mb-2">Customer Information</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                            <p><span className="font-medium">Name:</span> {user?.name}</p>
                            <p><span className="font-medium">Email:</span> {user?.email}</p>
                            <p><span className="font-medium">Order ID:</span> #{orderDetails.customerId}</p>
                            <p><span className="font-medium">Date:</span> {new Date().toLocaleDateString("en-IN")}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium text-gray-700 mb-2">Order Details</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                            <p><span className="font-medium">Items:</span> {orderDetails.items.length}</p>
                            <p><span className="font-medium">Total Quantity:</span> {orderDetails.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
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

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                    <div className="flex">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                            <div className="mt-2 text-sm text-red-700">{error}</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="text-center">
                <button
                    onClick={generatePDF}
                    disabled={isGenerating}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
                >
                    {isGenerating ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating & Uploading...
                        </>
                    ) : (
                        "Generate & Upload Invoice"
                    )}
                </button>
            </div>

            {pdfUrl && (
                <div className="mt-8 bg-green-50 rounded-lg p-6">
                    <div className="text-center mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-green-800 font-medium">Invoice generated and uploaded successfully!</p>
                    </div>

                    <div className="flex flex-col items-center space-y-4">
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-blue-600 px-6 py-2 rounded-md border border-blue-200 hover:bg-blue-50 transition-colors inline-flex items-center"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View Invoice
                        </a>

                        {qrCodeUrl && (
                            <div className="bg-white p-4 rounded-lg border">
                                <p className="text-sm text-gray-600 mb-2 text-center">Scan to view invoice</p>
                                <img src={qrCodeUrl} alt="QR Code for Invoice" className="mx-auto" />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderConfirmation