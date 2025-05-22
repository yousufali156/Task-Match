import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../../assets/loading.json';
import { Fade } from 'react-awesome-reveal';
import { Tooltip } from 'react-tooltip';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidsCount, setBidsCount] = useState(0);

  useEffect(() => {
    // Simulate fetching task details and bids count
    fetch('/taskDetails.json')
      .then(res => res.json())
      .then(data => {
        const foundTask = data.find(item => item._id === id);
        setTask(foundTask);
        if (foundTask) {
          setBidsCount(foundTask.bidsCount || Math.floor(Math.random() * 10));
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch task:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <title>Task Details || Task Match</title>
        <Player
          autoplay
          loop
          src={loadingAnimation}
          style={{ height: '200px', width: '200px' }}
        />
      </div>
    );
  }

  if (!task) return <p className="text-center mt-10 text-red-500">Task not found.</p>;

  return (
    <Fade>
      <div className="max-w-3xl mt-10 mx-auto bg-white p-6 shadow rounded-lg">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">{task.title}</h2>
        <p className="text-gray-600 mb-2"><strong>Category:</strong> {task.category}</p>
        <p className="text-gray-800 mb-4 whitespace-pre-line"><strong>Description:</strong> {task.description}</p>
        <p className="text-sm text-gray-500 mb-2"><strong>Deadline:</strong> {task.deadline}</p>
        <p className="text-sm text-gray-500 mb-2"><strong>Budget:</strong> ${task.budget}</p>
        <p className="text-sm text-gray-400 mb-2"><strong>Posted by:</strong> {task.name} ({task.email})</p>

        <p className="mt-4 text-green-700 font-medium">You bid for {bidsCount} opportunities.</p>

        <br />
        <Link to={'/browse-tasks'}>
          <button className='btn btn-outline btn-primary w-full'>Browse Available Tasks</button>
        </Link>

        <Tooltip id="taskTooltip" />
      </div>
    </Fade>
  );
};

export default TaskDetails;
