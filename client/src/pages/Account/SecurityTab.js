import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';
import { changePassword } from '../../services/userService';
import { logout } from '../../utils/tokenManager';

const MIN_PASSWORD_LENGTH = 6;

const SecurityTab = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }
    if (passwords.newPassword.length < MIN_PASSWORD_LENGTH) {
      setError(`New password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    setLoading(true);
    try {
      const res = await changePassword(passwords.currentPassword, passwords.newPassword);
      if (res.success) {
        setSuccess('Password updated successfully.');
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Change password
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="currentPassword"
            label="Current password"
            type="password"
            id="currentPassword"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New password"
            type="password"
            id="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            autoComplete="new-password"
            helperText={`At least ${MIN_PASSWORD_LENGTH} characters`}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm new password"
            type="password"
            id="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
            autoComplete="new-password"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Change password'}
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Session
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Sign out of your account on this device.
        </Typography>
        <Button variant="outlined" color="primary" onClick={logout}>
          Log out
        </Button>
      </Paper>
    </Box>
  );
};

export default SecurityTab;
