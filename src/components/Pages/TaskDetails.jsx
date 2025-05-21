import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/taskDetails.json')
      .then(res => res.json())
      .then(data => {
        const foundTask = data.find(item => item._id === id);
        setTask(foundTask);
        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to fetch task:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading task...</p>;
  if (!task) return <p className="text-center mt-10 text-red-500">Task not found.</p>;

  return (
    <div className="max-w-3xl mt-10 mb-15 mx-auto mt-10 bg-white p-6 shadow rounded-lg">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4">{task.title}</h2>
      <p className="text-gray-600 mb-2"><strong>Category:</strong> {task.category}</p>
      <p className="text-gray-800 mb-4 whitespace-pre-line"><strong>Description:</strong> {task.description}</p>
      <p className="text-sm text-gray-500 mb-2"><strong>Deadline:</strong> {task.deadline}</p>
      <p className="text-sm text-gray-500 mb-2"><strong>Budget:</strong> ${task.budget}</p>
      <p className="text-sm text-gray-400"><strong>Posted by:</strong> {task.name} ({task.email})</p>

      <br /> <br />
      <Link to={'/browse-tasks'}><button className='btn btn-outline btn-primary w-full'>Browse Available Tasks</button></Link>
    </div>
    
  );
};

export default TaskDetails;
