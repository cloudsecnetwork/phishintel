import SenderProfile from '../models/SenderProfile.js';  // Assuming you have a model for sender profiles
import Audience from '../models/Audience.js';            // Assuming you have a model for audiences
import Template from '../models/Template.js';            // Assuming you have a model for email templates

// Controller function to fetch and return multiple resources with specific fields
export const getResourceOverview = async (req, res) => {
    try {
        // Fetch sender profiles, audiences, and templates with selected fields concurrently
        const [senderProfiles, audiences, templates] = await Promise.all([
            SenderProfile.find().sort({ createdAt: -1 }).select('_id senderName email'), // Fetch only _id, senderName, and email
            Audience.find().sort({ createdAt: -1 }).select('_id name'), // Fetch only _id and name
            Template.find().sort({ createdAt: -1 }).select('_id name subject'), // Fetch only _id, name, and subject
        ]);

        // Return the fetched data as a response
        res.status(200).json({
            success: true,
            data: {
                senderProfiles,
                audiences,
                templates,
            },
            message: 'Resources fetched successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching resources: ' + error.message,
        });
    }
};
