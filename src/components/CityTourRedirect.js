import React, { useEffect, useState } from 'react';
import { getUserLocation, getDistanceMeters } from '../utils/geolocation';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { fetchConfig } from '../utils/api';

const CITY_TOUR_URL = 'https://citytour.example.com';

const CityTourRedirect = () => {
  const [distance, setDistance] = useState(null);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState(null);
  const [config, setConfig] = useState(null);
  const [configError, setConfigError] = useState(null);

  useEffect(() => {
    fetchConfig(setConfigError)
      .then(setConfig);
  }, []);

  useEffect(() => {
    if (!config) return;
    getUserLocation()
      .then(({ lat, lon }) => {
        const d = getDistanceMeters(lat, lon, config.gps_lat, config.gps_lon);
        setDistance(d);
        setChecking(false);
      })
      .catch(() => {
        setError('Unable to determine your location');
        setChecking(false);
      });
  }, [config]);

  if (configError && !config) return <Typography color="error" sx={{ mt: 2 }}>{configError}</Typography>;
  if (!config) return <Typography color="primary" sx={{ mt: 2 }}>Loading configuration...</Typography>;
  if (checking) return <Typography color="primary" sx={{ mt: 2 }} variant="body2">Checking location...</Typography>;
  if (error) return <Typography color="error" sx={{ mt: 2 }} variant="body2">{error}</Typography>;

  const isNearby = distance !== null && distance <= 100;

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ width: '100%', p: 3, borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button
          variant="contained"
          color={isNearby ? 'secondary' : 'inherit'}
          disabled={!isNearby}
          aria-label={isNearby ? 'Explore the City Tour Guide' : 'Available only at Airbnb location'}
          onClick={() => {
            if (isNearby) window.location.href = CITY_TOUR_URL;
          }}
          sx={{ minHeight: 48, width: '100%', fontWeight: 'bold', fontSize: '1.1rem', mb: 1 }}
        >
          {isNearby ? 'Explore the City Tour Guide' : 'Available only at Airbnb location'}
        </Button>
        {distance !== null && !isNearby && (
          <Typography variant="caption" color="secondary" align="center" sx={{ mt: 1 }}>
            You must be within 100 meters of the Airbnb to access the city tour.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default CityTourRedirect;
