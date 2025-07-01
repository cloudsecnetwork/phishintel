import mongoose from 'mongoose';
const { Schema } = mongoose;

const emailClickSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  count: {
    type: Number,
    default: 1,
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
    required: true,
    ref: 'Campaign'
  }
}, { timestamps: true });

const EmailClick = mongoose.model('EmailClick', emailClickSchema);
export default EmailClick;
