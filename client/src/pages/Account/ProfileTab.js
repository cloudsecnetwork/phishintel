import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  Grid,
} from '@mui/material';
import { getMe, updateMe } from '../../services/userService';

const ProfileTab = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
  });

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      try {
        setError('');
        const res = await getMe();
        if (mounted && res.success && res.data) {
          setForm({
            firstName: res.data.firstName || '',
            lastName: res.data.lastName || '',
            email: res.data.email || '',
            username: res.data.username || '',
          });
        }
      } catch (err) {
        if (mounted) {
          setError(err.response?.data?.error || err.message || 'Failed to load profile');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchUser();
    return () => { mounted = false; };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);
    try {
      const res = await updateMe({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
      });
      if (res.success) {
        setSuccess('Profile updated successfully.');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="lastName"
              label="Last name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              autoComplete="family-name"
            />
          </Grid>
        </Grid>
        <TextField
          margin="normal"
          fullWidth
          id="email"
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
        />
        <TextField
          margin="normal"
          fullWidth
          id="username"
          label="Username"
          name="username"
          value={form.username}
          disabled
          helperText="Username cannot be changed"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={saving}
            sx={{ minWidth: 120 }}
          >
            {saving ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfileTab;
