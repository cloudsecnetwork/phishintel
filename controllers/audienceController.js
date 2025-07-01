// src\controllers\audienceController.js
import Audience from '../models/Audience.js';
import Contact from '../models/Contact.js';
import fs from 'fs';
import path from 'path';
import { parseCSVAndCreateContacts } from '../utils/fileUtils.js';
import { validateCSVHeaders, validateCSVRows } from '../utils/validationUtils.js';
import { __dirname } from '../utils/utils.js';

// Create a new audience (supports both manual input and CSV upload)
export const createAudience = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Audience name is required'
            });
        }

        let contactIds = [];

        // Check if the CSV file is uploaded and validate it
        if (req.file) {
            const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);

            // Ensure filePath is a string
            if (typeof filePath !== 'string' || !filePath.trim()) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid file path detected. Please re-upload the CSV file.'
                });
            }

            try {
                // Check if the file exists
                if (!fs.existsSync(filePath)) {
                    return res.status(400).json({
                        success: false,
                        message: 'Uploaded file does not exist. Please try again.'
                    });
                }

                // Check if the file is empty
                const stats = fs.statSync(filePath);
                if (stats.size === 0) {
                    fs.unlinkSync(filePath); // Clean up the empty file
                    return res.status(400).json({
                        success: false,
                        message: 'The uploaded CSV file is empty. Please ensure the file contains valid data before uploading.'
                    });
                }

                // Validate CSV headers
                const headersValid = await validateCSVHeaders(filePath, ['firstName', 'email']);
                if (!headersValid) {
                    fs.unlinkSync(filePath); // Clean up the invalid file
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid CSV headers. Expected headers: firstName, email'
                    });
                }

                // Parse CSV and validate rows
                const { validRows, errors } = await validateCSVRows(filePath, ['firstName', 'email']);
                if (errors.length > 0) {
                    fs.unlinkSync(filePath); // Clean up the invalid file

                    // Limit the errors to a maximum of 5 for the message
                    const maxErrorsToShow = 5;
                    const errorMessages = errors.slice(0, maxErrorsToShow).map(
                        (error) => `Row ${error.row}: ${error.message}`
                    );

                    if (errors.length > maxErrorsToShow) {
                        errorMessages.push(`...and ${errors.length - maxErrorsToShow} more errors.`);
                    }

                    return res.status(400).json({
                        success: false,
                        message: `The uploaded file contains invalid entries. The following issues were found:\n\n${errorMessages.join('\n')}`
                    });
                }

                // Process valid rows to create contacts
                contactIds = await parseCSVAndCreateContacts(filePath);

                // Delete the uploaded CSV file after processing
                fs.unlinkSync(filePath);
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: `Error processing CSV file: ${error.message}`
                });
            }
        } else {
            return res.status(400).json({
                success: false,
                message: 'No file was uploaded. Please upload a valid CSV file.'
            });
        }

        // Create the new audience with the contacts
        const newAudience = new Audience({
            name,
            contacts: contactIds
        });
        await newAudience.save();

        res.status(201).json({
            success: true,
            message: 'Audience created successfully',
            data: newAudience
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Unexpected error: ${error.message}`
        });
    }
};

// Get all audiences
export const getAllAudiences = async (req, res) => {
    try {
        const audiences = await Audience.find().sort({ createdAt: -1 });
        const audiencesWithContactCount = audiences.map(audience => ({
            ...audience.toObject(),
            contactCount: Array.isArray(audience.contacts) ? audience.contacts.length : 0
        }));

        res.status(200).json({
            success: true,
            message: 'Audiences retrieved successfully',
            data: audiencesWithContactCount
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get an audience by ID
export const getAudienceById = async (req, res) => {
    try {
        const { id } = req.params;
        const audience = await Audience.findById(id).populate('contacts');

        if (!audience) {
            return res.status(404).json({
                success: false,
                message: 'Audience not found'
            });
        }

        const contactCount = audience.contacts ? audience.contacts.length : 0;

        res.status(200).json({
            success: true,
            message: 'Audience retrieved successfully',
            data: {
                ...audience.toObject(),
                contactCount
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete an audience by ID and its associated contacts
export const deleteAudience = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the audience by ID
        const audience = await Audience.findById(id).populate('contacts');
        if (!audience) {
            return res.status(404).json({
                success: false,
                message: 'Audience not found'
            });
        }

        // Delete all associated contacts
        await Contact.deleteMany({ _id: { $in: audience.contacts } });

        // Delete the audience
        await Audience.findByIdAndDelete(id); // Corrected deletion method

        res.status(200).json({
            success: true,
            message: 'Audience and associated contacts deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Add a new contact to an audience
export const addContactToAudience = async (req, res) => {
    try {
        const { id } = req.params; // Audience ID
        const { firstName, lastName, email, phoneNumber, role, department, company, country } = req.body;

        // Validate required fields
        if (!firstName || !email) {
            return res.status(400).json({
                success: false,
                message: 'First name and email are required'
            });
        }

        // Find the audience by ID
        const audience = await Audience.findById(id);
        if (!audience) {
            return res.status(404).json({
                success: false,
                message: 'Audience not found'
            });
        }

        // Create a new contact
        const newContact = new Contact({
            firstName,
            lastName,
            email,
            phoneNumber,
            role,
            department,
            company,
            country
        });

        // Save the new contact to the database
        const savedContact = await newContact.save();

        // Add the contact ID to the audience's contacts array
        audience.contacts.push(savedContact._id);
        await audience.save();

        res.status(201).json({
            success: true,
            message: 'Contact added successfully to audience',
            data: savedContact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Delete a specific contact from an audience
export const deleteContactFromAudience = async (req, res) => {
    try {
        const { id, contactId } = req.params;

        // Find the audience and remove the contact from the contacts array
        const audience = await Audience.findById(id);
        if (!audience) {
            return res.status(404).json({
                success: false,
                message: 'Audience not found'
            });
        }

        // Check if the contact exists in the audience's contacts list
        if (!audience.contacts.includes(contactId)) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found in this audience'
            });
        }

        // Remove the contact ID from the audience's contacts array
        audience.contacts = audience.contacts.filter(id => id.toString() !== contactId);
        await audience.save();

        // Delete the contact from the Contact collection
        await Contact.findByIdAndDelete(contactId);

        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully from audience'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};