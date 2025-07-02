// src/services/authService.js

import { axiosInstance } from './axiosInstance'; // Assuming axiosInstance is defined in a separate file

export const loginUser = async (loginData) => {
    return await axiosInstance.post('/api/auth', loginData);
};

// Add other authentication-related functions here if needed