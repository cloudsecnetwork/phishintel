import express from 'express';
import { deleteSubmission } from '../controllers/submissionController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect routes with authMiddleware
router.use(authMiddleware);

// Delete a submission by ID
router.delete('/:id', deleteSubmission);

export default router;
