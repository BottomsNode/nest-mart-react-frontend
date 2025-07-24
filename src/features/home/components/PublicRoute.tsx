import { Loader } from "@/components";
import { useEffect, type FC, useState } from "react";
import { useNavigate, Outlet } from "react-router";

export const PublicRoute: FC<{ layout?: React.ReactNode }> = ({ layout }) => {
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (token) {
            navigate("/dashboard", { replace: true });
        }

        setIsChecking(false);
    }, [navigate]);

    if (isChecking) {
        return <div> <Loader overlay size={40} color="#007BFF" /> </div>;
    }

    return layout ? <>{layout}</> : <Outlet />;
};
