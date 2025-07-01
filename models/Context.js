import mongoose from 'mongoose';
const { Schema } = mongoose;

const contextSchema = new Schema(
    {
        contact: {
            type: Schema.Types.ObjectId,
            ref: 'Contact',
            required: true,
        },
        data: {
            type: Schema.Types.Mixed, // Flexible field to store unstructured JSON-like data
            required: true,
        },
    },
    { timestamps: true }
);

const Context = mongoose.model('Context', contextSchema);

export default Context;
