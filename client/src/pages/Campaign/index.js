import React, { useEffect } from 'react';
import { Typography, Container, Box, Button, Grid, Card, CardContent, Chip, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useGetAllCampaigns } from '../../hooks/useCampaign';

const Campaign = () => {
    const navigate = useNavigate();
    const { getAllCampaigns, campaigns, loading, error } = useGetAllCampaigns();

    useEffect(() => {
        getAllCampaigns();
    }, [getAllCampaigns]);

    const handleStartCampaign = () => {
        navigate('/console/campaign/create');
    };

    const handleViewCampaign = (id) => {
        navigate(`/console/campaign/${id}`);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: "#fafafa" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Container maxWidth="lg" sx={{ flexGrow: 1, mt: '110px', mb: 2 }}>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid sx={{ pl: 2, pb: 2 }} xs={12} md={8} lg={8}>
                            <Typography variant="h5" color="primary">
                                Campaigns
                            </Typography>
                            <Typography sx={{ fontSize: 13 }} color="text.secondary">
                                Launch and manage phishing campaigns. Track their status, view details, and make informed decisions for better awareness and security.
                            </Typography>
                        </Grid>
                        <Grid sx={{ p: 2 }} xs={12} md={4} lg={4}>
                            <Grid container justifyContent="flex-end">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleStartCampaign}
                                    startIcon={<AddIcon />}
                                >
                                    Start Campaign
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <Alert severity="error">{error}</Alert>
                    ) : campaigns.length === 0 ? (
                        <Alert severity="info">
                            No campaigns found. Click "Start Campaign" to create your first campaign.
                        </Alert>
                    ) : (
                        <Grid sx={{
                            maxWidth: '100%',
                            overflowX: 'hidden', // Prevent horizontal scrolling
                        }}
                            container spacing={3}>
                            {campaigns.map((campaign) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={campaign._id}
                                    sx={{
                                        padding: 2, // Ensures shadow has space to render
                                    }}
                                >
                                    <Card
                                        onClick={() => handleViewCampaign(campaign._id)}
                                        sx={{
                                            maxWidth: '100%',
                                            cursor: 'pointer',
                                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Strong shadow
                                            backgroundColor: '#ffffff', // Contrast with shadow
                                            transition: '0.3s',
                                            '&:hover': {
                                                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)', // More pronounced on hover
                                                backgroundColor: '#f5f5f5', // Subtle hover background change
                                            },
                                        }}
                                    >
                                        <CardContent>
                                            <Typography
                                                sx={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    maxWidth: '100%',
                                                    display: 'block',
                                                }}
                                                variant="h6" component="div" color="text.secondary">
                                                {campaign.name}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} variant="subtitle2" color="text.secondary">
                                                Created on: {new Date(campaign.createdAt).toLocaleDateString()}
                                            </Typography>
                                            <Chip
                                                label={campaign.status}
                                                color={
                                                    campaign.status === 'completed'
                                                        ? 'success'
                                                        : campaign.status === 'ongoing'
                                                            ? 'primary'
                                                            : campaign.status === 'scheduled'
                                                                ? 'warning'
                                                                : 'default'
                                                }
                                            />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}

                </Container>
                <Footer />
            </Box>
        </Box >
    );
};

export default Campaign;
