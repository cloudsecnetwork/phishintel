import express from 'express';
import { getResourceOverview } from '../controllers/resourceController.js';
import authMiddleware from '../middlewares/authMiddleware.js';  // Assuming routes are protected

const router = express.Router();

// Protect routes with authMiddleware
router.use(authMiddleware);

// Define the route to get the resource overview
router.get('/overview', getResourceOverview);

export default router;
