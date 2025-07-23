import React from "react";

type Props = {
    formValues: {
        name: string;
        price: string;
        stock: string;
    };
    isUpdating: boolean;
    isDeleting: boolean;
    isToggling: boolean;
    status: number;
    onChange: (field: string, value: string) => void;
    onUpdate: () => void;
    onDelete: () => void;
    onToggleActivation: () => void;
};

const ProductForm: React.FC<Props> = ({
    formValues,
    isUpdating,
    isDeleting,
    isToggling,
    status,
    onChange,
    onUpdate,
    onDelete,
    onToggleActivation,
}) => {
    return (
        <div className="space-y-2 pt-2 border-t mt-2">
            {["name", "price", "stock"].map((field) => (
                <input
                    key={field}
                    type={field === "name" ? "text" : "number"}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formValues[field as keyof typeof formValues]}
                    onChange={(e) => onChange(field, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            ))}

            <div className="space-y-2">
                <button
                    onClick={onUpdate}
                    disabled={isUpdating}
                    className={`w-full py-2 rounded text-white font-medium transition ${isUpdating
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {isUpdating ? "Updating..." : "Update Product"}
                </button>

                <button
                    onClick={onDelete}
                    disabled={isDeleting}
                    className={`w-full py-2 rounded text-white font-medium transition ${isDeleting
                            ? "bg-red-300 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                >
                    {isDeleting ? "Deleting..." : "Delete Product"}
                </button>

                <button
                    onClick={onToggleActivation}
                    disabled={isToggling}
                    className={`w-full py-2 rounded text-white font-medium transition ${isToggling
                            ? "bg-gray-300 cursor-not-allowed"
                            : status === 1
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    {isToggling
                        ? "Processing..."
                        : status === 1
                            ? "Deactivate Product"
                            : "Activate Product"}
                </button>
            </div>
        </div>
    );
};

export default ProductForm