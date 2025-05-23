import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import { FireBaseAuthContext } from '../../Provider/FireBaseAuthContext';


const ResetPassword = () => {
    const { resetPassword } = useContext(FireBaseAuthContext);

    const handleResetPassword = (e) => {
        e.preventDefault();
        const email = e.target.email.value.trim();

        if (!email) {
            toast.error('Please enter your email address.');
            return;
        }
        resetPassword(email)
            .then(() => {
                toast.success('Password reset email sent! Redirecting to Gmail...');
                setTimeout(() => {
                    window.location.href = 'https://mail.google.com';
                }, 1500);

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/user-not-found' || errorCode === 'auth/invalid-email') {
                    toast.warning('This email address is not registered or is invalid.');
                } else {
                    toast.error(errorMessage || 'Failed to send reset email.');
                }
                console.error("Reset Password Error:", errorCode, errorMessage);
            });
    }

    return (
        <div className="flex items-center justify-center mt-10 mb-10">
            <title>Reset Password || Task Match</title>
            <div className="bg-base-300 shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-md">
                <h2 className="text-2xl md:text-3xl font-semibold text-center text-indigo-700 mb-6">
                    Reset Your Password
                </h2>
                <p className="text-center text-gray-600 text-sm mb-6">
                    Enter your email address below and we'll send you a link to reset your password.
                </p>
                <form onSubmit={handleResetPassword} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter Your Email"
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-150 ease-in-out"
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full btn btn-primary mt-2 py-2">
                        Send Reset Link
                    </button>

                    {/* Redirect to Login */}
                    <div className="mt-2 text-center text-sm text-gray-600">
                        Remember your password?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline font-medium">
                            Login here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;