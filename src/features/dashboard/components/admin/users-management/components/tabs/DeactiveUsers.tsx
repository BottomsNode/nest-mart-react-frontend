import { UserCheck } from "lucide-react";
import { useUsers } from "../../hook";
import type { User } from "../../types";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export const DeactiveUsers = () => {
    const { users, isLoading, activateUser } = useUsers();
    const userRole = useSelector((state: RootState) => state.auth.user?.role);
    const deactiveUsers = users.filter((u: User) => !u.isActive);

    if (isLoading) return <p className="text-center text-gray-500">Loading deactivated users...</p>;
    if (deactiveUsers.length === 0) return <p className="text-center text-gray-500">No deactivated users found.</p>;

    return (
        <div className="space-y-4">
            {deactiveUsers.map((user: User) => (
                <div
                    key={user.id}
                    className="flex justify-between items-start p-4 bg-white border border-red-100 rounded-xl shadow-sm hover:shadow-md transition"
                >
                    {/* User Info */}
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                            Inactive
                        </span>
                    </div>

                    {/* Activate Button (Only for ADMIN) */}
                    {userRole === "ADMIN" && (
                        <button
                            onClick={() => activateUser.mutate(user.id)}
                            className="flex items-center text-sm text-green-700 hover:bg-green-100 px-2 py-1 rounded-xl transition"
                        >
                            <UserCheck className="mr-1" size={16} />
                            Activate
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};
