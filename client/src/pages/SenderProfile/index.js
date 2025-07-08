import React from 'react';
import { Typography, Container, Box, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useSenderProfiles } from '../../hooks/useSenderProfiles';
import { useNavigate } from 'react-router-dom';
import ResponsiveSenderProfilesTable from '../../components/ResponsiveSenderProfilesTable';

const SenderProfile = () => {
    const navigate = useNavigate();
    const { senderProfiles, loading, handleDelete } = useSenderProfiles();

    const handleCreateSenderProfile = () => {
        navigate('/console/sender-profile/create');
    };

    const handleDeleteProfile = (profileId) => {
        handleDelete(profileId);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: "#fafafa" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Container maxWidth="lg" sx={{ flexGrow: 1, mt: '110px', mb: 2 }}>
                    <Grid container spacing={2}>
                        <Grid sx={{ pl: 2, pb: 2 }} xs={12} md={8} lg={8}>
                            <Typography
                                sx={{
                                    mb: 1,
                                    fontWeight: 500,
                                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontSize: { xs: '1rem', md: '1.5rem' }
                                }}
                                variant="h4"
                                color="primary"
                            >
                                Sender Profiles
                            </Typography>
                            <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary">
                                Configure and manage SMTP sender profiles for your email campaigns.
                            </Typography>
                        </Grid>
                        <Grid sx={{ p: 2 }} xs={12} md={4} lg={4}>
                            <Grid container justifyContent="flex-end">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    onClick={handleCreateSenderProfile}
                                >
                                    Setup SMTP
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Box sx={{ width: '100%', mt: 2 }}>
                        <ResponsiveSenderProfilesTable
                            senderProfiles={senderProfiles}
                            loading={loading}
                            onDeleteProfile={handleDeleteProfile}
                        />
                    </Box>
                </Container>
                <Footer />
            </Box>
        </Box>
    );
};

export default SenderProfile;