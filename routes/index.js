// routes.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Version endpoint
router.get('/api/version', (req, res) => {
  try {
    const versionPath = path.join(__dirname, '..', 'VERSION');
    const versionData = fs.readFileSync(versionPath, 'utf8').trim();
    
    // Parse version and release date (format: version|date)
    const [version, releaseDate] = versionData.split('|');
    
    res.json({ 
      version: version || versionData, // fallback if no pipe separator
      releaseDate: releaseDate || null 
    });
  } catch (error) {
    console.error('Error reading version:', error);
    res.status(500).json({ error: 'Failed to read version' });
  }
});

export default router;
