import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router'; // ✅ Corrected import
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../../assets/loading.json';
import { Fade } from 'react-awesome-reveal';
import { FireBaseAuthContext } from '../../Provider/FireBaseAuthContext';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidsCount, setBidsCount] = useState(0);
  const { user } = useContext(FireBaseAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Task Details || Task Match';
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://assignment-10-grapes-server.vercel.app/tasks/${id}`);
        if (!res.ok) throw new Error('Task not found');
        const data = await res.json();
        setTask(data);

        const bidsRes = await fetch(`https://assignment-10-grapes-server.vercel.app/tasks/${id}/bids`);
        const bids = await bidsRes.json();
        setBidsCount(bids.length || 0);
      } catch (error) {
        console.error('Fetch error:', error);
        setTask(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleBid = () => {
    if (!user) {
      navigate('/login', { state: { from: `/tasks/${id}` } });
    } else {
      navigate(`/tasks/${id}/bid`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Player autoplay loop src={loadingAnimation} style={{ height: '200px', width: '200px' }} />
      </div>
    );
  }

  if (!task) {
    return (
      <p className="text-center mt-10 text-red-500 text-lg dark:text-red-400">❌ Task not found.</p>
    );
  }

  const isOwner = user?.email === task.email;

  return (
    <Fade>
      <div className="max-w-4xl mt-10 mb-12 mx-auto p-8 shadow-xl bg-white dark:bg-base-300 rounded-2xl border border-gray-100 dark:border-gray-700">
        <h2 className="text-3xl font-extrabold mb-6 text-center">
          {task.title}
        </h2>

        <div className="space-y-3 text-base">
          <p><strong>📂 Category:</strong> {task.category}</p>
          <p><strong>📝 Description:</strong> {task.description}</p>
          <p><strong>⏰ Deadline:</strong> {task.deadline}</p>
          <p><strong>💵 Budget:</strong> ${task.budget}</p>
          <p><strong>👤 Posted by:</strong> {task.name} ({task.email})</p>
          <p className="text-green-600 dark:text-green-400 font-medium">
            ✅ {bidsCount} Bids Submitted
          </p>
        </div>


        {!isOwner && (
          <button
            onClick={handleBid}
            className="mt-6 w-full py-2 px-4 font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-105 transition"
          >
            💼 Bid Now
          </button>
        )}

        <Link to="/browse-tasks">
          <button className="btn btn-outline btn-primary mt-6 w-full">
            🔍 Browse More Tasks
          </button>
        </Link>
      </div>
    </Fade >
  );
};

export default TaskDetails;
