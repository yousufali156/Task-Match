import React from 'react';
import { useLoaderData } from 'react-router';

const BidsDetails = () => {
    const bid = useLoaderData();
    const bidsCount = bid?.bids?.length || 0;

    return (
        <div className="max-w-3xl text-center mb-10 mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">{bid.title}</h2>

            <p className="text-sm text-gray-500 mb-2">
                <strong>Category:</strong> {bid.category}
            </p>

            <p className="text-sm text-gray-500 mb-2">
                <strong>Deadline:</strong> {bid.deadline}
            </p>

            <p className="text-sm text-gray-500 mb-2">
                <strong>Status:</strong> {bid.status}
            </p>

            <p className="text-sm text-gray-500 mb-2">
                <strong>Budget:</strong> ${bid.budget}
            </p>

            <p className="text-gray-700 text-sm mb-1"><strong>Description:</strong></p>
            <p className="text-gray-700 whitespace-pre-line">{bid.description}</p>

            <p className="text-sm mt-5 whitespace-pre-line mb-1"><strong>Posted By:</strong></p>
            <p className="text-gray-700 mb-2 whitespace-pre-line"><strong>Name:</strong> {bid.name} <br /> <strong>Email:</strong> {bid.email}</p>


            {/* ✅ Show Bids Count */}
            <p className="mt-4 text-green-700 font-medium">
                You bid for {bidsCount} {bidsCount === 1 ? 'opportunity' : 'opportunities'}.
            </p>

            <div className="mt-6 text-xs text-gray-400">
                <p>Created At: {bid.createdAt || 'N/A'}</p>
                <p>Last Updated: {bid.updatedAt || 'N/A'}</p>
            </div>
        </div>
    );
};

export default BidsDetails;
