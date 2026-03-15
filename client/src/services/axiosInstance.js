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

// Paths that may return 401 for business logic (e.g. wrong credentials), not session invalid. Do not logout/redirect on 401 for these.
const EXEMPT_401_LOGOUT_PATHS = [
    '/api/auth',
];

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            const url = error.config?.url || '';
            const isExempt = EXEMPT_401_LOGOUT_PATHS.some(path => url.includes(path));
            if (!isExempt) {
                clearToken();
                window.location.href = '/console';
            }
        }
        return Promise.reject(error);
    }
);

export { axiosInstance };