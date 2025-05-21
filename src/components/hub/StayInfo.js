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
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  Alert // Added Alert
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedIcon from '@mui/icons-material/Bed';

import MessageIcon from '@mui/icons-material/Message';
import HelpIcon from '@mui/icons-material/Help';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import PetsIcon from '@mui/icons-material/Pets';
import { useLanguage } from '../../context/LanguageContext';

// ISO language codes to display names mapping
const languageCodeToName = {
  "en": "English",
  "ja": "日本語",
  "ko": "한국어",
  "zh-Hant": "繁體中文",
  "zh": "简体中文"
};

// Helper function for deep merging (won't merge arrays, concatenates them if you want that behavior later)
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

// Translations for UI text
const translations = {
  "English": {
    noStayInfo: 'No stay information available.',
    address: 'Address',
    checkInOutTimes: 'Check-in/out Times',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    houseRules: 'House Rules',
    quietHours: 'Quiet Hours',
    amenities: 'Amenities',
    bathroom: 'Bathroom',
    bedroom: 'Bedroom',
    laundry: 'Laundry',
    general: 'General',
    faq: 'FAQ',
    messageHost: 'Message Host',
    contactHost: 'Contact the host at',
    noContactInfo: 'No contact info',
    yourMessage: 'Your Message',
    sendMessage: 'Send Message'
  },
  "日本語": {
    noStayInfo: '宿泊情報は利用できません。',
    address: '住所',
    checkInOutTimes: 'チェックイン/アウト時間',
    checkIn: 'チェックイン',
    checkOut: 'チェックアウト',
    houseRules: '館内規則',
    quietHours: '静かな時間',
    amenities: 'アメニティ',
    bathroom: 'バスルーム',
    bedroom: '寝室',
    laundry: 'ランドリー',
    general: '一般',
    faq: 'よくある質問',
    messageHost: 'ホストにメッセージ',
    contactHost: 'ホストの連絡先',
    noContactInfo: '連絡先情報なし',
    yourMessage: 'あなたのメッセージ',
    sendMessage: 'メッセージを送信'
  },
  "한국어": {
    noStayInfo: '숙박 정보가 없습니다.',
    address: '주소',
    checkInOutTimes: '체크인/아웃 시간',
    checkIn: '체크인',
    checkOut: '체크아웃',
    houseRules: '이용 규칙',
    quietHours: '정숙 시간',
    amenities: '편의 시설',
    bathroom: '욕실',
    bedroom: '침실',
    laundry: '세탁',
    general: '일반',
    faq: '자주 묻는 질문',
    messageHost: '호스트에게 메시지',
    contactHost: '호스트 연락처',
    noContactInfo: '연락처 정보 없음',
    yourMessage: '메시지 내용',
    sendMessage: '메시지 보내기'
  },
  "繁體中文": {
    noStayInfo: '無可用的住宿資訊。',
    address: '地址',
    checkInOutTimes: '入住/退房時間',
    checkIn: '入住',
    checkOut: '退房',
    houseRules: '住宿規則',
    quietHours: '安靜時段',
    amenities: '設施',
    bathroom: '浴室',
    bedroom: '臥室',
    laundry: '洗衣',
    general: '一般',
    faq: '常見問題',
    messageHost: '給房東留言',
    contactHost: '聯繫房東',
    noContactInfo: '無聯繫資訊',
    yourMessage: '您的留言',
    sendMessage: '發送留言'
  },
  "简体中文": {
    noStayInfo: '无可用的住宿信息。',
    address: '地址',
    checkInOutTimes: '入住/退房时间',
    checkIn: '入住',
    checkOut: '退房',
    houseRules: '住宿规则',
    quietHours: '安静时段',
    amenities: '设施',
    bathroom: '浴室',
    bedroom: '卧室',
    laundry: '洗衣',
    general: '一般',
    faq: '常见问题',
    messageHost: '给房东留言',
    contactHost: '联系房东',
    noContactInfo: '无联系信息',
    yourMessage: '您的留言',
    sendMessage: '发送留言'
  }
};

// Get translations based on language code
const getTranslations = (language) => {
  const displayLanguage = languageCodeToName[language] || "English";
  return translations[displayLanguage] || translations["English"];
};

const StayInfo = ({ initialState }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [messageText, setMessageText] = useState("");
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

  const handleDialog = (dialogType) => {
    setActiveDialog(dialogType);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setActiveDialog(null);
    setMessageText("");
  };

  const playAudio = (audioUrl) => {
    if (!audioUrl) return;
    const audio = new Audio(audioUrl);
    setIsPlaying(true);
    audio.play();
    audio.onended = () => setIsPlaying(false);
  };

  // Handle copy was moved to WifiInfo.js

  if (!effectiveStayInfo || Object.keys(effectiveStayInfo).length === 0) {
    return (
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <IconButton onClick={handleBack} sx={{ mb: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Alert severity="info">{text.noStayInfo}</Alert>
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

        <Paper elevation={3}>
          <List>
            {/* Address Section */}
            {effectiveStayInfo.address && (
              <>
                <ListItem>
                  <ListItemIcon>
                    <LocationOnIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={text.address}
                    secondary={
                      <Box>
                        {effectiveStayInfo.address.english && <Typography variant="body1">{effectiveStayInfo.address.english}</Typography>}
                        {effectiveStayInfo.address.japanese && <Typography variant="body2">{effectiveStayInfo.address.japanese}</Typography>}
                        <Box sx={{ mt: 1 }}>
                          {effectiveStayInfo.address.audioUrl && (
                            <IconButton
                              onClick={() => playAudio(effectiveStayInfo.address.audioUrl)}
                              disabled={isPlaying}
                            >
                              <VolumeUpIcon />
                            </IconButton>
                          )}
                          {effectiveStayInfo.address.mapUrl && (
                            <IconButton
                              onClick={() => window.open(effectiveStayInfo.address.mapUrl, '_blank')}
                            >
                              <LocationOnIcon />
                            </IconButton>
                          )}
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            )}

            {/* Check-in/out Section */}
            {(effectiveStayInfo.checkin || effectiveStayInfo.checkout || effectiveStayInfo.checkInOut) && (
              <>
                <ListItem>
                  <ListItemIcon>
                    <EventIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={text.checkInOutTimes}
                    secondary={
                      <Box>
                        {(effectiveStayInfo.checkin || effectiveStayInfo.checkInOut?.checkIn) && (
                          <Typography variant="body2">
                            {text.checkIn}: {effectiveStayInfo.checkin || effectiveStayInfo.checkInOut?.checkIn}
                          </Typography>
                        )}
                        {(effectiveStayInfo.checkout || effectiveStayInfo.checkInOut?.checkOut) && (
                          <Typography variant="body2">
                            {text.checkOut}: {effectiveStayInfo.checkout || effectiveStayInfo.checkInOut?.checkOut}
                          </Typography>
                        )}
                        {effectiveStayInfo.checkInOut?.instructions && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {effectiveStayInfo.checkInOut.instructions}
                          </Typography>
                        )}
                        {effectiveStayInfo.checkInOut?.hostContact && (
                           <Button
                             startIcon={<MessageIcon />}
                             onClick={() => handleDialog('message')}
                             sx={{ mt: 1 }}
                           >
                             {text.messageHost}
                           </Button>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            )}

            {/* WiFi Section moved to WifiInfo.js */}

            {/* House Rules Section */}
            {(effectiveStayInfo.rules || effectiveStayInfo.houseRules) && (
              <>
                <ListItem>
                  <ListItemIcon>
                    <NightsStayIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={text.houseRules}
                    secondary={
                      <Box>
                        {typeof effectiveStayInfo.rules === 'string' && (
                          <Typography variant="body2">
                            {effectiveStayInfo.rules}
                          </Typography>
                        )}
                        {typeof effectiveStayInfo.rules !== 'string' && typeof effectiveStayInfo.houseRules === 'object' && (
                          <>
                            {effectiveStayInfo.houseRules.quietHours && (
                              <Typography variant="body2">
                                {text.quietHours}: {effectiveStayInfo.houseRules.quietHours}
                              </Typography>
                            )}
                            {effectiveStayInfo.houseRules.restrictions && effectiveStayInfo.houseRules.restrictions.length > 0 && (
                              <List dense sx={{ mt: 1 }}>
                                {effectiveStayInfo.houseRules.restrictions.map((rule, index) => (
                                  <ListItem key={index} dense>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                      {rule.toLowerCase().includes('smoking') ? <SmokingRoomsIcon color="error" /> :
                                       rule.toLowerCase().includes('pet') ? <PetsIcon color="error" /> :
                                       <InfoIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={rule} />
                                  </ListItem>
                                ))}
                              </List>
                            )}
                          </>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            )}

            {/* Amenities Section */}
            {effectiveStayInfo.amenities && (
              <>
                <ListItem>
                  <ListItemIcon>
                    <BedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={text.amenities}
                    secondary={
                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        {effectiveStayInfo.amenities.bathroom && effectiveStayInfo.amenities.bathroom.length > 0 && (
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" gutterBottom>
                              {text.bathroom}
                            </Typography>
                            <List dense>
                              {effectiveStayInfo.amenities.bathroom.map((item, index) => (
                                <ListItem key={index} dense>
                                  <ListItemIcon sx={{ minWidth: 36 }}>
                                    <BathtubIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText primary={item} />
                                </ListItem>
                              ))}
                            </List>
                          </Grid>
                        )}
                        {effectiveStayInfo.amenities.bedroom && effectiveStayInfo.amenities.bedroom.length > 0 && (
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" gutterBottom>
                              {text.bedroom}
                            </Typography>
                            <List dense>
                              {effectiveStayInfo.amenities.bedroom.map((item, index) => (
                                <ListItem key={index} dense>
                                  <ListItemIcon sx={{ minWidth: 36 }}>
                                    <CheckIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText primary={item} />
                                </ListItem>
                              ))}
                            </List>
                          </Grid>
                        )}
                        {effectiveStayInfo.amenities.laundry && effectiveStayInfo.amenities.laundry.length > 0 && (
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle2" gutterBottom>
                                    {text.laundry}
                                </Typography>
                                <List dense>
                                    {effectiveStayInfo.amenities.laundry.map((item, index) => (
                                    <ListItem key={index} dense>
                                        <ListItemIcon sx={{ minWidth: 36 }}>
                                        <LocalLaundryServiceIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary={item} />
                                    </ListItem>
                                    ))}
                                </List>
                            </Grid>
                        )}
                         {effectiveStayInfo.amenities.general && effectiveStayInfo.amenities.general.length > 0 && (
                          <Grid item xs={12}>
                            <Typography variant="subtitle2" gutterBottom>
                              {text.general}
                            </Typography>
                            <List dense>
                              {effectiveStayInfo.amenities.general.map((item, index) => (
                                <ListItem key={index} dense>
                                  <ListItemIcon sx={{ minWidth: 36 }}>
                                    <CheckIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText primary={item} />
                                </ListItem>
                              ))}
                            </List>
                          </Grid>
                        )}
                      </Grid>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </>
            )}

            {/* FAQ Section */}
            {effectiveStayInfo.faq && effectiveStayInfo.faq.length > 0 && (
              <>
                <ListItem>
                  <ListItemIcon>
                    <HelpIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={text.faq}
                    secondary={
                      <List dense>
                        {effectiveStayInfo.faq.map((item, index) => (
                          <Card key={index} variant="outlined" sx={{ mb: 1 }}>
                            <CardContent>
                              <Typography variant="subtitle2">{item.question}</Typography>
                              <Typography variant="body2" color="text.secondary">{item.answer}</Typography>
                              {item.imageUrl && (
                                <Box
                                  component="img"
                                  src={item.imageUrl}
                                  alt={item.question}
                                  sx={{ width: '100%', maxHeight: 200, objectFit: 'cover', mt: 1, borderRadius: 1 }}
                                />
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </List>
                    }
                  />
                </ListItem>
              </>
            )}
          </List>
        </Paper>

        {/* Dialog for Message Host */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
          <DialogTitle>
            {activeDialog === 'message' && text.messageHost}
          </DialogTitle>
          <DialogContent>
            {activeDialog === 'message' && (
              <Box>
                <Typography variant="body1" gutterBottom>
                  {text.contactHost}: {effectiveStayInfo.checkInOut?.hostContact || text.noContactInfo}
                </Typography>
                <TextField
                  label={text.yourMessage}
                  multiline
                  rows={4}
                  fullWidth
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  variant="outlined"
                  sx={{ mt: 2 }}
                />
                <Button 
                  variant="contained" 
                  onClick={() => {
                    handleCloseDialog();
                  }} 
                  sx={{ mt: 2 }}
                  disabled={!messageText.trim()}
                >
                  {text.sendMessage}
                </Button>
              </Box>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </Container>
  );
};

export default StayInfo;