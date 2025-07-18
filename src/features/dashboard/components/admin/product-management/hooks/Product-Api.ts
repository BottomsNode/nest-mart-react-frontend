import { useQuery, useMutation, useQueryClient, type UseMutationOptions, useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/handler";
import type { CreateProductPayload, ProductListResponse, ToggleActivationPayload, UpdateProductPayload, UpdateStockPayload } from "../types";
import type { Product } from "@/store/wishlistSlice";
import { productsResponseSchema, type ProductsResponse } from "@/features/products/models/product";
import { VITE_PAGE_DATA_LIMIT } from "@/config";

export const useActiveProducts = (page = 1, limit = 10) => {
    return useQuery<ProductListResponse>({
        queryKey: ["products-active", page, limit],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/products/list/active?page=${page}&limit=${limit}`);
            return data;
        },
    });
};

export const useInactiveProducts = () => {
    return useInfiniteQuery<ProductsResponse>({
        queryKey: ["products-inactive"],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await axiosInstance.get("/products/list/deactivate", {
                params: { page: pageParam, limit: VITE_PAGE_DATA_LIMIT },
            });

            const parsed = productsResponseSchema.safeParse(data);
            if (!parsed.success) {
                console.error("Invalid inactive product response:", parsed.error);
                return { products: [], totalPages: 1, totalRecords: 0 };
            }

            return parsed.data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return nextPage <= lastPage.totalPages ? nextPage : undefined;
        },
    });
};

export const useCreateProduct = (
    options?: UseMutationOptions<Product, Error, CreateProductPayload>
) => {
    const queryClient = useQueryClient();

    return useMutation<Product, Error, CreateProductPayload>({
        mutationFn: async (product) => {
            const { data } = await axiosInstance.post("/products", product);
            return data;
        },
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            options?.onSuccess?.(data, variables, context);
        },
        onError: (error, variables, context) => {
            options?.onError?.(error, variables, context);
        },
    });
};

export const useUpdateProduct = (
    options?: UseMutationOptions<Product, Error, UpdateProductPayload>
) => {
    const queryClient = useQueryClient();

    return useMutation<Product, Error, UpdateProductPayload>({
        mutationFn: async ({ id, ...updates }) => {
            const { data } = await axiosInstance.put(`/products/${id}`, updates);
            return data;
        },
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            options?.onSuccess?.(...args);
        },
        onError: options?.onError,
    });
};

export const useDeleteProduct = (
    options?: UseMutationOptions<Product, Error, number | string>
) => {
    const queryClient = useQueryClient();

    return useMutation<Product, Error, number | string>({
        mutationFn: async (id) => {
            const { data } = await axiosInstance.delete(`/products/${id}`);
            return data;
        },
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            options?.onSuccess?.(...args);
        },
        onError: options?.onError,
    });
};

export const useUpdateStock = (
    options?: UseMutationOptions<Product, Error, UpdateStockPayload>
) => {
    const queryClient = useQueryClient();

    return useMutation<Product, Error, UpdateStockPayload>({
        mutationFn: async ({ id, stock }) => {
            const { data } = await axiosInstance.put(`/products/${id}/${stock}`);
            return data;
        },
        onSuccess: (...args) => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            options?.onSuccess?.(...args);
        },
        onError: options?.onError,
    });
};

export const useToggleProductActivation = () => {
    const queryClient = useQueryClient();

    return useMutation<Product, Error, ToggleActivationPayload>({
        mutationFn: async ({ id, activate }) => {
            const endpoint = activate
                ? `activate/my/prod`
                : `deactivate/prod`;
            const { data } = await axiosInstance.put(`/products/${id}/${endpoint}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
};

