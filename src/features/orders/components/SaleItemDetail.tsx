import { useSaleItemDetails } from "../hooks/useSaleItemDetails";

const SaleItemDetail = ({
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
            <div className="flex items-center gap-4 p-3 border rounded-lg bg-gray-50">
                <div className="w-16 h-16 bg-gray-200 rounded animate-pulse" />
                <div className="flex-1 space-y-1">
                    <div className="h-4 bg-gray-300 rounded w-3/4" />
                    <div className="h-3 bg-gray-300 rounded w-1/2" />
                </div>
            </div>
        );
    }

    if (!itemDetail) {
        return (
            <div className="text-sm text-red-500">
                Failed to load item #{itemId} details.
            </div>
        );
    }

    return (
        <div className="flex gap-4 border rounded-lg p-3 items-center">
            <img
                src={`https://via.assets.so/game.jpg?id=${itemDetail.id}&w=300&h=300`}
                alt={itemDetail.product?.name || "Product Image"}
                className="w-16 h-16 rounded object-cover"
            />

            <div className="flex-1 text-sm text-gray-700">
                <div className="font-semibold">{itemDetail.product?.name || "Unknown Product"}</div>
                <div className="text-xs text-gray-500 mb-1">
                    {itemDetail.description || "No description available."}
                </div>
                <div>Quantity: {quantity}</div>
                <div>Price: ₹{price}</div>
            </div>
        </div>
    );
};

export default SaleItemDetail