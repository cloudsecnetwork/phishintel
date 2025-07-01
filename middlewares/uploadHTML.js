// src/middlewares/uploadHTML.js
import multer from 'multer';
import path from 'path';
import { __dirname } from '../utils/utils.js';

// Configure multer for HTML file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads')); // Save files to the uploads folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Save file with a unique name
    }
});

// Define the file filter to accept only HTML files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/html') {
        cb(null, true); // Accept HTML files
    } else {
        cb(new Error('Only HTML files are allowed'), false); // Reject non-HTML files
    }
};

// Initialize multer with storage and file filter settings
export const uploadHTML = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});
