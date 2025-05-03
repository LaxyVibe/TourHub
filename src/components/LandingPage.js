import React, { useEffect, useState } from 'react';
import { isOnWifi, isOnCellular } from '../utils/connection';
import { fetchConfig } from '../utils/api';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import QRCode from 'react-qr-code';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';

const LandingPage = ({ onWifi }) => {
  const [connection, setConnection] = useState('wifi');
  const [config, setConfig] = useState(null);
  const [configError, setConfigError] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [connectError, setConnectError] = useState('');
  const [connected, setConnected] = useState(isOnWifi());
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchConfig(setConfigError)
      .then(setConfig);
  }, []);

  useEffect(() => {
    const updateConnection = () => {
      if (isOnCellular()) setConnection('cellular');
      else setConnection('wifi');
      setConnected(isOnWifi());
    };
    updateConnection();
    if (navigator.connection) {
      navigator.connection.addEventListener('change', updateConnection);
      return () => navigator.connection.removeEventListener('change', updateConnection);
    }
  }, []);

  const handleConnectWifi = async () => {
    setConnecting(true);
    setConnectError('');
    setShowQr(false);
    try {
      // Try Web WiFi API (only available on some Android devices)
      if ('wifi' in navigator) {
        await navigator.wifi.request({
          ssid: config.wifi_ssid,
          password: config.wifi_password,
        });
        setShowSnackbar(true);
        setConnected(true);
        setConnecting(false);
        return;
      }
      // Fallback: Show QR code
      setShowQr(true);
      setConnectError('WiFi connection not supported. Scan the QR code or copy the password below.');
    } catch (e) {
      setShowQr(true);
      setConnectError('Connection failed. Scan the QR code or copy the password below.');
    }
    setConnecting(false);
  };

  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(config.wifi_password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  if (configError && !config) {
    return (
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
          <Typography color="error">{configError}</Typography>
        </Box>
      </Container>
    );
  }

  if (!config) {
    return (
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
          <Typography color="primary">Loading configuration...</Typography>
        </Box>
      </Container>
    );
  }

  if (connection === 'cellular') {
    return (
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#f3f4f6">
          <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
            Welcome to <span style={{ color: '#a39ddd' }}>Laxy Hub</span>
          </Typography>
          <Paper elevation={3} sx={{ borderRadius: 4, p: 4, mt: 2, width: '100%', maxWidth: 350, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary" gutterBottom>
              WiFi SSID
            </Typography>
            <Box mb={2} px={1} py={0.5} bgcolor="#f3f4f6" borderRadius={1} fontFamily="monospace">
              {config.wifi_ssid}
            </Box>
            <Typography variant="subtitle1" fontWeight="bold" color="primary" gutterBottom>
              Password
            </Typography>
            <Box mb={2} px={1} py={0.5} bgcolor="#f3f4f6" borderRadius={1} fontFamily="monospace" display="flex" alignItems="center">
              <span style={{ userSelect: 'all' }}>{config.wifi_password}</span>
              <IconButton size="small" onClick={handleCopyPassword} sx={{ ml: 1 }} aria-label="Copy password">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
              {copied && <Typography variant="caption" color="success.main" sx={{ ml: 1 }}>Copied!</Typography>}
            </Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleConnectWifi}
              disabled={connecting || connected}
              sx={{ mt: 2, width: '100%' }}
            >
              {connected ? 'Connected' : connecting ? 'Connecting...' : 'Connect to WiFi'}
            </Button>
            {connectError && (
              <Typography color="error" variant="caption" sx={{ mt: 1 }}>{connectError}</Typography>
            )}
            {showQr && (
              <Box mt={2} display="flex" flexDirection="column" alignItems="center">
                <QRCode value={`WIFI:T:WPA;S:${config.wifi_ssid};P:${config.wifi_password};;`} style={{ height: 160, width: 160 }} />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  Scan this QR code to join the WiFi network
                </Typography>
              </Box>
            )}
          </Paper>
          <Typography variant="caption" color="primary" sx={{ mt: 4 }} align="center">
            Powered by Laxy Hub
          </Typography>
          <Snackbar
            open={showSnackbar}
            autoHideDuration={3000}
            onClose={() => setShowSnackbar(false)}
            message="WiFi connection requested."
          />
        </Box>
      </Container>
    );
  }

  if (onWifi) return onWifi(config);
  return null;
};

export default LandingPage;
