import { z } from "zod";

export const productSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number().or(z.string()).transform(Number),
    stock: z.number().or(z.string()).transform(Number),
    status: z.number().or(z.string()).transform(Number),
});

export type Product = z.infer<typeof productSchema>;

export const productsResponseSchema = z.object({
    products: z.array(productSchema),
    totalPages: z.number(),
    totalRecords: z.number(),
});

export type ProductsResponse = z.infer<typeof productsResponseSchema>;
