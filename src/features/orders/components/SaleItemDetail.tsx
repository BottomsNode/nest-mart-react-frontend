import { useSaleItemDetails } from "../hooks/useSaleItemDetails";

export const SaleItemDetail = ({
    itemId,
    quantity,
    price,
}: {
    itemId: number;
    quantity: number;
    price: string | number;
}) => {
    const { data: itemDetail, isLoading } = useSaleItemDetails(itemId);

    if (isLoading) {
        return (
            <li className="text-sm text-gray-500">
                Loading item #{itemId} details...
            </li>
        );
    }

    if (!itemDetail) {
        return (
            <li className="text-sm text-red-500">
                Failed to load item #{itemId} details.
            </li>
        );
    }

    return (
        <li className="text-sm text-gray-700 border rounded p-2">
            <div className="font-medium">
                {itemDetail.product?.name || "Unknown Product"}
            </div>
            <div className="text-xs text-gray-500 mb-1">
                {itemDetail.description || "No description available."}
            </div>
            <div>Quantity: {quantity}</div>
            <div>Price Each: ₹{price}</div>
            {itemDetail.imageUrl && (
                <img
                    src={itemDetail.imageUrl}
                    alt={itemDetail.product?.name || "Product Image"}
                    className="mt-2 rounded w-24 h-24 object-cover"
                />
            )}
        </li>
    );
};
