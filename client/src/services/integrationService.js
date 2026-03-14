import { axiosInstance } from './axiosInstance';

export const getAIModelsConfig = async () => {
  const res = await axiosInstance.get('/api/integrations/ai/models');
  return res.data;
};

export const getAIIntegration = async () => {
  const res = await axiosInstance.get('/api/integrations/ai');
  return res.data;
};

export const verifyAndSaveAIIntegration = async (payload) => {
  const res = await axiosInstance.post('/api/integrations/ai', payload);
  return res.data;
};

export const disconnectAIIntegration = async () => {
  const res = await axiosInstance.post('/api/integrations/ai/disconnect');
  return res.data;
};
