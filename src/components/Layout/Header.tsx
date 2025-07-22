import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CommonButton } from "../Button";
import logo from "@/assets/web_logo.jpg";

export const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center px-4 py-3">
                {/* Logo & Brand */}
                <Link to="/" className="flex items-center space-x-3">
                    <img
                        src={logo}
                        alt="Nest-Mart Logo"
                        className="h-10 w-10 object-contain"
                    />
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 drop-shadow-sm">
                        Nest-Mart
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex space-x-6">
                    <Link
                        to="/"
                        className="text-gray-700 hover:text-red-500 transition duration-200 font-medium"
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="text-gray-700 hover:text-red-500 transition duration-200 font-medium"
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className="text-gray-700 hover:text-red-500 transition duration-200 font-medium"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Action Button */}
                <div className="flex items-center space-x-2">
                    <CommonButton
                        text="Login"
                        onClick={() => navigate("/login")}
                        variant="primary"
                    />
                </div>
            </div>
        </header>
    );
};
