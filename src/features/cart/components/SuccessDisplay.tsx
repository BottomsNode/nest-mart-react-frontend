import React from "react";

interface SuccessDisplayProps {
    pdfUrl: string;
    qrCodeUrl: string;
}

export const SuccessDisplay: React.FC<SuccessDisplayProps> = ({ pdfUrl, qrCodeUrl }) => {
    return (
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

                <div className="bg-white p-4 rounded-lg border">
                    <p className="text-sm text-gray-600 mb-2 text-center">Scan to view invoice</p>
                    <img src={qrCodeUrl} alt="QR Code for Invoice" className="mx-auto" />
                </div>
            </div>
        </div>
    );
};