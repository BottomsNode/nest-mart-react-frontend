import { useState } from "react";
import { type OrderDetails, PDFService, CloudinaryService, generateQRCodeUrl } from "./helpers";

interface UsePDFGeneratorProps {
    orderDetails: OrderDetails;
    user: {
        name: string;
        email: string;
    };
    logo?: string;
}

export const usePDFGenerator = ({ orderDetails, user, logo }: UsePDFGeneratorProps) => {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generatePDF = async () => {
        if (!orderDetails || !user) return;

        setIsGenerating(true);
        setError(null);

        try {
            // Generate PDF
            const pdfBlob = await PDFService.generateInvoicePDF({
                orderDetails,
                user,
                logo,
            });

            // Upload to Cloudinary
            const uploadedUrl = await CloudinaryService.uploadPDF(pdfBlob);

            // Set states
            setPdfUrl(uploadedUrl);
            setQrCodeUrl(generateQRCodeUrl(uploadedUrl));

            // Download PDF locally
            const link = document.createElement('a');
            link.href = URL.createObjectURL(pdfBlob);
            link.download = `invoice-${orderDetails.customerId}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);

        } catch (err) {
            console.error("PDF generation/upload error:", err);
            setError(err instanceof Error ? err.message : "Failed to generate or upload PDF");
        } finally {
            setIsGenerating(false);
        }
    };

    return {
        pdfUrl,
        qrCodeUrl,
        isGenerating,
        error,
        generatePDF,
    };
};