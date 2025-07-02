import { useState, useCallback } from 'react';
import { axiosInstance } from '../services/axiosInstance';

const useSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch submissions for a specific campaign
    const getSubmissionsByCampaign = useCallback(async (campaignId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get(`/api/campaign/${campaignId}/submission`);
            if (response.data.success) {
                setSubmissions(response.data.data);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while fetching submissions.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Function to delete a specific submission by ID
    const deleteSubmission = useCallback(async (submissionId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.delete(`/api/submission/${submissionId}`);
            if (response.data.success) {
                setSubmissions((prevSubmissions) => prevSubmissions.filter(submission => submission._id !== submissionId));
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while deleting the submission.');
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        submissions,
        loading,
        error,
        getSubmissionsByCampaign,
        deleteSubmission,
    };
};

export default useSubmissions;
