import SenderProfile from '../models/SenderProfile.js';
import { verifySMTP } from '../services/smtpService.js';

// Create a new Sender Profile
export const createSenderProfile = async (req, res) => {
  try {
    const { senderName, email, host, port, secure, password } = req.body;

    // Verify SMTP details before proceeding
    await verifySMTP({ host, port, secure, email, password });

    // Create a new sender profile with plain text password
    const senderProfile = new SenderProfile({
      senderName,
      email,
      host,
      port,
      secure,
      password, // Store password as plain text for now
    });

    await senderProfile.save();

    res.status(201).json({
      success: true,
      message: 'Sender profile created successfully',
      data: senderProfile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all Sender Profiles
export const getAllSenderProfiles = async (req, res) => {
  try {
    const senderProfiles = await SenderProfile.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: senderProfiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get a specific Sender Profile by ID
export const getSenderProfileById = async (req, res) => {
  try {
    const senderProfile = await SenderProfile.findById(req.params.id);
    if (!senderProfile) {
      return res.status(404).json({
        success: false,
        message: 'Sender profile not found',
      });
    }
    res.status(200).json({
      success: true,
      data: senderProfile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update a Sender Profile
export const updateSenderProfile = async (req, res) => {
  try {
    const { senderName, email, host, port, secure, password } = req.body;

    const senderProfile = await SenderProfile.findByIdAndUpdate(
      req.params.id,
      { senderName, email, host, port, secure, password },
      { new: true, runValidators: true }
    );

    if (!senderProfile) {
      return res.status(404).json({
        success: false,
        message: 'Sender profile not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sender profile updated successfully',
      data: senderProfile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a Sender Profile
export const deleteSenderProfile = async (req, res) => {
  try {
    const senderProfile = await SenderProfile.findByIdAndDelete(req.params.id);
    if (!senderProfile) {
      return res.status(404).json({
        success: false,
        message: 'Sender profile not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Sender profile deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
