import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "@/store/authSlice";

export const getDecodedToken = (): DecodedToken | null => {
    const token = sessionStorage.getItem("token");
    if (!token) return null;

    try {
        return jwtDecode<DecodedToken>(token);
    } catch {
        return null;
    }
};
