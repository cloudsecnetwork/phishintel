import mongoose from 'mongoose';

// API key is stored in plain text for now; consider encryption-at-rest or a secrets backend later.
// All key access should go through the aiIntegrationService layer.
const AIIntegrationSchema = new mongoose.Schema({
  provider: {
    type: String,
    enum: ['ollama', 'openai', 'gemini', 'claude'],
    required: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  apiKey: {
    type: String,
    trim: true,
    default: '',
  },
  baseUrl: {
    type: String,
    trim: true,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

AIIntegrationSchema.index({ isActive: 1 });

const AIIntegration = mongoose.model('AIIntegration', AIIntegrationSchema);
export default AIIntegration;
