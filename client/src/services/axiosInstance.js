// src/services/axiosInstance.js

import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { clearToken, getToken } from '../utils/tokenManager';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
    config => {
        // Add authorization token to headers if available
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Clear token and redirect to login
            clearToken();
            window.location.href = '/console';
        }
        return Promise.reject(error);
    }
);

export { axiosInstance };