import { useQuery } from "@tanstack/react-query";
import type { SaleData } from "../types/sale.types";
import { fetchSaleByEmail } from "./saleService";

export const useSaleByEmail = (email: string) => {
    return useQuery<SaleData[], Error>({
        queryKey: ["sale", email],
        queryFn: () => fetchSaleByEmail(email),
        enabled: !!email,
        refetchOnWindowFocus: false,
    });
};
