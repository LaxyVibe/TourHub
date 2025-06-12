import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useLanguage } from '../../context/LanguageContext';
import { getSuiteData } from '../../utils/suiteUtils';
import { getHubConfigByLanguage } from '../../mocks/hub-application-config';

const AddressDisplay = ({ 
  suiteId, 
  address, 
  nativeLanguageCode, 
  addressURL,
  addressEmbedHTML, // Custom embed HTML for Google Maps
  showMap = false,
  showMapButton = false,
  poiSlug = null, // For POI-specific address lookup
  isCompact = false // For different display styles
}) => {
  const { language } = useLanguage();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [speechDialogOpen, setSpeechDialogOpen] = useState(false);

  // Get hub configuration for speech button
  const hubConfig = getHubConfigByLanguage(language);

  // Get native address
  let nativeAddress = null;
  
  if (nativeLanguageCode && nativeLanguageCode !== language) {
    const nativeSuiteData = getSuiteData(suiteId, nativeLanguageCode);
    
    if (poiSlug) {
      // For POI: find the POI in native language data
      const pickedPOIs = nativeSuiteData?.details?.data?.[0]?.ownedBy?.pickedPOIs;
      const nativePOI = pickedPOIs?.find(poi => poi.slug === poiSlug);
      nativeAddress = nativePOI?.address;
    } else {
      // For suite: get suite address in native language
      nativeAddress = nativeSuiteData?.details?.data?.[0]?.address;
    }
  }

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
  const speakAddress = (text, languageCode) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageCode; // Set language for speech
      utterance.rate = 0.8; // Slightly slower for clarity
      utterance.pitch = 1.0;
      
      window.speechSynthesis.speak(utterance);
    } else {
      setSnackbarMessage('Speech synthesis not supported in this browser');
      setSnackbarOpen(true);
    }
  };

  if (isCompact) {
    // Compact version for POI details
    return (
      <>
        {/* 1. Embedded Map */}
        {showMap && address && (
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                width: '100%',
                height: '200px',
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid #e0e0e0'
              }}
            >
              {addressEmbedHTML ? (
                <Box
                  dangerouslySetInnerHTML={{ __html: addressEmbedHTML }}
                  sx={{
                    width: '100%',
                    height: '100%',
                    '& iframe': {
                      width: '100% !important',
                      height: '100% !important',
                      border: 'none !important'
                    }
                  }}
                />
              ) : (
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAoc4RCOPkN2-oZt5OVt9lC7mJzmcaeV1Y&q=${encodeURIComponent(address)}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              )}
            </Box>
          </Box>
        )}

        {/* 2. Address with clipboard button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Typography variant="body2" sx={{ lineHeight: 1.6, flex: 1, mr: 1 }}>
            {address}
          </Typography>
          <IconButton
            onClick={() => copyToClipboard(address, 'Address')}
            size="small"
            sx={{ color: 'primary.main' }}
            title="Copy address to clipboard"
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* 3. Native Language Address with clipboard button */}
        {nativeAddress && nativeAddress !== address && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Box sx={{ flex: 1, mr: 1 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 0.5 }}>
                Native Language Address
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.6, fontStyle: 'italic' }}>
                {nativeAddress}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
                Show this address to locals for assistance
              </Typography>
            </Box>
            <IconButton
              onClick={() => copyToClipboard(nativeAddress, 'Native address')}
              size="small"
              sx={{ color: 'primary.main' }}
              title="Copy native address to clipboard"
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        {/* 4. Speech Button */}
        {nativeAddress && hubConfig?.data?.globalComponent?.speechButton && (
          <Box sx={{ mb: 3 }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={
                hubConfig.data.globalComponent.speechButton.icon?.url ? (
                  <Box
                    component="img"
                    src={hubConfig.data.globalComponent.speechButton.icon.url}
                    alt="Speech"
                    sx={{ width: 14, height: 14 }}
                  />
                ) : null
              }
              onClick={handleSpeechDialogOpen}
              sx={{ 
                textTransform: 'none', 
                fontSize: '0.75rem', 
                py: 1,
                borderRadius: '37px',
                border: '1px solid #46B2BB',
                color: '#46B2BB',
                '&:hover': {
                  backgroundColor: 'rgba(70, 178, 187, 0.08)',
                  border: '1px solid #46B2BB'
                }
              }}
            >
              {hubConfig.data.globalComponent.speechButton.label}
            </Button>
          </Box>
        )}

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
      </>
    );
  }

  // Full version for suite address page
  return (
    <>
      {/* 1. Embedded Map */}
      {showMap && address && (
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              width: '100%',
              height: '300px',
              borderRadius: 2,
              overflow: 'hidden',
              border: '1px solid #e0e0e0'
            }}
          >
            {addressEmbedHTML ? (
              <Box
                dangerouslySetInnerHTML={{ __html: addressEmbedHTML }}
                sx={{
                  width: '100%',
                  height: '100%',
                  '& iframe': {
                    width: '100% !important',
                    height: '100% !important',
                    border: 'none !important'
                  }
                }}
              />
            ) : (
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAoc4RCOPkN2-oZt5OVt9lC7mJzmcaeV1Y&q=${encodeURIComponent(address)}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            )}
          </Box>
        </Box>
      )}

      {/* 2. Address with clipboard button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Typography variant="body1" sx={{ lineHeight: 1.6, flex: 1, mr: 1 }}>
          {address}
        </Typography>
        <IconButton
          onClick={() => copyToClipboard(address, 'Address')}
          size="small"
          sx={{ color: 'primary.main' }}
          title="Copy address to clipboard"
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* 3. Native Language Address with clipboard button */}
      {nativeAddress && nativeAddress !== address && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box sx={{ flex: 1, mr: 1 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 600, mb: 0.5 }}>
              Native Language Address
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6, fontStyle: 'italic' }}>
              {nativeAddress}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
              Show this address to locals for assistance
            </Typography>
          </Box>
          <IconButton
            onClick={() => copyToClipboard(nativeAddress, 'Native address')}
            size="small"
            sx={{ color: 'primary.main' }}
            title="Copy native address to clipboard"
          >
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      {/* 4. Speech Button */}
      {nativeAddress && hubConfig?.data?.globalComponent?.speechButton && (
        <Box sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            fullWidth
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
            sx={{ 
              textTransform: 'none',
              py: 1.5,
              borderRadius: '37px',
              border: '1px solid #46B2BB',
              color: '#46B2BB',
              '&:hover': {
                backgroundColor: 'rgba(70, 178, 187, 0.08)',
                border: '1px solid #46B2BB'
              }
            }}
          >
            {hubConfig.data.globalComponent.speechButton.label}
          </Button>
        </Box>
      )}


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
    </>
  );
};

export default AddressDisplay;
