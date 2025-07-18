import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "@/store/authSlice";

export const getDecodedToken = (): DecodedToken | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        return jwtDecode<DecodedToken>(token);
    } catch {
        return null;
    }
};
