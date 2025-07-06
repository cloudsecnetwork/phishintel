import { axiosInstance } from './axiosInstance';

export const getVersionInfo = async () => {
  try {
    const response = await axiosInstance.get('/api/version');
    return {
      version: response.data.version,
      releaseDate: response.data.releaseDate
    };
  } catch (error) {
    console.error('Error fetching version:', error);
    // Fallback to package.json version if API fails
    return {
      version: process.env.REACT_APP_VERSION || '0.1.0',
      releaseDate: null
    };
  }
};

// Backward compatibility
export const getVersion = async () => {
  const versionInfo = await getVersionInfo();
  return versionInfo.version;
}; 