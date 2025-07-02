// src/utils/tokenManager.js

export const setToken = (token) => {
    localStorage.setItem('authToken', token);
};

export const getToken = () => {
    return localStorage.getItem('authToken');
};

export const clearToken = () => {
    localStorage.removeItem('authToken');
};
