import * as React from 'react';
import { Typography, Container, Grid, Paper, Divider, Box, Card, CardContent, Fade, Grow } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For navigation
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useDashboard } from '../../hooks/useDashboard';
import { dashboardCard } from '../../data/dashboardCard';

const Dashboard = () => {
  const navigate = useNavigate(); // Navigation hook
  const { dashboardData, loading } = useDashboard(); // Use the custom hook

  // Navigation handlers for stat cards
  const handleStatCardClick = (type) => {
    switch(type) {
      case 'campaigns':
        navigate('/console/campaign');
        break;
      case 'contacts':
        navigate('/console/audience');
        break;
      case 'templates':
        navigate('/console/templates');
        break;
      case 'senderProfiles':
        navigate('/console/sender-profile');
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: "#fafafa" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Container maxWidth="lg" sx={{ flexGrow: 1, mt: '96px', mb: 2 }}>
          <Fade in timeout={600}>
            <Grid container spacing={2}>
              <Grid item sx={{ pt: 2, pl: 2, pb: 2 }} xs={12} md={8} lg={8}>
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
                  Simulation Dashboard
                </Typography>
                <Typography 
                  sx={{ 
                    fontSize: '0.8rem',
                    lineHeight: 1.6,
                    color: 'text.secondary',
                    opacity: 0.8
                  }} 
                  color="text.secondary"
                >
                  Manage your audience, setup sender profiles, and launch phishing campaigns.
                </Typography>
              </Grid>
            </Grid>
          </Fade>

          <Divider sx={{ my: 2, opacity: 0.3 }} />

          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {loading ? (
                <Grid item xs={12}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    minHeight: '160px' 
                  }}>
                    <Typography 
                      sx={{ 
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        color: 'text.secondary',
                        opacity: 0.7
                      }} 
                      variant="h6" 
                      color="text.secondary"
                    >
                      Loading dashboard data...
                    </Typography>
                  </Box>
                </Grid>
              ) : (
                <>
                  <Grid item xs={12} sm={6} md={3}>
                    <Grow in timeout={800}>
                      <Paper
                        elevation={0}
                        sx={{
                          padding: 2.5,
                          borderRadius: 2,
                          textAlign: 'center',
                          backgroundColor: 'white',
                          border: '1px solid rgba(0,0,0,0.08)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          cursor: 'pointer',
                          '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                            borderColor: 'primary.main',
                            '& .stat-number': {
                              color: 'primary.main',
                              transform: 'scale(1.03)',
                            }
                          },
                        }}
                        onClick={() => handleStatCardClick('campaigns')}
                      >
                        <Typography 
                          className="stat-number"
                          sx={{ 
                            mb: 1, 
                            fontSize: { xs: '1.6rem', md: '2rem' },
                            fontWeight: 700,
                            color: 'text.primary',
                            transition: 'all 0.3s ease',
                            letterSpacing: '-0.5px'
                          }} 
                          color="primary.main"
                        >
                          {dashboardData.totalCampaigns}
                        </Typography>
                        <Typography 
                          variant="h6" 
                          sx={{
                            color: 'text.secondary',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}
                        >
                          Campaigns
                        </Typography>
                      </Paper>
                    </Grow>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Grow in timeout={900}>
                      <Paper
                        elevation={0}
                        sx={{
                          padding: 2.5,
                          borderRadius: 2,
                          textAlign: 'center',
                          backgroundColor: 'white',
                          border: '1px solid rgba(0,0,0,0.08)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          cursor: 'pointer',
                          '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                            borderColor: 'primary.main',
                            '& .stat-number': {
                              color: 'primary.main',
                              transform: 'scale(1.03)',
                            }
                          },
                        }}
                        onClick={() => handleStatCardClick('contacts')}
                      >
                        <Typography 
                          className="stat-number"
                          sx={{ 
                            mb: 1, 
                            fontSize: { xs: '1.6rem', md: '2rem' },
                            fontWeight: 700,
                            color: 'text.primary',
                            transition: 'all 0.3s ease',
                            letterSpacing: '-0.5px'
                          }} 
                          color="primary.main"
                        >
                          {dashboardData.totalContacts}
                        </Typography>
                        <Typography 
                          variant="h6" 
                          sx={{
                            color: 'text.secondary',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}
                        >
                          Total Contacts
                        </Typography>
                      </Paper>
                    </Grow>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Grow in timeout={1000}>
                      <Paper
                        elevation={0}
                        sx={{
                          padding: 2.5,
                          borderRadius: 2,
                          textAlign: 'center',
                          backgroundColor: 'white',
                          border: '1px solid rgba(0,0,0,0.08)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          cursor: 'pointer',
                          '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                            borderColor: 'primary.main',
                            '& .stat-number': {
                              color: 'primary.main',
                              transform: 'scale(1.03)',
                            }
                          },
                        }}
                        onClick={() => handleStatCardClick('templates')}
                      >
                        <Typography 
                          className="stat-number"
                          sx={{ 
                            mb: 1, 
                            fontSize: { xs: '1.6rem', md: '2rem' },
                            fontWeight: 700,
                            color: 'text.primary',
                            transition: 'all 0.3s ease',
                            letterSpacing: '-0.5px'
                          }} 
                          color="primary.main"
                        >
                          {dashboardData.totalTemplates}
                        </Typography>
                        <Typography 
                          variant="h6" 
                          sx={{
                            color: 'text.secondary',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}
                        >
                          Templates
                        </Typography>
                      </Paper>
                    </Grow>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Grow in timeout={1100}>
                      <Paper
                        elevation={0}
                        sx={{
                          padding: 2.5,
                          borderRadius: 2,
                          textAlign: 'center',
                          backgroundColor: 'white',
                          border: '1px solid rgba(0,0,0,0.08)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          cursor: 'pointer',
                          '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                            borderColor: 'primary.main',
                            '& .stat-number': {
                              color: 'primary.main',
                              transform: 'scale(1.03)',
                            }
                          },
                        }}
                        onClick={() => handleStatCardClick('senderProfiles')}
                      >
                        <Typography 
                          className="stat-number"
                          sx={{ 
                            mb: 1, 
                            fontSize: { xs: '1.6rem', md: '2rem' },
                            fontWeight: 700,
                            color: 'text.primary',
                            transition: 'all 0.3s ease',
                            letterSpacing: '-0.5px'
                          }} 
                          color="primary.main"
                        >
                          {dashboardData.totalSenderProfiles}
                        </Typography>
                        <Typography 
                          variant="h6" 
                          sx={{
                            color: 'text.secondary',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}
                        >
                          Sender Profiles
                        </Typography>
                      </Paper>
                    </Grow>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>

          <Divider sx={{ my: 3, opacity: 0.3 }} />

          <Box sx={{ mt: 1 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 2,
                ml: 2, 
                fontWeight: 500,
                color: 'text.primary',
                fontSize: { xs: '1.2rem', md: '1.4rem' }
              }}
            >
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              {dashboardCard.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} key={card.id}>
                  <Grow in timeout={1200 + (index * 100)}>
                    <Card
                      sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        textAlign: 'center', 
                        borderRadius: 2, 
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        cursor: 'pointer',
                        border: '1px solid rgba(0,0,0,0.06)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        backgroundColor: 'white',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
                          borderColor: 'primary.main',
                          '& .card-icon': {
                            transform: 'scale(1.08) rotate(3deg)',
                          },
                          '& .card-title': {
                            color: 'primary.main',
                          }
                        },
                      }}
                      onClick={() => navigate(card.route)}
                    >
                      <CardContent sx={{ 
                        flexGrow: 1, 
                        p: 2.5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '140px'
                      }}>
                        <Box 
                          className="card-icon"
                          sx={{ 
                            m: 1.5,
                            transition: 'all 0.3s ease',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                          }}
                        >
                          {card.icon}
                        </Box>
                        <Typography 
                          className="card-title"
                          variant="h6" 
                          sx={{
                            color: 'text.primary',
                            fontWeight: 600,
                            fontSize: '1rem',
                            mb: 1,
                            transition: 'color 0.3s ease',
                            letterSpacing: '-0.2px'
                          }}
                        >
                          {card.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontSize: '0.85rem', 
                            color: 'text.secondary',
                            lineHeight: 1.4,
                            opacity: 0.8,
                            fontWeight: 400
                          }}
                        >
                          {card.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grow>
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
