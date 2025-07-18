import axiosInstance from "@/api/handler";
import type { SaleData } from "../types/sale.types";

export const fetchSaleByEmail = async (email: string): Promise<SaleData[]> => {
    const { data } = await axiosInstance.get(`/sale/by-customer-email/${encodeURIComponent(email)}`);
    return data;
};