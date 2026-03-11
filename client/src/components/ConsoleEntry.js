import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/tokenManager';
import Login from '../pages/Login';

const ConsoleEntry = () => {
    const token = getToken();

    // If already authenticated, redirect to dashboard. Otherwise show login.
    return token ? <Navigate to="/console/dashboard" replace /> : <Login />;
};

export default ConsoleEntry;
