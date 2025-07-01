// src/models/CampaignTracking.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const campaignTrackingSchema = new Schema({
    campaign: {
        type: Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true
    },
    contact: {
        type: Schema.Types.ObjectId,
        ref: 'Contact',
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    shortId: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'sent', 'failed', 'disabled'],
        default: 'pending'
    },
    lastAttempt: {
        type: Date,
        default: null
    },
    attemptCount: {
        type: Number,
        default: 0
    },
    error: {
        type: String,
        default: null
    }
}, { timestamps: true });

const CampaignTracking = mongoose.model('CampaignTracking', campaignTrackingSchema);
export default CampaignTracking;
