import userService from '../services/userService.js';

export async function setupStatus(req, res) {
  try {
    const rootAdmin = await userService.findRootAdmin();
    res.json({ success: true, data: { initialized: !!rootAdmin } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export function healthCheck(req, res) {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
}

const systemController = {
  setupStatus,
  healthCheck,
};
export default systemController; 