import mongoose from 'mongoose';
const { Schema } = mongoose;

const senderProfileSchema = new Schema({
    senderName: {
        type: String,
        required: true,
        trim: true
    },
    host: {
        type: String,
        required: true,
        trim: true
    },
    port: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        trim: true
    },
    secure: {
        type: Boolean,
        required: true, // true for SSL (port 465), false for TLS or other ports
        default: false
    },
}, { timestamps: true });

const SenderProfile = mongoose.model('SenderProfile', senderProfileSchema);
export default SenderProfile;