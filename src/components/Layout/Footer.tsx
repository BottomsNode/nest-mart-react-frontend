import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="sticky bottom-0 left-0 right-0 bg-gray-800 text-white py-3 z-50">
            <div className="container mx-auto flex flex-col items-center">
                <div className="space-x-4 mb-4">
                    <a href="#" className="hover:text-blue-400">Privacy Policy</a>
                    <a href="#" className="hover:text-blue-400">Terms of Service</a>
                    <a href="#" className="hover:text-blue-400">Contact Us</a>
                </div>
                <div className="text-sm text-gray-400">
                    &copy; 2025 NestMart. All rights reserved.
                </div>
            </div>
        </footer>
    );
};