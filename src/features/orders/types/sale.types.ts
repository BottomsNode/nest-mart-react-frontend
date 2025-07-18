export interface SaleCustomer {
    id: number;
    name: string;
    email: string;
}

export interface ProductInfo {
    id: number;
    name: string;
}

export interface SaleItem {
    id: number;
    quantity: number;
    priceAtPurchase: number;
}

export interface SaleData {
    id: number;
    customer: SaleCustomer;
    saleDate: string;
    totalAmount: string;
    items: SaleItem[];
}