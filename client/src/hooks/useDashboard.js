import { useState, useEffect } from 'react';
import { axiosInstance } from '../services/axiosInstance';

export const useDashboard = () => {
    // State for dashboard overview data
    const [dashboardData, setDashboardData] = useState({
        totalCampaigns: 0,
        totalContacts: 0,
        totalTemplates: 0,
        totalSenderProfiles: 0,
    });

    // State for timeline data
    const [timelineData, setTimelineData] = useState({ labels: [], datasets: [] });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardData();
        fetchTimelineData();
    }, []);

    // Fetching dashboard overview data
    const fetchDashboardData = async () => {
        try {
            const response = await axiosInstance.get('/api/dashboard/overview');
            if (response.data.success) {
                setDashboardData(response.data.data);
            } else {
                console.error('Error fetching dashboard data:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    // Fetching timeline data
    const fetchTimelineData = async () => {
        try {
            const response = await axiosInstance.get('/api/dashboard/timeline');
            if (response.data.success) {
                setTimelineData(response.data.data);
            } else {
                console.error('Error fetching timeline data:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching timeline data:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { dashboardData, timelineData, loading, error };
};
