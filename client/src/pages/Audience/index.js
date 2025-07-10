import React from 'react';
import { Typography, Container, Box, Button, Grid, Card, CardContent, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useAudience } from '../../hooks/useAudience';
import { formatCardDate } from '../../utils/dateUtils';

const Audience = () => {
    const navigate = useNavigate();
    const { audiences, loading, error } = useAudience(); // Use the hook to get audiences

    const handleCreateAudience = () => {
        navigate('/console/audience/create');
    };

    const handleViewAudience = (id) => {
        navigate(`/console/audience/${id}`);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: "#fafafa" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Container maxWidth="lg" sx={{ flexGrow: 1, mt: '110px', mb: 2 }}>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
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
                                Audience
                            </Typography>
                            <Typography sx={{ fontSize: '0.8rem' }} color="text.secondary">
                                Manage your contacts and target audience for phishing campaigns.
                            </Typography>
                        </Grid>
                        <Grid sx={{ p: 2, pr: 0.5 }} xs={12} md={4} lg={4}>
                            <Grid container justifyContent="flex-end">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCreateAudience}
                                    startIcon={<AddIcon />}
                                >
                                    Create Audience
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Audience Card List */}
                    <Grid container spacing={3}>
                        {/* Show loading message if loading */}
                        {loading && (
                            <Grid item xs={12}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center',
                                    py: 6
                                }}>
                                    <Typography 
                                        variant="h6" 
                                        align="center" 
                                        color='text.secondary'
                                        sx={{ 
                                            fontWeight: 500,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1
                                        }}
                                    >
                                        Loading audiences...
                                    </Typography>
                                </Box>
                            </Grid>
                        )}

                        {/* Show error message if error */}
                        {error && (
                            <Grid item xs={12}>
                                <Alert 
                                    severity="warning" 
                                    variant="outlined"
                                    sx={{ 
                                        borderRadius: '8px',
                                        borderWidth: '1px',
                                        '& .MuiAlert-icon': {
                                            fontSize: '1.25rem'
                                        }
                                    }}
                                >
                                    {error}
                                </Alert>
                            </Grid>
                        )}

                        {!loading && !error && audiences.length === 0 && (
                            <Grid item xs={12}>
                                <Box sx={{ 
                                    textAlign: 'center', 
                                    py: 4,
                                    backgroundColor: '#fafafa',
                                    borderRadius: 2,
                                    border: '1px dashed #ccc'
                                }}>
                                    <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                                        No audiences found
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        You haven't created any audiences yet. Create your first audience to get started.
                                    </Typography>
                                </Box>
                            </Grid>
                        )}

                        {/* Display audience cards if data is available */}
                        {!loading && !error && audiences.map((audience) => (
                            <Grid item xs={12} sm={6} md={4} key={audience._id}>
                                <Box
                                    onClick={() => handleViewAudience(audience._id)}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': { backgroundColor: '#f5f5f5' },
                                    }}>

                                    <Card>
                                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                                                <Typography
                                                    sx={{
                                                        mt: 1,
                                                        whiteSpace: 'nowrap',       // Prevent wrapping
                                                        overflow: 'hidden',         // Hide overflowing text
                                                        textOverflow: 'ellipsis',   // Show ellipsis for truncated text
                                                        maxWidth: '100%',           // Ensure it fits within the container
                                                        display: 'block',           // Enforce block-level behavior for truncation
                                                        fontWeight: 500,            // Medium weight
                                                        color: '#1a1a1a',           // Dark gray (less harsh than pure black)
                                                    }}
                                                    variant="h6"
                                                    component="div"
                                                >
                                                    {audience.name}
                                                </Typography>
                                                <Typography sx={{ mb: 1.5 }} variant="subtitle2" color="text.secondary">
                                                    Created {formatCardDate(audience.createdAt)}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ textAlign: 'right', ml: 2 }}>  {/* Ensure spacing between name and contacts */}
                                                <Typography variant="h4" color="primary">
                                                    {audience.contactCount}
                                                </Typography>
                                                <Typography variant="subtitle2" color="text.secondary">
                                                    Contacts
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>

                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Footer />
            </Box>
        </Box>
    );
};

export default Audience;
