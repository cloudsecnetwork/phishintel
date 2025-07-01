import mongoose from 'mongoose';
import EmailClick from "../models/EmailClick.js";
const { ObjectId } = mongoose.Types;

// Fetch email clicks for a specific campaign
export const getEmailClicksByCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req params", id);

        // Validate id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid campaign ID'
            });
        }

        const emailClicks = await EmailClick.find({ campaign: new mongoose.Types.ObjectId(String(id)) });

        // Check if any email clicks were found
        if (emailClicks.length == 0) {
            return res.status(404).json({
                success: false,
                message: 'No email clicks found for this campaign'
            });
        }

        res.status(200).json({
            success: true,
            data: emailClicks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving email clicks',
            error: error.message
        });
    }
};

// Delete a specific email click by ID
export const deleteEmailClick = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email click ID'
            });
        }

        const deletedEmailClick = await EmailClick.findByIdAndDelete(id);

        // Check if the email click was found and deleted
        if (!deletedEmailClick) {
            return res.status(404).json({
                success: false,
                message: 'Email click not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Email click deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the email click',
            error: error.message
        });
    }
};
