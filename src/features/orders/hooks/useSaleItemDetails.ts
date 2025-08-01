import { useQuery } from "@tanstack/react-query";
import { fetchSaleItemDetails } from "./fetchSaleItemDetails ";

export const useSaleItemDetails = (itemId: number) => {
    return useQuery({
        queryKey: ["sale-item", itemId],
        queryFn: () => fetchSaleItemDetails(itemId),
        enabled: !!itemId,
        refetchOnWindowFocus: false,
    });
};
