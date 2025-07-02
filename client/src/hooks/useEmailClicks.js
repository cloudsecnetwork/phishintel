import { useState, useCallback } from 'react';
import { axiosInstance } from '../services/axiosInstance';

const useEmailClicks = () => {
    const [emailClicks, setEmailClicks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch email clicks for a specific campaign
    const getEmailClicksByCampaign = useCallback(async (campaignId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`/api/campaign/${campaignId}/email-click`);
            if (response.data.success) {
                setEmailClicks(response.data.data);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while fetching email clicks.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Function to delete a specific email click by ID
    const deleteEmailClick = useCallback(async (emailClickId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.delete(`/api/email-click/${emailClickId}`);
            if (response.data.success) {
                setEmailClicks((prevClicks) => prevClicks.filter(click => click._id !== emailClickId));
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while deleting the email click.');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        emailClicks,
        loading,
        error,
        getEmailClicksByCampaign,
        deleteEmailClick,
    };
};

export default useEmailClicks;
