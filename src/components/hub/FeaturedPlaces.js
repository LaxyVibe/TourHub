import React, { useEffect } from 'react';
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
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Divider
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsIcon from '@mui/icons-material/Directions';
import PublicIcon from '@mui/icons-material/Public';
import InfoIcon from '@mui/icons-material/Info';
import AttractionsIcon from '@mui/icons-material/Attractions';
import { useLanguage } from '../../context/LanguageContext';
import { getHubConfigByLanguage } from '../../mocks/hub-application-config';
import { PAGE_LAYOUTS, CONTENT_PADDING } from '../../config/layout';
import { trackButtonClick, trackNavigation, trackPOIView } from '../../utils/analytics';

const FeaturedPlaces = ({ initialState }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  // Get hub configuration for current language
  const hubConfig = getHubConfigByLanguage(language);
  
  // Use initial state if provided, otherwise extract from location
  const { places = [], clientInfo } = initialState || location.state || {};
  
  useEffect(() => {
    // Track page view
    trackNavigation(location.pathname);
  }, [location.pathname]);

  const handleBack = () => {
    trackButtonClick('back_button', 'featured_places');
    trackNavigation('featured_places', 'hub_landing', 'back_button');
    
    // Preserve query parameters when navigating back
    navigate({
      pathname: '/',
      search: location.search
    });
  };

  const handlePlaceSelect = (placeId) => {
    trackPOIView(placeId, 'place', language);
    trackNavigation('featured_places', 'place_detail', 'place_click');
    
    // Preserve query parameters when navigating to place detail
    navigate({
      pathname: `/place/${placeId}`,
      search: location.search
    });
  };
  
  return (
    <Container {...PAGE_LAYOUTS.FeaturedPlaces}>
      <Box sx={{ ...CONTENT_PADDING.standard }}>
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
          {hubConfig.pageLanding.naviagtion[2].label}
        </Typography>
      </Box>

      {places.length === 0 ? (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
          <AttractionsIcon sx={{ fontSize: 60, color: 'primary.light', mb: 2 }} />
          <Typography variant="h6">No {hubConfig.pageLanding.naviagtion[2].label} Found</Typography>
          <Typography variant="body2" color="text.secondary">
            We're currently updating our attractions. Please check back later.
          </Typography>
        </Paper>
      ) : (
        <Box>
          {places.map((place) => (
            <Card 
              key={place.id} 
              elevation={2} 
              sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}
            >
              {place.thumbnail && (
                <CardMedia
                  component="img"
                  height={200}
                  image={place.thumbnail}
                  alt={place.name}
                  sx={{ height: { xs: 150, sm: 200 } }}
                />
              )}
              <CardContent sx={{ p: { xs: 2, sm: 3 }, pt: { xs: 2, sm: 2.5 } }}>
                <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                  {place.name}
                </Typography>

                {place.category && (
                  <Box sx={{ mb: 1.5 }}>
                    <Chip
                      size="small"
                      label={place.category}
                      color="primary"
                      sx={{ mr: 1 }}
                    />
                    {place.detail?.rating && (
                      <Chip
                        size="small"
                        label={`${place.detail.rating} ★`}
                        color="secondary"
                      />
                    )}
                  </Box>
                )}

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {place.description}
                </Typography>

                <List dense disablePadding>
                  {place.transportation && (
                    <ListItem disableGutters sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <AccessTimeIcon color="action" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`${place.transportation.totalTime} min total`}
                        secondary={`Bus: ${place.transportation.bus.duration} min • Walk: ${place.transportation.walk.duration} min`}
                      />
                    </ListItem>
                  )}

                  {place.detail?.openingHours && (
                    <ListItem disableGutters sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <AccessTimeIcon color="action" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={place.detail.openingHours} />
                    </ListItem>
                  )}

                  {place.detail?.phone && (
                    <ListItem disableGutters sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <InfoIcon color="action" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={place.detail.phone} />
                    </ListItem>
                  )}

                  {place.detail?.website && (
                    <ListItem disableGutters sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <PublicIcon color="action" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={place.detail.website} />
                    </ListItem>
                  )}

                  {place.accessibility && (
                    <ListItem disableGutters sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <InfoIcon color="action" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Accessibility"
                        secondary={place.accessibility}
                      />
                    </ListItem>
                  )}
                </List>
              </CardContent>

              <Divider />

              <CardActions sx={{ px: { xs: 2, sm: 3 }, py: 1.5, justifyContent: 'space-between' }}>
                <Button
                  size="small"
                  startIcon={<DirectionsIcon />}
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${place.detail?.coordinates?.lat},${place.detail?.coordinates?.lng}`)}
                >
                  Directions
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handlePlaceSelect(place.id)}
                >
                  More Info
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}

      <Box sx={{ mt: 3, mb: 2, textAlign: 'center' }}>
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
        >
          {clientInfo?.subtitle || 'Powered by Laxy'} • {new Date().getFullYear()}
        </Typography>
      </Box>
      </Box>
    </Container>
  );
};

export default FeaturedPlaces;