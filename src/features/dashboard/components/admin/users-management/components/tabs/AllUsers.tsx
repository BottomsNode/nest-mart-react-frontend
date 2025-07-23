import { useState } from "react";
import { UserMinus, UserCheck, MapPin, Phone } from "lucide-react";
import { useUsers } from "../../hook";
import type { User } from "../../types";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { Loader } from "@/components";

const AllUsers = () => {
    const { users, isLoading, activateUser, deactivateUser } = useUsers();
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [loadingUserId, setLoadingUserId] = useState<number | null>(null);

    const userRole = useSelector((state: RootState) => state.auth.user?.role);

    const toggleDetails = (userId: number) => {
        setSelectedUserId(prev => (prev === userId ? null : userId));
    };

    if (isLoading) return <p className="text-center text-gray-500"><Loader size={25} color="#364153"/></p>;

    return (
        <div className="space-y-6">
            {/* Show current user role */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">All Users</h2>
                <span className="text-sm px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium">
                    Role: {userRole ?? "Unknown"}
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user: User) => (
                    <div
                        key={user.id}
                        className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all"
                    >
                        {/* Top Section */}
                        <div
                            className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 cursor-pointer"
                            onClick={() => toggleDetails(user.id)}
                        >
                            {/* User Info */}
                            <div className="space-y-1">
                                <h3 className="text-lg font-semibold">{user.name}</h3>
                                <p className="text-sm text-gray-600 break-all">{user.email}</p>
                                <span
                                    className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-1 
        ${user.isActive
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {user.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>

                            {/* Only show toggle button to ADMIN */}
                            {userRole === "ADMIN" && (
                                <button
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        setLoadingUserId(user.id);
                                        try {
                                            if (user.isActive) {
                                                await deactivateUser.mutateAsync(user.id);
                                            } else {
                                                await activateUser.mutateAsync(user.id);
                                            }
                                        } catch (err) {
                                            console.error("Mutation failed", err);
                                        } finally {
                                            setLoadingUserId(null);
                                        }
                                    }}
                                    className={`flex items-center justify-center text-sm font-medium px-4 py-2 rounded-xl transition duration-200 min-w-[120px] w-full sm:w-auto
        ${user.isActive
                                            ? "text-red-700 bg-red-50 border border-red-400 hover:bg-red-100"
                                            : "text-green-700 bg-green-50 border border-green-400 hover:bg-green-100"
                                        }`}
                                >
                                    {loadingUserId === user.id ? (
                                        <div className="animate-pulse">
                                            <Loader size={25} color="#364153" />
                                        </div>
                                    ) : user.isActive ? (
                                        <>
                                            <UserMinus size={16} className="mr-1" /> Deactivate
                                        </>
                                    ) : (
                                        <>
                                            <UserCheck size={16} className="mr-1" /> Activate
                                        </>
                                    )}
                                </button>
                            )}
                        </div>


                        {/* Collapsible Details */}
                        {selectedUserId === user.id && (
                            <div className="p-4 border-t bg-gray-50 space-y-2 text-sm text-gray-700">
                                <div className="flex items-center">
                                    <Phone size={14} className="mr-2 text-gray-500" />
                                    <span>{user.phone}</span>
                                </div>
                                <div className="flex items-start">
                                    <MapPin size={14} className="mr-2 mt-0.5 text-gray-500" />
                                    <span>
                                        {user.address.street}, {user.address.city} - {user.address.pincode}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllUsers