import { useEffect, type FC } from "react";
import { useNavigate, Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { Loader } from "@/components";

export const PrivateRoute: FC<{ layout?: React.ReactNode }> = ({ layout }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        if (!user) {
            localStorage.removeItem('token');
            navigate("/", {
                replace: true,
                state: { from: location, logout: true },
            });
        }
    }, [user, navigate, location]);

    if (!user) {
        return <div> <Loader overlay size={40} color="#007BFF" /> </div>;
    }

    return layout ? <>{layout}</> : <Outlet />;
};
