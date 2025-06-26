import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router'; // ✅ Fixed import
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../../assets/loading.json';
import { Fade } from 'react-awesome-reveal';

const FeaturedTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Featured Task Details || Task Match';
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/featuredTasks.json');
        const data = await res.json();
        const foundTask = data.find(t => t.id === parseInt(id));
        setTask(foundTask || null);
      } catch (error) {
        console.error('Fetch error:', error);
        setTask(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <Player autoplay loop src={loadingAnimation} style={{ height: '200px', width: '200px' }} />
      </div>
    );
  }

  if (!task) {
    return <p className="text-center mt-10 text-red-500 text-lg">❌ Task not found.</p>;
  }

  return (
    <Fade>
      <div className="max-w-3xl mt-10 mb-12 mx-auto p-8 shadow-xl bg-white dark:bg-base-300 rounded-2xl border border-gray-100 dark:border-gray-700">
        <div className="text-center text-5xl mb-4">{task.symbolicLogo}</div>
        <h2 className="text-3xl font-bold text-center text-indigo-700 dark:text-indigo-400 mb-6">
          {task.title}
        </h2>

        {task.category && (
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            <strong>📂 Category:</strong> {task.category}
          </p>
        )}

        <p className="mb-4 whitespace-pre-line text-gray-800 dark:text-gray-200">
          <strong>📝 Description:</strong> {task.description}
        </p>

        {task.deadline && (
          <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">
            <strong>⏰ Deadline:</strong> {task.deadline}
          </p>
        )}

        {task.bid && (
          <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">
            <strong>💰 Bid:</strong> {task.bid}
          </p>
        )}

        {task.budget && !task.bid && (
          <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">
            <strong>💵 Budget:</strong> {task.budget}
          </p>
        )}

        {task.bidCount && (
          <p className="text-sm mb-2 text-green-600 dark:text-green-400">
            <strong>👥 Bidders:</strong> {task.bidCount} people have placed bids on this task
          </p>
        )}

        <Link to="/featured-tasks">
          <button className="btn mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 transition-transform">
            🔍 Browse More Featured Tasks
          </button>
        </Link>
      </div>
    </Fade>
  );
};

export default FeaturedTaskDetails;
