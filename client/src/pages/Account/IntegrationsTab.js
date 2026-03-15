import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Alert,
  CircularProgress,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Card,
  CardContent,
  Chip,
  Stack,
  alpha,
  useTheme,
} from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import PowerOffRoundedIcon from '@mui/icons-material/PowerOffRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import { getAIModelsConfig, getAIIntegration, verifyAndSaveAIIntegration, disconnectAIIntegration } from '../../services/integrationService';

const DEFAULT_OLLAMA_URL = 'http://localhost:11434';

const PROVIDER_LABELS = {
  ollama: 'Ollama',
  openai: 'OpenAI',
  claude: 'Claude',
  gemini: 'Gemini',
};

const IntegrationsTab = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [modelsConfig, setModelsConfig] = useState(null);
  const [saving, setSaving] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [integration, setIntegration] = useState(null);
  const [form, setForm] = useState({
    provider: 'ollama',
    model: 'llama3.2',
    apiKey: '',
    baseUrl: DEFAULT_OLLAMA_URL,
  });

  const providers = modelsConfig?.providers
    ? Object.keys(modelsConfig.providers).map((key) => ({
        value: key,
        label: PROVIDER_LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1),
      }))
    : [];
  const providerConfig = modelsConfig?.providers?.[form.provider];
  const modelOptions = providerConfig?.models?.map((m) => ({ value: m.id, label: m.name })) ?? [];

  const needsApiKey = ['openai', 'gemini', 'claude'].includes(form.provider);
  const needsBaseUrl = form.provider === 'ollama';

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setError('');
      try {
        const [configRes, integrationRes] = await Promise.all([
          getAIModelsConfig(),
          getAIIntegration(),
        ]);
        if (!mounted) return;
        if (configRes.success && configRes.data) setModelsConfig(configRes.data);
        if (integrationRes.success) {
          setIntegration(integrationRes.data || null);
          if (integrationRes.data) {
            const p = integrationRes.data.provider || 'ollama';
            const prov = configRes.data?.providers?.[p];
            const modelList = prov?.models ?? [];
            const currentModel = integrationRes.data.model || prov?.defaultModelId;
            const modelInList = modelList.some((m) => m.id === currentModel);
            setForm((prev) => ({
              ...prev,
              provider: p,
              model: modelInList ? currentModel : (prov?.defaultModelId ?? prov?.models?.[0]?.id),
              baseUrl: p === 'ollama' ? (integrationRes.data.baseUrl || DEFAULT_OLLAMA_URL) : prev.baseUrl,
              apiKey: '',
            }));
          } else if (configRes.data?.providers) {
            const firstProvider = Object.keys(configRes.data.providers)[0] || 'ollama';
            const def = configRes.data.providers[firstProvider]?.defaultModelId ?? configRes.data.providers[firstProvider]?.models?.[0]?.id;
            setForm((prev) => ({
              ...prev,
              provider: firstProvider,
              model: def,
              baseUrl: firstProvider === 'ollama' ? DEFAULT_OLLAMA_URL : '',
            }));
          }
        }
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!providerConfig) return;
    const modelIds = providerConfig.models?.map((m) => m.id) ?? [];
    setForm((prev) => {
      const nextModel = modelIds.includes(prev.model) ? prev.model : (providerConfig.defaultModelId ?? modelIds[0]);
      return {
        ...prev,
        model: nextModel,
        baseUrl: form.provider === 'ollama' ? (prev.baseUrl || DEFAULT_OLLAMA_URL) : '',
      };
    });
  }, [form.provider, modelsConfig]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleVerifyAndSave = async () => {
    setError('');
    setSuccess('');
    if (needsApiKey && !form.apiKey.trim() && !integration?.hasApiKey) {
      setError('API key is required for this provider.');
      return;
    }
    if (needsBaseUrl && !form.baseUrl.trim()) {
      setError('Base URL is required for Ollama.');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        provider: form.provider,
        model: form.model,
      };
      if (needsApiKey) payload.apiKey = form.apiKey.trim();
      if (needsBaseUrl) payload.baseUrl = form.baseUrl.trim() || DEFAULT_OLLAMA_URL;
      const res = await verifyAndSaveAIIntegration(payload);
      if (res.success) {
        setSuccess('Integration verified and saved.');
        setIntegration(res.data || { ...integration, ...form, hasApiKey: !!form.apiKey });
        setForm((prev) => ({ ...prev, apiKey: '' }));
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to save integration');
    } finally {
      setSaving(false);
    }
  };

  const handleDisconnect = async () => {
    setError('');
    setSuccess('');
    setDisconnecting(true);
    try {
      const res = await disconnectAIIntegration();
      if (res.success) {
        setSuccess('Integration disconnected.');
        setIntegration(null);
        const firstProvider = providers.length ? providers[0].value : 'ollama';
        const prov = modelsConfig?.providers?.[firstProvider];
        setForm({
          provider: firstProvider,
          model: prov?.defaultModelId ?? prov?.models?.[0]?.id,
          apiKey: '',
          baseUrl: firstProvider === 'ollama' ? DEFAULT_OLLAMA_URL : '',
        });
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to disconnect');
    } finally {
      setDisconnecting(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 6,
          gap: 2,
        }}
      >
        <CircularProgress size={32} thickness={4} sx={{ color: 'primary.main' }} />
        <Typography variant="body2" color="text.secondary">
          Loading…
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Status card */}
      <Card
        variant="outlined"
        sx={{
          mb: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: integration ? alpha(theme.palette.primary.main, 0.3) : 'divider',
          bgcolor: integration ? alpha(theme.palette.primary.main, 0.04) : 'background.paper',
          boxShadow: 'none',
        }}
      >
        <CardContent sx={{ py: 2, px: 2.5, '&:last-child': { pb: 2 } }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1}>
            <Stack direction="row" alignItems="center" gap={1.5}>
              {integration ? (
                <CheckCircleOutlinedIcon sx={{ color: 'success.main', fontSize: 28 }} />
              ) : (
                <PowerOffRoundedIcon sx={{ color: 'text.disabled', fontSize: 28 }} />
              )}
              <Box>
                <Typography variant="subtitle2" fontWeight={600} color="text.primary">
                  {integration ? 'Connected' : 'Not connected'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {integration
                    ? `${integration.provider} · ${integration.model}${integration.baseUrl ? ` · ${integration.baseUrl}` : ''}`
                    : 'Connect an AI provider to use AI features.'}
                </Typography>
              </Box>
            </Stack>
            {integration && (
              <Chip
                size="small"
                icon={<LinkRoundedIcon sx={{ fontSize: 16 }} />}
                label="Active"
                color="success"
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Configuration card */}
      <Card
        variant="outlined"
        sx={{
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: 'none',
        }}
      >
        <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
          <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2 }}>
            <PsychologyRoundedIcon sx={{ color: 'primary.main', fontSize: 22 }} />
            <Typography variant="subtitle1" fontWeight={600}>
              AI provider
            </Typography>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
              {success}
            </Alert>
          )}

          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="provider-label">Provider</InputLabel>
            <Select
              labelId="provider-label"
              id="provider"
              name="provider"
              value={form.provider}
              label="Provider"
              onChange={handleChange}
            >
              {providers.map((p) => (
                <MenuItem key={p.value} value={p.value}>
                  {p.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="model-label">Model</InputLabel>
            <Select
              labelId="model-label"
              id="model"
              name="model"
              value={form.model}
              label="Model"
              onChange={handleChange}
            >
              {modelOptions.map((m) => (
                <MenuItem key={m.value} value={m.value}>
                  {m.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {needsApiKey && (
            <TextField
              size="small"
              fullWidth
              name="apiKey"
              label="API key"
              type="password"
              value={form.apiKey}
              onChange={handleChange}
              placeholder={integration?.hasApiKey ? '••••••••' : ''}
              helperText={integration?.hasApiKey ? 'Leave blank to keep existing key' : 'Required for this provider'}
              sx={{ mb: 2 }}
            />
          )}
          {needsBaseUrl && (
            <TextField
              size="small"
              fullWidth
              name="baseUrl"
              label="Ollama server URL"
              value={form.baseUrl}
              onChange={handleChange}
              placeholder={DEFAULT_OLLAMA_URL}
              helperText="e.g. http://localhost:11434"
              sx={{ mb: 2 }}
            />
          )}

          <Stack direction="row" gap={1.5} sx={{ mt: 2, pt: 1 }}>
            <Button
              variant="contained"
              onClick={handleVerifyAndSave}
              disabled={saving}
              startIcon={saving ? <CircularProgress size={18} color="inherit" /> : null}
            >
              {saving ? 'Saving…' : 'Verify & save'}
            </Button>
            {integration && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleDisconnect}
                disabled={disconnecting}
                startIcon={disconnecting ? <CircularProgress size={18} color="inherit" /> : null}
              >
                {disconnecting ? 'Disconnecting…' : 'Disconnect'}
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default IntegrationsTab;
