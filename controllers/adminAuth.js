import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

// Admin/user login route
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required'
    });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }
    if (user.accountLocked) {
      return res.status(403).json({
        success: false,
        message: 'Account is locked. Please contact your administrator.'
      });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }
    // Generate JWT token
    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      },
      process.env.SESSION_SECRET,
      { expiresIn: '24h' }
    );
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
