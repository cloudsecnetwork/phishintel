import Campaign from '../models/Campaign.js';
import SenderProfile from '../models/SenderProfile.js';
import Template from '../models/Template.js';
import Contact from '../models/Contact.js';

export const getDashboardOverview = async (req, res) => {
    try {
        // Fetch counts for the required entities
        const totalCampaigns = await Campaign.countDocuments();
        const totalContacts = await Contact.countDocuments();
        const totalTemplates = await Template.countDocuments();
        const totalSenderProfiles = await SenderProfile.countDocuments();

        // Construct the overview response
        res.status(200).json({
            success: true,
            message: 'Data retrieved successfully',
            data: {
                totalCampaigns,
                totalContacts,
                totalTemplates,
                totalSenderProfiles,
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard overview data',
            error: error.message
        });
    }
};

export const getTimelineData = async (req, res) => {
    try {
        // Sample timeline data to return as JSON
        const sampleTimelineData = {
            labels: [
                '2024-10-18T00:00:00Z',
                '2024-10-18T06:00:00Z',
                '2024-10-18T12:00:00Z',
                '2024-10-18T18:00:00Z',
                '2024-10-19T00:00:00Z'
            ],
            datasets: [
                {
                    label: 'Email Clicks',
                    data: [40, 20, 30, 15, 18],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: 'Submitted Credentials',
                    data: [5, 10, 20, 18, 22],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                },
            ],
        };

        // Send the sample timeline data as response
        res.status(200).json({
            success: true,
            message: 'Timeline data retrieved successfully',
            data: sampleTimelineData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching timeline data',
            error: error.message
        });
    }
};
