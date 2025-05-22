import React from 'react';
import { useLoaderData } from 'react-router';

const Tasks = () => {
    const tasks = useLoaderData()
    console.log(tasks);

    return (
        <div>
            {
                <div className="container mx-auto bg-white py-12 px-4 md:px-12 lg:px-20">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">Featured Tasks</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition"
                            >
                                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                                    {task.title}
                                </h3>

                                {task.category && (
                                    <p className="text-sm text-gray-600 mb-1">
                                        Category: {task.category}
                                    </p>
                                )}

                                {task.deadline && (
                                    <p className="text-sm text-gray-600 mb-1">
                                        Deadline: {task.deadline}
                                    </p>
                                )}

                                {task.bid && (
                                    <p className="text-sm text-gray-600">
                                        Bid: {task.bid}
                                    </p>
                                )}

                                {task.budget && (
                                    <p className="text-sm text-gray-600">
                                        Budget: {task.budget}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
};

export default Tasks;