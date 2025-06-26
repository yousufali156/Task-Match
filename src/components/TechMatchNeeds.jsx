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
        className="w-64 h-44 object-cover rounded-2xl border-4 border-blue-500 p-1 bg-white shadow-xl transition-transform duration-300 hover:scale-105"
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
        className="w-64 h-44 object-cover rounded-2xl border-4 border-blue-500 p-1 bg-white shadow-xl transition-transform duration-300 hover:scale-105"
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
        className="w-64 h-44 object-cover rounded-2xl border-4 border-blue-500 p-1 bg-white shadow-xl transition-transform duration-300 hover:scale-105"
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
        className="w-64 h-44 object-cover rounded-2xl border-4 border-blue-500 p-1 bg-white shadow-xl transition-transform duration-300 hover:scale-105"
      />
    ),
  },
];

const ProjectNeeds = () => {
  return (
    <section className="bg-base-200 py-12 px-6 rounded-lg shadow-md container mx-auto mt-5 mb-5">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          <span className="text-blue-500 text-3xl">💻</span> Project Needs{' '}
          <span className="text-indigo-500">
            <Typewriter
              words={['Create Task', 'Find Talent', 'Bid System', 'Time Management']}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={90}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </h2>
        <p className="mt-2 max-w-lg mx-auto text-sm md:text-base">
          <Typewriter
            words={[
              'These are the essential tools every user relies on to post tasks, find freelancers, and complete work efficiently on',
            ]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={90}
            deleteSpeed={50}
            delaySpeed={2000}
          />
          <strong className="text-blue-600"> Tech Match</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {techMatchNeeds.map((item, index) => (
          <div
            key={index}
            className="border border-orange-100 rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <p className="text-xs text-blue-600 font-bold mb-1 uppercase">
              {item.category}
            </p>
            <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
            <p className="text-sm">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectNeeds;
