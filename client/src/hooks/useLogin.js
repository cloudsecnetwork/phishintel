// src/hooks/useLogin.js

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginUser } from '../services/authService';
import { setToken } from '../utils/tokenManager';

export const useLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const loginData = {
            username: data.get('username'),
            password: data.get('password'),
        };

        console.log(loginData)
        try {
            setLoading(true);
            setError(''); // Clear previous errors
            const response = await loginUser(loginData);
            setLoading(false);
            const { token } = response.data;
            setToken(token); // Store the token
            // Store the user info, if needed
            navigate('/console/dashboard'); // or wherever you want to redirect after login
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred during login.');
            }
        }
    };

    return { handleSubmit, loading, error };
};
