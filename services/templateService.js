// src/services/templateService.js

/**
 * Renders an email template by replacing placeholders with contact-specific data.
 * @param {string} templateBody - The raw HTML or text content of the email template.
 * @param {object} data - An object containing the placeholders and their respective values.
 * @returns {string} - The final rendered template with all placeholders replaced.
 */
export const renderTemplate = (templateBody, data) => {
    // Replace placeholder for double curly brackets
    /* return templateBody.replace(/{{\s*([\w.]+)\s*}}/g, (match, key) => {
        return data[key] || '';
    }); */

    // Replace placeholder for both single and double curly brackets
    return templateBody.replace(/{{?\s*([\w.]+)\s*}}?/g, (match, key) => {
        // Replace each placeholder with the corresponding value from the data object
        return data[key] || ''; // If key not found in data, replace with empty string
    });
};
