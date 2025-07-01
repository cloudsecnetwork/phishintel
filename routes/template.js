// src/routes/template.js
import express from 'express';
import {
    createTemplate,
    getAllTemplates,
    getTemplateById,
    updateTemplate,
    deleteTemplate
} from '../controllers/templateController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { uploadHTML } from '../middlewares/uploadHTML.js'; // Import the uploadHTML middleware

const router = express.Router();

// Protect routes with authMiddleware
router.use(authMiddleware);

// Create a new template (with HTML file upload)
router.post('/', uploadHTML.single('file'), createTemplate);

// Get all templates
router.get('/', getAllTemplates);

// Get a specific template by ID
router.get('/:id', getTemplateById);

// Update a template by ID
router.put('/:id', uploadHTML.single('file'), updateTemplate);

// Delete a template by ID
router.delete('/:id', deleteTemplate);

export default router;
