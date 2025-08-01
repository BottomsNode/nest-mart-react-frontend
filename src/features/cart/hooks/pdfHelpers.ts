import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { loadImageAsBase64 } from "./useLoadImageAsBase64";
import { formatCurrency } from "./useFormatCurrency";
import logo from "@/assets/web_logo.jpg";


export interface OrderItem {
    id: number;
    name: string;
    quantity: number;
    priceAtPurchase: number;
}

export interface OrderDetails {
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

export const generatePDFInvoice = async (
    orderDetails: OrderDetails,
    user: { name: string; email: string },
) => {
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
            console.warn("Logo failed:", err);
        }

        // Header
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("TAX INVOICE", 105, 20, { align: "center" });

        // Company Info
        doc.setFontSize(10);
        doc.text("Nest Mart Shop", 150, 15);
        doc.text("123 Business Street,", 150, 20);
        doc.text("Ahmedabad, AHM - 380001", 150, 25);
        doc.text("GSTIN: 27ABCDE1234F2Z5", 150, 30);
        doc.setDrawColor(180);
        doc.line(14, 44, 196, 44);

        const invoiceDate = new Date(orderDetails.saleDate).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "short",
        });

        // Customer Info
        doc.setFontSize(12);
        doc.setTextColor(40);
        doc.text(`Customer Name: ${user.name}`, 14, 50);
        doc.text(`Email: ${user.email}`, 14, 56);
        doc.text(`Order ID: #${orderDetails.orderId}`, 14, 62);
        doc.text(`Invoice Date: ${invoiceDate}`, 14, 68);
        doc.setTextColor(0);

        // Table
        autoTable(doc, {
            startY: 78,
            margin: { left: 14, right: 14 },
            head: [["S.No", "Product Name", "Article Number", "Quantity", "Unit Price", "Total"]],
            body: orderDetails.items.map((item, i) => [
                i + 1,
                item.name,
                item.id.toString(),
                item.quantity.toString(),
                formatCurrency(item.priceAtPurchase),
                formatCurrency(item.priceAtPurchase * item.quantity),
            ]),
            styles: { fontSize: 10 },
            headStyles: { fillColor: [22, 160, 133], textColor: 255, halign: "center" },
            columnStyles: {
                0: { halign: "center" },
                1: { halign: "left" },
                2: { halign: "center" },
                3: { halign: "center" },
                4: { halign: "right" },
                5: { halign: "right" },
            },
        });

        const total = orderDetails.items.reduce(
            (sum, item) => sum + item.quantity * item.priceAtPurchase,
            0
        );
        const finalY = (doc as any).lastAutoTable.finalY || 120;

        // Total
        doc.setFontSize(13);
        doc.setFont("helvetica", "bold");
        doc.text(`Grand Total: ${formatCurrency(total)}`, 150, finalY + 10, {
            align: "right",
        });

        // Footer
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

        doc.save(`invoice-${orderDetails.orderId}.pdf`);
    } catch (err) {
        console.error("PDF generation error:", err);
    }
};
