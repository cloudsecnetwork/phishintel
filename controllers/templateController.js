import fs from 'fs';
import path from 'path';
import { __dirname } from '../utils/utils.js';
import Template from '../models/Template.js';
import { validateHTMLContent, validatePlaceholders } from '../utils/templateUtils.js';

// Create a new template
export const createTemplate = async (req, res) => {
    try {
        const { name, subject, type } = req.body;
        let htmlContent = '';

        // Ensure that the file is uploaded
        if (req.file) {
            const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);

            // Check that the uploaded file is an HTML file
            if (req.file.mimetype !== 'text/html') {
                fs.unlinkSync(filePath); // Delete the file if it's not valid
                return res.status(400).json({
                    success: false,
                    message: 'Only HTML files are allowed',
                });
            }

            try {
                // Read the HTML file content and store it as a string
                htmlContent = fs.readFileSync(filePath, 'utf-8');

                // Delete the file after successfully reading the content
                fs.unlinkSync(filePath);
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }

            const HTMLErrors = await validateHTMLContent(htmlContent);
            if (HTMLErrors.length > 0) {
                const displayedErrors = HTMLErrors.slice(0, 3);
                let errorMessage = `Invalid HTML Content: ${displayedErrors.join(', ')}`;
                if (HTMLErrors.length > 3) {
                    const remainingErrorsCount = HTMLErrors.length - 3;
                    errorMessage += ` and ${remainingErrorsCount} more error${remainingErrorsCount > 1 ? 's' : ''}`;
                }
                return res.status(400).json({
                    success: false,
                    message: errorMessage,
                });
            }

            // Validate placeholders with double curly brackets
            const supportedFields = [
                'firstName', 'lastName', 'email', 'phoneNumber', 'role', 'country', 'link', 'department', 'company'
            ];
            const placeholderErrors = validatePlaceholders(htmlContent, supportedFields);

            if (placeholderErrors.length > 0) {
                const displayedErrors = placeholderErrors.slice(0, 3);
                let errorMessage = `Invalid placeholders detected: ${displayedErrors.join(', ')}`;
                if (placeholderErrors.length > 3) {
                    const remainingErrorsCount = placeholderErrors.length - 3;
                    errorMessage += ` and ${remainingErrorsCount} more error${remainingErrorsCount > 1 ? 's' : ''}`;
                }
                return res.status(400).json({
                    success: false,
                    message: errorMessage,
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'No HTML file was uploaded',
            });
        }

        // Create a new template instance
        const template = new Template({
            name,
            subject,
            type,
            htmlContent
        });

        // Save the template to the database
        await template.save();

        res.status(201).json({
            success: true,
            message: 'Email template created successfully',
            data: template
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get all templates
export const getAllTemplates = async (req, res) => {
    try {
        const templates = await Template.find().sort({ createdAt: -1 });;
        res.status(200).json({
            success: true,
            data: templates
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get a specific template by ID
export const getTemplateById = async (req, res) => {
    try {
        const template = await Template.findById(req.params.id);
        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'Template not found'
            });
        }
        res.status(200).json({
            success: true,
            data: template
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update a template
export const updateTemplate = async (req, res) => {
    try {
        // Find the existing template by ID
        const template = await Template.findById(req.params.id);

        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'Template not found',
            });
        }

        // Update only the provided fields, fallback to the current values for missing fields
        const updatedData = {
            name: req.body.name || template.name, // Keep the current name if not provided
            subject: req.body.subject || template.subject, // Keep the current subject if not provided
            htmlContent: req.body.htmlContent || template.htmlContent, // Update htmlContent if provided
        };

        console.log("req.body", req.body);

        // Perform the update
        const updatedTemplate = await Template.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Template updated successfully',
            data: updatedTemplate,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete a template
export const deleteTemplate = async (req, res) => {
    try {
        const template = await Template.findByIdAndDelete(req.params.id);
        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'Template not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Template deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
