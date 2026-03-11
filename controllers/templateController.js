import fs from 'fs';
import path from 'path';
import { __dirname } from '../utils/utils.js';
import Template from '../models/Template.js';
import { validateHTMLContent, validatePlaceholders, sanitizeCssSettings } from '../utils/templateUtils.js';
import { convertMarkdownToHtml, applyCssSettings } from '../services/templateService.js';

const SUPPORTED_PLACEHOLDER_FIELDS = [
    'firstName', 'lastName', 'email', 'phoneNumber', 'role', 'country', 'link', 'department', 'company'
];

function parseCssSettingsFromBody(body) {
    if (body.cssSettings == null) return null;
    if (typeof body.cssSettings === 'object') return sanitizeCssSettings(body.cssSettings);
    try {
        const parsed = JSON.parse(body.cssSettings);
        return sanitizeCssSettings(parsed);
    } catch {
        return null;
    }
}

// Create a new template
export const createTemplate = async (req, res) => {
    try {
        const { name, subject, type } = req.body;
        let htmlContent = '';
        let sourceFormat = 'html';
        let markdownContent = '';
        let cssSettings = null;

        // Markdown path: body has sourceFormat + markdownContent (no file)
        if (req.body.sourceFormat === 'markdown' && req.body.markdownContent != null) {
            sourceFormat = 'markdown';
            markdownContent = String(req.body.markdownContent);
            cssSettings = parseCssSettingsFromBody(req.body);

            if (!name || !subject || !type) {
                return res.status(400).json({
                    success: false,
                    message: 'name, subject, and type are required',
                });
            }

            const rawHtml = await convertMarkdownToHtml(markdownContent);

            const placeholderErrors = validatePlaceholders(rawHtml || '', SUPPORTED_PLACEHOLDER_FIELDS);
            htmlContent = applyCssSettings(rawHtml || '<p></p>', cssSettings);
            if (placeholderErrors.length > 0) {
                const displayedErrors = placeholderErrors.slice(0, 3);
                let errorMessage = `Invalid placeholders: ${displayedErrors.join(', ')}`;
                if (placeholderErrors.length > 3) {
                    errorMessage += ` and ${placeholderErrors.length - 3} more`;
                }
                return res.status(400).json({ success: false, message: errorMessage });
            }
        } else if (req.file) {
            // File upload path (existing behavior)
            const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);

            if (req.file.mimetype !== 'text/html') {
                fs.unlinkSync(filePath);
                return res.status(400).json({
                    success: false,
                    message: 'Only HTML files are allowed',
                });
            }

            try {
                htmlContent = fs.readFileSync(filePath, 'utf-8');
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

            const placeholderErrors = validatePlaceholders(htmlContent, SUPPORTED_PLACEHOLDER_FIELDS);
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
                message: 'Provide either an HTML file upload or markdown content (sourceFormat: "markdown", markdownContent)',
            });
        }

        const template = new Template({
            name,
            subject,
            type,
            htmlContent,
            sourceFormat,
            markdownContent: sourceFormat === 'markdown' ? markdownContent : undefined,
            cssSettings: sourceFormat === 'markdown' ? cssSettings : undefined,
        });

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

// Get templates list with optional search and pagination (for Saved list UI)
export const getTemplateList = async (req, res) => {
    try {
        const search = (req.query.search || '').trim();
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const perPage = Math.min(100, Math.max(1, parseInt(req.query.per_page, 10) || 15));

        const query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { subject: { $regex: search, $options: 'i' } },
                { type: { $regex: search, $options: 'i' } },
            ];
        }

        const total = await Template.countDocuments(query);
        const lastPage = Math.max(1, Math.ceil(total / perPage));
        const skip = (page - 1) * perPage;
        const templates = await Template.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(perPage)
            .lean();

        const from = total === 0 ? null : skip + 1;
        const to = total === 0 ? null : Math.min(skip + perPage, total);

        res.status(200).json({
            success: true,
            data: {
                templates,
                pagination: {
                    current_page: page,
                    last_page: lastPage,
                    per_page: perPage,
                    total,
                    from,
                    to,
                },
                filters: { search },
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
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
        const template = await Template.findById(req.params.id);

        if (!template) {
            return res.status(404).json({
                success: false,
                message: 'Template not found',
            });
        }

        const updatedData = {
            name: req.body.name ?? template.name,
            subject: req.body.subject ?? template.subject,
        };

        if (req.body.markdownContent != null && String(req.body.markdownContent).trim() !== '') {
            const markdownContent = String(req.body.markdownContent);
            const cssSettings = parseCssSettingsFromBody(req.body);
            const rawHtml = await convertMarkdownToHtml(markdownContent);

            const placeholderErrors = validatePlaceholders(rawHtml || '', SUPPORTED_PLACEHOLDER_FIELDS);
            if (placeholderErrors.length > 0) {
                const displayedErrors = placeholderErrors.slice(0, 3);
                const errorMessage = `Invalid placeholders: ${displayedErrors.join(', ')}`;
                return res.status(400).json({ success: false, message: errorMessage });
            }

            const htmlContent = applyCssSettings(rawHtml || '<p></p>', cssSettings);
            updatedData.htmlContent = htmlContent;
            updatedData.sourceFormat = 'markdown';
            updatedData.markdownContent = markdownContent;
            updatedData.cssSettings = cssSettings ?? template.cssSettings;
        } else if (req.body.markdownContent != null) {
            // Explicit empty markdown from composer: clear body and keep markdown template
            const cssSettings = parseCssSettingsFromBody(req.body);
            const htmlContent = applyCssSettings('<p></p>', cssSettings ?? template.cssSettings);
            updatedData.htmlContent = htmlContent;
            updatedData.sourceFormat = 'markdown';
            updatedData.markdownContent = '';
            updatedData.cssSettings = cssSettings ?? template.cssSettings;
        } else if (req.body.htmlContent != null) {
            updatedData.htmlContent = req.body.htmlContent;
            updatedData.sourceFormat = 'html';
            updatedData.markdownContent = '';
        } else {
            updatedData.htmlContent = template.htmlContent;
        }

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
