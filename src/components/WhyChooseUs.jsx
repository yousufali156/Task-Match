import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaTools, FaCheckCircle } from "react-icons/fa";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// "Why Choose Us" section
const FeatureList = () => {
  const points = [
    { id: "wc1", text: "Wide range of skilled freelancers", icon: <FaCheckCircle /> },
    { id: "wc2", text: "Simple and secure platform", icon: <FaCheckCircle /> },
    { id: "wc3", text: "Efficient task completion", icon: <FaCheckCircle /> },
  ];

  return (
    <div className="flex-1">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-blue-600">
        <FaRocket /> Why Choose Us
      </h2>
      <motion.ul
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {points.map((point) => (
          <motion.li
            key={point.id}
            className="flex items-start gap-3 p-2 rounded-lg transition-colors hover:bg-blue-50"
            variants={itemVariants}
          >
            <span className="text-blue-500 mt-1">{point.icon}</span>
            <span className="text-lg text-gray-700">{point.text}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

// "How It Works" section
const StepProcess = () => {
  const steps = [
    { id: "hw1", text: "Post a task with your requirements" },
    { id: "hw2", text: "Receive bids from freelancers" },
    { id: "hw3", text: "Choose a freelancer and get it done" },
  ];

  return (
    <div className="flex-1">
      <h2 className="text-3xl font-bold flex items-center mb-5 text-purple-600">
        <FaTools /> How It Works
      </h2>
      <motion.div
        className=""
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {steps.map((step, index) => (
          <motion.div key={step.id} className="flex items-start" variants={itemVariants}>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 text-purple-800 font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg z-10">
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                // Reduced gap from h-16 to h-10 for tighter spacing
                <div className="w-px bg-purple-200 h-10 -mt-1"></div>
              )}
            </div>
            <p className="text-lg text-gray-700 pt-1.5">{step.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// Main component
const WhyChooseUs = () => {
  return (
    <section className="bg-base-200 py-10 px-4 rounded-lg shadow-md container mx-auto mt-1 mb-1">
      <div className="container mx-auto py-10 px-4 md:px-12 lg:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row  justify-between gap-20">
          <FeatureList />
          <StepProcess />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
