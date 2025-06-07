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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useLanguage } from '../../context/LanguageContext';
import { getSuiteData } from '../../utils/suiteUtils';
import AddressDisplay from '../common/AddressDisplay';
import { PAGE_LAYOUTS, CONTENT_PADDING } from '../../config/layout';

const AddressInfo = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { language } = useLanguage();
  
  const suiteId = params.suiteId;

  const handleBack = () => {
    navigate(`/${language}/${suiteId}/info`);
  };

  // Get suite data in current language
  const suiteData = getSuiteData(suiteId, language);
  const suite = suiteData?.details?.data?.[0];

  // Get native language code
  const nativeLanguageCode = suite?.ownedBy?.nativeLanguageCode;

  if (!suite) {
    return (
      <Container {...PAGE_LAYOUTS.AddressInfo}>
        <Box sx={{ ...CONTENT_PADDING.standard }}>
          <IconButton onClick={handleBack} sx={{ mb: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">Suite information not found</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container {...PAGE_LAYOUTS.AddressInfo}>
      <Box sx={{ ...CONTENT_PADDING.standard }}>
        <IconButton onClick={handleBack} sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h4" component="h1" gutterBottom>
          Address
        </Typography>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" component="h2">
              Location
            </Typography>
          </Box>
          
          <AddressDisplay
            suiteId={suiteId}
            address={suite.address}
            nativeLanguageCode={nativeLanguageCode}
            addressURL={suite.addressURL}
            addressEmbedHTML={suite.addressEmbedHTML}
            showMap={true}
            showMapButton={true}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default AddressInfo;
