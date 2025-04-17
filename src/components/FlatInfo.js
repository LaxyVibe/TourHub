import React, { useEffect, useState } from 'react';
import { fetchFlatInfo } from '../utils/api';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const FlatInfo = () => {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlatInfo()
      .then(data => {
        setInfo(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load flat info');
        setLoading(false);
      });
  }, []);

  if (loading) return <Typography color="primary" sx={{ mt: 2 }} variant="body2">Loading flat info...</Typography>;
  if (error) return <Typography color="error" sx={{ mt: 2 }} variant="body2">{error}</Typography>;
  if (!info) return null;

  return (
    <Paper elevation={3} sx={{ width: '100%', maxWidth: 400, borderRadius: 4, p: 3, mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>Flat Information</Typography>
      {info.rules && (
        <Box mb={1}>
          <Typography variant="subtitle2" color="primary" fontWeight="bold">House Rules:</Typography>
          <Box sx={{ bgcolor: '#f3f4f6', borderRadius: 1, px: 1, py: 0.5, mt: 0.5 }}>
            <Typography variant="body2">{info.rules}</Typography>
          </Box>
        </Box>
      )}
      {info.checkin && (
        <Box mb={1}>
          <Typography variant="subtitle2" color="primary" fontWeight="bold" component="span">Check-in:</Typography>
          <Typography variant="body2" component="span" sx={{ ml: 1 }}>{info.checkin}</Typography>
        </Box>
      )}
      {info.checkout && (
        <Box mb={1}>
          <Typography variant="subtitle2" color="primary" fontWeight="bold" component="span">Check-out:</Typography>
          <Typography variant="body2" component="span" sx={{ ml: 1 }}>{info.checkout}</Typography>
        </Box>
      )}
      {/* Add more fields as needed */}
    </Paper>
  );
};

export default FlatInfo;
