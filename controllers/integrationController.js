import * as aiIntegrationService from '../services/aiIntegrationService.js';

export async function getAIModelsConfig(req, res) {
  try {
    const config = await aiIntegrationService.getModelsConfig();
    res.json({ success: true, data: config });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getAIIntegration(req, res) {
  try {
    const integration = await aiIntegrationService.getActiveIntegration();
    if (!integration) {
      return res.json({ success: true, data: null });
    }
    res.json({ success: true, data: integration });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function verifyAIIntegration(req, res) {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    const { provider, model, apiKey, baseUrl } = req.body;
    const url = (provider === 'ollama' && (!baseUrl || !String(baseUrl).trim()))
      ? 'http://localhost:11434'
      : baseUrl;
    aiIntegrationService.validateConfig({ provider, model, apiKey, baseUrl: url });
    res.json({ success: true, message: 'Configuration valid' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function upsertAIIntegration(req, res) {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    const data = await aiIntegrationService.upsertIntegration({
      provider: req.body.provider,
      model: req.body.model,
      apiKey: req.body.apiKey,
      baseUrl: req.body.baseUrl,
    });
    res.json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

export async function disconnectAIIntegration(req, res) {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    await aiIntegrationService.disconnectIntegration();
    res.json({ success: true, message: 'Integration disconnected' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export default {
  getAIModelsConfig,
  getAIIntegration,
  verifyAIIntegration,
  upsertAIIntegration,
  disconnectAIIntegration,
};
