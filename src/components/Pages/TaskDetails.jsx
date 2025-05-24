import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../../assets/loading.json';
import { Fade } from 'react-awesome-reveal';
import Swal from 'sweetalert2';
import { FireBaseAuthContext } from '../../Provider/FireBaseAuthContext';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bidsCount, setBidsCount] = useState(0);
  const { user } = useContext(FireBaseAuthContext);
  const navigate = useNavigate();

  // Set page title
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

        // Optional: Fetch bids count if stored separately
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

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This task will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`https://assignment-10-grapes-server.vercel.app/tasks/${id}`, {
          method: 'DELETE'
        });
        if (!res.ok) throw new Error('Delete failed');
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
        navigate('/browse-tasks');
      } catch (err) {
        console.error('Delete failed:', err);
        Swal.fire('Error', 'Could not delete task', 'error');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
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
      <div className="max-w-3xl mt-10 mb-10 mx-auto p-6 shadow-lg bg-white rounded-lg">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">{task.title}</h2>
        <p className="mb-2"><strong>Category:</strong> {task.category}</p>
        <p className="mb-4 whitespace-pre-line"><strong>Description:</strong> {task.description}</p>
        <p className="text-sm mb-2"><strong>Deadline:</strong> {task.deadline}</p>
        <p className="text-sm mb-2"><strong>Budget:</strong> ${task.budget}</p>
        <p className="text-sm mb-2"><strong>Posted by:</strong> {task.name} ({task.email})</p>
        <p className="mt-4 text-green-700 font-medium">You bid for {bidsCount} opportunities.</p>

        {/* Action Buttons */}
        {user?.email === task.email && (
          <div className="mt-6 flex gap-4 flex-wrap">
            <Link to={`/update-task/${task._id}`}>
              <button className="btn btn-warning">✏️ Update</button>
            </Link>
            <button onClick={handleDelete} className="btn btn-error">❌ Delete</button>
          </div>
        )}

        <Link to="/browse-tasks">
          <button className="btn btn-outline btn-primary mt-6 w-full">🔍 Browse Available Tasks</button>
        </Link>
      </div>
    </Fade>
  );
};

export default TaskDetails;
