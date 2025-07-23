import { UserMinus } from "lucide-react";
import { useUsers } from "../../hook";
import type { User } from "../../types";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useState } from "react";
import { Loader } from "@/components";

const ActiveUsers = () => {
    const { users, isLoading, deactivateUser } = useUsers();
    const activeUsers = users.filter((u: User) => u.isActive);
    const userRole = useSelector((state: RootState) => state.auth.user?.role);
    const [loadingUserId, setLoadingUserId] = useState<number | null>(null);


    if (isLoading) return <p className="text-center text-gray-500">Loading active users...</p>;
    if (activeUsers.length === 0) return <p className="text-center text-gray-500">No active users found.</p>;

    return (
        <div className="space-y-4">
            {activeUsers.map((user: User) => (
                <div
                    key={user.id}
                    className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-4 bg-white border border-green-100 rounded-xl shadow-sm hover:shadow-md transition w-full"
                >
                    {/* User Info */}
                    <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-900 break-words">{user.name}</h3>
                        <p className="text-sm text-gray-600 break-all">{user.email}</p>
                        <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                            Active
                        </span>
                    </div>

                    {/* Deactivate Button (ADMIN only) */}
                    {userRole === "ADMIN" && (
                        <button
                            onClick={() => {
                                setLoadingUserId(user.id);
                                deactivateUser.mutate(user.id, {
                                    onSettled: () => setLoadingUserId(null),
                                });
                            }}
                            disabled={loadingUserId === user.id}
                            className={`flex items-center justify-center text-sm font-medium px-4 py-2 rounded-xl min-w-[120px] transition duration-200 
        ${loadingUserId === user.id
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "text-red-700 bg-red-50 hover:bg-red-100 border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-300"
                                }`}
                        >
                            {loadingUserId === user.id ? (
                                <div className="animate-pulse">
                                    <Loader size={22} color="#364153" />
                                </div>
                            ) : (
                                <>
                                    <UserMinus className="mr-2" size={16} />
                                    Deactivate
                                </>
                            )}
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ActiveUsers
