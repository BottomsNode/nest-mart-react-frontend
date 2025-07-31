import { useSelector } from "react-redux";
import { lazy, useEffect, useState } from "react";
import { useSaleByEmail } from "../hooks";
import type { RootState } from "@/store";
import { ShoppingBag, IndianRupee, CalendarDays, Eye } from "lucide-react";
import { Loader } from "@/components";
import { Dialog } from "@headlessui/react";
import logo from "@/assets/web_logo.jpg";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatCurrency, loadImageAsBase64 } from "@/features/cart/components";

const SaleItemDetail = lazy(()=> import("./SaleItemDetail"));

const MyOrders = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const email = user?.email;
    const [selectedSale, setSelectedSale] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: sales, isLoading, isError, error, refetch } = useSaleByEmail(email || "");
    
    useEffect(() => {
        if (email) refetch();
    }, [email, refetch]);

    if (!email) return <p className="text-center text-gray-500 py-10">Please log in to view your orders.</p>;
    if (isLoading) return <Loader overlay />;
    if (isError) return <p className="text-center text-red-500 py-10">{error?.message || "Failed to load your orders."}</p>;
    if (!sales || sales.length === 0) return <p className="text-center text-gray-500 py-10">No orders found.</p>;

    const generatePDF = async (orderDetails: any, user: any) => {
        if (!orderDetails || !user) return;

        try {
            const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

            // Watermark
            doc.setTextColor(230);
            doc.setFontSize(60);
            doc.setFont("helvetica", "bold");
            doc.text("PAID", 105, 150, { align: "center", angle: 45 });
            doc.setTextColor(0);

            // Logo
            try {
                const logoBase64 = await loadImageAsBase64(logo);
                doc.addImage(logoBase64, "JPEG", 14, 10, 30, 30);
            } catch (err) {
                console.warn("Logo loading failed:", err);
            }

            // Title & Company Info
            doc.setFontSize(18);
            doc.setFont("helvetica", "bold");
            doc.text("TAX INVOICE", 105, 20, { align: "center" });

            doc.setFontSize(10);
            doc.text("NestMart Pvt. Ltd.", 150, 15);
            doc.text("123 Business Street,", 150, 20);
            doc.text("Mumbai, MH - 400001", 150, 25);
            doc.text("GSTIN: 27ABCDE1234F2Z5", 150, 30);

            doc.setDrawColor(180);
            doc.line(14, 44, 196, 44);

            const dateStr = new Date(orderDetails.saleDate).toLocaleDateString("en-IN");

            // Buyer Info
            doc.setFontSize(12);
            doc.setTextColor(40);
            doc.text(`Customer Name: ${user.name}`, 14, 50);
            doc.text(`Email: ${user.email}`, 14, 56);
            doc.text(`Order ID: #${orderDetails.id}`, 14, 62);
            doc.text(`Invoice Date: ${dateStr}`, 14, 68);
            doc.setTextColor(0);

            // Table
            autoTable(doc, {
                startY: 78,
                margin: { left: 14, right: 14 },
                head: [["S.No", "Product ID", "Quantity", "Unit Price", "Total"]],
                body: orderDetails.items.map((item: any, i: number) => [
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
                (sum: number, item: any) => sum + item.quantity * item.priceAtPurchase,
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
            doc.save(`Invoice_Order_${orderDetails.id}.pdf`);

        } catch (err) {
            console.error("PDF generation error:", err);
            alert("Failed to generate or upload invoice.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-indigo-600" />
                Your Orders
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sales.map((sale) => (
                    <div key={sale.id} className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Order #{sale.id}</h2>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                                <CalendarDays className="w-4 h-4" />
                                {new Date(sale.saleDate).toLocaleDateString()}
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-1"><span className="font-medium">Customer:</span> {sale.customer.name}</p>
                        <p className="text-sm text-gray-600 mb-4">{sale.customer.email}</p>

                        <div className="text-sm font-medium text-gray-700 flex items-center gap-1 mb-4">
                            <IndianRupee className="w-4 h-4 text-green-600" />
                            ₹{sale.totalAmount}
                        </div>

                        <button
                            onClick={() => {
                                setSelectedSale(sale);
                                setIsModalOpen(true);
                            }}
                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 hover:underline"
                        >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                        </button>
                        <button
                            onClick={() => generatePDF(sale, user)}
                            className="mt-4 w-full bg-indigo-600 text-white text-sm py-2 rounded-lg hover:bg-indigo-700 transition"
                        >
                            Download Invoice
                        </button>
                    </div>
                ))}
            </div>

            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-2xl bg-white rounded-xl p-6 shadow-lg overflow-y-auto max-h-[90vh]">
                        <Dialog.Title className="text-xl font-bold mb-4">Order #{selectedSale?.id} Details</Dialog.Title>

                        <p className="text-sm mb-2"><strong>Customer:</strong> {selectedSale?.customer.name} ({selectedSale?.customer.email})</p>
                        <p className="text-sm mb-4"><strong>Date:</strong> {new Date(selectedSale?.saleDate).toLocaleDateString()}</p>

                        <div className="space-y-4">
                            {selectedSale?.items?.map((item: any) => (
                                <SaleItemDetail
                                    key={item.id}
                                    itemId={item.id}
                                    quantity={item.quantity}
                                    price={item.priceAtPurchase}
                                />
                            ))}
                        </div>

                        <div className="text-right mt-6 text-lg font-semibold text-gray-800">
                            Total: ₹{selectedSale?.totalAmount}
                        </div>

                        <div className="mt-4 text-right">
                            <button
                                className="text-sm text-red-500 hover:underline"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default MyOrders;