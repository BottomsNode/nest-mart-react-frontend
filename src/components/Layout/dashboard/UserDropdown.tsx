import React from "react";
import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";

type Props = {
    user: { email: string } | null;
    dropdownOpen: boolean;
    toggleDropdown: () => void;
    dropdownRef: React.RefObject<HTMLLIElement | null>;
    userLogo: string;
};

export const UserDropdown: React.FC<Props> = ({
    user,
    dropdownOpen,
    toggleDropdown,
    dropdownRef,
    userLogo
}) => (
    <li ref={dropdownRef} className="relative">
        <button className="flex items-center space-x-2 hover:text-red-400" onClick={toggleDropdown}>
            <img src={userLogo} alt="Profile" className="w-8 h-8 rounded-full border-2 border-white" />
            <span className="text-xs">&#9662;</span>
        </button>
        {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-2 z-50">
                <div className="px-4 py-2 font-semibold text-sm border-b border-gray-200">
                    {user?.email || "User"}
                </div>
                <NavLink to="/dashboard/profile" className="block px-4 py-2 hover:bg-gray-100">
                    My Profile
                </NavLink>
                <NavLink to="/dashboard/settings" className="block px-4 py-2 hover:bg-gray-100">
                    Settings
                </NavLink>
                <NavLink
                    to="/dashboard/logout"
                    className="px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center space-x-1"
                >
                    <LogOut size={16} />
                    <span>Logout</span>
                </NavLink>
            </div>
        )}
    </li>
);