import React, { useContext } from 'react';
import { FireBaseAuthContext } from '../../Provider/FireBaseAuthContext';
import {
  FaBolt,
  FaMobileAlt,
  FaLock,
  FaThumbsUp,
  FaGlobe,
  FaUsers,
  FaHeart
} from 'react-icons/fa';
import { GiTakeMyMoney } from 'react-icons/gi';
import { Fade } from 'react-awesome-reveal';

const About = () => {
  const companyName = "Task Match";
  const { user } = useContext(FireBaseAuthContext);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <title>About || Task Match</title>
      <div className="max-w-6xl mx-auto">

        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            About {companyName}
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            A platform where everyday people can find freelancers for small tasks, and freelancers can find jobs tailored to their skills.
          </p>
        </header>

        {!user ? (
          <p className="text-center font-semibold text-red-600 mb-8">
            Please log in to see this.
          </p>
        ) : null}

        <Fade cascade damping={0.1}>
          <section className="mb-16 p-6 md:p-8 bg-white rounded-xl shadow-2xl hover:shadow-indigo-300 transition-shadow duration-300">
            <div className="flex flex-col md:flex-row items-center">
              <GiTakeMyMoney className="text-5xl md:text-6xl text-blue-600 mb-4 md:mb-0 md:mr-6" />
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  Our mission is to connect people in need of simple freelance tasks with talented individuals looking for flexible job opportunities.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8 md:mb-12">Why Choose {companyName}?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                <FaBolt className="text-4xl text-yellow-500 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Diverse Categories</h3>
                <p className="text-gray-600 text-sm text-center">
                  From design to tech, marketing to writing – post or bid on a wide range of freelance jobs.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                <FaLock className="text-4xl text-blue-500 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Secure Platform</h3>
                <p className="text-gray-600 text-sm text-center">
                  Safety is our priority. Your data and payments are protected with top-grade security.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                <FaMobileAlt className="text-4xl text-green-500 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Accessible Anywhere</h3>
                <p className="text-gray-600 text-sm text-center">
                  Our mobile-friendly interface helps you stay connected, post jobs or work from any device.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16 p-6 md:p-8 bg-blue-600 text-white rounded-xl shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 md:mb-12">Our Core Values</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex items-start">
                <FaThumbsUp className="text-3xl text-yellow-300 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-semibold mb-1">Trust & Reliability</h4>
                  <p className="text-blue-100 text-sm">We help you build connections based on reputation, reviews, and results.</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaHeart className="text-3xl text-pink-300 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-semibold mb-1">People-First</h4>
                  <p className="text-blue-100 text-sm">Our users are at the heart of every feature we build.</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaGlobe className="text-3xl text-green-300 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-semibold mb-1">Global Access</h4>
                  <p className="text-blue-100 text-sm">Connect and collaborate with freelancers and clients globally.</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaUsers className="text-3xl text-indigo-200 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-semibold mb-1">Community Driven</h4>
                  <p className="text-blue-100 text-sm">We grow together through shared opportunities, events, and tools.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid md:grid-cols-3 gap-8 mb-16">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Categories</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li><strong>Web Development & Tech:</strong> Build or maintain websites, apps, and software systems.</li>
                <li><strong>Graphics & Design:</strong> From logos to UI/UX, find creative design talent.</li>
                <li><strong>Digital Marketing:</strong> Boost your brand with SEO, social media, and PPC experts.</li>
                <li><strong>Writing & Translation:</strong> Get help with content writing, blogs, or multilingual translation.</li>
                <li><strong>Video & Animation:</strong> Engage audiences with video editing, animation, and motion graphics.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">For Clients</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li><strong>How It Works:</strong> Learn how to post tasks, hire freelancers, or find work opportunities. Our step-by-step guide makes it easy for anyone to get started.</li>
                <li><strong>Success Stories:</strong> Discover inspiring stories from users who turned simple tasks into lasting careers. Real results, real people, real growth.</li>
                <li><strong>Trust & Safety:</strong> We prioritize your security with verified profiles, secure payments, and dispute resolution support. Your peace of mind is our mission.</li>
                <li><strong>Help Center:</strong> Need support? Find answers to common questions, how-to guides, and contact options in our easy-to-navigate Help Center.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">For Freelancers</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li><strong>Become a Freelancer:</strong> Ready to earn on your own terms? Sign up and showcase your skills to get matched with clients who need your talent.</li>
                <li><strong>Freelancer Tools:</strong> Access powerful tools to manage your tasks, track time, send proposals, and grow your freelancing career with ease.</li>
                <li><strong>Community Hub:</strong> Join a vibrant community of freelancers. Share experiences, get tips, and connect with others on a similar journey.</li>
                <li><strong>Events:</strong> Stay updated with webinars, workshops, and networking events designed to help you learn, grow, and connect with clients.</li>
              </ul>
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Ready to Post or Get a Job?</h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Join {companyName} and take control of your freelance opportunities today!
            </p>
            <a
              href={user ? "/add-task" : "/login"}
              className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {user ? "Add a Task" : "Login to Get Started"}
            </a>
          </section>
        </Fade>

      </div>
    </div>
  );
};

export default About;
