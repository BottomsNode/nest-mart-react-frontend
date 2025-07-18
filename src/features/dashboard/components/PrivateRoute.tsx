import { useEffect, type FC } from "react";
import { useNavigate, Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export const PrivateRoute: FC<{ layout?: React.ReactNode }> = ({ layout }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        if (!user) {
            localStorage.removeItem('token');
            navigate("/login", {
                replace: true,
                state: { from: location },
            });
        }
    }, [user, navigate, location]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return layout ? <>{layout}</> : <Outlet />;
};
