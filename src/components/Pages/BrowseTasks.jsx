import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import LoadingSpinner from '../LoadingSpinner';

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://assignment-10-grapes-server.vercel.app/tasks')
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch task data:', err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <LoadingSpinner></LoadingSpinner>
    );

  return (
    <div className="container mx-auto py-12 px-4 md:px-12 lg:px-20">
      <h2 className="text-3xl font-extrabold mb-10 text-center text-blue-700 dark:text-blue-400">
        🛠️ Browse Available Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No tasks available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {tasks.map(task => (
            <div
              key={task._id}
              className="bg-white dark:bg-base-300 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              {task.symbolicLogo && (
                <div className="text-5xl mb-4 flex justify-center">
                  {task.symbolicLogo}
                </div>
              )}

              <h3 className="text-xl font-bold text-center text-blue-700 dark:text-blue-400 mb-3">
                {task.title}
              </h3>

              {task.deadline && (
                <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-1">
                  📅 <strong>Deadline:</strong> {task.deadline}
                </p>
              )}

              <p className="text-sm text-center text-gray-700 dark:text-gray-300 line-clamp-2">
                {task.description}
              </p>

              <p className="text-sm text-center text-indigo-600 dark:text-indigo-300 mt-2">
                💵 <strong>Budget:</strong> ${task.budget}
              </p>

              <Link to={`/tasks/${task._id}`}>
                <button className="btn mt-5 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 transition-transform">
                  🔍 See Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseTasks;
