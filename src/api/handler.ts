import axios, { AxiosError, type AxiosResponse } from "axios";
import { VITE_BACKEND_API_URL } from "@/config";
import { store } from "@/store";
import { logout } from "@/store/authSlice";
import { getDecodedToken } from "@/utils/auth";

export interface APIErrorResponse {
    message: string;
    error?: string;
    statusCode?: number;
}

const axiosInstance = axios.create({
    baseURL: VITE_BACKEND_API_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    const decoded = getDecodedToken();

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (decoded?.id) {
        config.headers["x-user-id"] = decoded.id.toString();
    }

    return config;
});

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<any>) => {
        if (axios.isCancel(error)) {
            console.warn("Request cancelled:", error.message);
            return Promise.reject(error);
        }

        if ((error as AxiosError).response) {
            const status = (error as AxiosError).response!.status;
            if (status === 401) {
                store.dispatch(logout());
            } else if (status === 500) {
                console.error("Internal server error");
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
