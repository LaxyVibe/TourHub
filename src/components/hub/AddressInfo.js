import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  IconButton,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useLanguage } from '../../context/LanguageContext';
import { getSuiteData } from '../../utils/suiteUtils';
import { getHubConfigByLanguage } from '../../mocks/hub-application-config';

const AddressInfo = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { language } = useLanguage();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [speechDialogOpen, setSpeechDialogOpen] = useState(false);
  
  const suiteId = params.suiteId;
  
  // Get hub configuration for speech button
  const hubConfig = getHubConfigByLanguage(language);
  
  const handleBack = () => {
    navigate(`/${language}/${suiteId}/info`);
  };

  // Copy to clipboard function
  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setSnackbarMessage(`${label} copied to clipboard!`);
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
      setSnackbarMessage('Failed to copy address');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Speech dialog handlers
  const handleSpeechDialogOpen = () => {
    setSpeechDialogOpen(true);
  };

  const handleSpeechDialogClose = () => {
    setSpeechDialogOpen(false);
  };

  // Web Speech API function
  const speakAddress = (text, language) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language; // Set language for speech
      utterance.rate = 0.8; // Slightly slower for clarity
      utterance.pitch = 1.0;
      
      window.speechSynthesis.speak(utterance);
    } else {
      setSnackbarMessage('Speech synthesis not supported in this browser');
      setSnackbarOpen(true);
    }
  };

  // Get suite data in current language
  const suiteData = getSuiteData(suiteId, language);
  const suite = suiteData?.details?.data?.[0];

  // Get native language data for native address
  const nativeLanguageCode = suite?.ownedBy?.nativeLanguageCode;
  const nativeSuiteData = nativeLanguageCode ? getSuiteData(suiteId, nativeLanguageCode) : null;
  const nativeAddress = nativeSuiteData?.details?.data?.[0]?.address;

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

  const handleAddressClick = () => {
    if (suite.addressURL) {
      window.open(suite.addressURL, '_blank');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
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
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Typography variant="body1" sx={{ lineHeight: 1.6, flex: 1, mr: 1 }}>
              {suite.address}
            </Typography>
            <IconButton
              onClick={() => copyToClipboard(suite.address, 'Address')}
              size="small"
              sx={{ ml: 1, color: 'primary.main' }}
              title="Copy address to clipboard"
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Native Language Address */}
          {nativeAddress && nativeAddress !== suite.address && (
            <Box sx={{ mb: 3, p: 2, backgroundColor: '#f8f9fa', borderRadius: 1, border: '1px solid #e0e0e0' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Native Language Address
                </Typography>
                <IconButton
                  onClick={() => copyToClipboard(nativeAddress, 'Native address')}
                  size="small"
                  sx={{ color: 'primary.main' }}
                  title="Copy native address to clipboard"
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="body2" sx={{ lineHeight: 1.6, fontStyle: 'italic' }}>
                {nativeAddress}
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                Show this address to locals for assistance
              </Typography>
              
              {/* Speech Button */}
              {hubConfig?.data?.globalComponent?.speechButton && (
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={
                      hubConfig.data.globalComponent.speechButton.icon?.url ? (
                        <Box
                          component="img"
                          src={hubConfig.data.globalComponent.speechButton.icon.url}
                          alt="Speech"
                          sx={{ width: 16, height: 16 }}
                        />
                      ) : null
                    }
                    onClick={handleSpeechDialogOpen}
                    sx={{ textTransform: 'none' }}
                  >
                    {hubConfig.data.globalComponent.speechButton.label}
                  </Button>
                </Box>
              )}
            </Box>
          )}

          {/* Embedded Map */}
          {suite.address && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Map
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  height: '300px',
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid #e0e0e0'
                }}
              >
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAoc4RCOPkN2-oZt5OVt9lC7mJzmcaeV1Y&q=${encodeURIComponent(suite.address)}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </Box>
            </Box>
          )}

          {suite.addressURL && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddressClick}
              startIcon={<LocationOnIcon />}
              sx={{ mt: 2 }}
            >
              View on Google Maps
            </Button>
          )}
        </Paper>
      </Box>

      {/* Speech Dialog */}
      {nativeAddress && hubConfig?.data?.globalComponent?.speechButton && (
        <Dialog
          open={speechDialogOpen}
          onClose={handleSpeechDialogClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {hubConfig.data.globalComponent.speechButton.label}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
              <Typography variant="body1" sx={{ flex: 1, lineHeight: 1.6 }}>
                {nativeAddress}
              </Typography>
              <IconButton
                onClick={() => speakAddress(nativeAddress, nativeLanguageCode)}
                color="primary"
                size="large"
                title="Speak address"
              >
                {hubConfig.data.globalComponent.speechButton.icon?.url ? (
                  <Box
                    component="img"
                    src={hubConfig.data.globalComponent.speechButton.icon.url}
                    alt="Speech"
                    sx={{ width: 24, height: 24 }}
                  />
                ) : (
                  <span>🔊</span>
                )}
              </IconButton>
            </Box>
          </DialogContent>
        </Dialog>
      )}

      {/* Snackbar for copy feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddressInfo;
