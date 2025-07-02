import { useState, useEffect } from 'react';
import { axiosInstance } from '../services/axiosInstance'; // Your configured axios instance

export const useResources = () => {
    const [senderProfiles, setSenderProfiles] = useState([]); // To store sender profiles
    const [audiences, setAudiences] = useState([]);           // To store audiences
    const [templates, setTemplates] = useState([]);           // To store templates

    const [loading, setLoading] = useState(false);            // Loading state
    const [error, setError] = useState(null);                 // Error state

    // Function to fetch resources from the API
    const fetchResources = async () => {
        setLoading(true); // Start loading
        setError(null);   // Clear any previous errors
        try {
            const response = await axiosInstance.get('/api/resource/overview'); // Call the API

            // If the API call was successful
            if (response.data.success) {
                const { senderProfiles, audiences, templates } = response.data.data;
                setSenderProfiles(senderProfiles);  // Update sender profiles
                setAudiences(audiences);            // Update audiences
                setTemplates(templates);            // Update templates
            } else {
                setError('Failed to fetch resources'); // Handle API failure
            }
        } catch (error) {
            setError(error.message);  // Capture any errors during the API call
        } finally {
            setLoading(false);  // Stop loading when done
        }
    };

    // Automatically fetch resources when the component using this hook mounts
    useEffect(() => {
        fetchResources();
    }, []);

    // Return the resources, loading state, error, and the fetch function for manual re-fetch
    return {
        senderProfiles,
        audiences,
        templates,
        loading,
        error,
        fetchResources // This can be used to manually re-fetch if needed
    };
};
