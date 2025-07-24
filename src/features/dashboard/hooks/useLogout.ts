import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/api/handler";
import { logout as logoutAction } from "@/store/authSlice";
import type { RootState } from "@/store";

export const useLogout = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const logout = useCallback(async () => {
        if (isLoggingOut || !user?.id) return;
        setIsLoggingOut(true);

        try {
            await axiosInstance.post("/auth/logout", { userId: user.id });
        } catch (error) {
            console.error("Logout API error:", error);
        } finally {
            dispatch(logoutAction());
            localStorage.clear();
            sessionStorage.clear();
            window.scrollTo({ top: 0 });

            navigate("/login");
        }
    }, [dispatch, navigate, isLoggingOut, user?.id]);

    useEffect(() => {
        logout();
    }, [logout]);

    return { isLoggingOut };
};
