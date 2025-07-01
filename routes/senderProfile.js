import express from 'express';
import {
    createSenderProfile,
    getAllSenderProfiles,
    getSenderProfileById,
    updateSenderProfile,
    deleteSenderProfile
} from '../controllers/senderProfileController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect routes with authMiddleware
router.use(authMiddleware);

// Create
router.post('/', createSenderProfile);

// Read
router.get('/', getAllSenderProfiles);
router.get('/:id', getSenderProfileById);

// Update
router.put('/:id', updateSenderProfile);

// Delete
router.delete('/:id', deleteSenderProfile);

export default router;