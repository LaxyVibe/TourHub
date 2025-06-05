import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Alert,
  Snackbar
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WifiIcon from '@mui/icons-material/Wifi';
import QrCodeIcon from '@mui/icons-material/QrCode2';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useLanguage } from '../../context/LanguageContext';
import { getHubConfigByLanguage } from '../../mocks/hub-application-config';
import { getSuiteData } from '../../utils/suiteUtils';

const WifiInfo = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [copyAlert, setCopyAlert] = useState(false);
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

  const handleDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopyAlert(true);
    setTimeout(() => setCopyAlert(false), 2000);
  };

  // If we don't have any wifi info, display a message
  if (!wifiNetworks || wifiNetworks.length === 0) {
    return (
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <IconButton onClick={handleBack} sx={{ mb: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Alert severity="info">No WiFi information available.</Alert>
        </Box>
      </Container>
    );
  }

  const primaryNetwork = wifiNetworks[0];
  const additionalNetworks = wifiNetworks.slice(1);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <IconButton onClick={handleBack} sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>

        <Paper elevation={3}>
          <List>
            <ListItem>
              <ListItemIcon>
                <WifiIcon />
              </ListItemIcon>
              <ListItemText
                primary={hubConfig?.data?.pageLanding?.naviagtion?.find(nav => nav.route === "/info/wifi")?.label || "WiFi"}
                secondary={
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', my: 1 }}>
                      Network: {primaryNetwork.network}
                    </Typography>
                    {primaryNetwork.password && 
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Password: {primaryNetwork.password}
                        <IconButton 
                          size="small" 
                          onClick={() => handleCopy(primaryNetwork.password)}
                          sx={{ ml: 1 }}
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={handleDialog}
                          sx={{ ml: 1 }}
                        >
                          <QrCodeIcon fontSize="small" />
                        </IconButton>
                      </Typography>
                    }
                    
                    {additionalNetworks.length > 0 && (
                      <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>Additional Networks:</Typography>
                        {additionalNetworks.map((network, index) => (
                          <Box key={index} sx={{ mb: 2 }}>
                            <Typography variant="body2">
                              <strong>Network:</strong> {network.network}
                            </Typography>
                            {network.password && (
                              <Typography variant="body2">
                                <strong>Password:</strong> {network.password}
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleCopy(network.password)}
                                  sx={{ ml: 1 }}
                                >
                                  <ContentCopyIcon fontSize="small" />
                                </IconButton>
                              </Typography>
                            )}
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                }
              />
            </ListItem>
          </List>
        </Paper>

        {/* Dialog for WiFi QR */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
          <DialogTitle>
            {hubConfig?.data?.pageWiFi?.showQRButton?.label || "Show QR Code"}
          </DialogTitle>
          <DialogContent>
            <Box textAlign="center">
              <QrCodeIcon sx={{ fontSize: 150 }} />
              <Typography>{hubConfig?.data?.pageWiFi?.scanQRButton?.label || "Scan QR Code to connect"} {primaryNetwork.network}</Typography>
            </Box>
          </DialogContent>
        </Dialog>
        
        {/* Copy success notification */}
        <Snackbar
          open={copyAlert}
          autoHideDuration={2000}
          message={hubConfig?.data?.pageWiFi?.clipboardButton?.label || "Password copied"}
        />
      </Box>
    </Container>
  );
};

export default WifiInfo;