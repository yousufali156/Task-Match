import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { FireBaseAuthContext } from '../Provider/FireBaseAuthContext';

function getRandomShadowColor() {
  const colors = ['#FF6B6B', '#4FD1C5', '#667EEA', '#F6AD55', '#9F7AEA'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return `0 4px 6px -1px ${randomColor}, 0 2px 4px -2px ${randomColor}`;
}

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logOutUser } = useContext(FireBaseAuthContext);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogOutUser = () => {
    logOutUser()
      .then(() => {
        navigate('/');
        toast.success('Logout Success');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Logout Failed');
      });
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? 'text-blue-600 font-semibold' : '';

  return (
    <nav
      className="bg-white sticky top-0 z-50 container mx-auto mt-3 px-6 py-4 flex justify-between items-center shadow-md"
      style={{ boxShadow: getRandomShadowColor() }}
    >
      {/* Logo */}
      <div className="text-3xl  font-bold   hover:from-blue-600 hover:to-indigo-700 text-black font-bold py-2 px-8 rounded-lg text-lg hover:shadow-lg  ">
        <Link to="/">Task Match</Link>
      </div>
      

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="focus:outline-none">
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-700 items-center">
        <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
        <li><NavLink to="/add-task" className={navLinkClass}>Add Task</NavLink></li>
        <li><NavLink to="/browse-tasks" className={navLinkClass}>Browse Tasks</NavLink></li>
        <li><NavLink to="/my-posted-tasks" className={navLinkClass}>My Posted Tasks</NavLink></li>
        <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>

        {user ? (
          <>
            <li>
              <button
                onClick={handleLogOutUser}
                className="px-3 py-1 text-white rounded bg-blue-600 hover:bg-blue-700"
              >
                Logout
              </button>
            </li>
            <li className="relative group">
              <img
                src={user.photoURL || 'https://i.pravatar.cc/32'}
                alt="User"
                className="rounded-full w-8 h-8 object-cover cursor-pointer"
              />
              <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {user.displayName || user.email}
              </div>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/register"
                className="px-3 py-1 text-white rounded bg-blue-600 hover:bg-blue-700"
              >
                Register
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className="px-3 py-1 text-white rounded bg-blue-600 hover:bg-blue-700"
              >
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 md:hidden z-50">
          <ul className="flex flex-col px-6 py-4 space-y-4 text-sm font-medium text-gray-700">
            <li><NavLink to="/" onClick={toggleMobileMenu}>Home</NavLink></li>
            <li><NavLink to="/add-task" onClick={toggleMobileMenu}>Add Task</NavLink></li>
            <li><NavLink to="/browse-tasks" onClick={toggleMobileMenu}>Browse Tasks</NavLink></li>
            <li><NavLink to="/my-posted-tasks" onClick={toggleMobileMenu}>My Posted Tasks</NavLink></li>

            {user ? (
              <>
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
                <li className="flex items-center space-x-3">
                  <img
                    src={user.photoURL || 'https://i.pravatar.cc/32'}
                    alt="User"
                    className="rounded-full w-8 h-8 object-cover"
                  />
                  <span>{user.displayName || user.email}</span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/register"
                    onClick={toggleMobileMenu}
                    className="px-3 py-1 text-white rounded bg-blue-600 hover:bg-blue-700"
                  >
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    onClick={toggleMobileMenu}
                    className="px-3 py-1 text-white rounded bg-blue-600 hover:bg-blue-700"
                  >
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
