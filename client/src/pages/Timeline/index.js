import React from 'react';
import { Box, Container, Typography, Grid, Divider } from '@mui/material';
import { Line } from 'react-chartjs-2';
import Sidebar from '../../components/Sidebar';  // Import Sidebar
import Footer from '../../components/Footer';    // Import Footer
import { Chart, TimeScale, LinearScale, CategoryScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-dayjs-4'; // Correct adapter for Chart.js v4
import { useDashboard } from '../../hooks/useDashboard'; // Import the useDashboard hook
import { timelineOptions } from '../../data/timelineOptions'; // Import timeline options

// Register required Chart.js components
Chart.register(TimeScale, LinearScale, CategoryScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend);

const Timeline = () => {
    const { timelineData, loading, error } = useDashboard(); // Fetch timeline data using the hook

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: "#fafafa" }}>
            {/* Sidebar */}
            <Sidebar />

            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Container maxWidth="lg" sx={{ flexGrow: 1, mt: '96px', mb: 2 }}>
                    {/* Header */}
                    <Grid container spacing={2}>
                        <Grid item sx={{ pt: 2, pl: 2, pb: 2 }} xs={12} md={8} lg={8}>
                            <Typography sx={{ mb: 1 }} variant="h5" color="primary">
                                Timeline
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                View the timeline and performance of email campaigns in the past 24 hours.
                            </Typography>
                        </Grid>
                    </Grid>

                    <Divider sx={{ mb: 4 }} />

                    {/* Timeline Graph */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', height: 400, width: '100%', mb: 4, bgcolor: 'white', p: 2, borderRadius: 2 }}>
                        {loading ? (
                            <Typography variant="h6" color="text.secondary" align="center">Loading...</Typography>
                        ) : error ? (
                            <Typography variant="h6" color="error" align="center">Error fetching timeline data: {error}</Typography>
                        ) : (
                            <Line data={timelineData} options={timelineOptions} /> // Use fetched timeline data
                        )}
                    </Box>

                </Container>

                <Footer />
            </Box>
        </Box>
    );
};

export default Timeline;
