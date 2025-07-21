export type OrderItem = {
    id: number;
    quantity: number;
    priceAtPurchase: number;
    name?: string;
};

export type OrderDetails = {
    customerId: number;
    items: OrderItem[];
};

export type CloudinarySignature = {
    apiKey: string;
    timestamp: number;
    signature: string;
    folder: string;
    cloudName: string;
};