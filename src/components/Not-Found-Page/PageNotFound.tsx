import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const PageNotFound: React.FC = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");
    const redirectTo = token ? "/dashboard" : "/";

    useEffect(() => {
        const timeout = setTimeout(() => navigate(redirectTo, { replace: true }), 3000);
        return () => clearTimeout(timeout);
    }, [navigate, redirectTo]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-100">
            <div className="animate-bounce text-6xl mb-4">🚧</div>
            <h1 className="text-5xl font-bold text-gray-800 mb-2">Oops! 404</h1>
            <p className="text-lg text-gray-600 mb-4">The page you’re looking for doesn’t exist.</p>
            <p className="text-md text-gray-500">
                Redirecting you to <span className="font-semibold">{token ? "Dashboard" : "Home"}</span>...
            </p>
        </div>
    );
};

export default PageNotFound;
