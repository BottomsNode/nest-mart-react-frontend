import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export const DashboardFooter: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 mt-auto">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Company Info */}
                <div>
                    <h5 className="text-lg font-semibold mb-4">NestMart</h5>
                    <p className="text-sm mb-4">Your one-stop online shop for everything you need. Quality products at great prices.</p>
                    <p className="text-sm">&copy; {new Date().getFullYear()} NestMart. All rights reserved.</p>
                </div>

                {/* Useful Links */}
                <div>
                    <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
                    <ul className="text-sm space-y-2">
                        <li><a href="/terms" className="hover:text-indigo-300">Terms of Service</a></li>
                        <li><a href="/privacy" className="hover:text-indigo-300">Privacy Policy</a></li>
                        <li><a href="/faq" className="hover:text-indigo-300">FAQ</a></li>
                        <li><a href="/contact" className="hover:text-indigo-300">Contact Us</a></li>
                    </ul>
                </div>

                {/* Social Media Links */}
                <div>
                    <h5 className="text-lg font-semibold mb-4">Follow Us</h5>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" className="text-white hover:text-indigo-300">
                            <FaFacebook size={24} />
                        </a>
                        <a href="https://twitter.com" className="text-white hover:text-indigo-300">
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://linkedin.com" className="text-white hover:text-indigo-300">
                            <FaLinkedin size={24} />
                        </a>
                        <a href="https://instagram.com" className="text-white hover:text-indigo-300">
                            <FaInstagram size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
