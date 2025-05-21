import React from 'react';
import { Link } from 'react-router';

const Error404 = () => {
    return (
        <div className="min-h-screen bg-indigo-50 flex flex-col items-center justify-center text-center px-4">
            <title>Error 404 || Grapes Market</title>

            {/* Image wrapped in Link */}
            <Link to="/">
                <img
                    src="https://i.ibb.co/G4829FF4/404-page.png"
                    alt="404 Error page"
                    className="rounded-xl object-cover w-100 h-auto mb-6 cursor-pointer transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl"
                />
            </Link>

            <h1 className="text-5xl font-bold text-indigo-700 mb-4 transition duration-300 ease-in-out hover:text-indigo-500 group">
                <span className="inline-block transition-transform duration-300 ease-in-out group-hover:rotate-12 group-hover:scale-110">
                    🐛
                </span>{' '}
                404
            </h1>

            <p className="text-xl text-gray-700 mb-2">Page Not Found</p>
            <p className="text-gray-500 mb-6">
                Sorry, the page you are looking for doesn't exist or has been moved.
            </p>

            <Link to="/">
                <button className="btn btn-primary transition duration-300 ease-in-out transform hover:scale-105 hover:bg-indigo-600 active:scale-95 active:opacity-90">
                    Go to Home
                </button>
            </Link>
        </div>
    );
};

export default Error404;
