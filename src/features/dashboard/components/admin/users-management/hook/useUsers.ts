import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/handler";

export const useUsers = () => {
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosInstance.get("/user");
            return res.data;
        },
    });

    const activateUser = useMutation({
        mutationFn: (id: number) => axiosInstance.put(`/user/${id}/activate`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    const deactivateUser = useMutation({
        mutationFn: (id: number) => axiosInstance.put(`/user/${id}/deactivate`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    return { users, isLoading, activateUser, deactivateUser };
};
