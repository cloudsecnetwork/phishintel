import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/tokenManager';

const ProtectedRoute = ({ children }) => {
    const token = getToken(); // Check for token (no API call by default)

    // If token exists, allow access. Otherwise, redirect to login page.
    return token ? children : <Navigate to="/console" replace />;
};

export default ProtectedRoute;
