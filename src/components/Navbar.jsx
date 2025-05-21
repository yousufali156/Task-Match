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
      });
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
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/add-task">Add Task</NavLink></li>
        <li><NavLink to="/browse-tasks">Browse Tasks</NavLink></li>
        <li><NavLink to="/my-posted-tasks">My Posted Tasks</NavLink></li>

        {user ? (
          <>
            <li>
              <button
                onClick={handleLogOutUser}
                className="px-2 py-1 text-white rounded bg-blue-600 hover:bg-blue-700"
              >
                Logout
              </button>
            </li>
            <li>
              <img
                src="https://i.pravatar.cc/32"
                alt="profile"
                className="rounded-full w-8 h-8 object-cover"
              />
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/signup"
                className="px-2 py-1 text-white rounded bg-blue-600 hover:bg-blue-700"
              >
                SignUp
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className="px-2 py-1 text-white rounded bg-blue-600 hover:bg-blue-700"
              >
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 md:hidden z-10">
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
                    className="px-2 py-1 text-white rounded bg-blue-600 hover:bg-blue-700"
                  >
                    Logout
                  </button>
                </li>
                <li>
                  <img
                    src="https://i.pravatar.cc/32"
                    alt="profile"
                    className="rounded-full w-8 h-8 object-cover"
                  />
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/signup"
                    onClick={toggleMobileMenu}
                    className="px-2 py-1 text-white rounded bg-blue-600 hover:bg-blue-700"
                  >
                    SignUp
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    onClick={toggleMobileMenu}
                    className="px-2 py-1 text-white rounded bg-blue-600 hover:bg-blue-700"
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
