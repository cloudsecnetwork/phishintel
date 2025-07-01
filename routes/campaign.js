// src/routes/campaign.js
import express from 'express';
import {
    getAllCampaigns,
    getCampaignById,
    prepareCampaign,
    startCampaign,
    resendFailedEmails,
    deleteCampaign,
    archiveCampaign,
    reactivateCampaign
} from '../controllers/campaignController.js';
import { getEmailClicksByCampaign } from '../controllers/emailClickController.js';
import { getSubmissionsByCampaign } from '../controllers/submissionController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect routes with authMiddleware
router.use(authMiddleware);

// Prepare Campaign
router.post('/prepare', prepareCampaign);

// Start Campaign
router.post('/start/:id', startCampaign);

// Resend
router.post('/:id/resend', resendFailedEmails);

// Archive Campaign
router.post('/:id/archive', archiveCampaign); // Archive a campaign

// Reactivate Campaign
router.post('/:id/reactivate', reactivateCampaign); // Reactivate a campaign

// Read
router.get('/', getAllCampaigns);
router.get('/:id', getCampaignById);

// Delete
router.delete('/:id', deleteCampaign);

// Get email clicks by campaign ID
router.get('/:id/email-click', getEmailClicksByCampaign);

// Record Email Click
// router.post('/:id/email-click', getEmailClicksByCampaign);

// Get submissions by campaign ID
router.get('/:id/submission', getSubmissionsByCampaign);

// Record Submitted Credentials
// router.get('/:id/submission', getSubmissionsByCampaign);

export default router;
