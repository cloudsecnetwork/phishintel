import mongoose from 'mongoose';
const { Schema } = mongoose;

const contactSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address']
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    metadata: {
        type: Map,
        of: Schema.Types.Mixed,
        default: new Map()
    }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;