import { axiosInstance } from './axiosInstance';

export const getMe = async () => {
  const res = await axiosInstance.get('/api/users/me');
  return res.data;
};

export const updateMe = async (payload) => {
  const res = await axiosInstance.put('/api/users/me', payload);
  return res.data;
};

export const changePassword = async (currentPassword, newPassword) => {
  const res = await axiosInstance.post('/api/users/me/change-password', {
    currentPassword,
    newPassword,
  });
  return res.data;
};
