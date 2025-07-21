export const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
    }).format(amount);

export const calculateOrderTotal = (items: { quantity: number; priceAtPurchase: number }[]): number =>
    items.reduce((sum, item) => sum + item.quantity * item.priceAtPurchase, 0);

export const calculateTotalQuantity = (items: { quantity: number }[]): number =>
    items.reduce((sum, item) => sum + item.quantity, 0);