import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  IconButton,
  Alert,
  Snackbar,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WifiIcon from '@mui/icons-material/Wifi';
import QrCodeIcon from '@mui/icons-material/QrCode2';
import { useLanguage } from '../../context/LanguageContext';
import { getHubConfigByLanguage } from '../../mocks/hub-application-config';
import { getSuiteData } from '../../utils/suiteUtils';
import { trackButtonClick, trackContentInteraction } from '../../utils/analytics';

const WifiDialog = ({ open, onClose, suiteId }) => {
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [copyAlert, setCopyAlert] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const { language } = useLanguage();
  
  // Get hub configuration for current language
  const hubConfig = getHubConfigByLanguage(language);
  
  // Get suite data for the current suite and language
  const suiteData = getSuiteData(suiteId, language);
  const wifiNetworks = suiteData?.details?.data?.[0]?.wifi || [];

  const handleShowQR = (network) => {
    trackButtonClick('qr_code_view', 'wifi_dialog');
    trackContentInteraction('qr_code_display', 'wifi_network', network.ssid);
    
    setSelectedNetwork(network);
    setQrDialogOpen(true);
  };

  const handleCloseQrDialog = () => {
    trackButtonClick('close_qr_dialog', 'wifi_dialog');
    
    setQrDialogOpen(false);
    setSelectedNetwork(null);
  };

  const handleCopyPassword = (password) => {
    if (!password) return;
    
    trackButtonClick('copy_password', 'wifi_dialog');
    trackContentInteraction('password_copy', 'wifi_network', selectedNetwork?.ssid || 'unknown');
    
    navigator.clipboard.writeText(password);
    setCopyAlert(true);
  };

  const handleScanQR = () => {
    trackButtonClick('scan_qr_code', 'wifi_dialog');
    trackContentInteraction('qr_scanner_attempt', 'wifi_network', selectedNetwork?.ssid || 'unknown');
    
    // This would typically open camera for QR scanning
    // For now, just show an alert as camera access requires additional setup
    alert(hubConfig?.data?.pageWiFi?.scanQRButton?.label);
  };

  const handleClose = () => {
    trackButtonClick('close_wifi_dialog', 'wifi_dialog');
    onClose();
  };

  // If we don't have any wifi info, display a message
  if (!wifiNetworks || wifiNetworks.length === 0) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ flex: 1 }} /> {/* Spacer for centering */}
            <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 16, top: 16 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 4 }}>
          {/* Large WiFi Icon in Circle */}
          <Box 
            sx={{ 
              width: 120, 
              height: 120, 
              borderRadius: '50%', 
              backgroundColor: 'primary.main', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mx: 'auto',
              mb: 3
            }}
          >
            <WifiIcon sx={{ fontSize: 60, color: 'white' }} />
          </Box>
          <Alert severity="info">No WiFi information available.</Alert>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ flex: 1 }} /> {/* Spacer for centering */}
            <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 16, top: 16 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 4 }}>
          {/* Large WiFi Icon in Circle */}
          <Box 
            sx={{ 
              width: 120, 
              height: 120, 
              borderRadius: '50%', 
              backgroundColor: 'primary.main', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mx: 'auto',
              mb: 3
            }}
          >
            <WifiIcon sx={{ fontSize: 60, color: 'white' }} />
          </Box>

          {/* Network ID Display */}
          <Typography variant="h6" sx={{ mb: 4, color: 'text.primary' }}>
            ID: {wifiNetworks.map(network => network.network).join(' / ')}
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto' }}>
            {/* Scan QR Code Button - Filled */}
            <Button
              variant="contained"
              onClick={handleScanQR}
              fullWidth
              sx={{ 
                py: 1.5,
                borderRadius: 3,
                textTransform: 'none',
                fontSize: '16px'
              }}
            >
              {hubConfig?.data?.pageWiFi?.scanQRButton?.label}
            </Button>

            {/* Copy Password Buttons - Outlined */}
            {wifiNetworks.map((network, index) => (
              network.password && (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => handleCopyPassword(network.password)}
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: '16px'
                  }}
                >
                  {hubConfig?.data?.pageWiFi?.clipboardButton?.label} for "{network.network}"
                </Button>
              )
            ))}

            {/* Show QR Code Button - Outlined */}
            <Button
              variant="outlined"
              onClick={() => handleShowQR(wifiNetworks[0])}
              fullWidth
              sx={{ 
                py: 1.5,
                borderRadius: 3,
                textTransform: 'none',
                fontSize: '16px'
              }}
            >
              {hubConfig?.data?.pageWiFi?.showQRButton?.label}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Dialog for WiFi QR */}
      <Dialog open={qrDialogOpen} onClose={handleCloseQrDialog} maxWidth="xs" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {hubConfig?.data?.pageWiFi?.showQRButton?.label}
            <IconButton onClick={handleCloseQrDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box textAlign="center" sx={{ py: 2 }}>
            <QrCodeIcon sx={{ fontSize: 150, color: 'primary.main', mb: 2 }} />
            <Typography variant="body1" sx={{ mb: 1 }}>
              Network: {selectedNetwork?.network}
            </Typography>
            {selectedNetwork?.password && (
              <Typography variant="body2" color="textSecondary">
                Password: {selectedNetwork.password}
              </Typography>
            )}
            <Typography variant="body2" sx={{ mt: 2 }}>
              {hubConfig?.data?.pageWiFi?.scanQRButton?.label}
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
      
      {/* Copy success notification */}
      <Snackbar
        open={copyAlert}
        autoHideDuration={2000}
        onClose={() => setCopyAlert(false)}
        message={hubConfig?.data?.pageWiFi?.clipboardButton?.label}
      />
    </>
  );
};

export default WifiDialog;
