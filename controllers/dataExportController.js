import mongoose from 'mongoose';
import { parse } from 'json2csv'; // npm install json2csv
import EmailClick from '../models/EmailClick.js';
import Submission from '../models/Submission.js';

export const exportEmailClicks = async (req, res) => {
    try {
        const { campaignId } = req.query;

        // Validate that campaignId is provided
        if (!campaignId) {
            return res.status(400).json({
                success: false,
                message: 'Campaign ID is required.',
            });
        }

        // Validate that campaignId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(campaignId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Campaign ID format.',
            });
        }

        // Fetch email clicks for the campaign using ObjectId conversion
        const emailClicks = await EmailClick.find({
            campaign: new mongoose.Types.ObjectId(String(campaignId)),
        }).lean();

        if (!emailClicks || emailClicks.length == 0) {
            return res.status(404).json({ success: false, message: 'No email clicks found for this campaign' });
        }

        // Define CSV fields
        const fields = ['email', 'count', 'ipAddress', 'device'];
        const opts = { fields };

        // Convert to CSV
        const csv = parse(emailClicks, opts);
        const fileName = `email_clicks_${campaignId}.csv`;
        res.header('Content-Type', 'text/csv');
        res.attachment(fileName);

        // Send CSV directly in response
        res.send(csv);
    } catch (error) {
        console.error('Error exporting email clicks:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const exportSubmissions = async (req, res) => {
    try {
        const { campaignId } = req.query;

        // Validate that campaignId is provided
        if (!campaignId) {
            return res.status(400).json({
                success: false,
                message: 'Campaign ID is required.',
            });
        }

        // Validate that campaignId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(campaignId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Campaign ID format.',
            });
        }

        // Fetch submissions for the campaign using ObjectId conversion
        const submissions = await Submission.find({
            campaign: new mongoose.Types.ObjectId(String(campaignId)),
        }).lean();

        if (!submissions || submissions.length === 0) {
            return res.status(404).json({ success: false, message: 'No submissions found for this campaign' });
        }

        // Define CSV fields
        const fields = ['email', "password", 'ipAddress', 'device'];
        const opts = { fields };

        // Convert to CSV
        const csv = parse(submissions, opts);

        // Set file name and headers
        const fileName = `submissions_${campaignId}.csv`;
        res.header('Content-Type', 'text/csv');
        res.attachment(fileName);

        // Send CSV directly in response
        res.send(csv);
    } catch (error) {
        console.error('Error exporting submissions:', error.message);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
