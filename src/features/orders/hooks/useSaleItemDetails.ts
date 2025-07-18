import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/handler";

export const fetchSaleItemDetails = async (itemId: number) => {
    const { data } = await axiosInstance.get(`/sale-item/${itemId}`);
    return data;
};

export const useSaleItemDetails = (itemId: number) => {
    return useQuery({
        queryKey: ["sale-item", itemId],
        queryFn: () => fetchSaleItemDetails(itemId),
        enabled: !!itemId,
        refetchOnWindowFocus: false,
    });
};
