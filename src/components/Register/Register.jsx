import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import logo from '../../assets/freelance.png';
import { toast } from 'react-toastify';
import { FireBaseAuthContext } from '../../Provider/FireBaseAuthContext';

const Register = () => {
  const { createUserWithGoogle, createUser, updateUser, setUser } = useContext(FireBaseAuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const photoURL = form.photoURL.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) return toast.error("Passwords do not match");
    if (!/[A-Z]/.test(password)) return toast.error("Password must contain at least one uppercase letter.");
    if (!/[a-z]/.test(password)) return toast.error("Password must contain at least one lowercase letter.");
    if (!/\d/.test(password)) return toast.error("Password must contain at least one number.");
    if (!/[\W_]/.test(password)) return toast.error("Password must contain at least one special character.");
    if (password.length < 6) return toast.error("Password must be at least 6 characters long.");

    const fullName = `${firstName} ${lastName}`;
    setLoading(true);




    createUser(email, password)
      .then((userCredential) => {
        const currentUser = userCredential.user;
        return updateUser({ displayName: fullName, photoURL }).then(() => {
          const userData = {
            name: fullName,
            email,
            photoURL,
            createdAt: new Date().toISOString(),
          };

          return fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
          });
        }).then((res) => {
          if (!res.ok) throw new Error('Failed to save user to database.');
          return res.json();
        }).then(() => {
          setUser({ ...userCredential.user, displayName: fullName, photoURL });
          toast.success("Account created and saved successfully!");
          navigate('/');
        });
      })
      .catch((error) => toast.error(error.message || "Registration failed."))
      .finally(() => setLoading(false));
  };

  const handleGoogleSignIn = () => {
    createUserWithGoogle()
      .then((result) => {
        const user = result.user;

        const userData = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
        };

        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        }).then(() => {
          toast.success("Google sign-in successful!");
          navigate('/');
        }).catch(() => {
          toast.warn("Signed in but failed to save user to DB");
          navigate('/');
        });
      })
      .catch((error) => toast.error(error.message || "Google sign-in failed."));
  };

  return (
    <div className="mt-5 mb-5 min-h-screen flex items-center justify-center px-4 py-6 bg-gradient-to-r from-blue-600 to-indigo-500">
      <title>Register || Task Match</title>
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-5xl p-6 sm:p-10 flex flex-col-reverse lg:flex-row gap-6 lg:gap-10" >
        {/* Form Section */}
        <div className="w-full lg:w-1/2">
          <form onSubmit={handleRegister} className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-indigo-600">Create Your Account</h2>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                <input type="text" name="firstName" id="firstName" required placeholder="First Name" className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="w-full md:w-1/2">
                <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                <input type="text" name="lastName" id="lastName" required placeholder="Last Name" className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
            </div>

            <div>
              <label htmlFor="photoURL" className="text-sm font-medium">Photo URL</label>
              <input type="url" name="photoURL" id="photoURL" required placeholder="Profile Picture URL" className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input type="email" name="email" id="email" required placeholder="Email" className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <input type="password" name="password" id="password" required placeholder="Password" className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
              <input type="password" name="confirmPassword" id="confirmPassword" required placeholder="Confirm Password" className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <input type="checkbox" id="terms" className="mr-2" required />
              <label htmlFor="terms">I accept the Terms of Use and Privacy Policy</label>
            </div>

            <button type="submit" className="w-full py-2 px-4 rounded-full text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-600 hover:to-blue-600 transition" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="text-sm text-center text-gray-600">
              Already a member? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>

            <div className="text-center">
              <button onClick={handleGoogleSignIn} type="button" className="btn mt-4 bg-white text-black border border-gray-300 py-2 px-4 rounded-full hover:bg-gray-100 transition">

                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Register with Google
              </button>
            </div>
          </form>
        </div>

        {/* Logo Section */}
        <div className="lg:w-1/2 flex rounded-2xl flex-col justify-center items-center p-4 lg:p-8 bg-gradient-to-r from-blue-600 to-indigo-500 text-white lg:rounded-3xl">
          <h2 className="mb-15 text-3xl font-bold tracking-wide text-white drop-shadow-lg">
            Welcome to <span >Registration</span>
          </h2>
          <div className="flex rounded-full items-center justify-center mb-4 glow-border">
            <img src={logo} alt="Logo" className="w-full rounded-3xl" />
          </div>
          <p className="mt-2 text-white/90 text-sm mt-2 font-medium">
            Let's create your account and get started!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
