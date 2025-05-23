import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const techMatchNeeds = [
  {
    category: 'POST TASK',
    title: 'Create Task',
    description: 'Easily post a task with details like budget and deadline.',
    icon: (
      <img
        src="https://i.ibb.co/9kw4kmjd/1-Create-Task.jpg"
        alt="Create Task"
        className="w-65 h-35 rounded-full border-4 border-blue-500 p-1 bg-white"
      />
    ),
  },
  {
    category: 'FIND TALENT',
    title: 'Browse Freelancers',
    description: 'Explore skilled freelancers by category and experience.',
    icon: (
      <img
        src="https://i.ibb.co/tpLzvFnq/2-FIND-TALENT.png"
        alt="Browse Freelancers"
        className="w-65 h-35 rounded-full border-4 border-blue-500 p-1 bg-white"
      />
    ),
  },
  {
    category: 'BID SYSTEM',
    title: 'Place Bids',
    description: 'Freelancers can bid on tasks with custom offers.',
    icon: (
      <img
        src="https://i.ibb.co/5XtmrxhK/3-Place-Bids.jpg"
        alt="Place Bids"
        className="w-65 h-35 rounded-full border-4 border-blue-500 p-1 bg-white"
      />
    ),
  },
  {
    category: 'DEADLINE TRACKING',
    title: 'Time Management',
    description: 'Manage deadlines efficiently for every task.',
    icon: (
      <img
        src="https://i.ibb.co/LD6Ng3Gk/4-Time-Management.jpg"
        alt="Time Management"
        className="w-65 h-35 rounded-full border-4 border-blue-500 p-1 bg-white"
      />
    ),
  },
];


const ProjectNeeds = () => {
  return (
    <section className="bg-base-200 py-12 px-6 rounded-lg shadow-md container mx-auto mt-5 mb-5">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold  flex items-center justify-center gap-2">
          <span className="text-blue-500 text-3xl">💻</span> Project Needs
          <Typewriter
                words={["Create Task", "Find Talent", "Bid System", "Time Management"]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={90}
                deleteSpeed={50}
                delaySpeed={2000}
              />
        </h2>     
        <p className=" mt-2 max-w-lg mx-auto">
          <Typewriter
                words={["These are the essential tools every user relies on to post tasks, find freelancers, and complete work efficiently on"]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={90}
                deleteSpeed={50}
                delaySpeed={2000}
              />
           <strong>Tech Match</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {techMatchNeeds.map((item, index) => (
          <div key={index} className=" border border-orange-100 rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition">
            <div className="flex justify-center mb-4">{item.icon}</div>
            <p className="text-xs text-blue-600 font-bold mb-1 uppercase">{item.category}</p>
            <h4 className="text-lg font-semibold  mb-1">{item.title}</h4>
            <p className="text-sm text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectNeeds;
