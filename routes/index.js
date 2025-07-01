// routes.js
import express from 'express';

import adminAuth from '../controllers/adminAuth.js'
import dashboard from './dashboard.js';
import senderProfile from './senderProfile.js';
import emailClick from './emailClick.js';
import submission from './submission.js';
import audience from './audience.js';
import campaign from './campaign.js';
import template from './template.js';
import resource from './resource.js';
import dataExport from './dataExport.js';
import tracking from './tracking.js';

const router = express.Router();

// Define routes
router.use("/api/auth", adminAuth);
router.use("/api/dashboard", dashboard);
router.use("/api/audience", audience);
router.use("/api/sender-profile", senderProfile);
router.use("/api/email-click", emailClick);
router.use("/api/submission", submission);
router.use("/api/campaign", campaign);
router.use("/api/template", template);
router.use("/api/resource", resource);
router.use("/api/export", dataExport);
router.use("/api/tracking", tracking);

export default router;
