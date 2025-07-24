import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import axiosInstance from "@/api/handler";
import { productSchema, productsResponseSchema, type Product, type ProductsResponse } from "../models/product";
import z from "zod";
import { VITE_PAGE_DATA_LIMIT } from "@/config";

export const fetchSearchResults = async (searchTerm: string): Promise<Product[]> => {
    const res = await axiosInstance.get(`/products/search/${encodeURIComponent(searchTerm)}`);
    
    const rawData = Array.isArray(res.data) ? res.data : res.data.products;

    const parsed = z.array(productSchema).safeParse(rawData);

    if (!parsed.success) {
        console.error("Invalid search response:", parsed.error);
        return [];
    }

    return parsed.data;
};

export const fetchProducts = async ({ pageParam = 1, queryKey }: any): Promise<ProductsResponse> => {
    const [_key, searchTerm] = queryKey;

    if (searchTerm) {
        const res = await axiosInstance.get(`/products/search/${encodeURIComponent(searchTerm)}`);
        const rawData = res.data;

        // to validate response structure with zod.
        const parsed = z.array(productSchema).safeParse(rawData);
        if (!parsed.success) {
            console.error("Invalid search response:", parsed.error);
            return { products: [], totalPages: 1, totalRecords: 0 };
        }

        return {
            products: parsed.data,
            totalPages: 1,
            totalRecords: parsed.data.length,
        };
    }

    // begins the pagination at first time
    const res = await axiosInstance.get("/products", {
        params: { page: pageParam, limit: VITE_PAGE_DATA_LIMIT },
    });

    // make sure to have the correct structure with respect to zod
    const parsed = productsResponseSchema.safeParse(res.data);
    if (!parsed.success) {
        console.error("Invalid paginated response:", parsed.error);
        return { products: [], totalPages: 1, totalRecords: 0 };
    }

    return parsed.data;
};

export const useProducts = (searchTerm: string) => {
    const queryClient = useQueryClient();
    const loaderRef = useRef<HTMLDivElement>(null);

    // when no serach term is provided, fetch products from the first page i.e pg.1
    const infiniteQuery = useInfiniteQuery<ProductsResponse>({
        queryKey: ["products"],
        queryFn: fetchProducts,
        initialPageParam: 1,
        // here allPage shows the page view till now as it is array so it will start from 0+1 and goes till last page
        // here lastPage shows the past viewed page
        // here next shows the allPage + 1 [so all page value till currrent will be viwed page + 1 and so on]
        getNextPageParam: (lastPage, allPages) => {
            // console.log("All--------------",allPages.length)
            // console.log("Last-------------",lastPage)
            const next = allPages.length + 1;
            // console.log("Next-------------",next)
            return next <= lastPage.totalPages ? next : undefined;
        },
        enabled: searchTerm === "",
    });

    // serch term is found then fetch products from search endpoint
    const searchQuery = useQuery<Product[]>({
        queryKey: ["search", searchTerm],
        queryFn: () => fetchSearchResults(searchTerm),
        enabled: searchTerm !== "",
    });

    // decides the which function to execute i.e search or infinite scroll query
    const productList = searchTerm !== ""
        ? searchQuery.data ?? []
        : infiniteQuery.data?.pages.flatMap((page) => page.products) ?? [];

    return {
        loaderRef,
        productList,
        isLoading: infiniteQuery.isLoading || searchQuery.isLoading,
        isError: infiniteQuery.isError || searchQuery.isError,
        fetchNextPage: infiniteQuery.fetchNextPage,
        hasNextPage: infiniteQuery.hasNextPage,
        isFetchingNextPage: infiniteQuery.isFetchingNextPage,
        invalidateSearch: () => queryClient.invalidateQueries({ queryKey: ["search"] }),
    };
};