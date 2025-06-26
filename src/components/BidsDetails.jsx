import React, { useContext } from 'react';
import { useLoaderData, useNavigate, useParams, Link } from 'react-router';
import { FireBaseAuthContext } from '../Provider/FireBaseAuthContext';


const BidsDetails = () => {
  const bid = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(FireBaseAuthContext);
  const bidsCount = bid?.bids?.length || 0;

  const isOwner = user?.email === bid.email;

  const handleBid = () => {
    if (!user) {
      navigate('/login', { state: { from: `/tasks/${id}` } });
    } else {
      navigate(`/tasks/${id}/bid`);
    }
  };

  return (
    <div className="max-w-3xl text-center mb-10 mx-auto p-6 mt-10 shadow-lg rounded-lg border ">
      <h2 className="text-3xl font-bold text-indigo-600 mb-4">{bid.title}</h2>

      <p className="text-sm  mb-2"><strong>Category:</strong> {bid.category}</p>
      <p className="text-sm  mb-2"><strong>Deadline:</strong> {bid.deadline}</p>
      <p className="text-sm  mb-2"><strong>Status:</strong> {bid.status}</p>
      <p className="text-sm mb-2"><strong>Budget:</strong> ${bid.budget}</p>

      <p className=" text-sm mb-1"><strong>Description:</strong></p>
      <p className=" whitespace-pre-line">{bid.description}</p>

      <p className="text-sm mt-5 whitespace-pre-line mb-1"><strong>Posted By:</strong></p>
      <p className=" mb-2 whitespace-pre-line">
        <strong>Name:</strong> {bid.name} <br /> <strong>Email:</strong> {bid.email}
      </p>

      {/* ✅ Show Bids Count */}
      <p className="mt-4 text-green-700 font-medium">
        You bid for {bidsCount} {bidsCount === 1 ? 'opportunity' : 'opportunities'}.
      </p>

      <div className="mt-6 text-xs text-gray-400">
        <p>Created At: {bid.createdAt || 'N/A'}</p>
        <p>Last Updated: {bid.updatedAt || 'N/A'}</p>
      </div>

      {!isOwner && (
        <button
          onClick={handleBid}
          className="btn btn-success mt-4 w-full hover:bg-green-500 transition"
        >
          💼 Bid Now
        </button>
      )}

      <Link to="/browse-tasks">
        <button className="btn btn-primary hover:bg-indigo-700 mt-6 w-full">
          🔍 Browse Available Tasks
        </button>
      </Link>
    </div>
  );
};

export default BidsDetails;
