import React, { lazy, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/web_logo.jpg";
import { FaBars, FaTimes } from "react-icons/fa";

const CommonButton = lazy(()=> import("@/components/Button/Button"));

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

    return (
        <header className="bg-gray-700 text-white p-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo & Brand */}
                <Link to="/" className="flex items-center space-x-3">
                    <img
                        src={logo}
                        alt="Nest-Mart Logo"
                        className="h-10 w-10 object-cover rounded-full"
                    />
                    <span className="text-2xl font-bold">Nest-Mart</span>
                </Link>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden" onClick={toggleMobileMenu}>
                    {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                {/* Desktop Links */}
                <ul className="hidden md:flex space-x-6 items-center">
                    <li>
                        <Link to="/" className="hover:text-orange-400 font-medium">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-orange-400 font-medium">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-orange-400 font-medium">
                            Contact
                        </Link>
                    </li>
                    <li>
                        <CommonButton
                            text="Login"
                            onClick={() => navigate("/login")}
                            variant="secondary"
                        />
                    </li>
                </ul>
            </div>

            {/* Mobile Links */}
            {mobileMenuOpen && (
                <ul className="md:hidden mt-4 px-4 space-y-2 text-white">
                    <li>
                        <Link
                            to="/"
                            className="block py-2 border-b border-gray-600"
                            onClick={toggleMobileMenu}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className="block py-2 border-b border-gray-600"
                            onClick={toggleMobileMenu}
                        >
                            About
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/contact"
                            className="block py-2 border-b border-gray-600"
                            onClick={toggleMobileMenu}
                        >
                            Contact
                        </Link>
                    </li>
                    <li>
                        <CommonButton
                            text="Login"
                            onClick={() => {
                                navigate("/login");
                                toggleMobileMenu();
                            }}
                            variant="secondary"
                        />
                    </li>
                </ul>
            )}
        </header>
    );
};
