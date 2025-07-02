// client\src\hooks\useCampaign.js
import { useState, useCallback } from 'react';
import { axiosInstance } from '../services/axiosInstance';

export const usePrepareCampaign = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const prepareCampaign = async (campaignData) => {
        setLoading(true);
        setError("");
        setSuccess(false);
        try {
            const response = await axiosInstance.post('/api/campaign/prepare', campaignData);
            if (response.data.success) {
                setSuccess(true);
                return response.data; // Return the response so the calling function can use it
            } else {
                // Handle unsuccessful response with message
                const errorMessage = response.data.message || "Unable to complete request";
                setError(`An Error Occurred: ${errorMessage}`);
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

    return { prepareCampaign, loading, error, success };
};

export const useGetCampaign = () => {
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getCampaign = useCallback(async (id) => {
        if (!id) {
            setError('Campaign ID is required');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get(`/api/campaign/${id}`);
            if (response.data.success) {
                setCampaign(response.data.data);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while fetching the campaign details.');
        } finally {
            setLoading(false);
        }
    }, []);

    return { getCampaign, campaign, setCampaign, loading, error };
};

export const useGetAllCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllCampaigns = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get('/api/campaign');
            if (response.data.success) {
                setCampaigns(response.data.data);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while fetching the campaigns.');
        } finally {
            setLoading(false);
        }
    }, []);

    return { getAllCampaigns, campaigns, loading, error };
};

export const useStartCampaign = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const startCampaign = async (id) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await axiosInstance.post(`/api/campaign/start/${id}`);
            if (response.data.success) {
                setSuccess(true);
                return response.data; // Return the response so the calling function can use it
            } else {
                // Handle unsuccessful response with message
                const errorMessage = response.data.message || "Unable to complete request";
                setError(`An Error Occurred: ${errorMessage}`);
                return { success: false, message: errorMessage };
            }
        } catch (error) {
            // Handle network or server errors
            const errorMessage = error.response?.data?.message || "A server error occurred.";
            setError(`An Error Occurred: ${errorMessage}`);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return { startCampaign, loading, error, success };
};

export const useResendFailedEmails = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const resendFailedEmails = async (id) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await axiosInstance.post(`/api/campaign/${id}/resend`);
            if (response.data.success) {
                setSuccess(true);
                return response.data; // Return the response so the calling function can use it
            } else {
                // Handle unsuccessful response with message
                const errorMessage = response.data.message || "Unable to complete request";
                setError(`An Error Occurred: ${errorMessage}`);
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

    return { resendFailedEmails, loading, error, success };
};

export const useArchiveCampaign = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const archiveCampaign = async (id, setCampaign) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await axiosInstance.post(`/api/campaign/${id}/archive`);
            if (response.data.success) {
                setSuccess(true);
                if (setCampaign) {
                    // Update the campaign's status dynamically
                    setCampaign((prevCampaign) => ({
                        ...prevCampaign,
                        status: 'archived',
                    }));
                }
                return response.data; // Return the response for use in the calling function
            } else {
                const errorMessage = response.data.message || "Unable to archive the campaign";
                setError(errorMessage);
                return { success: false, message: errorMessage };
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return { archiveCampaign, loading, error, success };
};

export const useReactivateCampaign = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const reactivateCampaign = async (id, setCampaign) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await axiosInstance.post(`/api/campaign/${id}/reactivate`);
            if (response.data.success) {
                setSuccess(true);
                if (setCampaign) {
                    // Update the campaign's status dynamically
                    setCampaign((prevCampaign) => ({
                        ...prevCampaign,
                        status: 'completed',
                    }));
                }
                return response.data;
            } else {
                const errorMessage = response.data.message || "Unable to reactivate the campaign";
                setError(errorMessage);
                return { success: false, message: errorMessage };
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            return { success: false, message: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return { reactivateCampaign, loading, error, success };
};

export const useDeleteCampaign = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const deleteCampaign = async (id) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await axiosInstance.delete(`/api/campaign/${id}`);
            if (response.data.success) {
                setSuccess(true);
                return response.data; // Return the response so the calling function can use it
            } else {
                setError(response.data.message);
                return null; // Return null if there was an error
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

    return { deleteCampaign, loading, error, success };
};