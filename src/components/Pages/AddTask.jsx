import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';
import { FireBaseAuthContext } from '../../Provider/FireBaseAuthContext';
import { toast } from 'react-toastify';

const categories = [
    'Design',
    'Development',
    'Writing',
    'Marketing',
    'Virtual Assistant',
    'Other',
];

const AddTask = () => {
    // Grab signed-in user from context
    const { user } = useContext(FireBaseAuthContext);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    // ⏩ onSubmit handler
    const onSubmit = async (data) => {
        try {
            // Combine user info with form data
            const task = {
                ...data,
                email: user.email,
                name: user.displayName,
                createdAt: new Date().toISOString(),
                status: 'open',
            };

            await axios.post('/api/tasks', task);
            // toast success (quick)
            toast.success('Task added successfully!');

            // SweetAlert2 success (fancier)
            await Swal.fire({
                icon: 'success',
                title: 'Task Created',
                text: 'Your task is now live!',
                confirmButtonColor: '#6366F1', // indigo-500
            });

            reset();
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong while creating the task.',
            });
        }  
    };

    
    return (
        <section className="min-h-screen bg-indigo-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-indigo-700 mb-6">
                    Add a New Task
                </h2>

                {/* Private route – only render if a user exists */}
                {!user ? (
                    <p className="text-center font-semibold text-red-600">
                        Please log in to add a task.
                    </p>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Title */}
                        <div>
                            <label className="block mb-1 font-medium">Title</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register('title', { required: 'Title is required' })}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block mb-1 font-medium">Category</label>
                            <select
                                className="select select-bordered w-full"
                                defaultValue=""
                                {...register('category', { required: 'Choose a category' })}
                            >
                                <option value="" disabled>
                                    -- Select Category --
                                </option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block mb-1 font-medium">Description</label>
                            <textarea
                                className="textarea textarea-bordered w-full min-h-[100px]"
                                {...register('description', {
                                    required: 'Description is required',
                                })}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Deadline */}
                        <div>
                            <label className="block mb-1 font-medium">Deadline</label>
                            <input
                                type="date"
                                className="input input-bordered w-full"
                                {...register('deadline', { required: 'Pick a deadline' })}
                            />
                            {errors.deadline && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.deadline.message}
                                </p>
                            )}
                        </div>

                        {/* Budget */}
                        <div>
                            <label className="block mb-1 font-medium">Budget ($)</label>
                            <input
                                type="number"
                                min="1"
                                step="0.01"
                                className="input input-bordered w-full"
                                {...register('budget', {
                                    required: 'Budget is required',
                                    min: { value: 1, message: 'Budget must be at least $1' },
                                })}
                            />
                            {errors.budget && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.budget.message}
                                </p>
                            )}
                        </div>

                        {/* Read-only User Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">Your Name</label>
                                <input
                                    type="text"
                                    value={user.displayName || 'Anonymous'}
                                    disabled
                                    className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Email</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Adding…' : 'Add Task'}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};

export default AddTask;
