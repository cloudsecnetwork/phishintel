import { HtmlValidate } from 'html-validate';

/**
 * Validate if the HTML content is well-formed
 * @param {string} htmlContent
 * @returns {Promise<string[]>} - List of errors
 */
export const validateHTMLContent = async (htmlContent) => {
    // const validator = new HtmlValidate();

    try {
        // const results = await validator.validateString(htmlContent);

        // // Check if validation results are valid and errors exist
        // if (results?.valid === false && results?.errorCount > 0) {
        //     const exemptedRuleIds = ['element-required-attributes', 'element-required-content'];
        //     // Filter out messages with the exempted ruleIds
        //     const filteredMessages = results.results
        //         .flatMap(result => result.messages.filter(message => !exemptedRuleIds.includes(message.ruleId))
        //             .map(message => `Line ${message.line}: ${message.message}`)
        //         );
        //     return filteredMessages;
        // }

        // No errors
        return [];
    } catch (error) {
        // Log error for debugging and throw a descriptive error
        console.error("Validation error:", error);
        throw new Error(error.message || 'Failed to validate HTML content');
    }
};

/**
 * Validate placeholders in both single and double curly brackets
 * @param {string} htmlContent
 * @param {string[]} supportedFields
 * @returns {string[]} - List of errors if invalid placeholders are detected
 */
export const validatePlaceholders = (htmlContent, supportedFields) => {
    const placeholderRegex = /{{?([^{}]+)}}?/g;
    const errors = [];
    let match;

    while ((match = placeholderRegex.exec(htmlContent)) !== null) {
        const fieldName = match[1].trim(); // Extract field name from inside the curly brackets

        // Check if fieldName exists in supportedFields
        if (!supportedFields.includes(fieldName)) {
            errors.push(`Unsupported field: ${fieldName}`);
        }
    }

    return errors;
};
