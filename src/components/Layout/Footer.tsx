import React from "react";

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-10">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 space-y-4 md:space-y-0">
                {/* Links */}
                <div className="flex space-x-6">
                    <a
                        href="#"
                        className="text-sm hover:text-blue-400 transition duration-200"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="#"
                        className="text-sm hover:text-blue-400 transition duration-200"
                    >
                        Terms of Service
                    </a>
                    <a
                        href="#"
                        className="text-sm hover:text-blue-400 transition duration-200"
                    >
                        Contact Us
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-sm text-gray-400 text-center md:text-right">
                    &copy; {new Date().getFullYear()} NestMart. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
