import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router'; 
import { FireBaseAuthContext } from '../../Provider/FireBaseAuthContext';
import logo from '../../assets/freelance.png';
import { toast } from 'react-toastify';

const Login = () => {
    const { loginUser, setUser, createUserWithGoogle } = useContext(FireBaseAuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const location = useLocation();

    // Get the path the user tried to visit before login
    const from = location.state?.from?.pathname || '/';

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = formData;

        loginUser(email, password)
            .then((result) => {
                const currentUser = result.user;
                setUser(currentUser);
                toast.success('Login successful');
                navigate(from, { replace: true }); // ✅ Redirect to previous path
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    const handleGoogleSignIn = () => {
        createUserWithGoogle()
            .then((result) => {
                setUser(result.user);
                toast.success('Login with Google successful');
                navigate(from, { replace: true }); // ✅ Redirect to previous path
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    return (
        <div className="mt-5 mb-5 min-h-screen flex items-center justify-center px-4 py-4">
            <title>Login || Task Match</title>
            <div className="bg-gradient-to-r from-indigo-500 to-blue-700 rounded-3xl shadow-xl overflow-hidden w-full max-w-4xl p-8 sm:p-12 flex flex-col lg:flex-row relative">

                {/* Left Logo Panel */}
                <div className="lg:w-1/2 flex rounded-2xl flex-col justify-center items-center p-4 lg:p-8 bg-gradient-to-r from-blue-600 to-blue-500 text-white lg:rounded-3xl">
                    <div className="flex rounded-full items-center justify-center mb-4 glow-border">
                        <img src={logo} alt="Logo" className="w-full rounded-3xl" />
                    </div>
                    <h2 className="text-2xl text-center font-semibold">Welcome Back</h2>
                </div>

                {/* Right Form Panel */}
                <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <h2 className="text-3xl font-bold text-center text-emerald-500">Login to Your Account</h2>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <label htmlFor="rememberMe" className="flex items-center">
                                <input type="checkbox" id="rememberMe" className="mr-2" />
                                Remember Me
                            </label>
                            <Link to="/reset-password" className="text-red-400 hover:underline">Forgot Password?</Link>
                        </div>

                        <button
                            type="submit"
                            className="block w-full text-center py-2 px-4 rounded-full text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 transition"
                        >
                            Login
                        </button>

                        <p className="text-sm text-center mt-4">
                            Don’t have an account? <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
                        </p>
                    </form>

                    {/* Google Sign-In */}
                    <div className="text-center">
                        <button
                            onClick={handleGoogleSignIn}
                            type="button"
                            className="btn mt-4 bg-white text-black border border-gray-300 py-2 px-4 rounded-full hover:bg-gray-100 transition"
                        >
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
