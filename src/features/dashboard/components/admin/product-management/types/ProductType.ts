import type { Product } from "@/store/wishlistSlice";

export type CreateProductPayload = {
    name: string;
    price: number;
    stock: number;
};

export type UpdateProductPayload = Partial<CreateProductPayload> & {
    id: number|string;
};

export type UpdateStockPayload = {
    id: number|string;
    stock: number;
};

export type ToggleActivationPayload = {
    id: number|string;
    activate: boolean;
};

export type ProductListResponse = {
    products: Product[];
    totalRecords: number;
    totalPages: number;
};
