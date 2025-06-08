import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Alert,
  Snackbar,
  Button
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WifiIcon from '@mui/icons-material/Wifi';
import QrCodeIcon from '@mui/icons-material/QrCode2';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useLanguage } from '../../context/LanguageContext';
import { getHubConfigByLanguage } from '../../mocks/hub-application-config';
import { getSuiteData } from '../../utils/suiteUtils';
import { PAGE_LAYOUTS, CONTENT_PADDING } from '../../config/layout';

const WifiInfo = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [copyAlert, setCopyAlert] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const { language } = useLanguage();
  const suiteId = params.suiteId;
  
  // Get hub configuration for current language
  const hubConfig = getHubConfigByLanguage(language);
  
  // Get suite data for the current suite and language
  const suiteData = getSuiteData(suiteId, language);
  const wifiNetworks = suiteData?.details?.data?.[0]?.wifi || [];

  const handleBack = () => {
    navigate(`/${language}/${suiteId}/info`);
  };

  const handleShowQR = (network) => {
    setSelectedNetwork(network);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedNetwork(null);
  };

  const handleCopyPassword = (password) => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopyAlert(true);
  };

  const handleScanQR = () => {
    // This would typically open camera for QR scanning
    // For now, just show an alert as camera access requires additional setup
    alert(hubConfig?.data?.pageWiFi?.scanQRButton?.label || "Scan QR Code to connect");
  };

  // If we don't have any wifi info, display a message
  if (!wifiNetworks || wifiNetworks.length === 0) {
    return (
      <Container {...PAGE_LAYOUTS.WifiInfo}>
        <Box sx={{ ...CONTENT_PADDING.standard }}>
          <IconButton onClick={handleBack} sx={{ mb: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Alert severity="info">No WiFi information available.</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container {...PAGE_LAYOUTS.WifiInfo}>
      <Box sx={{ ...CONTENT_PADDING.standard }}>
        <IconButton onClick={handleBack} sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>

        {/* WiFi Networks Display */}
        {wifiNetworks.map((network, index) => (
          <Paper key={index} elevation={3} sx={{ mb: 2, p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <WifiIcon sx={{ mr: 2, color: 'primary.main' }} />
              <Typography variant="h6">
                {index === 0 ? (hubConfig?.data?.pageLanding?.naviagtion?.find(nav => nav.route === "/info/wifi")?.label || "WiFi") : `WiFi Network ${index + 1}`}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Network: {network.network}
              </Typography>
              {network.password && (
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Password: {network.password}
                </Typography>
              )}
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {/* Scan QR Code Button */}
              <Button
                variant="outlined"
                startIcon={<QrCodeScannerIcon />}
                onClick={handleScanQR}
                fullWidth
                sx={{ justifyContent: 'flex-start' }}
              >
                {hubConfig?.data?.pageWiFi?.scanQRButton?.label || "Scan QR Code to connect"}
              </Button>

              {/* Copy Password Button */}
              {network.password && (
                <Button
                  variant="outlined"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => handleCopyPassword(network.password)}
                  fullWidth
                  sx={{ justifyContent: 'flex-start' }}
                >
                  {hubConfig?.data?.pageWiFi?.clipboardButton?.label || "Copy Password"}
                </Button>
              )}

              {/* Show QR Code Button */}
              <Button
                variant="outlined"
                startIcon={<QrCodeIcon />}
                onClick={() => handleShowQR(network)}
                fullWidth
                sx={{ justifyContent: 'flex-start' }}
              >
                {hubConfig?.data?.pageWiFi?.showQRButton?.label || "Show QR Code to share"}
              </Button>
            </Box>
          </Paper>
        ))}

        {/* Dialog for WiFi QR */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
          <DialogTitle>
            {hubConfig?.data?.pageWiFi?.showQRButton?.label || "Show QR Code"}
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
                {hubConfig?.data?.pageWiFi?.scanQRButton?.label || "Scan QR Code to connect"}
              </Typography>
            </Box>
          </DialogContent>
        </Dialog>
        
        {/* Copy success notification */}
        <Snackbar
          open={copyAlert}
          autoHideDuration={2000}
          onClose={() => setCopyAlert(false)}
          message={hubConfig?.data?.pageWiFi?.clipboardButton?.label || "Password copied"}
        />
      </Box>
    </Container>
  );
};

export default WifiInfo;