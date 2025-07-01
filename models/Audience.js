import mongoose from 'mongoose';
const { Schema } = mongoose;

const audienceSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    AIContextEnabled: {
        type: Boolean,
        default: false,
    },
    contacts: [{
        type: Schema.Types.ObjectId,
        ref: 'Contact',
        required: true
    }],
}, { timestamps: true });

const Audience = mongoose.model('Audience', audienceSchema);

export default Audience;