import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { FireBaseAuthContext } from '../Provider/FireBaseAuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const {user, loading}=use(FireBaseAuthContext);
    // console.log(user);
    const location= useLocation();
    // console.log(location);

    if (loading){
        return <LoadingSpinner></LoadingSpinner>;

    }

    // if -> user thake then return children
    if (user && user ?.email){
        return children;
    };
   
    // if -> user jodi na thake then return navigate--> Login
    return <Navigate state={location.pathname} to="/login"></Navigate>


};

export default PrivateRoute;