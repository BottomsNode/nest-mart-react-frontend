import { useEffect, useState } from "react";
import axiosInstance from "@/api/handler";
import type { User } from "../components/admin/users-management/types";


export const useRecentUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axiosInstance
            .get<User[]>("/user")
            .then((res) => {
                const sorted = res.data
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 3);
                setUsers(sorted);
            })
            .catch(() => setError("Failed to fetch recent users"))
            .finally(() => setLoading(false));
    }, []);

    return { users, loading, error };
};
