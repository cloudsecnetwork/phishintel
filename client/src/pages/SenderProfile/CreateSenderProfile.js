import React, { useState } from 'react';
import { Box, Typography, Container, TextField, Button, Grid, FormControlLabel, Checkbox, CircularProgress, Alert } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useSenderProfiles } from '../../hooks/useSenderProfiles'; // Import the hook

const CreateSenderProfile = () => {
    const navigate = useNavigate();
    const { createSenderProfile, loading, error } = useSenderProfiles(); // Use the hook
    const [senderName, setSenderName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [host, setHost] = useState('');
    const [port, setPort] = useState('');
    const [secure, setSecure] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newSenderProfile = {
            senderName,
            email,
            password,
            host,
            port: Number(port), // Convert port to a number
            secure
        };

        // Call the createSenderProfile function from the hook
        const response = await createSenderProfile(newSenderProfile);

        if (response.success) {
            // Navigate to the desired page after successful form submission
            navigate('/console/sender-profile'); // Replace with the actual route you want to navigate to
        } else {
            console.error('Error creating sender profile:', response.message);
        }
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: "#fafafa" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Container maxWidth="lg" sx={{ flexGrow: 1, mt: '110px', mb: 2 }}>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid sx={{ pl: 2, pb: 2 }} xs={12}>
                            <Typography variant="h5" color="primary">
                                Create a New Sender Profile
                            </Typography>
                            <Typography sx={{ fontSize: 13 }} color="text.secondary">
                                Fill in the details below to create a new sender profile.
                            </Typography>
                        </Grid>
                    </Grid>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            {/* Sender Name */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Sender Name"
                                    variant="outlined"
                                    value={senderName}
                                    onChange={(e) => setSenderName(e.target.value)}
                                    required
                                    helperText="Enter the name of the sender."
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            '& .MuiInputLabel-asterisk': {
                                                color: 'error.main',
                                            },
                                        },
                                    }}
                                />
                            </Grid>


                            {/* Host and Port in one row */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Host"
                                    variant="outlined"
                                    value={host}
                                    onChange={(e) => setHost(e.target.value)}
                                    required
                                    helperText="Enter the SMTP host (e.g., smtp.example.com)."
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            '& .MuiInputLabel-asterisk': {
                                                color: 'error.main',
                                            },
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Port"
                                    variant="outlined"
                                    value={port}
                                    onChange={(e) => setPort(e.target.value)}
                                    required
                                    type="number"
                                    helperText="Enter the port number (e.g., 465 for SSL, 587 for TLS)."
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            '& .MuiInputLabel-asterisk': {
                                                color: 'error.main',
                                            },
                                        },
                                    }}
                                />
                            </Grid>

                            {/* Email and Password in one row */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email or Username (optional)"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    helperText="This field may be left blank if authentication is not required."
                                    type="email"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Password (optional)"
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    helperText="This field may be left blank if authentication is not required."
                                />
                            </Grid>

                            {/* Secure Checkbox */}
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={secure}
                                            onChange={(e) => setSecure(e.target.checked)}
                                            color="primary"
                                        />
                                    }
                                    label="Use Secure Connection (SSL/TLS)"
                                />
                            </Grid>

                            {/* Submit Button */}
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                                    {loading ? <CircularProgress size={24} /> : 'Create Sender Profile'}
                                </Button>
                            </Grid>

                            {/* Error Message */}
                            {error && (
                                <Grid item xs={12}>
                                    <Alert severity="error">{error}</Alert>
                                </Grid>
                            )}
                        </Grid>
                    </form>
                </Container>
                <Footer />
            </Box>
        </Box>
    );
};

export default CreateSenderProfile;
