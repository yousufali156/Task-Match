import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { toast } from 'react-toastify';
import { FireBaseAuthContext } from '../Provider/FireBaseAuthContext';
import { useLoaderData, useNavigate } from 'react-router';

const categories = ['Design', 'Development', 'Writing', 'Marketing', 'Virtual Assistant', 'Other'];

const Update = () => {
    const { user } = useContext(FireBaseAuthContext);
    const task = useLoaderData(); // Loaded task from route loader
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            title: task?.title || '',
            category: task?.category || '',
            description: task?.description || '',
            deadline: task?.deadline || '',
            budget: task?.budget || '',
        }
    });

    const onSubmit = async (data) => {
        const updatedTask = {
            ...task,
            ...data,
            updatedAt: new Date().toISOString()
        };

        try {
            const response = await fetch(`http://localhost:3000/tasks/${task._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTask)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to update task');
            }

            toast.success('✅ Task updated successfully!');
            await Swal.fire({
                icon: 'success',
                title: 'Task Updated',
                text: 'Your task has been successfully updated.',
                confirmButtonColor: '#6366F1'
            });

            navigate('/my-posted-tasks');
        } catch (err) {
            console.error('❌ Update Error:', err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong while updating the task.'
            });
        }
    };


    return (
        <section className="min-h-screen bg-indigo-50 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
                <title>Update Task || Task Match</title>
                <h2 className="text-2xl font-bold text-indigo-700 mb-6">Update Task</h2>

                {!user ? (
                    <p className="text-center font-semibold text-red-600">
                        Please log in to update a task.
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
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block mb-1 font-medium">Category</label>
                            <select
                                className="select select-bordered w-full"
                                {...register('category', { required: 'Choose a category' })}
                            >
                                <option value="" disabled>-- Select Category --</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block mb-1 font-medium">Description</label>
                            <textarea
                                className="textarea textarea-bordered w-full min-h-[100px]"
                                {...register('description', { required: 'Description is required' })}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
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
                                <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>
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
                                    min: { value: 1, message: 'Budget must be at least $1' }
                                })}
                            />
                            {errors.budget && (
                                <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
                            )}
                        </div>

                        {/* Read-only Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 font-medium">Your Name</label>
                                <input
                                    type="text"
                                    value={user?.displayName || ''}
                                    disabled
                                    className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Email</label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
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
                            {isSubmitting ? 'Updating…' : 'Update Task'}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};

export default Update;
