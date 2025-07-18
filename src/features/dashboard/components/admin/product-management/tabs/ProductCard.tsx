import React from "react";
import { ProductForm } from "./ProductForm";

type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
    status: number;
};

type Props = {
    product: Product;
    isExpanded: boolean;
    formValues: {
        name: string;
        price: string;
        stock: string;
    };
    updateState: {
        isUpdating: boolean;
        isDeleting: boolean;
        isToggling: boolean;
    };
    onExpand: () => void;
    onChangeForm: (field: string, value: string) => void;
    onUpdate: () => void;
    onDelete: () => void;
    onToggleActivation: () => void;
};

export const ProductCard: React.FC<Props> = ({
    product,
    isExpanded,
    formValues,
    updateState,
    onExpand,
    onChangeForm,
    onUpdate,
    onDelete,
    onToggleActivation,
}) => {
    return (
        <div className="rounded-xl overflow-hidden shadow border border-gray-200 bg-white transition hover:shadow-md">
            <img
                src={`https://via.assets.so/game.png?id=${product.id}&w=1080&h=720`}
                alt={product.name}
                className="w-full h-[180px] object-cover cursor-pointer"
                onClick={onExpand}
            />

            <div className="p-4 space-y-1">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg text-gray-800">{product.name}</h2>
                    <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${product.status === 1
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-200 text-gray-700"
                            }`}
                    >
                        {product.status === 1 ? "Active" : "Inactive"}
                    </span>
                </div>

                <p className="text-sm text-gray-600">₹{product.price}</p>
                <p className="text-sm text-gray-600">Stock: {product.stock}</p>

                {isExpanded && (
                    <ProductForm
                        formValues={formValues}
                        isUpdating={updateState.isUpdating}
                        isDeleting={updateState.isDeleting}
                        isToggling={updateState.isToggling}
                        status={product.status}
                        onChange={onChangeForm}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        onToggleActivation={onToggleActivation}
                    />
                )}
            </div>
        </div>
    );
};
