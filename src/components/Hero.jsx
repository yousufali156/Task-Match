import React from 'react';
import { useNavigate } from 'react-router';
import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto mt-5 flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-16">
      <title>Home || Task Match</title>
      {/* Left text section */}
      <div className="text-center md:text-left max-w-xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          Find Freelancers for <br />
          <Typewriter
            words={[" Your Small Tasks"]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={90}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </h1>
        <p className="text-base-content mb-8">
          <Typewriter
            words={["Connect with skilled freelancers to get your tasks done quickly and efficiently."]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={90}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </p>
        <button
          onClick={() => navigate('/browse-tasks')}
          className="bg-blue-600 mt-8 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow
          inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
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
