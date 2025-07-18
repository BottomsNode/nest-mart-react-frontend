import { UserMinus } from "lucide-react";
import { useUsers } from "../../hook";
import type { User } from "../../types";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export const ActiveUsers = () => {
    const { users, isLoading, deactivateUser } = useUsers();
    const activeUsers = users.filter((u: User) => u.isActive);
    const userRole = useSelector((state: RootState) => state.auth.user?.role);

    if (isLoading) return <p className="text-center text-gray-500">Loading active users...</p>;
    if (activeUsers.length === 0) return <p className="text-center text-gray-500">No active users found.</p>;

    return (
        <div className="space-y-4">
            {activeUsers.map((user: User) => (
                <div
                    key={user.id}
                    className="flex justify-between items-start p-4 bg-white border border-green-100 rounded-xl shadow-sm hover:shadow-md transition"
                >
                    {/* User Info */}
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                            Active
                        </span>
                    </div>

                    {/* Deactivate Button (ADMIN only) */}
                    {userRole === "ADMIN" && (
                        <button
                            onClick={() => deactivateUser.mutate(user.id)}
                            className="flex items-center text-sm text-red-700 hover:bg-red-100 px-2 py-1 rounded-xl transition"
                        >
                            <UserMinus className="mr-1" size={16} />
                            Deactivate
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};
