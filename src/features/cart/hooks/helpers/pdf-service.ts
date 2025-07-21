import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { OrderDetails } from "./order-types";
import { loadImageAsBase64 } from "./image";
import { formatCurrency } from "./currency";

export interface InvoiceData {
    orderDetails: OrderDetails;
    user: {
        name: string;
        email: string;
    };
    logo?: string;
    companyInfo?: {
        name: string;
        address: string[];
        gstin: string;
    };
}

export class PDFService {
    private static readonly DEFAULT_COMPANY_INFO = {
        name: "Your Company Name",
        address: ["123 Business Street,", "Mumbai, MH - 400001"],
        gstin: "27ABCDE1234F2Z5"
    };

    static async generateInvoicePDF(invoiceData: InvoiceData): Promise<Blob> {
        const { orderDetails, user, logo, companyInfo = this.DEFAULT_COMPANY_INFO } = invoiceData;

        const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

        // Add watermark
        this.addWatermark(doc);

        // Add logo if provided
        if (logo) {
            await this.addLogo(doc, logo);
        }

        // Add header
        this.addHeader(doc);

        // Add company info
        this.addCompanyInfo(doc, companyInfo);

        // Add divider
        this.addDivider(doc, 44);

        // Add customer info
        this.addCustomerInfo(doc, user, orderDetails);

        // Add items table
        const finalY = this.addItemsTable(doc, orderDetails.items);

        // Add total
        this.addTotal(doc, orderDetails.items, finalY);

        // Add footer
        this.addFooter(doc, finalY);

        return doc.output("blob");
    }

    private static addWatermark(doc: jsPDF): void {
        doc.setTextColor(230);
        doc.setFontSize(60);
        doc.setFont("helvetica", "bold");
        doc.text("PAID", 105, 150, { align: "center", angle: 45 });
        doc.setTextColor(0);
    }

    private static async addLogo(doc: jsPDF, logoSrc: string): Promise<void> {
        try {
            const logoBase64 = await loadImageAsBase64(logoSrc);
            doc.addImage(logoBase64, "JPEG", 14, 10, 30, 30);
        } catch (err) {
            console.warn('Logo loading failed:', err);
        }
    }

    private static addHeader(doc: jsPDF): void {
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("TAX INVOICE", 105, 20, { align: "center" });
    }

    private static addCompanyInfo(doc: jsPDF, companyInfo: typeof PDFService.DEFAULT_COMPANY_INFO): void {
        doc.setFontSize(10);
        doc.text(companyInfo.name, 150, 15);
        companyInfo.address.forEach((line, index) => {
            doc.text(line, 150, 20 + (index * 5));
        });
        doc.text(`GSTIN: ${companyInfo.gstin}`, 150, 20 + (companyInfo.address.length * 5));
    }

    private static addDivider(doc: jsPDF, y: number): void {
        doc.setDrawColor(180);
        doc.line(14, y, 196, y);
    }

    private static addCustomerInfo(doc: jsPDF, user: { name: string; email: string }, orderDetails: OrderDetails): void {
        const dateStr = new Date().toLocaleDateString("en-IN");
        doc.setFontSize(12);
        doc.setTextColor(40);
        doc.text(`Customer Name: ${user.name}`, 14, 50);
        doc.text(`Email: ${user.email}`, 14, 56);
        doc.text(`Order ID: #${orderDetails.customerId}`, 14, 62);
        doc.text(`Invoice Date: ${dateStr}`, 14, 68);
        doc.setTextColor(0);
    }

    private static addItemsTable(doc: jsPDF, items: OrderDetails['items']): number {
        autoTable(doc, {
            startY: 78,
            margin: { left: 14, right: 14 },
            head: [["S.No", "Product ID", "Quantity", "Unit Price", "Total"]],
            body: items.map((item, i) => [
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

        return (doc as any).lastAutoTable.finalY || 120;
    }

    private static addTotal(doc: jsPDF, items: OrderDetails['items'], finalY: number): void {
        const total = items.reduce(
            (sum, item) => sum + item.quantity * item.priceAtPurchase,
            0
        );

        doc.setFontSize(13);
        doc.setFont("helvetica", "bold");
        doc.text(`Grand Total: ${formatCurrency(total)}`, 150, finalY + 10, {
            align: "right",
        });
    }

    private static addFooter(doc: jsPDF, finalY: number): void {
        this.addDivider(doc, finalY + 20);

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
    }
}