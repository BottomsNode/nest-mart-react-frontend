import { useState } from "react";
import { useCreateProduct } from "../hooks";
import { Popup } from "@/components/Popup";

export const CreateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupSeverity, setPopupSeverity] = useState<"success" | "error">("success");

    const createProduct = useCreateProduct({
        onSuccess: () => {
            setPopupMessage("Product created successfully!");
            setPopupSeverity("success");
            setPopupOpen(true);
            setName("");
            setPrice("");
            setStock("");
        },
        onError: () => {
            setPopupMessage("Failed to create product.");
            setPopupSeverity("error");
            setPopupOpen(true);
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createProduct.mutate({ name, price: +price, stock: +stock });
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto p-6 bg-white rounded-xl shadow space-y-4"
            >
                <h2 className="text-xl font-semibold text-gray-800">Create New Product</h2>

                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
                >
                    {createProduct.isPending ? "Creating..." : "Create Product"}
                </button>
            </form>

            <Popup
                open={popupOpen}
                onClose={() => setPopupOpen(false)}
                message={popupMessage}
                severity={popupSeverity}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
        </>
    );
};
