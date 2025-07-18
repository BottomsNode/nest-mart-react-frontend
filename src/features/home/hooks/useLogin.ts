import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/handler";
import { setCredentials } from "@/store/authSlice";
import type { LoginFormValues } from "../models";
import { useState } from "react";

export const useLogin = (redirectTo: string = "/dashboard") => {
    const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");
    const [alertMessage, setAlertMessage] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCloseSnackbar = () => setOpenSnackbar(false);

    const mutation = useMutation({
        mutationFn: async (data: LoginFormValues) => {
            const response = await axiosInstance.post("/auth/login", data);
            return response.data;
        },
        onSuccess: (data) => {
            dispatch(setCredentials(data));
            setAlertSeverity("success");
            setAlertMessage("Login successful!");
            setOpenSnackbar(true);

            setTimeout(() => {
                navigate(redirectTo);
            }, 1000);
        },
        onError: (error: any) => {
            console.error("Login failed:", error);
            setAlertSeverity("error");
            setAlertMessage("An error occurred during login. Please try again.");
            setOpenSnackbar(true);
        },
    });

    return {
        login: mutation.mutate,
        loading: mutation.isPending,
        alertSeverity,
        alertMessage,
        openSnackbar,
        handleCloseSnackbar,
    };
};