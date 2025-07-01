import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Admin login route
router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required'
    });
  }

  // Fetch admin credentials from environment variables
  const adminUsername = 'admin'; // Static admin username
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Check if the username and password match
  if (username === adminUsername && password === adminPassword) {
    // Generate JWT token
    const token = jwt.sign(
      { username: adminUsername },  // Payload (can include user info)
      process.env.SESSION_SECRET,       // Secret key from environment variable
      { expiresIn: '24h' },
      // { expiresIn: '1h' },         // Token expiry (e.g., 1 hour)
      // { expiresIn: '30d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Admin login successful',
      token   // Return the token
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password'
    });
  }

});

export default router;
