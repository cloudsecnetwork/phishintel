// src/routes/tracking.js
import express from 'express';
import { logLinkClick, handleCredSubmission } from '../controllers/trackingController.js';

const router = express.Router();

// Log when a phishing link is clicked
router.post('/click', logLinkClick);

// Handle submitted credentials
router.post('/submit', handleCredSubmission);

export default router;
