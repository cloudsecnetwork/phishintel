// src/config/apiConfig.js

export const API_BASE_URL =
    process.env.NODE_ENV === 'production'
        ? '' // Replace with your production API base URL
        : 'http://localhost:8080';
