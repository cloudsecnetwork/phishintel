import express from 'express';
import {
    createAudience,
    getAllAudiences,
    getAudienceById,
    deleteAudience,
    addContactToAudience,
    deleteContactFromAudience,
    uploadCSVToAudience
} from '../controllers/audienceController.js';
import { uploadCSV } from '../middlewares/uploadCSV.js'; // Updated path for middleware
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Protect routes with authMiddleware
router.use(authMiddleware);

// Create
router.post('/', uploadCSV, createAudience);
router.post('/:id/contact', addContactToAudience);

// Upload CSV to existing audience
router.post('/:id/upload-csv', uploadCSV, uploadCSVToAudience);

// Read
router.get('/', getAllAudiences);
router.get('/:id', getAudienceById);

// Delete
router.delete('/:id', deleteAudience);
router.delete('/:id/contact/:contactId', deleteContactFromAudience);


export default router;
