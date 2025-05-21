import React, { useContext } from 'react';
import { Link } from 'react-router';
import { FireBaseAuthContext } from '../../Provider/FireBaseAuthContext';
import ResetPassword from '../ResetPassword/ResetPassword';

const Login = () => {
    const {createUserWithGoogle}= useContext(FireBaseAuthContext)
        const handleGoogleSignIn =() => {
            createUserWithGoogle()
            .then((result) => {
                
                const user = result.user;
                console.log(user)
              }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
              });
        }
    return (
        <div className="hero container mx-auto bg-base-200 min-h-screen">
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <h1 className="text-4xl text-center p-4 font-bold">Login Now!</h1>
                <div className="card-body">
                    <form className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" />
                        <label className="label">Password</label>
                        <input type="password" name='password' className="input" placeholder="Password" />
                        <div><Link to={'/reset-password'} className="link link-hover">Forgot password?</Link></div>
                        <button className="btn bg-blue-600 text-white mt-4">Login</button>
                    </form>
                    <p>You Don't Have An Account ? Please <Link className='underline text-blue-700' to='/signup'>Signup</Link> Here! </p>
                </div>
                {/* Google */}
                <button onClick={handleGoogleSignIn} className="btn mb-6 bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default Login;