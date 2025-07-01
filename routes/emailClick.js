import express from 'express';
import { deleteEmailClick } from '../controllers/emailClickController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect routes with authMiddleware
router.use(authMiddleware);

// Delete a specific email click by ID
router.delete('/:id', deleteEmailClick);

export default router;
