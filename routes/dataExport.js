import express from 'express';
import {
    exportEmailClicks,
    exportSubmissions
} from '../controllers/dataExportController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect routes with authMiddleware
router.use(authMiddleware);

router.get('/email-clicks', exportEmailClicks);
router.get('/submissions', exportSubmissions);

export default router;
