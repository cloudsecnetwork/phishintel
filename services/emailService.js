// src/services/emailService.js
import nodemailer from 'nodemailer';
import CampaignTracking from '../models/CampaignTracking.js';
import { renderTemplate } from './templateService.js';

// Helper function to introduce delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const sendMultipleEmails = async (trackingEntry, senderProfile, template, timeDelay, origin) => {
    try {
        // Check if SMTP authentication is required
        const authConfig = senderProfile.email && senderProfile.password ? {
            user: senderProfile.email,
            pass: senderProfile.password
        } : null;

        // Create SMTP transporter
        const transporter = nodemailer.createTransport({
            host: senderProfile.host,
            port: senderProfile.port,
            secure: senderProfile.secure, // true for 465, false for other ports
            auth: authConfig
        });

        // Fetch contact data
        const contact = trackingEntry.contact;

        if (!template.htmlContent) {
            throw new Error("Template content is missing.");
        }

        // Dynamic Link Construction
        const url = new URL('/account/signin', origin);
        url.searchParams.set('id', trackingEntry.shortId);
        url.searchParams.set('src', 'email');
        const link = url.toString();

        // Prepare placeholders for email template
        const placeholders = {
            firstName: trackingEntry.contact.firstName,
            lastName: trackingEntry.contact.lastName,
            email: trackingEntry.contact.email,
            phoneNumber: trackingEntry.contact.phoneNumber,
            role: trackingEntry.contact.role,
            country: trackingEntry.contact.country,
            link,
            // Add metadata fields if they exist
            department: trackingEntry.contact.metadata?.get('department') || '',
            company: trackingEntry.contact.metadata?.get('company') || ''
        };

        // Render email body directly from the passed template object and contact data
        const emailBody = renderTemplate(template.htmlContent, placeholders);

        // Regular expression to validate email format
        const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        // Check if senderProfile.email is a valid email; if not, use a default or handle the error
        const fromAddress = isValidEmail(senderProfile.email) ? senderProfile.email : "no-reply@mail.com";

        // Email options
        const mailOptions = {
            from: `${senderProfile.senderName} <${fromAddress}>`,
            to: trackingEntry.email,
            subject: template.subject,
            html: emailBody
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Update CampaignTracking on success
        await CampaignTracking.findByIdAndUpdate(trackingEntry._id, {
            status: 'sent',
            lastAttempt: new Date(),
            attemptCount: trackingEntry.attemptCount + 1,
            error: null // Clear any previous error
        });

        console.log(`Email successfully sent to: ${trackingEntry.email}`);

        // Wait for timeDelay if set
        if (timeDelay) {
            await delay(timeDelay * 1000);
            console.log(`Next batch in ${timeDelay}s`);
        }
    } catch (error) {
        // Update CampaignTracking status to "failed" and log error message
        console.error(`Error sending email to: ${trackingEntry.email} - ${error.message}`);
        await CampaignTracking.findByIdAndUpdate(trackingEntry._id, {
            status: 'failed',
            lastAttempt: new Date(),
            attemptCount: trackingEntry.attemptCount + 1,
            error: error.message
        });
    }
};
