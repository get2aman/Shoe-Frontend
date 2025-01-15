import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-400 py-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* About Section */}
                <div>
                    <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
                    <p className="text-gray-400">
                        We are a leading shoe store offering a wide range of stylish and comfortable footwear. Our goal is to provide high-quality products that meet the needs of every customer.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
                    <ul>
                        <li className="mb-2">
                            <a href="/" className="hover:text-white transition duration-300">Home</a>
                        </li>
                        <li className="mb-2">
                            <a href="/shop" className="hover:text-white transition duration-300">Shop</a>
                        </li>
                        <li className="mb-2">
                            <a href="/about" className="hover:text-white transition duration-300">About</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-white transition duration-300">Contact</a>
                        </li>
                    </ul>
                </div>

                {/* Social Media Links */}
                <div>
                    <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" className="hover:text-white transition duration-300">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com" className="hover:text-white transition duration-300">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://instagram.com" className="hover:text-white transition duration-300">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://linkedin.com" className="hover:text-white transition duration-300">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="mt-8 text-center text-gray-500 border-t border-gray-700 pt-4">
                <p>&copy; {new Date().getFullYear()} Shoe Store. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
