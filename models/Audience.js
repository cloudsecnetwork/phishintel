import mongoose from 'mongoose';
const { Schema } = mongoose;

const audienceSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    contacts: [{
        type: Schema.Types.ObjectId,
        ref: 'Contact'
    }],
}, { timestamps: true });

const Audience = mongoose.model('Audience', audienceSchema);

export default Audience;