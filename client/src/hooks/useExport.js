// client\src\hooks\useExport.js
import { useState } from 'react';
import { axiosInstance } from '../services/axiosInstance';

export const useExport = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to export email clicks for a campaign
    const exportEmailClicks = async (campaignId) => {
        setLoading(true);
        setError(null); // Reset error before making the API call
        try {
            // Make API request with query parameter
            const response = await axiosInstance.get(`/api/export/email-clicks`, {
                params: { campaignId }, // Pass campaignId as a query parameter
                responseType: 'blob', // Important for handling file downloads
            });

            // Create a URL for the file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `email_clicks_${campaignId}.csv`); // File name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            return { success: true, message: 'Email clicks exported successfully' };
        } catch (error) {
            console.error('Error exporting email clicks:', error.message);
            const errorMessage = error.response?.data?.message || 'Failed to export email clicks';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Function to export submissions for a campaign
    const exportSubmissions = async (campaignId) => {
        setLoading(true);
        setError(null); // Reset error before making the API call
        try {
            // Make API request with query parameter
            const response = await axiosInstance.get(`/api/export/submissions`, {
                params: { campaignId }, // Pass campaignId as a query parameter
                responseType: 'blob', // Important for handling file downloads
            });

            // Create a URL for the file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `submissions_${campaignId}.csv`); // File name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            return { success: true, message: 'Submissions exported successfully' };
        } catch (error) {
            console.error('Error exporting submissions:', error.message);
            const errorMessage = error.response?.data?.message || 'Failed to export submissions';
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        exportEmailClicks,
        exportSubmissions,
    };
};
