import { useCallback } from "react";

export const useNavClasses = () => {
    const navLinkClass = useCallback(({ isActive }: { isActive: boolean }) =>
        `flex items-center space-x-1 transition-colors duration-150 ${isActive
            ? "text-white font-semibold border-b-2 border-white"
            : "text-white hover:text-indigo-300"}`
        , []);

    const mobileNavClass = useCallback(({ isActive }: { isActive: boolean }) =>
        `block py-1 ${isActive
            ? "text-indigo-300 font-semibold"
            : "text-white hover:text-indigo-300"}`
        , []);

    return { navLinkClass, mobileNavClass };
};
