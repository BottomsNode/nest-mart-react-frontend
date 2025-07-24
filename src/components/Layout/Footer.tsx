import React from "react";
import { FaTwitter, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 mt-auto">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Company Info */}
                <section aria-labelledby="company-info-heading">
                    <h2 id="company-info-heading" className="text-lg font-semibold mb-4">NestMart</h2>
                    <p className="text-sm mb-4">Your one-stop online shop for everything you need. Quality products at great prices.</p>
                    <p className="text-sm" style={{ minHeight: '1.25rem' }}>&copy; {new Date().getFullYear()} NestMart. All rights reserved.</p>
                </section>

                {/* Useful Links */}
                <nav aria-labelledby="quick-links-heading">
                    <h2 id="quick-links-heading" className="text-lg font-semibold mb-4">Quick Links</h2>
                    <ul className="text-sm space-y-2">
                        <li><a href="/terms" className="hover:text-indigo-300">Terms of Service</a></li>
                        <li><a href="/privacy" className="hover:text-indigo-300">Privacy Policy</a></li>
                        <li><a href="/faq" className="hover:text-indigo-300">FAQ</a></li>
                        <li><a href="/contact" className="hover:text-indigo-300">Contact Us</a></li>
                    </ul>
                </nav>

                {/* Social Media Links */}
                <section aria-labelledby="social-media-heading">
                    <h2 id="social-media-heading" className="text-lg font-semibold mb-4">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" className="text-white hover:text-indigo-300" aria-label="Facebook">
                            <FaFacebook size={24} />
                        </a>
                        <a href="https://twitter.com" className="text-white hover:text-indigo-300" aria-label="Twitter">
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://linkedin.com" className="text-white hover:text-indigo-300" aria-label="LinkedIn">
                            <FaLinkedin size={24} />
                        </a>
                        <a href="https://instagram.com" className="text-white hover:text-indigo-300" aria-label="Instagram">
                            <FaInstagram size={24} />
                        </a>
                    </div>
                </section>
            </div>
        </footer>
    );
};
