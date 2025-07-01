import nodemailer from 'nodemailer';
import SenderProfile from '../models/SenderProfile.js'

export const verifySMTP = async ({ host, port, secure, email, password }) => {

    // Determine if authentication is needed
    const authConfig = email && password ? { user: email, pass: password } : null;

    const transporter = nodemailer.createTransport({
        host,
        port,
        secure, // true for 465, false for other ports
        auth: authConfig
    });

    // Verify SMTP connection configuration
    await transporter.verify();
};

export const verifySMTPById = async (senderProfileId) => {
    // Fetch sender profile by ID
    const senderProfile = await SenderProfile.findById(senderProfileId);

    if (!senderProfile) {
        throw new Error("Sender profile not found");
    }

    // Verify SMTP details using the sender profile data
    return await verifySMTP({
        host: senderProfile.host,
        port: senderProfile.port,
        secure: senderProfile.secure,
        email: senderProfile.email,
        password: senderProfile.password,
    });
};