import * as React from 'react';
import { Typography, Container, Grid, Paper, Divider, Box, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For navigation
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useDashboard } from '../../hooks/useDashboard';
import { dashboardCard } from '../../data/dashboardCard';

const Dashboard = () => {
  const navigate = useNavigate(); // Navigation hook
  const { dashboardData, loading } = useDashboard(); // Use the custom hook

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: "#fafafa" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Container maxWidth="lg" sx={{ flexGrow: 1, mt: '96px', mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item sx={{ pt: 2, pl: 2, pb: 2 }} xs={12} md={8} lg={8}>
              <Typography sx={{ mb: 1 }} variant="h5" color="primary">
                PhishIntel Simulation Dashboard
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Manage your audience, setup sender profiles, and launch phishing campaigns effectively.
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 1 }} />

          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {/* Display loading indicator if data is being fetched */}
              {loading ? (
                <Typography sx={{ mt: 3, ml: 2 }} variant="subtitle" color="text.secondary">
                  Loading...</Typography>
              ) : (
                <>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      elevation={3}
                      sx={{
                        padding: 2,
                        borderRadius: 2,
                        textAlign: 'center',
                        backgroundColor: 'white'
                      }}
                    >
                      <Typography sx={{ mb: 1, fontSize: 24 }} color="primary.main">
                        {dashboardData.totalCampaigns}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        Campaigns
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      elevation={3}
                      sx={{
                        padding: 2,
                        borderRadius: 2,
                        textAlign: 'center',
                        backgroundColor: 'white'
                      }}
                    >
                      <Typography sx={{ mb: 1, fontSize: 24 }} color="primary.main">
                        {dashboardData.totalContacts}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        Total Contacts
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      elevation={3}
                      sx={{
                        padding: 2,
                        borderRadius: 2,
                        textAlign: 'center',
                        backgroundColor: 'white'
                      }}
                    >
                      <Typography sx={{ mb: 1, fontSize: 24 }} color="primary.main">
                        {dashboardData.totalTemplates}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        Templates
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      elevation={3}
                      sx={{
                        padding: 2,
                        borderRadius: 2,
                        textAlign: 'center',
                        backgroundColor: 'white'
                      }}
                    >
                      <Typography sx={{ mb: 1, fontSize: 24 }} color="primary.main">
                        {dashboardData.totalSenderProfiles}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        Sender Profiles
                      </Typography>
                    </Paper>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} / >

          <Box sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              {dashboardCard.map((card) => (
                <Grid item xs={12} sm={4} key={card.id}>
                  <Card
                    sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', borderRadius: 2, boxShadow: 3, cursor: 'pointer' }}
                    onClick={() => navigate(card.route)} // Make card clickable
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ m: 1 }}>{card.icon}</Box>
                      <Typography variant="h6" color="text.primary">
                        {card.title}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: 14 }} color="text.secondary">
                        {card.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

        </Container>

        <Footer />
      </Box>
    </Box>
  );
};

export default Dashboard;
