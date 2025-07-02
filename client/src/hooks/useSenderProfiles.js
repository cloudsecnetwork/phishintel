import { useState, useEffect } from 'react';
import { axiosInstance } from '../services/axiosInstance';

export const useSenderProfiles = () => {
    const [senderProfiles, setSenderProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSenderProfiles(); // Fetch sender profiles on component mount
    }, []);

    // Function to fetch all sender profile data
    const fetchSenderProfiles = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/api/sender-profile'); // Make API call
            if (response.data.success) {
                setSenderProfiles(response.data.data); // Set sender profiles from API response
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to create a new sender profile
    const createSenderProfile = async (formData) => {
        setLoading(true);
        setError(null); // Reset error before making the API call
        try {
            const response = await axiosInstance.post('/api/sender-profile', formData, {
                headers: {
                    'Content-Type': 'application/json' // Set the appropriate header
                }
            });

            if (response.data.success) {
                // Add the newly created sender profile to the state
                setSenderProfiles((prevSenderProfiles) => [...prevSenderProfiles, response.data.data]);
                return { success: true, data: response.data.data }; // Return the response for further use
            }

            // Handle unsuccessful response with message
            const errorMessage = response.data.message || "Unable to complete request";
            setError(`An Error Occurred: ${errorMessage}`);
            return { success: false, message: errorMessage };

        } catch (error) {
            // Handle network or server errors
            const errorMessage = error.response?.data?.message || "A server error occurred.";
            setError(`An Error Occurred: ${errorMessage}`);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Function to delete a sender profile by ID
    const handleDelete = async (id) => {
        setLoading(true);
        setError(null); // Reset the error before making the call
        try {
            const response = await axiosInstance.delete(`/api/sender-profile/${id}`); // API call to delete profile by ID
            if (response.data.success) {
                // Remove deleted sender profile from state
                setSenderProfiles((prevSenderProfiles) => prevSenderProfiles.filter(profile => profile._id !== id));
                console.log('API call succeeded, profile deleted from database');
                return { success: true, message: 'Sender profile deleted successfully' }; // Return success response
            } else {
                setError(response.data.message);
                console.log('API call failed:', response.data.message);
                return { success: false, message: response.data.message }; // Return error message
            }
        } catch (error) {
            setError(error.message);
            console.log('API call error:', error.message);
            return { success: false, message: error.message }; // Handle error and return failure response
        } finally {
            setLoading(false);
        }
    };

    return {
        senderProfiles,
        loading,
        error,
        fetchSenderProfiles,
        createSenderProfile,
        handleDelete
    };
};
