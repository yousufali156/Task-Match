import React from 'react';

const WhyChooseUs = () => {
    return (
        <div className="container mx-auto bg-gray-50 py-12 px-4 md:px-12 lg:px-20">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">

                {/* Why Choose Us */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Us</h2>
                    <ul className="space-y-4 text-gray-700">
                        <li className="flex items-start">
                            <span className="text-blue-600 mr-3 mt-1">✔</span>
                            <span>Wide range of skilled freelancers</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-600 mr-3 mt-1">✔</span>
                            <span>Simple and secure platform</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-blue-600 mr-3 mt-1">✔</span>
                            <span>Efficient task completion</span>
                        </li>
                    </ul>
                </div>

                {/* How It Works */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
                    <div className="space-y-6">
                        {[
                            "Post a task with your requirements",
                            "Receive bids from freelancers",
                            "Choose a freelancer and get it done"
                        ].map((text, index) => (
                            <div key={index} className="flex items-start">
                                <div className="flex flex-col items-center mr-4">
                                    <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-8 h-8 flex items-center justify-center">
                                        {index + 1}
                                    </div>
                                    {index < 2 && <div className="w-px bg-blue-200 h-6"></div>}
                                </div>
                                <p className="text-gray-700">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WhyChooseUs;
