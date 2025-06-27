import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FireBaseAuthContext } from '../Provider/FireBaseAuthContext';
import ThemeToggle from './ThemeToggle';


function getRandomShadowColor() {
  const colors = ['#FF6B6B', '#4FD1C5', '#667EEA', '#F6AD55', '#9F7AEA'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return `0 4px 6px -1px ${randomColor}, 0 2px 4px -2px ${randomColor}`;
}

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logOutUser } = useContext(FireBaseAuthContext);
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogOutUser = () => {
    logOutUser()
      .then(() => {
        toast.success('Logout Success');
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Logout Failed');
      });
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? 'text-green-600 font-semibold' : '';

  return (
    <nav
      className="bg-base-100 fixed top-0 left-0 right-0 z-50 shadow-md"
      style={{ boxShadow: getRandomShadowColor() }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="TaskMatch Logo"
            className="w-12 h-12 md:w-14 md:h-14 transition-all duration-300 ease-in-out brightness-95 dark:brightness-150 drop-shadow-md dark:drop-shadow-xl"
          />
          <span className="text-lg md:text-2xl font-bold">
            <span className="text-blue-500 dark:text-blue-400">Task</span>
            <span className="text-purple-700 dark:text-purple-300">Match</span>
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button onClick={toggleMobileMenu} aria-label="Toggle menu" className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium items-center">
          <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
          <li><NavLink to="/add-task" className={navLinkClass}>Add Task</NavLink></li>
          <li><NavLink to="/browse-tasks" className={navLinkClass}>Browse Tasks</NavLink></li>
          {user && <li><NavLink to="/my-posted-tasks" className={navLinkClass}>My Posted Tasks</NavLink></li>}
          <li><NavLink to="/featured-tasks" className={navLinkClass}>Featured Tasks</NavLink></li>
          <li><NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink></li>
          <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>

          {user ? (
            <>
              {/* Profile Avatar with Dropdown */}
              <li className="relative">
                <img
                  src={user.photoURL || 'https://i.pravatar.cc/32'}
                  alt="User"
                  className="rounded-full w-8 h-8 object-cover cursor-pointer"
                  onClick={toggleDropdown}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 border rounded shadow-md z-10">
                    <button
                      className="w-full px-4 py-2 bg-base-300 hover:bg-blue-500 text-left text-sm"
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate('/my-profile');
                      }}
                    >
                      My Profile
                    </button>
                    <button
                      className="w-full px-4 py-2 bg-base-300 hover:bg-blue-500 text-left text-sm"
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogOutUser();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/register" className="px-3 py-1 text-white rounded bg-blue-600 hover:bg-blue-700">
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="px-3 py-1 text-white rounded bg-blue-600 hover:bg-blue-700">
                  Login
                </NavLink>
              </li>
            </>
          )}
          <ThemeToggle />
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-base-300">
          <ul className="flex flex-col px-6 py-4 space-y-4 text-sm font-medium">
            <li><NavLink to="/" onClick={toggleMobileMenu}>Home</NavLink></li>
            <li><NavLink to="/add-task" onClick={toggleMobileMenu}>Add Task</NavLink></li>
            <li><NavLink to="/browse-tasks" onClick={toggleMobileMenu}>Browse Tasks</NavLink></li>
            {user && <li><NavLink to="/my-posted-tasks" onClick={toggleMobileMenu}>My Posted Tasks</NavLink></li>}
            <li><NavLink to="/featured-tasks" onClick={toggleMobileMenu}>Featured Tasks</NavLink></li>
            <li><NavLink to="/dashboard" onClick={toggleMobileMenu}>Dashboard</NavLink></li>
            <li><NavLink to="/about" onClick={toggleMobileMenu}>About</NavLink></li>

            {user ? (
              <>
                <li><NavLink to="/my-profile" onClick={toggleMobileMenu}>My Profile</NavLink></li>
                <li>
                  <button
                    onClick={() => {
                      handleLogOutUser();
                      toggleMobileMenu();
                    }}
                    className="px-3 py-1 text-white rounded bg-blue-600 hover:bg-blue-700"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/register" onClick={toggleMobileMenu} className="px-3 py-1 text-white rounded bg-blue-600 hover:bg-blue-700">
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" onClick={toggleMobileMenu} className="px-3 py-1 text-white rounded bg-blue-600 hover:bg-blue-700">
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
