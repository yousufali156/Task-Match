import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
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
      <div className="flex justify-center mt-20">
        <Player autoplay loop src={loadingAnimation} style={{ height: '200px', width: '200px' }} />
      </div>
    );
  }

  if (!task) return <p className="text-center mt-10 text-red-500">Task not found.</p>;

  const isOwner = user?.email === task.email;

  return (
    <Fade>
      <div className="max-w-3xl mt-10 mb-10 mx-auto p-6 shadow-lg bg-base-300 rounded-lg">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">{task.title}</h2>
        <p className="mb-2"><strong>Category:</strong> {task.category}</p>
        <p className="mb-4 whitespace-pre-line"><strong>Description:</strong> {task.description}</p>
        <p className="text-sm mb-2"><strong>Deadline:</strong> {task.deadline}</p>
        <p className="text-sm mb-2"><strong>Budget:</strong> ${task.budget}</p>
        <p className="text-sm mb-2"><strong>Posted by:</strong> {task.name} ({task.email})</p>
        <p className="mt-4 text-green-700 font-medium">You bid for {bidsCount} opportunities.</p>

        {!isOwner && (
          <button
            onClick={handleBid}
            className="btn btn-success mt-4 w-full hover:scale-105 transition"
          >
            💼 Bid Now
          </button>
        )}

        <Link to="/browse-tasks">
          <button className="btn btn-outline btn-primary mt-6 w-full">
            🔍 Browse Available Tasks
          </button>
        </Link>
      </div>
    </Fade>
  );
};

export default TaskDetails;
