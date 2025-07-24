import { lazy, useState, type FC } from "react";
import { UserPlus, Users, UserCheck, UserX } from "lucide-react";
// import { ActiveUsers, AllUsers, DeactiveUsers } from "./tabs";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

const ActiveUsers = lazy(()=> import('./tabs/ActiveUsers'))
const AllUsers = lazy(()=> import('./tabs/AllUsers'))
const DeactiveUsers = lazy(()=> import('./tabs/DeactiveUsers'))
const SignupForm = lazy(()=> import('../../signup/SignupForm'))


const UserManagement: FC = () => {
    const [activeTab, setActiveTab] = useState("listing");
    const userRole = useSelector((state: RootState) => state.auth.user?.role);

    const tabs = [
        { id: "listing", label: "All Users", icon: <Users size={16} /> },
        ...(userRole === "ADMIN"
            ? [{ id: "create", label: "Create User", icon: <UserPlus size={16} /> }]
            : []),
        { id: "active", label: "Active Users", icon: <UserCheck size={16} /> },
        { id: "deactive", label: "Deactive Users", icon: <UserX size={16} /> },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "listing":
                return <AllUsers />;
            case "create":
                return userRole === "ADMIN" ? <SignupForm /> : null;
            case "active":
                return <ActiveUsers />;
            case "deactive":
                return <DeactiveUsers />;
            default:
                return null;
        }
    };

    return (
        <div className="p-4 mx-auto">
            <h1 className="text-2xl font-bold mb-6">User Management</h1>

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
                        <span className="inline-flex items-center gap-1">
                            {tab.icon}
                            {tab.label}
                        </span>
                    </button>
                ))}
            </div>

            <div className="bg-white p-4 rounded shadow-sm">{renderTabContent()}</div>
        </div>
    );
};

export default UserManagement