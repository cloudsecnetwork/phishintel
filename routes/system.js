import express from 'express';
import systemController from '../controllers/systemController.js';

const router = express.Router();

// Public: Check if system is initialized (root admin exists)
router.get('/setup-status', systemController.setupStatus);

// Public: Health check
router.get('/health', systemController.healthCheck);

export default router; 