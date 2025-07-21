import axiosInstance from "@/api/handler";
import type { SaleData } from "../types/sale.types";

export const fetchSaleByEmail = async (email: string): Promise<SaleData[]> => {
    try {
        const { data } = await axiosInstance.get(`/sale/by-customer-email/${encodeURIComponent(email)}`);
        return data;
    } catch (err: any) {
        const message =
            err?.response?.data?.message ||
            err?.message ||
            "Something went wrong while fetching your orders.";
        throw new Error(message);
    }
};