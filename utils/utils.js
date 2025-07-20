// utils/dirname.js
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Extract the real client IP address from request headers
 * @param {Object} req - Express request object
 * @returns {string} The real client IP address
 */
export const getClientIP = (req) => {
    // Check for forwarded headers first (most common in production)
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
        // x-forwarded-for can contain multiple IPs, take the first one
        const ips = forwarded.split(',').map(ip => ip.trim());
        return ips[0];
    }

    // Check for other common proxy headers
    const realIP = req.headers['x-real-ip'];
    if (realIP) {
        return realIP;
    }

    // Check for CF-Connecting-IP (Cloudflare)
    const cfIP = req.headers['cf-connecting-ip'];
    if (cfIP) {
        return cfIP;
    }

    // Check for X-Client-IP
    const clientIP = req.headers['x-client-ip'];
    if (clientIP) {
        return clientIP;
    }

    // Fallback to req.ip (which should now work correctly with trust proxy)
    if (req.ip) {
        // Remove IPv6 mapping prefix if present
        const ip = req.ip.replace(/^::ffff:/, '');
        return ip;
    }

    // Last resort - use connection remote address
    return req.connection?.remoteAddress || req.socket?.remoteAddress || 'unknown';
};
