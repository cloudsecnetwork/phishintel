import { HtmlValidate } from 'html-validate';

const EXEMPTED_RULE_IDS = ['element-required-attributes', 'element-required-content'];

/**
 * Validate if the HTML content is well-formed
 * @param {string} htmlContent
 * @returns {Promise<string[]>} - List of errors
 */
export const validateHTMLContent = async (htmlContent) => {
    const validator = new HtmlValidate();

    try {
        const results = await validator.validateString(htmlContent);

        if (results?.valid === false && results?.errorCount > 0) {
            const filteredMessages = results.results
                .flatMap(result =>
                    result.messages
                        .filter(message => !EXEMPTED_RULE_IDS.includes(message.ruleId))
                        .map(message => `Line ${message.line}: ${message.message}`)
                );
            return filteredMessages;
        }

        return [];
    } catch (error) {
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

/** Allowed keys for cssSettings (must match templateService.ALLOWED_CSS_KEYS) */
const ALLOWED_CSS_KEYS = ['fontFamily', 'fontSize', 'primaryColor'];

/**
 * Sanitize cssSettings to only allow whitelisted keys and string values.
 * @param {object} cssSettings - Raw cssSettings from request
 * @returns {object|null} - Sanitized object or null
 */
export const sanitizeCssSettings = (cssSettings) => {
    if (cssSettings == null || typeof cssSettings !== 'object') return null;
    const out = {};
    let hasAny = false;
    for (const key of ALLOWED_CSS_KEYS) {
        if (cssSettings[key] != null && typeof cssSettings[key] === 'string') {
            const v = String(cssSettings[key]).trim();
            if (v.length > 0 && v.length < 500) {
                out[key] = v;
                hasAny = true;
            }
        }
    }
    return hasAny ? out : null;
};
