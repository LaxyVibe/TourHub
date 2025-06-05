import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HotelIcon from '@mui/icons-material/Hotel';
import { useLanguage } from '../../context/LanguageContext';
import { getSuiteData } from '../../utils/suiteUtils';

const AmenitiesInfo = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { language } = useLanguage();
  
  const suiteId = params.suiteId;
  
  const handleBack = () => {
    navigate(`/${language}/${suiteId}/info`);
  };

  // Get suite data
  const suiteData = getSuiteData(suiteId, language);
  const suite = suiteData?.details?.data?.[0];

  if (!suite) {
    return (
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <IconButton onClick={handleBack} sx={{ mb: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">Suite information not found</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <IconButton onClick={handleBack} sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h4" component="h1" gutterBottom>
          Amenities
        </Typography>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <HotelIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" component="h2">
              Available Amenities
            </Typography>
          </Box>
          
          <Box 
            sx={{ lineHeight: 1.6 }}
            dangerouslySetInnerHTML={{ __html: suite.amenities || 'No amenities information available.' }}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default AmenitiesInfo;
