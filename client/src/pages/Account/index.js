import React from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Tabs, Tab } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import ProfileTab from './ProfileTab';
import SecurityTab from './SecurityTab';
import IntegrationsTab from './IntegrationsTab';

const TAB_PATHS = ['profile', 'security', 'integrations'];

const Account = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentTab = pathSegments[pathSegments.length - 1] || 'profile';
  const tabIndex = TAB_PATHS.includes(currentTab) ? TAB_PATHS.indexOf(currentTab) : 0;

  const handleTabChange = (event, newIndex) => {
    navigate(`/console/account/${TAB_PATHS[newIndex]}`);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Container maxWidth="lg" sx={{ flexGrow: 1, mt: '96px', mb: 2 }}>
          <Typography
            sx={{
              mb: 1,
              fontWeight: 500,
              background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1rem', md: '1.5rem' },
            }}
            variant="h4"
            color="primary"
          >
            Account
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', lineHeight: 1.6, color: 'text.secondary', opacity: 0.8, mb: 2 }}>
            Manage your profile, security, and integrations.
          </Typography>

          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
          >
            <Tab label="Profile" id="account-tab-0" aria-controls="account-tabpanel-0" />
            <Tab label="Security" id="account-tab-1" aria-controls="account-tabpanel-1" />
            <Tab label="Integrations" id="account-tab-2" aria-controls="account-tabpanel-2" />
          </Tabs>

          <Routes>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<ProfileTab />} />
            <Route path="security" element={<SecurityTab />} />
            <Route path="integrations" element={<IntegrationsTab />} />
          </Routes>
        </Container>

        <Footer />
      </Box>
    </Box>
  );
};

export default Account;
