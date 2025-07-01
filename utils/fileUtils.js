// src/utils/fileUtils.js
import fs from 'fs';
import csvParser from 'csv-parser';
import Contact from '../models/Contact.js';

// Helper function to parse CSV and create contact records
export const parseCSVAndCreateContacts = async (filePath) => {
    return new Promise((resolve, reject) => {
        const contacts = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                contacts.push(row); // Store each row (contact)
            })
            .on('end', async () => {
                try {
                    // Create contact records in the database and retrieve the inserted contacts' IDs
                    const contactDocs = await Contact.insertMany(contacts);
                    const contactIds = contactDocs.map(contact => contact._id);
                    resolve(contactIds);
                } catch (error) {
                    reject(error);
                }
            })
            .on('error', (error) => reject(error));
    });
};
