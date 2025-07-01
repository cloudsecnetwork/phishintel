import mongoose from 'mongoose';
import Submission from '../models/Submission.js';
const { ObjectId } = mongoose.Types;

// Get submissions for a specific campaign
export const getSubmissionsByCampaign = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid campaign ID'
            });
        }

        const submissions = await Submission.find({ campaign: new mongoose.Types.ObjectId(String(id)) });

        // Check if any submissions were found
        if (submissions.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No submissions found for this campaign'
            });
        }

        res.status(200).json({
            success: true,
            data: submissions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving submissions',
            error: error.message
        });
    }
};

// Delete a submission by ID
export const deleteSubmission = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid submission ID'
            });
        }

        const deletedSubmission = await Submission.findByIdAndDelete(id);

        // Check if the submission was found and deleted
        if (!deletedSubmission) {
            return res.status(404).json({
                success: false,
                message: 'Submission not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Submission deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the submission',
            error: error.message
        });
    }
};