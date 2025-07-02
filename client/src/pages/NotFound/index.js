import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Typography, Container } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './NotFoundPage.css';
import NotFoundImage from '../../assets/img/404.svg';
import titles from './titles'; // Importing the title list

const defaultTheme = createTheme();

export default function NotFoundPage() {
  const [randomTitle, setRandomTitle] = useState('');
  const [typedText, setTypedText] = useState('');
  const typingSpeed = 100; // Typing speed in milliseconds

  useEffect(() => {
    // Select a random title on component load
    const randomIndex = Math.floor(Math.random() * titles.length);
    setRandomTitle(titles[randomIndex]);
  }, []);

  useEffect(() => {
    document.title = "An error occured"
    if (randomTitle) {
      let index = 0;
      const typewriter = setInterval(() => {
        if (index <= randomTitle.length) {
          setTypedText(randomTitle.slice(0, index)); // Update the typed text
          index++;
        } else {
          clearInterval(typewriter); // Stop typing when complete
        }
      }, typingSpeed);

      return () => clearInterval(typewriter); // Cleanup interval
    }
  }, [randomTitle]); // Trigger typewriter effect whenever a new randomTitle is selected

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(230, 230, 255, 0.9))',
          textAlign: 'center',
          color: '#333',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md" sx={{ zIndex: 1 }}>
          <Box
            component="img"
            src={NotFoundImage}
            alt="404 - Page Not Found"
            aria-label="404 - Page Not Found"
            className="animate-float"
            sx={{
              width: { xs: 90, sm: 110 },
              height: { xs: 90, sm: 110 },
              mb: 4,
            }}
          />
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3 }}>
            {typedText} {/* Display the typewriter effect */}
          </Typography>
          <Box sx={{ maxWidth: 'sm', mx: 'auto', mb: 4 }}>
            <Typography
              variant="body1"
              sx={{ paddingLeft: 8, paddingRight: 8, color: 'rgba(64, 64, 64, 0.7)', fontSize: 18 }}>
              This link is invalid, inactive or incomplete. Please check your email for the correct and active link.
            </Typography>
          </Box>
        </Container>
        <Box className="animated-background"></Box>
      </Box>
    </ThemeProvider>
  );
}
