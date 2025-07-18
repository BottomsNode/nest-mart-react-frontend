import axiosInstance from "@/api/handler";

export const fetchSaleItemDetails = async (saleItemId: number) => {
    const { data } = await axiosInstance.get(`/sale-item/${saleItemId}`);
    return data;   // { id, product: { id, name }, quantity, priceAtPurchase }
};
