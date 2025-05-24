
import React, { useEffect, useState } from 'react';

const FeaturedTask = () => {
  const [tasks, setTasks] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('/featuredTasks.json'); 
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };
    fetchTasks();
  }, []);

  const visibleTasks = showAll ? tasks : tasks.slice(0, 6);

  return (
    <div className="container mx-auto py-12 px-4 md:px-12 lg:px-20">
      <h2 className="text-2xl font-bold mb-8">Featured Tasks</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleTasks.map((task) => (
          <div
            key={task.id}
            className="bg-base-300 p-6 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              {task.title}
            </h3>

            {task.category && (
              <p className="text-sm text-gray-600 mb-1">Category: {task.category}</p>
            )}

            {task.deadline && (
              <p className="text-sm text-gray-600 mb-1">Deadline: {task.deadline}</p>
            )}

            {task.bid && (
              <p className="text-sm text-gray-600">Bid: {task.bid}</p>
            )}

            {task.budget && (
              <p className="text-sm text-gray-600">Budget: {task.budget}</p>
            )}
          </div>
        ))}
      </div>

      {tasks.length > 6 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn btn-outline btn-primary"
          >
            {showAll ? 'Show Less' : 'Show All'}
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedTask;
