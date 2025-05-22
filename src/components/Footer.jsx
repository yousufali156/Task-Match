import React from "react";
import {
    FaTiktok,
    FaInstagram,
    FaLinkedin,
    FaFacebook,
    FaPinterest,
    FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-sky-50 text-gray-700 text-sm">
            {/* Main Section */}
            <div className="max-w-7xl mx-auto px-4 pt-10 pb-6">

                <title>Footer || Task Match</title>

                {/* Contact & Terms Section */}
                <div className="mb-5 flex flex-col md:flex-row justify-between gap-8">


                    {/* Company description */}
                    <div className="mb-10 max-w-xl ">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Task Match</h2>
                        <p>
                            "A freelance marketplace for small tasks where users can post jobs, bid, and connect based on skills, budget, and deadlines."
                        </p>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="text-sm text-gray-600 max-w-sm">
                        <h3 className="font-semibold text-gray-900 mb-2">Terms & Conditions</h3>
                        <p>
                            By using Grapes Market, you agree to our service terms including payment
                            responsibilities, code of conduct, privacy rights, and dispute resolution.
                            Always review project details and terms before making agreements.
                        </p>
                    </div>
                </div>


                {/* Footer links */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-center border-t py-4 px-4">
                    {/* Categories */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Categories</h3>
                        <ul className="space-y-1">
                            <li>Web Development & Tech</li>
                            <li>Graphics & Design</li>
                            <li>Digital Marketing</li>
                            <li>Writing & Translation</li>
                            <li>Video & Animation</li>
                        </ul>
                    </div>

                    {/* For Clients */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">For Clients</h3>
                        <ul className="space-y-1">
                            <li>How It Works</li>
                            <li>Success Stories</li>
                            <li>Trust & Safety</li>
                            <li>Help Center</li>
                        </ul>
                    </div>

                    {/* For Freelancers */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">For Freelancers</h3>
                        <ul className="space-y-1">
                            <li>Become a Freelancer</li>
                            <li>Freelancer Tools</li>
                            <li>Community Hub</li>
                            <li>Events</li>
                        </ul>
                    </div>



                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Company</h3>
                        <ul className="space-y-1">
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Terms & Conditions</li>
                            <li>Privacy Policy</li>
                            <li>Partners</li>
                        </ul>
                    </div>


                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
                        <ul className="space-y-1">
                            <li>📧 support@taskmatch.com</li>
                            <li>📞 +880 (015) 567-8901</li>
                            <li>📍 123 Bogura, Rajshahi, BD 5800</li>
                        </ul>
                    </div>
                </div>


            </div>

            {/* Bottom Bar */}
            <div className="border-t py-4 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Left: Logo and copyright */}
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">
                            Task Match
                        </span>
                        <span>© Grapes Market Ltd. {new Date().getFullYear()}</span>
                    </div>

                    {/* Newsletter Sign-up */}
                    <div className="w-full md:w-1/2">
                        <h3 className="font-semibold text-center text-gray-900 mb-1">Subscribe to Our Newsletter</h3>
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-sky-500 text-white font-semibold rounded-md hover:bg-sky-600"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* Right: Social Icons */}
                    <div className="flex items-center gap-4 text-xl">
                        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                            <FaTiktok />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook />
                        </a>
                        <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
                            <FaPinterest />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaXTwitter />
                        </a>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
