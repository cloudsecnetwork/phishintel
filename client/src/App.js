import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ProtectedRoute from './components/ProtectedRoute';
import ConsoleEntry from './components/ConsoleEntry';
import './App.css';

import MSPortal from './pages/MSPortal';
import Dashboard from './pages/Dashboard';

import Audience from './pages/Audience';
import CreateAudience from './pages/Audience/CreateAudience';
import AudienceDetail from './pages/Audience/AudienceDetail';

import SenderProfile from './pages/SenderProfile';
import CreateSenderProfile from './pages/SenderProfile/CreateSenderProfile';

import Templates from './pages/Templates';
import TemplateComposer from './pages/Templates/TemplateComposer';

import Campaign from './pages/Campaign';
import StartCampaign from './pages/Campaign/StartCampaign';
import CampaignDetail from './pages/Campaign/CampaignDetail';

import Account from './pages/Account';

import NotFoundPage from './pages/NotFound';

const THEME = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: 12,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/console" replace />} />
          <Route path="/console" element={<ConsoleEntry />} />
          <Route path="/account/signin" element={<MSPortal />} />
          <Route path="/console/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          <Route path="/console/audience" element={<ProtectedRoute><Audience /></ProtectedRoute>} />
          <Route path="/console/audience/create" element={<ProtectedRoute><CreateAudience /></ProtectedRoute>} />
          <Route path="/console/audience/:id" element={<ProtectedRoute><AudienceDetail /></ProtectedRoute>} />

          <Route path="/console/sender-profile" element={<ProtectedRoute><SenderProfile /></ProtectedRoute>} />
          <Route path="/console/sender-profile/create" element={<ProtectedRoute><CreateSenderProfile /></ProtectedRoute>} />

          <Route path="/console/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
          <Route path="/console/templates/new" element={<ProtectedRoute><TemplateComposer /></ProtectedRoute>} />
          <Route path="/console/templates/:id/edit" element={<ProtectedRoute><TemplateComposer /></ProtectedRoute>} />

          <Route path="/console/campaign" element={<ProtectedRoute><Campaign /></ProtectedRoute>} />
          <Route path="/console/campaign/create" element={<ProtectedRoute><StartCampaign /></ProtectedRoute>} />
          <Route path="/console/campaign/:id" element={<ProtectedRoute><CampaignDetail /></ProtectedRoute>} />

          <Route path="/console/account/*" element={<ProtectedRoute><Account /></ProtectedRoute>} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
