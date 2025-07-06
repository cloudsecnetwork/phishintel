// client\src\hooks\useAudiences.js
import { useState, useEffect } from 'react';
import { axiosInstance } from '../services/axiosInstance'; // Import your axios instance

export const useAudience = () => {
    const [audiences, setAudiences] = useState([]);
    const [audienceDetail, setAudienceDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAudiences(); // Fetch audiences on component mount
    }, []);

    // Function to fetch all audience data
    const fetchAudiences = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/api/audience'); // Make API call
            if (response.data.success) {
                setAudiences(response.data.data); // Set audiences from API response
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const createAudience = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post('/api/audience', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure the correct header
                },
            });
            if (response.data.success) {
                setAudiences((prevAudiences) => [...prevAudiences, response.data.data]); // Add the new audience to the state
                return { success: true, data: response.data.data };
            } else {
                setError(response.data.message);
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Function to fetch specific audience details by ID
    const fetchAudienceDetail = async (id) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/api/audience/${id}`); // Fetch audience by ID
            if (response.data.success) {
                setAudienceDetail(response.data.data); // Set audience detail from API response
                return response.data; // Return the response for further processing
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteAudience = async (id) => {
        setLoading(true);
        setError(null);  // Reset the error before making the call
        try {
            const response = await axiosInstance.delete(`/api/audience/${id}`); // API call to delete audience by ID
            if (response.data.success) {
                setAudiences((prevAudiences) => prevAudiences.filter(audience => audience._id !== id)); // Remove deleted audience from state
                return { success: true, message: 'Audience deleted successfully' }; // Return success response
            } else {
                setError(response.data.message);
                return { success: false, message: response.data.message }; // Return error message if the API call fails
            }
        } catch (error) {
            setError(error.message);
            return { success: false, message: error.message }; // Handle error and return failure response
        } finally {
            setLoading(false);
        }
    };

    const addContact = async (audienceId, contactData) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(`/api/audience/${audienceId}/contact`, contactData);
            if (response.data.success) {
                // Update audienceDetail to increment the contact count
                setAudienceDetail((prevDetail) => ({
                    ...prevDetail,
                    contacts: [...(prevDetail.contacts || []), response.data.data], // Add the new contact to the contacts array
                    contactCount: (prevDetail.contactCount || 0) + 1, // Increment the contact count
                }));
                return { success: true, data: response.data.data };
            } else {
                setError(response.data.message);
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            // Handle axios error response properly
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const deleteContact = async (audienceId, contactId) => {
        setLoading(true);
        try {
            const response = await axiosInstance.delete(`/api/audience/${audienceId}/contact/${contactId}`);
            if (response.data.success) {
                // Update the audienceDetail contacts array by filtering out the deleted contact
                setAudienceDetail((prevDetail) => ({
                    ...prevDetail,
                    contacts: prevDetail.contacts.filter(contact => contact._id !== contactId),
                    contactCount: (prevDetail.contactCount || 0) - 1, // Decrement the contact count
                }));
                return { success: true, message: 'Contact deleted successfully' };
            } else {
                setError(response.data.message);
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            setError(error.message);
            return { success: false, message: error.message };
        } finally {
            setLoading(false);
        }
    };

    const uploadCSVToAudience = async (audienceId, file) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await axiosInstance.post(`/api/audience/${audienceId}/upload-csv`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                // Refresh audience details to get updated contact list
                await fetchAudienceDetail(audienceId);
                return { success: true, data: response.data.data, message: response.data.message };
            } else {
                setError(response.data.message);
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return { audiences, audienceDetail, createAudience, fetchAudienceDetail, deleteAudience, addContact, deleteContact, uploadCSVToAudience, loading, error };
};
