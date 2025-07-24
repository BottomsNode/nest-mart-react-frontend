import { lazy, useEffect, useState } from "react";
import { useDeleteProduct, useUpdateProduct, useToggleProductActivation } from "../hooks";
import { Popup } from "@/components/Popup";
import { useProducts } from "@/features/products/hooks";

const ProductCard = lazy(()=> import('./ProductCard'))

const AllProducts = () => {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [formValues, setFormValues] = useState<any>({});
    const [popupState, setPopupState] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });

    const {
        productList,
        isLoading,
        isError,
        loaderRef,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useProducts("");

    const deleteProduct = useDeleteProduct();
    const updateProduct = useUpdateProduct();
    const toggleActivation = useToggleProductActivation();

    const showPopup = (message: string, severity: "success" | "error") => {
        setPopupState({ open: true, message, severity });
    };

    const handleExpand = (product: any) => {
        setExpandedId((prev) => (prev === product.id ? null : product.id));
        setFormValues({
            id: product.id,
            name: product.name,
            price: String(product.price),
            stock: String(product.stock),
        });
    };

    const handleFormChange = (field: string, value: string) => {
        setFormValues((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleUpdate = () => {
        const { id, name, price, stock } = formValues;
        updateProduct.mutate(
            { id, name, price: parseFloat(price), stock: parseInt(stock) },
            {
                onSuccess: () => showPopup("Product updated successfully!", "success"),
                onError: () => showPopup("Failed to update product.", "error"),
            }
        );
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this product?")) {
            deleteProduct.mutate(id, {
                onSuccess: () => showPopup("Product deleted successfully!", "success"),
                onError: () => showPopup("Failed to delete product.", "error"),
            });
        }
    };

    const handleToggleActivation = (product: any) => {
        const activate = product.status === 0;
        toggleActivation.mutate(
            { id: product.id, activate },
            {
                onSuccess: () =>
                    showPopup(
                        `Product ${activate ? "activated" : "deactivated"} successfully!`,
                        "success"
                    ),
                onError: () =>
                    showPopup(
                        `Failed to ${activate ? "activate" : "deactivate"} product.`,
                        "error"
                    ),
            }
        );
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }, { threshold: 1.0 });

        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [loaderRef, hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isLoading) return <p className="text-center text-gray-500">Loading products...</p>;
    if (isError) return <p className="text-center text-red-500">Failed to load products.</p>;

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {productList.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        isExpanded={expandedId === product.id}
                        formValues={formValues}
                        updateState={{
                            isUpdating: updateProduct.isPending,
                            isDeleting: deleteProduct.isPending,
                            isToggling: toggleActivation.isPending,
                        }}
                        onExpand={() => handleExpand(product)}
                        onChangeForm={handleFormChange}
                        onUpdate={handleUpdate}
                        onDelete={() => handleDelete(product.id)}
                        onToggleActivation={() => handleToggleActivation(product)}
                    />
                ))}
            </div>

            <div ref={loaderRef} className="mt-10 flex justify-center">
                {hasNextPage && isFetchingNextPage && (
                    <p className="text-sm text-gray-500">Loading more...</p>
                )}
            </div>

            <Popup
                open={popupState.open}
                onClose={() => setPopupState((prev) => ({ ...prev, open: false }))}
                message={popupState.message}
                severity={popupState.severity}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
        </div>
    );
};

export default AllProducts