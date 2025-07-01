import mongoose from 'mongoose';
const { Schema } = mongoose;

const campaignSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    audience: {
        type: Schema.Types.ObjectId,
        ref: 'Audience',
        required: true
    },
    senderProfile: {
        type: Schema.Types.ObjectId,
        ref: 'SenderProfile',
        required: true
    },
    template: {
        type: Schema.Types.ObjectId,
        ref: 'Template'
    },
    emailConcurrency: {
        type: Number,
        required: true,
        default: 1
    },
    timeDelay: {
        type: Number,
        required: true,
        default: 0
    },
    phishingSite: {
        type: String,
        enum: ['microsoft'],
        default: 'microsoft'
    },
    AIEnabled: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['draft', 'scheduled', 'ongoing', 'completed', 'archived'],
        default: 'draft'
    }
}, { timestamps: true });

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;