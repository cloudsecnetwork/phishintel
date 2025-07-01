import mongoose from 'mongoose';
const { Schema } = mongoose;

const templateSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    htmlContent: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Template = mongoose.model('Template', templateSchema);
export default Template;
