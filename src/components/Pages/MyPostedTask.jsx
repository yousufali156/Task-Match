import React, { useContext, useEffect, useState } from 'react';
import { FireBaseAuthContext } from '../../Provider/FireBaseAuthContext';
import { Link } from 'react-router';
import { toast } from 'react-toastify';

const MyPostedTasks = () => {
  const { user, loading } = useContext(FireBaseAuthContext);
  const [tasks, setTasks] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch('https://assignment-10-grapes-server.vercel.app/tasks')
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter(task => task.email === user.email);
          setTasks(filtered);
          setDataLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
          toast.error('Failed to load tasks.');
          setDataLoading(false);
        });
    } else {
      setDataLoading(false);
    }
  }, [user?.email]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      fetch(`https://assignment-10-grapes-server.vercel.app/tasks/${id}`, { method: "DELETE" })
        .then(res => res.json())
        .then(data => {
          if (data.deletedCount) {
            setTasks(prev => prev.filter(task => task._id !== id));
            toast.success('Task deleted successfully.');
          }
        });
    }
  };

  if (loading || dataLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-md text-blue-500"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <p className="text-center font-semibold mt-10 mb-10 text-red-600">
        Please log in to view your posted tasks.
      </p>
    );
  }

  return (
    <div className="max-w-5xl min-h-screen mx-auto px-4 py-6">
      <title>My Posted Tasks || Task Match</title>
      <h2 className="text-2xl font-bold mb-4">📝 My Posted Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-700">You haven’t posted any tasks yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-base-300">
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Deadline</th>
                <th className="p-2 border">Bids Count</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="text-center">
                  <td className="p-2 border">{task.title}</td>
                  <td className="p-2 border">{task.status}</td>
                  <td className="p-2 border">{task.deadline}</td>
                  <td className="p-2 border">You bid for {task.bids?.length || 0} opportunities.</td>
                  <td className="p-2 border space-x-2">
                    <Link to={`/update-task/${task._id}`}>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded">Update</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                    <Link to={`/tasks/${task._id}`}>
                      <button className="px-3 py-1 bg-green-500 text-white rounded">View Bids</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyPostedTasks;
