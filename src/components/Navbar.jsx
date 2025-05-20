import React, { useState } from 'react';
import { Link } from 'react-router';

function getRandomShadowColor() {
  const colors = ['#FF6B6B', '#4FD1C5', '#667EEA', '#F6AD55', '#9F7AEA'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return `0 4px 6px -1px ${randomColor}, 0 2px 4px -2px ${randomColor}`;
}

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className="bg-white container mx-auto mt-3 px-6 py-4 flex justify-between items-center"
      style={{ boxShadow: getRandomShadowColor() }}
    >
      {/* Logo */}
      <div className="text-2xl font-bold text-black">
        <Link to="/">Grapes Market</Link>
      </div>

      {/* Hamburger - visible on mobile */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="focus:outline-none">
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Nav Links - hidden on mobile, visible on md+ */}
      <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-700 items-center">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add-task">Add Task</Link>
        </li>
        <li>
          <Link to="/browse-tasks">Browse Tasks</Link>
        </li>
        <li>
          <Link to="/my-posted-tasks">My Posted Tasks</Link>
        </li>
        <li className="text-black font-bold">
          <button>Log Out</button>
        </li>
        <li>
          <img
            src="https://i.pravatar.cc/32"
            alt="profile"
            className="rounded-full w-8 h-8 object-cover"
          />
        </li>
      </ul>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 md:hidden z-10">
          <ul className="flex flex-col px-6 py-4 space-y-4 text-sm font-medium text-gray-700">
            <li>
              <Link to="/" onClick={toggleMobileMenu}>Home</Link>
            </li>
            <li>
              <Link to="/add-task" onClick={toggleMobileMenu}>Add Task</Link>
            </li>
            <li>
              <Link to="/browse-tasks" onClick={toggleMobileMenu}>Browse Tasks</Link>
            </li>
            <li>
              <Link to="/my-posted-tasks" onClick={toggleMobileMenu}>My Posted Tasks</Link>
            </li>
            <li className="text-black font-bold">
              <button onClick={toggleMobileMenu}>Log Out</button>
            </li>
            <li>
              <img
                src="https://i.pravatar.cc/32"
                alt="profile"
                className="rounded-full w-8 h-8 object-cover"
              />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
