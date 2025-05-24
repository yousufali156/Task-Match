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

  if (loading) return <p className="text-center mt-10">Loading tasks...</p>;
 
  return (
    <section className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <title>Browse Tasks || Task Match</title>
        <h2 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
          Browse Available Tasks
        </h2>

        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available right now.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map(task => (
              <div key={task._id} className="bg-base-300 rounded-xl shadow p-5 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-indigo-600">{task.title}</h3>
                <p className="text-sm text-gray-600 mb-1">Category: {task.category}</p>
                <p className="text-gray-700 mb-3 line-clamp-2">{task.description}</p>
                <p className="text-gray-500 text-sm mb-1">Deadline: {task.deadline}</p>
                <p className="text-indigo-500 font-medium mb-4">Budget: ${task.budget}</p>

                <Link to={`/tasks/${task._id}`}>
                  <button className="btn btn-outline btn-primary w-full">
                    See Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BrowseTasks;
