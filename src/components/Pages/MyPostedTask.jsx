import React, { useContext, useEffect, useState } from 'react';
import { FireBaseAuthContext } from '../../Provider/FireBaseAuthContext';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import LoadingSpinner from '../LoadingSpinner';

const MyPostedTasks = () => {
  const { user, loading } = useContext(FireBaseAuthContext);
  const [tasks, setTasks] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

  useEffect(() => {
    if (user?.email) {
      fetch('https://assignment-10-grapes-server.vercel.app/tasks')
        .then(res => res.json())
        .then(data => {
          const filtered = data.filter(task => task.email === user.email);
          setTasks(filtered);
          setDataLoading(false);
        })
        .catch(error => {
          console.error('Error fetching tasks:', error);
          toast.error('Failed to load tasks.');
          setDataLoading(false);
        });
    } else {
      setDataLoading(false);
    }
  }, [user?.email]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://assignment-10-grapes-server.vercel.app/tasks/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.deletedCount) {
        setTasks(prev => prev.filter(task => task._id !== id));
        toast.success('Task deleted successfully.');
      } else {
        toast.error('Failed to delete the task.');
      }
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setDeleteModal({ show: false, id: null });
    }
  };

  if (loading || dataLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <LoadingSpinner></LoadingSpinner>
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
    <div className="max-w-6xl mx-auto mt-15 min-h-screen px-4 py-8">
      <title>My Posted Tasks || Task Match</title>
      <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700 dark:text-blue-400">
        📝 My Posted Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">
          You haven't posted any tasks yet.
        </p>
      ) : (
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border  text-sm md:text-base">
            <thead>
              <tr className="bg-base-300 text-left ">
                <th className="p-3 border dark:border-gray-700">Title</th>
                <th className="p-3 border dark:border-gray-700">Status</th>
                <th className="p-3 border dark:border-gray-700">Deadline</th>
                <th className="p-3 border dark:border-gray-700">Bids Count</th>
                <th className="p-3 border dark:border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="text-center hover:bg-base-200 transition">
                  <td className="p-3 border dark:border-gray-700">{task.title}</td>
                  <td className="p-3 border dark:border-gray-700">{task.status}</td>
                  <td className="p-3 border dark:border-gray-700">{task.deadline}</td>
                  <td className="p-3 border dark:border-gray-700">
                    {task.bids?.length || 0} bids
                  </td>
                  <td className="p-3 border dark:border-gray-700 space-y-2">
                    <div className="flex flex-col md:flex-row gap-2 justify-center">
                      <Link to={`/update-task/${task._id}`}>
                        <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded w-full md:w-auto">
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => setDeleteModal({ show: true, id: task._id })}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded w-full md:w-auto"
                      >
                        Delete
                      </button>
                      <Link to={`/tasks/${task._id}`}>
                        <button className="px-3 py-1  bg-green-500 hover:bg-green-600 text-white rounded w-full md:w-auto">
                          View Bids
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Card Version */}
      <div className="md:hidden space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className=" border p-4 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold mb-1">{task.title}</h3>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Deadline:</strong> {task.deadline}</p>
            <p><strong>Bids:</strong> {task.bids?.length || 0}</p>

            <div className="flex flex-col gap-2 mt-4">
              <Link to={`/update-task/${task._id}`}>
                <button className="w-full px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded">
                  Update
                </button>
              </Link>
              <button
                onClick={() => setDeleteModal({ show: true, id: task._id })}
                className="w-full px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Delete
              </button>
              <Link to={`/tasks/${task._id}`}>
                <button className="w-full px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded">
                  View Bids
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-center space-y-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Confirm Delete</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => handleDelete(deleteModal.id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteModal({ show: false, id: null })}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPostedTasks;
