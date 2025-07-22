import React from "react";
import { useLogout } from "../hooks";
import { Loader2 } from "lucide-react";

export const Logout: React.FC = () => {
    useLogout();
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 px-4 animate-fadeIn">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center transition-all duration-500">
                <>
                    <h1 className="text-2xl font-semibold mb-4 text-gray-700">
                        Logging Out...
                    </h1>
                    <Loader2 className="mx-auto h-10 w-10 text-blue-500 animate-spin" />
                    <p className="text-gray-500 mt-4">You will be redirected shortly.</p>
                </>
            </div>
        </div>
    );
};