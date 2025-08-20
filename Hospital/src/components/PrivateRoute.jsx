import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
    const { isAuthenticated, isLoading, user } = useAuth();

    if (isLoading) {
        // You can show a loading spinner here
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        // If not logged in, redirect to login page
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        // If logged in but role does not match, redirect to an unauthorized page or home
        // For simplicity, we'll redirect to the main patient dashboard
        return <Navigate to="/dashboard" replace />;
    }

    // If authenticated and has the correct role, render the child component
    return <Outlet />;
};

export default PrivateRoute;