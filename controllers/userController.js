import userService from '../services/userService.js';

// Utility to sanitize user output (never expose password or sensitive fields)
function sanitizeUser(user) {
  if (!user) return null;
  const { password, __v, ...safe } = user.toObject ? user.toObject() : user;
  return safe;
}

// Get current user (authenticated user only)
export async function getMe(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
    const user = await userService.findUserById(req.user._id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: sanitizeUser(user) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// Update current user (allowlist: firstName, lastName, email only)
export async function updateMe(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
    const allowlist = ['firstName', 'lastName', 'email'];
    const payload = {};
    for (const key of allowlist) {
      if (req.body[key] !== undefined) payload[key] = req.body[key];
    }
    const user = await userService.updateUser(req.user._id, payload);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: sanitizeUser(user) });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, error: 'Email already in use' });
    }
    res.status(400).json({ success: false, error: err.message });
  }
}

// Change password for current user (uses user.save() so pre-save hash runs)
export async function changePassword(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, error: 'Current password and new password are required' });
    }
    const user = await userService.findUserById(req.user._id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    const valid = await user.comparePassword(currentPassword);
    if (!valid) {
      return res.status(401).json({ success: false, error: 'Current password is incorrect' });
    }
    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// Create a new user (admin only)
export async function createUser(req, res) {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }
    const user = await userService.createUser(req.body);
    res.status(201).json({ success: true, data: sanitizeUser(user) });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

// Get user by username (admin or self only)
export async function getUserByUsername(req, res) {
  try {
    if (!req.user || (req.user.username !== req.params.username && req.user.role !== 'admin')) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }
    const user = await userService.findUserByUsername(req.params.username);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: sanitizeUser(user) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// Get user by email (admin or self only)
export async function getUserByEmail(req, res) {
  try {
    if (!req.user || (req.user.email !== req.params.email && req.user.role !== 'admin')) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }
    const user = await userService.findUserByEmail(req.params.email);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: sanitizeUser(user) });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// Update user (admin or self only)
export async function updateUser(req, res) {
  try {
    if (!req.user || (req.user._id !== req.params.id && req.user.role !== 'admin')) {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: sanitizeUser(user) });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
}

// Delete user (admin only, cannot delete self)
export async function deleteUser(req, res) {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }
    if (req.user._id === req.params.id) {
      return res.status(403).json({ success: false, error: 'Admins cannot delete themselves.' });
    }
    const user = await userService.deleteUser(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: { message: 'User deleted' } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// Check if root admin exists (no sensitive data returned)
export async function checkRootAdmin(req, res) {
  try {
    const rootAdmin = await userService.findRootAdmin();
    res.json({ success: true, data: { exists: !!rootAdmin } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

const userController = {
  getMe,
  updateMe,
  changePassword,
  createUser,
  getUserByUsername,
  getUserByEmail,
  updateUser,
  deleteUser,
  checkRootAdmin,
};
export default userController; 