import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import ThemeToggle from '../ThemeToggle';
import { FireBaseAuthContext } from '../../Provider/FireBaseAuthContext';

const Dashboard = () => {
  const { user } = useContext(FireBaseAuthContext);
  const [stats, setStats] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (user?.email) {
      fetch(`https://assignment-10-grapes-server.vercel.app/dashboard-stats?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setStats({
            added: data.addedByUser || 0,
            browseable: data.browseable || 0,
            posted: data.postedByUser || 0,
            featured: 40, // fixed
          });
        })
        .catch((err) => {
          console.error('Failed to load stats:', err);
          setStats({ added: 0, browseable: 0, posted: 0, featured: 40 });
        });
    }
  }, [user]);

  return (
    <div className="min-h-screen md:flex">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-base-200 p-4 shadow-md space-y-4" aria-label="Dashboard Sidebar">
        <div className="text-center mb-6">
          <img
            src={user?.photoURL || 'https://i.pravatar.cc/100'}
            className="w-16 h-16 rounded-full mx-auto"
            alt={user?.displayName ? `${user.displayName}'s avatar` : 'User avatar'}
          />
          <h2 className="text-lg font-semibold mt-2">{user?.displayName || 'User'}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <nav className="space-y-2" aria-label="Dashboard Navigation">
          <NavLink to="/" className="btn btn-sm w-full">Home</NavLink>
          <NavLink to="/add-task" className="btn btn-sm w-full">Add Task</NavLink>
          <NavLink to="/browse-tasks" className="btn btn-sm w-full">Browse Tasks</NavLink>
          <NavLink to="/my-posted-tasks" className="btn btn-sm w-full">My Posted Tasks</NavLink>
          <NavLink to="/featured-tasks" className="btn btn-sm w-full">Featured Tasks</NavLink>
          <NavLink to="/dashboard" end className="btn btn-sm w-full">Dashboard</NavLink>
          <NavLink to="/about" className="btn btn-sm w-full">About</NavLink>
          <NavLink to="/login" className="btn btn-sm w-full">Login</NavLink>
          <NavLink to="/register" className="btn btn-sm w-full">Register</NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 relative">
        {/* Top Right Header */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="flex items-center space-x-2">
              <img
                src={user?.photoURL || 'https://i.pravatar.cc/32'}
                className="w-8 h-8 rounded-full"
                alt={user?.displayName ? `${user.displayName}'s avatar` : 'User avatar'}
              />
              <span className="font-semibold text-sm hidden sm:block">{user?.displayName}</span>
            </div>
          </div>
        </div>

        {location.pathname === '/dashboard' ? (
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
