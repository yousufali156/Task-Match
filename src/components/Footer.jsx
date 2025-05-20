import React from "react";
import {
    FaTiktok,
    FaInstagram,
    FaLinkedin,
    FaFacebook,
    FaPinterest,
    FaXTwitter,
} from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

const Footer = () => {
    return (
        <footer className="bg-sky-50 text-gray-700 text-sm">
            {/* Main Section */}
            <div className="max-w-7xl mx-auto px-4 pt-10 pb-6">

                {/* Company description */}
                <div className="mb-10 max-w-xl ">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Grapes Market</h2>
                    <p>
                        "A freelance marketplace for small tasks where users can post jobs, bid, and connect based on skills, budget, and deadlines."
                    </p>
                </div>

                {/* Footer links */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-sm">
                    {/* Categories */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Categories</h3>
                        <ul className="space-y-1">
                            <li>Graphics & Design</li>
                            <li>Digital Marketing</li>
                            <li>Writing & Translation</li>
                            <li>Video & Animation</li>
                            <li>Music & Audio</li>
                            <li>Programming & Tech</li>
                        </ul>
                    </div>

                    {/* For Clients */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">For Clients</h3>
                        <ul className="space-y-1">
                            <li>How It Works</li>
                            <li>Customer Success Stories</li>
                            <li>Trust & Safety</li>
                            <li>Quality Guide</li>
                            <li>Online Learning</li>
                            <li>Help Center</li>
                        </ul>
                    </div>

                    {/* For Freelancers */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">For Freelancers</h3>
                        <ul className="space-y-1">
                            <li>Become a Freelancer</li>
                            <li>Join an Agency</li>
                            <li>Freelancer Tools</li>
                            <li>Community Hub</li>
                            <li>Forum</li>
                            <li>Events</li>
                        </ul>
                    </div>

                    {/* Business Solutions */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Business Solutions</h3>
                        <ul className="space-y-1">
                            <li>Project Management</li>
                            <li>Expert Sourcing</li>
                            <li>Content Marketing</li>
                            <li>Creative Talent</li>
                            <li>Automation Tools</li>
                            <li>Custom Requests</li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Company</h3>
                        <ul className="space-y-1">
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Terms of Service</li>
                            <li>Privacy Policy</li>
                            <li>Contact</li>
                            <li>Partnerships</li>
                        </ul>
                    </div>



                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t py-4 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Left: Logo */}
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">
                            Grapes<span className="text-green-500">.</span>
                        </span>
                        <span>© Grapes Market Ltd. {new Date().getFullYear()}</span>
                    </div>


                    {/* Right: Social Icons */}
                    <div className="flex items-center gap-4 text-xl">
                        <FaTiktok />
                        <FaInstagram />
                        <FaLinkedin />
                        <FaFacebook />
                        <FaPinterest />
                        <FaXTwitter />
                        
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
