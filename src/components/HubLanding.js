import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  IconButton, 
  Paper, 
  Menu, 
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InfoIcon from '@mui/icons-material/Info';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AttractionsTwoToneIcon from '@mui/icons-material/AttractionsTwoTone';
import TourIcon from '@mui/icons-material/Tour';

import Carousel from 'react-material-ui-carousel';

// Mock data - would be replaced with actual API calls in production
const roomImages = [
  { 
    id: 1, 
    src: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", 
    alt: "Room Photo 1" 
  },
  { 
    id: 2, 
    src: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", 
    alt: "Room Photo 2" 
  },
  { 
    id: 3, 
    src: "https://images.unsplash.com/photo-1560185127-028e7c3a0f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", 
    alt: "Room Photo 3" 
  }
];

// Beppu specific data
const beppuTourOptions = [
  { 
    id: 1, 
    name: "Beppu City Bus Tour", 
    image: "https://images.unsplash.com/photo-1601024445121-e5b82f020549?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 2, 
    name: "Beppu Hot Springs Tour", 
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 3, 
    name: "Takegawara Onsen", 
    image: "https://images.unsplash.com/photo-1545569341-85aa36a0d485?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 4, 
    name: "Mount Tsurumi Ropeway", 
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
  }
];

// Default tour options
const defaultTourOptions = [
  { 
    id: 1, 
    name: "City Walking Tour", 
    image: "https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 2, 
    name: "Local Food Tasting", 
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 3, 
    name: "Historical Sites Tour", 
    image: "https://images.unsplash.com/photo-1558379852-0ebf8547f122?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 4, 
    name: "Nature Excursion", 
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
  }
];

const languages = ["English", "日本語", "한국어"];

const HubLanding = ({ clientInfo = {
  clientName: 'Laxy Travel',
  variant: 'default',
  title: 'Laxy Travel Guide',
  subtitle: 'Explore with us',
  location: null
}}) => {
  // State for expandable sections
  const [expandedSection, setExpandedSection] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const openLanguageMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  
  // Determine which tour options to use based on client variant
  const tourOptions = clientInfo.variant === 'beppu-story' ? beppuTourOptions : defaultTourOptions;
  
  // Functions to handle expanding/collapsing sections
  const handleSectionToggle = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  // Handle language menu
  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleLanguageClose = () => {
    setAnchorEl(null);
  };
  
  const handleLanguageSelect = (language) => {
    setCurrentLanguage(language);
    setAnchorEl(null);
    // In a real app, this would trigger language change across the app
    // For example: i18n.changeLanguage(language)
  };
  
  // Handle QR code scanner
  const handleQRScan = () => {
    // On mobile, this would open the camera
    // On desktop, it would allow manual input or webcam scanning
    alert('QR scanner would open here');
  };

  // Handle tour selection
  const handleTourSelect = (tourId) => {
    // Navigate to the tour guide page
    navigate(`/join/${tourId}`);
  };
  
  // Handle attraction selection
  const handleAttractionSelect = (placeId) => {
    // Navigate to the place landing page
    navigate(`/go/${placeId}`);
  };

  // Render the appropriate header based on client info
  const renderHeader = () => {
    return (
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h5" component="h1" fontWeight="bold">
            {clientInfo.title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {clientInfo.subtitle} <span style={{ fontSize: '0.8rem' }}>Powered by Laxy</span>
          </Typography>
          {clientInfo.location && (
            <Typography variant="caption" color="text.secondary">
              {clientInfo.location}
            </Typography>
          )}
        </Box>
        <Box>
          <IconButton 
            aria-label="Change language" 
            onClick={handleLanguageClick}
            aria-controls={openLanguageMenu ? 'language-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openLanguageMenu ? 'true' : undefined}
          >
            <LanguageIcon />
          </IconButton>
          <Menu
            id="language-menu"
            anchorEl={anchorEl}
            open={openLanguageMenu}
            onClose={handleLanguageClose}
            MenuListProps={{
              'aria-labelledby': 'language-button',
            }}
          >
            {languages.map((language) => (
              <MenuItem 
                key={language} 
                onClick={() => handleLanguageSelect(language)}
                selected={language === currentLanguage}
              >
                {language}
              </MenuItem>
            ))}
          </Menu>
          <IconButton aria-label="Scan QR code" onClick={handleQRScan}>
            <QrCodeScannerIcon />
          </IconButton>
        </Box>
      </Box>
    );
  };

  // Get the appropriate section labels based on client variant
  const getSectionLabels = () => {
    if (clientInfo.variant === 'beppu-story') {
      return {
        infoLabel: 'Airbnb Information',
        restaurantsLabel: 'Restaurant List',
        attractionsLabel: 'Attraction List',
        toursLabel: 'Tour List',
        popularToursLabel: 'Popular Tours'
      };
    }
    
    return {
      infoLabel: 'Local Information',
      restaurantsLabel: 'Dining Options',
      attractionsLabel: 'Points of Interest',
      toursLabel: 'Available Tours',
      popularToursLabel: 'Featured Experiences'
    };
  };
  
  const sectionLabels = getSectionLabels();

  return (
    <Container sx={{ pb: 4 }}>
      {/* Header Section */}
      <Paper elevation={0} sx={{ mb: 1, pt: 2, pb: 1, px: 2, position: 'relative', borderRadius: '0 0 16px 16px' }}>
        {renderHeader()}
        
        {/* Search bar - non-functional in this mockup */}
        <Paper
          elevation={1}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mt: 2, 
            mb: 1, 
            px: 2, 
            py: 1, 
            borderRadius: 4 
          }}
        >
          <input 
            type="text" 
            placeholder="Search" 
            style={{ 
              border: 'none', 
              outline: 'none', 
              width: '100%', 
              background: 'transparent',
              fontFamily: 'inherit',
              fontSize: '1rem'
            }} 
          />
        </Paper>
      </Paper>
      
      {/* Main Image Banner (Slideshow) */}
      <Box sx={{ mb: 2 }}>
        <Carousel 
          animation="slide"
          navButtonsAlwaysVisible
          autoPlay
          interval={5000}
          indicators={true}
          sx={{ borderRadius: 2, overflow: 'hidden' }}
        >
          {roomImages.map((item) => (
            <Box 
              key={item.id}
              sx={{ 
                height: 250, 
                backgroundImage: `url(${item.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 2
              }}
              aria-label={item.alt}
            />
          ))}
        </Carousel>
        <Box sx={{ 
          mt: -4, 
          ml: 2, 
          mb: 2, 
          position: 'relative', 
          zIndex: 10, 
          display: 'inline-flex',
          bgcolor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          px: 2,
          py: 1,
          borderRadius: 1
        }}>
          <Typography variant="h6" component="h2">
            {clientInfo.variant === 'beppu-story' ? 'Premium Suite 1' : 'Discover Local Experiences'}
          </Typography>
        </Box>
      </Box>
      
      {/* Navigation Icons */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          <Paper 
            elevation={1} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              p: 2,
              borderRadius: '50%',
              width: 64,
              height: 64,
              mx: 'auto',
              boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}
            onClick={() => handleSectionToggle('info')}
          >
            <InfoIcon fontSize="large" color="primary" />
          </Paper>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Info
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          <Paper 
            elevation={1} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              p: 2,
              borderRadius: '50%',
              width: 64,
              height: 64,
              mx: 'auto',
              boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}
            onClick={() => handleSectionToggle('restaurants')}
          >
            <RestaurantIcon fontSize="large" color="primary" />
          </Paper>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {clientInfo.variant === 'beppu-story' ? 'Restaurants' : 'Dining'}
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          <Paper 
            elevation={1} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              p: 2,
              borderRadius: '50%',
              width: 64,
              height: 64,
              mx: 'auto',
              boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}
            onClick={() => handleSectionToggle('attractions')}
          >
            <AttractionsTwoToneIcon fontSize="large" color="primary" />
          </Paper>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {clientInfo.variant === 'beppu-story' ? 'Attractions' : 'Sights'}
          </Typography>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          <Paper 
            elevation={1} 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              p: 2,
              borderRadius: '50%',
              width: 64,
              height: 64,
              mx: 'auto',
              boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
              cursor: 'pointer'
            }}
            onClick={() => handleSectionToggle('tours')}
          >
            <TourIcon fontSize="large" color="primary" />
          </Paper>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Tours
          </Typography>
        </Grid>
      </Grid>
      
      {/* Subsection Navigation Tiles (Expandable) */}
      <List sx={{ mb: 2 }}>
        {/* Information Section */}
        <Paper elevation={2} sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
          <ListItem 
            button 
            onClick={() => handleSectionToggle('info')}
            sx={{ px: 2, py: 1.5 }}
          >
            <ListItemIcon>
              <InfoIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={sectionLabels.infoLabel} />
            {expandedSection === 'info' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={expandedSection === 'info'} timeout="auto" unmountOnExit>
            {clientInfo.variant === 'beppu-story' ? (
              <List component="div" disablePadding>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText 
                    primary="Check-in: 3:00 PM" 
                    secondary="Self check-in with building staff" 
                  />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText 
                    primary="Check-out: 11:00 AM" 
                  />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText 
                    primary="WiFi" 
                    secondary="LaxyHub-WiFi (Password: laxy2025)" 
                  />
                </ListItem>
              </List>
            ) : (
              <List component="div" disablePadding>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText 
                    primary="Tourist Information Center" 
                    secondary="Open daily: 9:00 AM - 6:00 PM" 
                  />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText 
                    primary="Emergency Contacts" 
                    secondary="Police: 110 | Ambulance: 119" 
                  />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText 
                    primary="Public WiFi" 
                    secondary="Available in most public areas" 
                  />
                </ListItem>
              </List>
            )}
          </Collapse>
        </Paper>
        
        {/* Restaurant List Section */}
        <Paper elevation={2} sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
          <ListItem 
            button 
            onClick={() => handleSectionToggle('restaurants')}
            sx={{ px: 2, py: 1.5 }}
          >
            <ListItemIcon>
              <RestaurantIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={sectionLabels.restaurantsLabel} />
            {expandedSection === 'restaurants' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={expandedSection === 'restaurants'} timeout="auto" unmountOnExit>
            {clientInfo.variant === 'beppu-story' ? (
              <List component="div" disablePadding>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Toyotsune Sushi" secondary="Traditional sushi • 5 min walk" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Oita Ramen Shop" secondary="Local ramen • 8 min walk" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sunset Café" secondary="Coffee & cakes • 3 min walk" />
                </ListItem>
              </List>
            ) : (
              <List component="div" disablePadding>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Local Bistro" secondary="Regional cuisine • Highly rated" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Street Food Market" secondary="Various options • Budget friendly" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Waterfront Dining" secondary="Seafood & views • Premium experience" />
                </ListItem>
              </List>
            )}
          </Collapse>
        </Paper>
        
        {/* Attraction List Section */}
        <Paper elevation={2} sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
          <ListItem 
            button 
            onClick={() => handleSectionToggle('attractions')}
            sx={{ px: 2, py: 1.5 }}
          >
            <ListItemIcon>
              <AttractionsTwoToneIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={sectionLabels.attractionsLabel} />
            {expandedSection === 'attractions' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={expandedSection === 'attractions'} timeout="auto" unmountOnExit>
            {clientInfo.variant === 'beppu-story' ? (
              <List component="div" disablePadding>
                <ListItem 
                  button 
                  sx={{ pl: 4 }}
                  onClick={() => handleAttractionSelect('beppu-tower')}
                >
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Beppu Tower" secondary="Landmark • 15 min by bus" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Takegawara Onsen" secondary="Traditional public bath • 10 min walk" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Kintetsu Ropeway" secondary="Mountain view • 20 min by bus" />
                </ListItem>
              </List>
            ) : (
              <List component="div" disablePadding>
                <ListItem 
                  button 
                  sx={{ pl: 4 }}
                  onClick={() => handleAttractionSelect('tokyo-tower')}
                >
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tokyo Tower" secondary="Iconic landmark • Central location" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Historical Center" secondary="Cultural landmarks • Walking distance" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Arts District" secondary="Galleries & cafes • Central location" />
                </ListItem>
              </List>
            )}
          </Collapse>
        </Paper>
        
        {/* Tour List Section */}
        <Paper elevation={2} sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}>
          <ListItem 
            button 
            onClick={() => handleSectionToggle('tours')}
            sx={{ px: 2, py: 1.5 }}
          >
            <ListItemIcon>
              <TourIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={sectionLabels.toursLabel} />
            {expandedSection === 'tours' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={expandedSection === 'tours'} timeout="auto" unmountOnExit>
            {clientInfo.variant === 'beppu-story' ? (
              <List component="div" disablePadding>
                <ListItem 
                  button 
                  sx={{ pl: 4 }}
                  onClick={() => handleTourSelect('jpn-bepu-tur-001')}
                >
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Beppu Hot Springs Tour" secondary="3 hours • English guide available" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="City Bus Tour" secondary="4 hours • Includes lunch" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Mount Tsurumi Hiking Tour" secondary="6 hours • Advanced level" />
                </ListItem>
              </List>
            ) : (
              <List component="div" disablePadding>
                <ListItem 
                  button 
                  sx={{ pl: 4 }}
                  onClick={() => handleTourSelect('jpn-bepu-tur-001')}
                >
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tokyo City Explorer" secondary="4 hours • Perfect introduction" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Culinary Adventure" secondary="3 hours • Food tasting included" />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ChevronRightIcon />
                  </ListItemIcon>
                  <ListItemText primary="Photography Walk" secondary="4 hours • All skill levels" />
                </ListItem>
              </List>
            )}
          </Collapse>
        </Paper>
      </List>
      
      {/* Tour Slideshow Section */}
      <Box sx={{ mb: 3, mt: 4 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
          {sectionLabels.popularToursLabel}
        </Typography>
        
        <Box sx={{ overflowX: 'auto', display: 'flex', pb: 2 }}>
          {tourOptions.map((tour) => (
            <Paper
              key={tour.id}
              elevation={2}
              sx={{
                minWidth: 200,
                mr: 2,
                borderRadius: 2,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
              onClick={() => {
                const tourId = clientInfo.variant === 'beppu-story' 
                  ? 'jpn-bepu-tur-001' 
                  : 'jpn-bepu-tur-001';
                handleTourSelect(tourId);
              }}
            >
              <Box
                sx={{ 
                  height: 120, 
                  backgroundImage: `url(${tour.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  {tour.name}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default HubLanding;