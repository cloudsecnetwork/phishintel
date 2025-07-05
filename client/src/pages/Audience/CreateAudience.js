import React, { useState } from 'react';
import {
    Box, Typography, Container, TextField, Button, Grid, Link,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom'; // For redirection
import { useAudience } from '../../hooks/useAudience';

const CreateAudience = () => {
    const [audienceName, setAudienceName] = useState('');
    const [file, setFile] = useState(null);
    const [errorDialog, setErrorDialog] = useState(false);
    const [successDialog, setSuccessDialog] = useState(false);
    const [validationError, setValidationError] = useState({ name: false, file: false });
    const { createAudience, loading, error } = useAudience();
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset validation errors
        setValidationError({ name: false, file: false });

        // Validate input fields
        if (!audienceName || !file) {
            setValidationError({
                name: !audienceName,
                file: !file,
            });
            return;
        }

        const formData = new FormData();
        formData.append('name', audienceName);
        formData.append('file', file);

        // Call the createAudience function from the hook
        const response = await createAudience(formData);
        if (response.success) {
            const audienceId = response.data._id; // Get the ID from the response data
            setSuccessDialog(true); // Show success dialog
            setAudienceName(''); // Clear the form data
            setFile(null);
            navigate(`/console/audience/${audienceId}`); // Redirect to detail page of the new audience
        } else {
            setErrorDialog(true); // Show error dialog
        }
    };

    const handleErrorClose = () => {
        setErrorDialog(false);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: "#fafafa" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Container maxWidth="lg" sx={{ flexGrow: 1, mt: '110px', mb: 2 }}>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid sx={{ pl: 2, pb: 2 }} xs={12} md={8} lg={8}>
                            <Typography variant="h5" color="primary">
                                Create a New Audience
                            </Typography>
                            <Typography sx={{ fontSize: 13 }} color="text.secondary">
                                Define your audience and upload a CSV file with their contact information.
                            </Typography>
                        </Grid>
                    </Grid>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            {/* Audience Name */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Audience Name"
                                    variant="outlined"
                                    value={audienceName}
                                    onChange={(e) => setAudienceName(e.target.value)}
                                    required
                                    error={validationError.name} // Set error state if name is missing
                                    helperText={validationError.name ? "Audience name is required" : "Enter a name for your audience."}
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            '& .MuiInputLabel-asterisk': {
                                                color: 'error.main',
                                            },
                                        },
                                    }}
                                />
                            </Grid>

                            {/* Instructions */}
                            <Grid item xs={12}>
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    Please upload a CSV file with the required fields: <strong>First Name</strong> and <strong>Email</strong>.
                                    If no first name is available, use generic values like <strong>"user"</strong> or <strong>"employee"</strong>.
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    <Link href="/sample-contacts.csv" sx={{ color: '#00bfff' }}>Download a sample CSV file</Link> to see the expected format.
                                </Typography>
                            </Grid>

                            {/* File Upload */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type="file"
                                    onChange={handleFileChange}
                                    inputProps={{ accept: '.csv' }}
                                    error={validationError.file} // Set error state if file is missing
                                    helperText={validationError.file ? "CSV file is required" : "Upload a CSV file with your audience's contacts."}
                                    required
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            '& .MuiInputLabel-asterisk': {
                                                color: 'error.main',
                                            },
                                        },
                                    }}
                                />
                            </Grid>

                            {/* Submit Button */}
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                                    {loading ? 'Creating...' : 'Create Audience'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
                <Footer />
            </Box>

            {/* Success Dialog */}
            <Dialog open={successDialog} onClose={() => setSuccessDialog(false)}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        An audience containing your uploaded contacts has been successfully created!
                        You can now view the details of the audience by navigating to the audience details page.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSuccessDialog(false)} color="primary">
                        View Details
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Error Dialog */}
            <Dialog open={errorDialog} onClose={handleErrorClose}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ whiteSpace: 'pre-wrap' }}>
                        {error || "There was an error creating the audience. Please try again."}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleErrorClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CreateAudience;
