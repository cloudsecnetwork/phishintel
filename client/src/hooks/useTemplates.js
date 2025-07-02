import { useState, useEffect } from 'react';
import { axiosInstance } from '../services/axiosInstance'; // Import your axios instance

export const useTemplates = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTemplates(); // Fetch templates on component mount
    }, []);

    // Function to fetch all templates
    const fetchTemplates = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/api/template'); // Make API call to fetch templates
            if (response.data.success) {
                setTemplates(response.data.data); // Set templates from API response
            } else {
                const errorMessage = response.data.message || "Unable to complete request";
                setError(errorMessage);
                return { success: false, message: errorMessage };
            }
        } catch (error) {
            // Handle network or server errors
            const errorMessage = error.response?.data?.message || error.message;
            setError(`An Error Occurred: ${errorMessage}`);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Function to create a new template (multipart/form-data)
    const createTemplate = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post('/api/template', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set to multipart/form-data for file uploads
                }
            });
            if (response.data.success) {
                // Add the newly created template to the state
                setTemplates((prevTemplates) => [...prevTemplates, response.data.data]);
                return { success: true, data: response.data.data }; // Return the response
            } else {
                const errorMessage = response.data.message || "Unable to complete request";
                setError(errorMessage);
                return { success: false, message: errorMessage };
            }
        } catch (error) {
            // Handle network or server errors
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Function to update a template by ID (multipart/form-data)
    const updateTemplate = async (id, formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.put(`/api/template/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set to multipart/form-data for file uploads
                }
            });
            if (response.data.success) {
                // Update the template in the state
                setTemplates((prevTemplates) =>
                    prevTemplates.map((template) => template._id === id ? response.data.data : template)
                );
                return { success: true, data: response.data.data }; // Return the response
            } else {
                const errorMessage = response.data.message || "Unable to complete request";
                setError(errorMessage);
                return { success: false, message: errorMessage };
            }
        } catch (error) {
            // Handle network or server errors
            const errorMessage = error.response?.data?.message || error.message;
            setError(`An Error Occurred: ${errorMessage}`);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    // Function to delete a template by ID
    const deleteTemplate = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.delete(`/api/template/${id}`); // API call to delete template by ID
            if (response.data.success) {
                fetchTemplates(); // Refresh templates after deletion
                return { success: true, message: 'Template deleted successfully' };
            } else {
                const errorMessage = response.data.message || "Unable to complete request";
                setError(errorMessage);
                return { success: false, message: errorMessage };
            }
        } catch (error) {
            // Handle network or server errors
            const errorMessage = error.response?.data?.message || error.message;
            setError(`An Error Occurred: ${errorMessage}`);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return {
        templates,
        loading,
        error,
        fetchTemplates,
        createTemplate,
        updateTemplate,
        deleteTemplate
    };
};
