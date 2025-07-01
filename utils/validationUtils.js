// src\utils\validationUtils.js
import csvParser from 'csv-parser';
import fs from 'fs';

/**
 * Validate CSV headers
 * @param {string} filePath - Path to the CSV file
 * @param {string[]} requiredHeaders - List of required headers
 * @returns {boolean} - True if headers are valid, false otherwise
 */
export const validateCSVHeaders = (filePath, requiredHeaders) => {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filePath);
        stream
            .pipe(csvParser())
            .on('headers', (headers) => {
                const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header));
                resolve(missingHeaders.length === 0);
            })
            .on('error', (error) => reject(error));
    });
};

/**
 * Validate CSV rows
 * @param {string} filePath - Path to the CSV file
 * @param {string[]} requiredFields - List of required fields
 * @param {string[]} optionalFields - List of optional fields
 * @returns {object} - Object containing validRows and errors
 */
export const validateCSVRows = (filePath, requiredFields, optionalFields = []) => {
    return new Promise((resolve, reject) => {
        const validRows = [];
        const errors = [];
        const emailSet = new Set(); // For deduplication
        let rowIndex = 1;

        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                const missingFields = requiredFields.filter((field) => !row[field] || row[field].trim() === '');
                const invalidEmail = row.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email);
                const duplicateEmail = row.email && emailSet.has(row.email);

                if (missingFields.length > 0) {
                    errors.push({
                        row: rowIndex,
                        missingFields,
                        message: 'Missing required fields',
                        data: row
                    });
                } else if (invalidEmail) {
                    errors.push({
                        row: rowIndex,
                        field: 'email',
                        message: 'Invalid email format',
                        data: row
                    });
                } else if (duplicateEmail) {
                    errors.push({
                        row: rowIndex,
                        field: 'email',
                        message: 'Duplicate email detected',
                        data: row
                    });
                } else {
                    // Validate optional fields if present
                    const optionalFieldErrors = optionalFields.filter((field) => {
                        if (row[field]) {
                            if (field === 'phoneNumber' && !/^\d+$/.test(row[field])) {
                                return true; // Phone number is invalid
                            }
                        }
                        return false;
                    });

                    if (optionalFieldErrors.length > 0) {
                        errors.push({
                            row: rowIndex,
                            invalidFields: optionalFieldErrors,
                            message: 'Optional field validation failed',
                            data: row
                        });
                    } else {
                        validRows.push(row);
                        emailSet.add(row.email); // Add email to deduplication set
                    }
                }

                rowIndex++;
            })
            .on('end', () => resolve({ validRows, errors }))
            .on('error', (error) => reject(error));
    });
};
