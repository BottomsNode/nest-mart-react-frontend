import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
    id: number;
    name:string;
    email: string;
    role: string;
    permissions: string[];
    iat: number;
    exp: number;
}

export interface AuthState {
    token: string | null;
    user: DecodedToken | null;
}

const decodeToken = (token: string): DecodedToken | null => {
    try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
            return null;
        }
        return decoded;
    } catch {
        return null;
    }
};

const tokenFromStorage = localStorage.getItem("token");

const initialState: AuthState = {
    token: tokenFromStorage,
    user: tokenFromStorage ? decodeToken(tokenFromStorage) : null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<string>) => {
            const token = action.payload;
            const user = decodeToken(token);

            state.token = token;
            state.user = user;

            localStorage.setItem("token", token);
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        },
        hydrateFromStorage: (state) => {
            const token = localStorage.getItem("token");
            if (token) {
                state.token = token;
                state.user = decodeToken(token);
            }
        }
    },
});

export const { setCredentials, logout, hydrateFromStorage } = authSlice.actions;
export default authSlice.reducer;
