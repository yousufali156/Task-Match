import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import ThemeToggle from '../ThemeToggle';
import { FireBaseAuthContext } from '../../Provider/FireBaseAuthContext';
import MyProfile from '../Pages/MyProfile';

const Dashboard = () => {
  const { user, logOutUser } = useContext(FireBaseAuthContext);
  const [stats, setStats] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(`https://assignment-10-grapes-server.vercel.app/dashboard-stats?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setStats({
            added: data.addedByUser || 0,
            browseable: data.browseable || 0,
            posted: data.postedByUser || 0,
            featured: 40,
          });
        })
        .catch((err) => {
          console.error('Failed to load stats:', err);
          setStats({ added: 0, browseable: 0, posted: 0, featured: 40 });
        });
    }
  }, [user]);

  const handleLogout = () => {
    logOutUser()
      .then(() => navigate('/login'))
      .catch((err) => console.error('Logout error:', err));
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="min-h-screen md:flex">
      {/* Sidebar for md+ screens */}
      <aside className="hidden md:block w-64 bg-base-200 p-4 shadow-md space-y-4" aria-label="Dashboard Sidebar">
        <div className="text-center mb-6">
          <img
            src={user?.photoURL || 'https://i.pravatar.cc/100'}
            className="w-16 h-16 rounded-full mx-auto"
            alt={user?.displayName ? `${user.displayName}'s avatar` : 'User avatar'}
          />
          <h2 className="text-lg font-semibold mt-2">{user?.displayName || 'User'}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        <nav className="space-y-2 pt-4" aria-label="Dashboard Navigation">
          <NavLink to="/" className="btn btn-sm w-full">Home</NavLink>
          <NavLink to="/add-task" className="btn btn-sm w-full">Add Task</NavLink>
          <NavLink to="/browse-tasks" className="btn btn-sm w-full">Browse Tasks</NavLink>
          <NavLink to="/my-posted-tasks" className="btn btn-sm w-full">My Posted Tasks</NavLink>
          <NavLink to="/featured-tasks" className="btn btn-sm w-full">Featured Tasks</NavLink>
          <NavLink to="/about" className="btn btn-sm w-full">About</NavLink>
        </nav>

        {user && (
          <div className="pt-4 space-y-2">
            <button
              onClick={() => setShowProfile(true)}
              className="btn btn-sm w-full bg-blue-500 text-white hover:bg-blue-600"
            >
              My Profile
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-sm w-full bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center bg-base-200 p-3 shadow-md">
        {/* Hamburger menu */}
        <button
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          className="p-2 rounded-md hover:bg-gray-300 focus:outline-none"
        >
          {/* Hamburger icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Right side: ThemeToggle + My Profile */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <button
            onClick={() => setShowProfile(true)}
            className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
          >
            My Profile
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-base-200 p-4 space-y-3 shadow-md">
          <NavLink onClick={() => setMobileMenuOpen(false)} to="/" className="btn btn-sm w-full">Home</NavLink>
          <NavLink onClick={() => setMobileMenuOpen(false)} to="/add-task" className="btn btn-sm w-full">Add Task</NavLink>
          <NavLink onClick={() => setMobileMenuOpen(false)} to="/browse-tasks" className="btn btn-sm w-full">Browse Tasks</NavLink>
          <NavLink onClick={() => setMobileMenuOpen(false)} to="/my-posted-tasks" className="btn btn-sm w-full">My Posted Tasks</NavLink>
          <NavLink onClick={() => setMobileMenuOpen(false)} to="/featured-tasks" className="btn btn-sm w-full">Featured Tasks</NavLink>
          <NavLink onClick={() => setMobileMenuOpen(false)} to="/about" className="btn btn-sm w-full">About</NavLink>

          {user && (
            <>
              <button
                onClick={() => {
                  setShowProfile(true);
                  setMobileMenuOpen(false);
                }}
                className="btn btn-sm w-full bg-blue-500 text-white hover:bg-blue-600"
              >
                My Profile
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="btn btn-sm w-full bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 relative">

        <div className="flex justify-between items-center mb-6">
          {/* Left side: could be empty or other stuff */}
          <div></div>

          {/* Right side */}
          <div className="hidden md:flex space-x-3 items-center">
            <ThemeToggle />
            <button
              onClick={() => setShowProfile(true)}
              className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
            >
              My Profile
            </button>
          </div>
        </div>


        {showProfile ? (
          <MyProfile onClose={() => setShowProfile(false)} />
        ) : location.pathname === '/dashboard' ? (
          stats ? (
            <div>
              <h1 className="text-4xl text-center mb-10 mt-10 font-bold text-blue-400">Welcome Back!</h1>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
                <StatCard title="Total Add Task" value={stats.added} bg="bg-purple-600" />
                <StatCard title="Total Browse Tasks" value={stats.browseable} bg="bg-blue-500" />
                <StatCard title="My Posted Tasks" value={stats.posted} bg="bg-pink-500" />
                <StatCard title="Featured Tasks" value={stats.featured} bg="bg-red-500" />
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 text-xl mt-20">Loading stats...</div>
          )
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

const StatCard = ({ title, value, bg }) => (
  <div className={`${bg} text-white p-6 rounded-xl shadow-md`}>
    <h3 className="text-lg">{title}</h3>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default Dashboard;
