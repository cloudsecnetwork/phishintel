import express from 'express';
import {
    getDashboardOverview,
    getTimelineData
} from '../controllers/dashboardController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect routes with authMiddleware
router.use(authMiddleware);

// Dashboard Overview
router.get('/overview', getDashboardOverview);

// Timeline Data
router.get('/timeline', getTimelineData);

export default router;
