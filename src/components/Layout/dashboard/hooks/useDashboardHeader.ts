import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export const useDashboardHeader = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLLIElement>(null);

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);
    const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

    const handleClickOutside = useCallback((e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setDropdownOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [handleClickOutside]);

    const isAdmin = user?.role?.toUpperCase() === "ADMIN";
    const isManager = user?.role?.toUpperCase() === "MANAGER";

    return {
        user,
        dropdownOpen,
        toggleDropdown,
        mobileMenuOpen,
        toggleMobileMenu,
        dropdownRef,
        isAdmin,
        isManager
    };
};
