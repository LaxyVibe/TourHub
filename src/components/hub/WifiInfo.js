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
  Alert
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WifiIcon from '@mui/icons-material/Wifi';
import QrCodeIcon from '@mui/icons-material/QrCode2';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useLanguage } from '../../context/LanguageContext';

// Get translations from HubLanding.js
const getTranslations = (language) => {
  const languageCodeToName = {
    "en": "English",
    "ja": "日本語",
    "ko": "한국어",
    "zh-Hant": "繁體中文",
    "zh": "简体中文"
  };

  // Get the display name for the language code
  const displayLanguage = languageCodeToName[language] || "English";
  
  // Return translations for this language
  return translations[displayLanguage] || translations["English"];
};

// Translation object (same structure as in HubLanding.js)
const translations = {
  "English": {
    wifiInformation: 'WiFi Information',
    network: 'Network',
    password: 'Password',
    additionalNetworks: 'Additional Networks',
    location: 'Location',
    wifiQrCode: 'WiFi QR Code',
    scanToConnect: 'Scan to connect to',
    noWifiInfo: 'No WiFi information available.'
  },
  "日本語": {
    wifiInformation: 'WiFi情報',
    network: 'ネットワーク',
    password: 'パスワード',
    additionalNetworks: '追加ネットワーク',
    location: '場所',
    wifiQrCode: 'WiFi QRコード',
    scanToConnect: 'スキャンして接続',
    noWifiInfo: 'WiFi情報は利用できません。'
  },
  "한국어": {
    wifiInformation: '와이파이 정보',
    network: '네트워크',
    password: '비밀번호',
    additionalNetworks: '추가 네트워크',
    location: '위치',
    wifiQrCode: '와이파이 QR 코드',
    scanToConnect: '스캔하여 연결',
    noWifiInfo: '와이파이 정보가 없습니다.'
  },
  "繁體中文": {
    wifiInformation: '無線網絡資訊',
    network: '網絡',
    password: '密碼',
    additionalNetworks: '額外網絡',
    location: '位置',
    wifiQrCode: '無線網絡二維碼',
    scanToConnect: '掃描連接至',
    noWifiInfo: '無可用的無線網絡資訊。'
  },
  "简体中文": {
    wifiInformation: '无线网络信息',
    network: '网络',
    password: '密码',
    additionalNetworks: '额外网络',
    location: '位置',
    wifiQrCode: '无线网络二维码',
    scanToConnect: '扫描连接至',
    noWifiInfo: '无可用的无线网络信息。'
  }
};

// Helper function for deep merging
const deepMerge = (target, source) => {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
};

const isObject = (item) => {
  return (item && typeof item === 'object' && !Array.isArray(item));
};

const WifiInfo = ({ initialState }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  
  // Get translations for the current language
  const langCode = language || 'en';
  const text = getTranslations(langCode);

  const { stayInfo: suiteSpecificStayInfo = null, clientInfo = {} } = initialState || location.state || {};
  const defaultStayInfoFromClient = clientInfo?.defaultStayInfo || null;

  let effectiveStayInfo = null;
  if (suiteSpecificStayInfo && defaultStayInfoFromClient) {
    effectiveStayInfo = deepMerge(defaultStayInfoFromClient, suiteSpecificStayInfo);
  } else if (suiteSpecificStayInfo) {
    effectiveStayInfo = suiteSpecificStayInfo;
  } else {
    effectiveStayInfo = defaultStayInfoFromClient;
  }

  const handleBack = () => {
    navigate(-1);
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
  };

  // If we don't have any wifi info, display a message
  if (!effectiveStayInfo || !effectiveStayInfo.wifi) {
    return (
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <IconButton onClick={handleBack} sx={{ mb: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Alert severity="info">{text.noWifiInfo}</Alert>
        </Box>
      </Container>
    );
  }

  const wifiInfo = effectiveStayInfo.wifi;

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
                primary={text.wifiInformation}
                secondary={
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', my: 1 }}>
                      {text.network}: {wifiInfo.name || wifiInfo.ssid}
                    </Typography>
                    {wifiInfo.password && 
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {text.password}: {wifiInfo.password}
                      </Typography>
                    }
                    <Box sx={{ mt: 2 }}>
                      {wifiInfo.qrCode && (
                        <IconButton onClick={handleDialog}>
                          <QrCodeIcon />
                        </IconButton>
                      )}
                      {wifiInfo.password && 
                        <IconButton onClick={() => handleCopy(wifiInfo.password)}>
                          <ContentCopyIcon />
                        </IconButton>
                      }
                    </Box>
                    {wifiInfo.instructions && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        {wifiInfo.instructions}
                      </Typography>
                    )}
                    {wifiInfo.additionalNetworks && wifiInfo.additionalNetworks.length > 0 && (
                      <Box sx={{ mt: 3 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>{text.additionalNetworks}:</Typography>
                        {wifiInfo.additionalNetworks.map((network, index) => (
                          <Box key={index} sx={{ mb: 2 }}>
                            <Typography variant="body2">
                              <strong>{text.network}:</strong> {network.name || network.ssid}
                            </Typography>
                            {network.password && (
                              <Typography variant="body2">
                                <strong>{text.password}:</strong> {network.password}
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleCopy(network.password)}
                                  sx={{ ml: 1 }}
                                >
                                  <ContentCopyIcon fontSize="small" />
                                </IconButton>
                              </Typography>
                            )}
                            {network.location && (
                              <Typography variant="body2" color="text.secondary">
                                {text.location}: {network.location}
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
            {text.wifiQrCode}
          </DialogTitle>
          <DialogContent>
            {wifiInfo.qrCode && (
              <Box textAlign="center">
                <QrCodeIcon sx={{ fontSize: 150 }} />
                <Typography>{text.scanToConnect} {wifiInfo.name || wifiInfo.ssid}</Typography>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </Container>
  );
};

export default WifiInfo;