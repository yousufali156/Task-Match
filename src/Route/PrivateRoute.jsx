import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router'; 
import { FireBaseAuthContext } from '../Provider/FireBaseAuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(FireBaseAuthContext); 
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (user && user.email) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
