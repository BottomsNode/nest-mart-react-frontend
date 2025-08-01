import { lazy, useState, type FC } from "react";
import {
    Boxes,
    CheckCircle,
    CircleOff,
    PlusCircle
} from "lucide-react";

const AllProducts = lazy(()=> import('./tabs/AllProducts'))
const ActiveProducts = lazy(()=> import('./tabs/ActiveProducts'))
const InactiveProducts = lazy(()=> import('./tabs/InactiveProducts'))
const CreateProduct = lazy(()=> import('./tabs/CreateProduct'))


const tabs = [
    { id: "all", label: "All Products", icon: <Boxes size={16} /> },
    { id: "active", label: "Active Products", icon: <CheckCircle size={16} /> },
    { id: "inactive", label: "Inactive Products", icon: <CircleOff size={16} /> },
    { id: "create", label: "Create Product", icon: <PlusCircle size={16} /> },
];

const ProductManagement: FC = () => {
    const [activeTab, setActiveTab] = useState("all");

    const renderTabContent = () => {
        switch (activeTab) {
            case "all":
                return <AllProducts />;
            case "active":
                return <ActiveProducts />;
            case "inactive":
                return <InactiveProducts />;
            case "create":
                return <CreateProduct />;
            default:
                return null;
        }
    };

    return (
        <div className="p-4 mx-auto">
            <h1 className="text-2xl font-bold mb-6">Product Management</h1>

            <div className="flex flex-wrap gap-3 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-1.5 px-4 text-xl rounded-md font-medium transition flex items-center gap-5 ${activeTab === tab.id
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-indigo-100"
                            }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="bg-white p-4 rounded shadow-sm">{renderTabContent()}</div>
        </div>
    );
};

export default ProductManagement;