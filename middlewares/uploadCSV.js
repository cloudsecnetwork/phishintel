// src/middlewares/uploadCSV.js
import multer from 'multer';
import path from 'path';
import { __dirname } from '../utils/utils.js';

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads')); // Upload directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

// Initialize multer with file size limit
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limit file size to 5MB
    }
});

// Middleware for handling CSV file upload
export const uploadCSV = upload.single('file');
