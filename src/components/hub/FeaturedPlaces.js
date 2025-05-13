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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DirectionsIcon from '@mui/icons-material/Directions';
import PublicIcon from '@mui/icons-material/Public';
import InfoIcon from '@mui/icons-material/Info';
import AttractionsIcon from '@mui/icons-material/Attractions';

const FeaturedPlaces = ({ initialState }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use initial state if provided, otherwise extract from location
  const { places = [], clientInfo } = initialState || location.state || {};
  

  const handleBack = () => {
    // Preserve query parameters when navigating back
    navigate({
      pathname: '/',
      search: location.search
    });
  };

  const handlePlaceSelect = (placeId) => {
    // Preserve query parameters when navigating to place detail
    navigate({
      pathname: `/go/${placeId}`,
      search: location.search
    });
  };
  
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
          {clientInfo?.sectionLabels?.attractionsLabel || 'Points of Interest'}
        </Typography>
      </Box>

      {places.length === 0 ? (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
          <AttractionsIcon sx={{ fontSize: 60, color: 'primary.light', mb: 2 }} />
          <Typography variant="h6">No Points of Interest Found</Typography>
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
              {place.image && (
                <CardMedia
                  component="img"
                  height={{ xs: 150, sm: 200 }}
                  image={place.image}
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
                      label={place.category} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                      sx={{ height: { xs: 24, sm: 28 }, '& .MuiChip-label': { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }}
                    />
                  </Box>
                )}
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  paragraph
                  sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' }, mt: 1 }}
                >
                  {place.description}
                </Typography>
                
                <Divider sx={{ my: 1.5 }} />
                
                <List dense sx={{ py: 0 }}>
                  {place.location && (
                    <ListItem sx={{ px: 0, py: { xs: 0.5, sm: 0.75 } }}>
                      <ListItemIcon sx={{ minWidth: { xs: 32, sm: 36 } }}>
                        <LocationOnIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={place.location}
                        primaryTypographyProps={{ 
                          variant: 'body2',
                          fontSize: { xs: '0.8rem', sm: '0.85rem' } 
                        }}
                      />
                    </ListItem>
                  )}

                  {place.hours && (
                    <ListItem sx={{ px: 0, py: { xs: 0.5, sm: 0.75 } }}>
                      <ListItemIcon sx={{ minWidth: { xs: 32, sm: 36 } }}>
                        <AccessTimeIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={place.hours}
                        primaryTypographyProps={{ 
                          variant: 'body2',
                          fontSize: { xs: '0.8rem', sm: '0.85rem' } 
                        }}
                      />
                    </ListItem>
                  )}

                  {place.website && (
                    <ListItem sx={{ px: 0, py: { xs: 0.5, sm: 0.75 } }}>
                      <ListItemIcon sx={{ minWidth: { xs: 32, sm: 36 } }}>
                        <PublicIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={place.website}
                        primaryTypographyProps={{ 
                          variant: 'body2',
                          fontSize: { xs: '0.8rem', sm: '0.85rem' } 
                        }}
                      />
                    </ListItem>
                  )}
                </List>

                {place.tips && (
                  <Box sx={{ mt: 1.5 }}>
                    <Typography 
                      variant="subtitle2" 
                      fontWeight="bold"
                      sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                    >
                      Visitor Tips
                    </Typography>
                    <Typography 
                      variant="body2"
                      sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
                    >
                      {place.tips}
                    </Typography>
                  </Box>
                )}
              </CardContent>
              <CardActions sx={{ p: { xs: 1.5, sm: 2 }, pt: 0 }}>
                <Button 
                  variant="outlined" 
                  size="small" 
                  startIcon={<InfoIcon fontSize="small" />}
                  onClick={() => handlePlaceSelect(place.id)}
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
                >
                  More Info
                </Button>
                {place.directions && (
                  <Button 
                    variant="outlined" 
                    size="small" 
                    startIcon={<DirectionsIcon fontSize="small" />}
                    sx={{ ml: 1, fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
                    component="a"
                    href={place.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Directions
                  </Button>
                )}
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
    </Container>
  );
};

export default FeaturedPlaces;