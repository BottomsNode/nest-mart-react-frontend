import axios from "axios";
import axiosInstance from "@/api/handler";
import type { CloudinarySignature } from "./order-types";

export class CloudinaryService {
    static async getUploadSignature(): Promise<CloudinarySignature> {
        try {
            const { data } = await axiosInstance.get("/profile/signature");
            return data;
        } catch (error) {
            console.error("Failed to get Cloudinary signature:", error);
            throw new Error("Failed to get upload signature");
        }
    }

    static async uploadFile(file: Blob, signature: CloudinarySignature): Promise<string> {
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", signature.apiKey);
            formData.append("timestamp", signature.timestamp.toString());
            formData.append("signature", signature.signature);
            formData.append("folder", signature.folder);

            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${signature.cloudName}/auto/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (!response.data.secure_url) {
                throw new Error("Upload failed: No URL returned");
            }

            return response.data.secure_url;
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            throw new Error("Failed to upload file to Cloudinary");
        }
    }

    static async uploadPDF(pdfBlob: Blob): Promise<string> {
        const signature = await this.getUploadSignature();
        return await this.uploadFile(pdfBlob, signature);
    }
}