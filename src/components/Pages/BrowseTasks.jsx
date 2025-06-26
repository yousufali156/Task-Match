import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

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
      <p className="text-center mt-10 text-gray-600 dark:text-gray-300">
        Loading tasks...
      </p>
    );

  return (
    <section className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <title>Browse Tasks || Task Match</title>
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700 dark:text-blue-400">
          Browse Available Tasks
        </h2>

        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No tasks available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {tasks.map(task => (
              <div
                key={task._id}
                className="bg-base-300 rounded-xl shadow p-5 hover:shadow-lg transition duration-300 flex flex-col justify-between h-[300px]"
              >
                <div className="flex-grow flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                    {task.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {task.description}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <strong>Deadline:</strong> {task.deadline}
                  </p>

                  <p className="text-indigo-500 dark:text-indigo-300 font-medium">
                    <strong>Budget:</strong> ${task.budget}
                  </p>
                </div>

                <div className="pt-3">
                  <Link to={`/tasks/${task._id}`}>
                    <button className="btn btn-outline btn-primary w-full">
                      🔍 See Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BrowseTasks;
