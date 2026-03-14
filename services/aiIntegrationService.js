import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import AIIntegration from '../models/AIIntegration.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MODELS_CONFIG_PATH = path.join(__dirname, '..', 'data', 'models.json');

const PROVIDERS_REQUIRING_KEY = ['openai', 'gemini', 'claude'];
const PROVIDERS_REQUIRING_URL = ['ollama'];
const CONNECTIVITY_TIMEOUT_MS = 10000;

/**
 * Test connectivity to the configured AI provider before saving.
 * Throws an Error with a user-friendly message if the check fails.
 */
export async function testConnection({ provider, model, apiKey, baseUrl }) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONNECTIVITY_TIMEOUT_MS);

  try {
    if (provider === 'ollama') {
      const url = (baseUrl && String(baseUrl).trim()) ? String(baseUrl).trim().replace(/\/$/, '') : 'http://localhost:11434';
      const res = await fetch(`${url}/api/tags`, { signal: controller.signal });
      if (!res.ok) {
        throw new Error(`Ollama is not reachable at ${url}. Is the server running? (${res.status})`);
      }
      const data = await res.json().catch(() => ({}));
      const models = Array.isArray(data?.models) ? data.models : [];
      const modelNames = models.map((m) => (m.name || m.model || '').toLowerCase());
      const requestedModel = (model || '').trim().toLowerCase();
      if (requestedModel && !modelNames.some((n) => n.includes(requestedModel) || requestedModel.includes(n))) {
        throw new Error(`Model "${model}" was not found on the Ollama server. Available: ${modelNames.length ? modelNames.slice(0, 5).join(', ') : 'none'}.`);
      }
      return;
    }

    if (provider === 'openai') {
      const key = apiKey && String(apiKey).trim();
      if (!key) throw new Error('API key is required to verify OpenAI.');
      const res = await fetch('https://api.openai.com/v1/models', {
        signal: controller.signal,
        headers: { Authorization: `Bearer ${key}` },
      });
      if (res.status === 401) throw new Error('Invalid OpenAI API key.');
      if (!res.ok) {
        const msg = (await res.json().catch(() => ({}))).error?.message || res.statusText;
        throw new Error(`OpenAI request failed: ${msg || res.status}`);
      }
      return;
    }

    if (provider === 'gemini') {
      const key = apiKey && String(apiKey).trim();
      if (!key) throw new Error('API key is required to verify Gemini.');
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`, {
        signal: controller.signal,
      });
      if (res.status === 400 || res.status === 403) {
        const body = await res.json().catch(() => ({}));
        const msg = body.error?.message || 'Invalid API key or access denied.';
        throw new Error(msg);
      }
      if (!res.ok) throw new Error(`Gemini request failed: ${res.status} ${res.statusText}`);
      return;
    }

    if (provider === 'claude') {
      const key = apiKey && String(apiKey).trim();
      if (!key) throw new Error('API key is required to verify Claude.');
      const res = await fetch('https://api.anthropic.com/v1/models', {
        signal: controller.signal,
        headers: {
          'x-api-key': key,
          'anthropic-version': '2023-06-01',
        },
      });
      if (res.status === 401) throw new Error('Invalid Claude API key.');
      if (!res.ok) {
        const msg = (await res.json().catch(() => ({}))).error?.message || res.statusText;
        throw new Error(`Claude request failed: ${msg || res.status}`);
      }
      return;
    }

  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Connection timed out. Check the URL and that the service is running.');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Load AI models config from data/models.json.
 */
export async function getModelsConfig() {
  try {
    const raw = await fs.readFile(MODELS_CONFIG_PATH, 'utf8');
    const config = JSON.parse(raw);
    return config;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return {
        version: 1,
        updated: null,
        providers: {
          ollama: { defaultModelId: 'llama3.2', models: [{ id: 'llama3.2', name: 'Llama 3.2 (local)' }] },
          openai: { defaultModelId: 'gpt-4o-mini', models: [{ id: 'gpt-4o-mini', name: 'GPT-4o mini' }] },
          gemini: { defaultModelId: 'gemini-2.5-flash-lite', models: [{ id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash-Lite' }] },
          claude: { defaultModelId: 'claude-sonnet-4-6', models: [{ id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6' }] },
        },
      };
    }
    throw err;
  }
}

export async function getActiveIntegration() {
  const doc = await AIIntegration.findOne({ isActive: true }).lean();
  if (!doc) return null;
  const { apiKey, ...rest } = doc;
  return {
    ...rest,
    hasApiKey: Boolean(apiKey && apiKey.length > 0),
    hasBaseUrl: Boolean(doc.baseUrl && doc.baseUrl.length > 0),
  };
}

export async function getActiveIntegrationWithKey() {
  return AIIntegration.findOne({ isActive: true });
}

export function validateConfig({ provider, model, apiKey, baseUrl }) {
  if (!provider || !model) {
    throw new Error('Provider and model are required');
  }
  if (!['ollama', 'openai', 'gemini', 'claude'].includes(provider)) {
    throw new Error('Invalid provider');
  }
  if (PROVIDERS_REQUIRING_KEY.includes(provider) && (!apiKey || !String(apiKey).trim())) {
    throw new Error('API key is required for this provider');
  }
}

export async function upsertIntegration({ provider, model, apiKey, baseUrl }) {
  const url = (provider === 'ollama' && (!baseUrl || !String(baseUrl).trim()))
    ? 'http://localhost:11434'
    : (baseUrl && String(baseUrl).trim()) || '';
  validateConfig({ provider, model, apiKey, baseUrl: url || baseUrl });

  let keyForTest = apiKey != null ? String(apiKey).trim() : '';
  if (['openai', 'gemini', 'claude'].includes(provider) && !keyForTest) {
    const existing = await AIIntegration.findOne({ isActive: true });
    if (existing && existing.apiKey) keyForTest = existing.apiKey;
  }

  await testConnection({
    provider,
    model: (model || '').trim(),
    apiKey: keyForTest,
    baseUrl: url || baseUrl,
  });

  await AIIntegration.updateMany({}, { $set: { isActive: false } });

  const payload = {
    provider,
    model: (model || '').trim(),
    isActive: true,
  };
  if (apiKey !== undefined && apiKey !== null) payload.apiKey = String(apiKey).trim();
  if (provider === 'ollama') payload.baseUrl = url || (baseUrl && String(baseUrl).trim()) || 'http://localhost:11434';
  else if (baseUrl !== undefined && baseUrl !== null) payload.baseUrl = String(baseUrl).trim();

  let doc = await AIIntegration.findOne({ isActive: true });
  if (doc) {
    doc.provider = payload.provider;
    doc.model = payload.model;
    doc.apiKey = payload.apiKey ?? doc.apiKey;
    doc.baseUrl = payload.baseUrl ?? doc.baseUrl;
    doc.isActive = true;
    await doc.save();
  } else {
    doc = new AIIntegration(payload);
    await doc.save();
  }

  const { apiKey: _key, ...safe } = doc.toObject();
  return { ...safe, hasApiKey: Boolean(doc.apiKey && doc.apiKey.length > 0) };
}

export async function disconnectIntegration() {
  const doc = await AIIntegration.findOne({ isActive: true });
  if (!doc) return null;
  doc.isActive = false;
  doc.apiKey = '';
  doc.baseUrl = '';
  await doc.save();
  return doc;
}
