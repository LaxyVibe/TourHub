import React from 'react';
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
  Divider
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WifiIcon from '@mui/icons-material/Wifi';
import CheckIcon from '@mui/icons-material/Check';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';

const StayInfo = ({ initialState }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use initial state if provided, otherwise extract from location
  const { stayInfo, clientInfo } = initialState || location.state || {};
  

  const handleBack = () => {
    // Preserve query parameters when navigating back
    navigate({
      pathname: '/',
      search: location.search
    });
  };

  // If no stay info was provided, show generic tourist information
  const defaultStayInfo = {
    checkin: 'Standard check-in: 3:00 PM',
    checkout: 'Standard check-out: 11:00 AM',
    wifi: {
      ssid: 'Public WiFi Available',
      password: 'See reception desk'
    },
    rules: 'Please respect local customs and regulations.',
    emergencyInfo: {
      police: '110',
      ambulance: '119',
      fire: '119',
      touristHelp: '+81-3-3816-3200'
    },
    touristCenter: {
      location: 'City Center Tourist Information Office',
      hours: 'Open daily: 9:00 AM - 6:00 PM',
      phone: '+81-977-21-1128'
    }
  };

  const currentStayInfo = stayInfo || defaultStayInfo;
  
  return (
    <Container maxWidth="sm" sx={{ py: 2, px: { xs: 2, sm: 3 }, pt: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <IconButton 
          edge="start" 
          onClick={handleBack} 
          sx={{ mr: 2 }}
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1" fontWeight="bold" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          {stayInfo ? 'Your Stay Information' : 'Local Information'}
        </Typography>
      </Box>

      {stayInfo ? (
        // Show personalized stay information
        <>
          <Paper elevation={2} sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ p: { xs: 1.5, sm: 2 }, bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Check-in & Check-out</Typography>
            </Box>
            <List sx={{ py: 0 }}>
              <ListItem sx={{ px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 2 } }}>
                <ListItemIcon sx={{ minWidth: { xs: 40, sm: 56 } }}>
                  <EventIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={`Check-in: ${currentStayInfo.checkin}`} 
                  secondary="Self check-in with building staff"
                  primaryTypographyProps={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  secondaryTypographyProps={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem sx={{ px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 2 } }}>
                <ListItemIcon sx={{ minWidth: { xs: 40, sm: 56 } }}>
                  <EventIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={`Check-out: ${currentStayInfo.checkout}`}
                  secondary="Please return your keys to reception"
                  primaryTypographyProps={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  secondaryTypographyProps={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                />
              </ListItem>
            </List>
          </Paper>

          <Paper elevation={2} sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ p: { xs: 1.5, sm: 2 }, bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>WiFi</Typography>
            </Box>
            <List sx={{ py: 0 }}>
              <ListItem sx={{ px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 2 } }}>
                <ListItemIcon sx={{ minWidth: { xs: 40, sm: 56 } }}>
                  <WifiIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={currentStayInfo.wifi.ssid} 
                  secondary={`Password: ${currentStayInfo.wifi.password}`}
                  primaryTypographyProps={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  secondaryTypographyProps={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                />
              </ListItem>
            </List>
          </Paper>

          {currentStayInfo.rules && (
            <Paper elevation={2} sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
              <Box sx={{ p: { xs: 1.5, sm: 2 }, bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>House Rules</Typography>
              </Box>
              <Box sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  {currentStayInfo.rules}
                </Typography>
              </Box>
            </Paper>
          )}
        </>
      ) : (
        // Show general tourist information
        <>
          <Paper elevation={2} sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ p: { xs: 1.5, sm: 2 }, bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Tourist Information</Typography>
            </Box>
            <List sx={{ py: 0 }}>
              <ListItem sx={{ px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 2 } }}>
                <ListItemIcon sx={{ minWidth: { xs: 40, sm: 56 } }}>
                  <InfoIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={currentStayInfo.touristCenter.location} 
                  secondary={currentStayInfo.touristCenter.hours}
                  primaryTypographyProps={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  secondaryTypographyProps={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem sx={{ px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 2 } }}>
                <ListItemIcon sx={{ minWidth: { xs: 40, sm: 56 } }}>
                  <InfoIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Contact" 
                  secondary={currentStayInfo.touristCenter.phone}
                  primaryTypographyProps={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  secondaryTypographyProps={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                />
              </ListItem>
            </List>
          </Paper>

          <Paper elevation={2} sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ p: { xs: 1.5, sm: 2 }, bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Emergency Contacts</Typography>
            </Box>
            <List sx={{ py: 0 }}>
              <ListItem sx={{ px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 1.5 } }}>
                <ListItemText 
                  primary="Police" 
                  secondary={currentStayInfo.emergencyInfo.police}
                  primaryTypographyProps={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  secondaryTypographyProps={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                />
              </ListItem>
              <Divider component="li" />
              <ListItem sx={{ px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 1.5 } }}>
                <ListItemText 
                  primary="Ambulance / Fire" 
                  secondary={currentStayInfo.emergencyInfo.ambulance}
                  primaryTypographyProps={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  secondaryTypographyProps={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                />
              </ListItem>
              <Divider component="li" />
              <ListItem sx={{ px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 1.5 } }}>
                <ListItemText 
                  primary="Tourist Emergency Helpline" 
                  secondary={currentStayInfo.emergencyInfo.touristHelp}
                  primaryTypographyProps={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  secondaryTypographyProps={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                />
              </ListItem>
            </List>
          </Paper>

          <Paper elevation={2} sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
            <Box sx={{ p: { xs: 1.5, sm: 2 }, bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Public WiFi</Typography>
            </Box>
            <List sx={{ py: 0 }}>
              <ListItem sx={{ px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 2 } }}>
                <ListItemIcon sx={{ minWidth: { xs: 40, sm: 56 } }}>
                  <WifiIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Available in most public areas" 
                  secondary="Look for 'Japan Free Wi-Fi' access points"
                  primaryTypographyProps={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  secondaryTypographyProps={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                />
              </ListItem>
            </List>
          </Paper>
        </>
      )}

      {/* General Information Section - Always show */}
      <Paper elevation={2} sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ p: { xs: 1.5, sm: 2 }, bgcolor: 'primary.main', color: 'white' }}>
          <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Local Tips</Typography>
        </Box>
        <List sx={{ py: 0 }}>
          <ListItem sx={{ px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 2 } }}>
            <ListItemIcon sx={{ minWidth: { xs: 40, sm: 56 } }}>
              <CheckIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Currency" 
              secondary="Major credit cards are accepted in most places, but it's good to have some cash."
              primaryTypographyProps={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
              secondaryTypographyProps={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem sx={{ px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 2 } }}>
            <ListItemIcon sx={{ minWidth: { xs: 40, sm: 56 } }}>
              <CheckIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Transportation" 
              secondary="Public transportation is reliable and efficient. Consider getting a day pass."
              primaryTypographyProps={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
              secondaryTypographyProps={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem sx={{ px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 2 } }}>
            <ListItemIcon sx={{ minWidth: { xs: 40, sm: 56 } }}>
              <CheckIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Local Etiquette" 
              secondary="Remove shoes when entering homes and some traditional restaurants."
              primaryTypographyProps={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
              secondaryTypographyProps={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
            />
          </ListItem>
        </List>
      </Paper>

      <Box sx={{ mt: 3, mb: 2, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          {clientInfo?.subtitle || 'Powered by Laxy'} • {new Date().getFullYear()}
        </Typography>
      </Box>
    </Container>
  );
};

export default StayInfo;