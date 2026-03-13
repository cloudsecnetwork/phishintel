// src/services/templateService.js

import { Marked } from 'marked';

/** Allowed keys for cssSettings (whitelist for safety) */
export const ALLOWED_CSS_KEYS = ['fontFamily', 'fontSize', 'primaryColor'];

const CSS_UNSAFE_PATTERN = /[{}<>;@\\]/;

/**
 * Escapes a CSS value by rejecting strings that contain characters
 * capable of breaking out of a CSS declaration.
 * @param {string} value
 * @param {string} fallback
 * @returns {string}
 */
function safeCssValue(value, fallback) {
    if (!value || typeof value !== 'string') return fallback;
    const trimmed = value.trim();
    if (CSS_UNSAFE_PATTERN.test(trimmed)) return fallback;
    return trimmed;
}

const md = new Marked({ gfm: true, breaks: true });

/**
 * Converts Markdown to HTML. Placeholders like {{ firstName }} are left unchanged.
 * @param {string} markdown - Markdown source
 * @returns {Promise<string>} - HTML string
 */
export const convertMarkdownToHtml = async (markdown) => {
    if (!markdown || typeof markdown !== 'string') return '';
    const html = await md.parse(markdown);
    return html ?? '';
};

/**
 * Applies template CSS settings to HTML by wrapping in a layout with inline styles.
 * @param {string} html - HTML body fragment
 * @param {object} cssSettings - Optional { fontFamily, fontSize, primaryColor }
 * @returns {string} - HTML with wrapper and styles applied
 */
export const applyCssSettings = (html, cssSettings) => {
    if (!cssSettings || typeof cssSettings !== 'object') return html;
    const safe = {};
    ALLOWED_CSS_KEYS.forEach((key) => {
        if (cssSettings[key] != null && typeof cssSettings[key] === 'string') {
            safe[key] = String(cssSettings[key]).trim();
        }
    });
    if (Object.keys(safe).length === 0) return html;

    const fontFamily = safeCssValue(safe.fontFamily, 'Arial, sans-serif');
    const fontSize = safeCssValue(safe.fontSize, '16px');
    const primaryColor = safeCssValue(safe.primaryColor, '#1976d2');

    const styleBlock = `
body { font-family: ${fontFamily}; font-size: ${fontSize}; line-height: 1.5; color: #333; }
a { color: ${primaryColor}; text-decoration: underline; }
`.trim();

    return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${styleBlock}</style></head><body>${html}</body></html>`;
};

/**
 * Renders an email template by replacing placeholders with contact-specific data.
 * Supports both double-brace ({{ key }}) and single-brace ({key}) placeholder syntax.
 * Single-brace placeholders are only replaced when the key exists in data so that
 * CSS rules and other legitimate brace usage are preserved.
 * @param {string} templateBody - The raw HTML or text content of the email template.
 * @param {object} data - An object containing the placeholders and their respective values.
 * @returns {string} - The final rendered template with all placeholders replaced.
 */
export const renderTemplate = (templateBody, data) => {
    const doubleBraceResult = templateBody.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_match, key) => {
        return data[key] || '';
    });

    return doubleBraceResult.replace(/\{\s*([\w.]+)\s*\}/g, (match, key) => {
        return key in data ? (data[key] || '') : match;
    });
};
