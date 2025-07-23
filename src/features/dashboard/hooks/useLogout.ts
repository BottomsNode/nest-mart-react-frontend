import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";

export const useLogout = () => {
    const [loggedOut, setLoggedOut] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleConfirmLogout = () => {
        setLoggedOut(true);

        setTimeout(() => {
            dispatch(logout());
            localStorage.clear();
            sessionStorage.clear();
            window.scrollTo({ top: 0 });
            navigate("/");
        }, 1000);
    };

    useEffect(() => {
        handleConfirmLogout();
    }, []);

    return { loggedOut, handleConfirmLogout };
};
