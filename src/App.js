import React from 'react';
import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage';
import FlatInfo from './components/FlatInfo';
import CityTourRedirect from './components/CityTourRedirect';
import InstallPrompt from './components/InstallPrompt';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function App() {
  return (
    <LandingPage onWifi={() => (
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#f3f4f6">
          <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
            You are connected to WiFi!
          </Typography>
          <Typography color="secondary" sx={{ mt: 1, mb: 2 }}>
            Flat info and city tour will appear here.
          </Typography>
          <FlatInfo />
          <CityTourRedirect />
          <InstallPrompt />
        </Box>
      </Container>
    )} />
  );
}

export default App;
