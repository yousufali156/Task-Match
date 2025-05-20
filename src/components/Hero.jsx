import React from 'react';
import { useNavigate } from 'react-router';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto mt-5 flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-white">
      {/* Left text section */}
      <div className="text-center md:text-left max-w-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Find Freelancers for <br /> Your Small Tasks
        </h1>
        <p className="text-gray-600 mb-6">
          Connect with skilled freelancers to get your tasks done quickly and efficiently.
        </p>
        <button
          onClick={() => navigate('/get-started')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow"
        >
          Get Started
        </button>
      </div>

      {/* Right image section */}
      <div className="mb-10 md:mb-0">
        <img
          src="/man working on computer.jpg" 
          alt="Man working on laptop"
          className="w-full max-w-sm md:max-w-md"
        />
      </div>
    </div>
  );
};

export default Hero;
