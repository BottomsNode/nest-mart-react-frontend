import React from 'react';
import { Link, useNavigate } from 'react-router';
import { CommonButton } from '../Button';
import logo from '@/assets/web_logo.jpg';

export const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <header className="bg-gray-400 text-black p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-4">
                    <img src={logo} alt="Nest-Mart Logo" className="h-12 w-12 object-contain" />
                    <span className="text-3xl font-semibold text-gradient bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent drop-shadow-md">
                        Nest-Mart
                    </span>
                </Link>

                {/* Navigation */}
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/" className="text-black hover:text-red-600">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="text-black hover:text-red-600">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="text-black hover:text-red-600">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Authentication Buttons */}
                <div className="flex space-x-2">
                    <CommonButton
                        text="Login"
                        onClick={() => navigate('/login')}
                        variant="primary"
                    />
                </div>
            </div>
        </header>
    );
};