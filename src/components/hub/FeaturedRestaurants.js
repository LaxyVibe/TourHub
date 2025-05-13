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
  Rating,
  Chip,
  Divider
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const FeaturedRestaurants = ({ initialState }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use initial state if provided, otherwise extract from location
  const { restaurants = [], clientInfo } = initialState || location.state || {};
  

  const handleBack = () => {
    // Preserve query parameters when navigating back
    navigate({
      pathname: '/',
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
          {clientInfo?.sectionLabels?.restaurantsLabel || 'Dining Options'}
        </Typography>
      </Box>

      {restaurants.length === 0 ? (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
          <RestaurantIcon sx={{ fontSize: 60, color: 'primary.light', mb: 2 }} />
          <Typography variant="h6">No Restaurants Found</Typography>
          <Typography variant="body2" color="text.secondary">
            We're currently updating our restaurant listings. Please check back later.
          </Typography>
        </Paper>
      ) : (
        <Box>
          {restaurants.map((restaurant) => (
            <Paper 
              key={restaurant.id} 
              elevation={2} 
              sx={{ mb: 2, borderRadius: 2, overflow: 'hidden' }}
            >
              {restaurant.image && (
                <Box 
                  sx={{ 
                    height: { xs: 150, sm: 200 }, 
                    backgroundImage: `url(${restaurant.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
              <Box sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" component="h2" fontWeight="bold" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                  {restaurant.name}
                </Typography>
                
                {restaurant.rating && (
                  <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                    <Rating 
                      value={restaurant.rating} 
                      readOnly 
                      precision={0.5} 
                      size="small" 
                    />
                    <Typography variant="body2" sx={{ ml: 1, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                      {restaurant.rating.toFixed(1)}
                    </Typography>
                  </Box>
                )}
                
                {restaurant.cuisineType && (
                  <Box sx={{ my: 1 }}>
                    {restaurant.cuisineType.split(',').map((cuisine, index) => (
                      <Chip 
                        key={index} 
                        label={cuisine.trim()} 
                        size="small" 
                        sx={{ mr: 0.5, mb: 0.5, height: { xs: 24, sm: 32 }, '& .MuiChip-label': { fontSize: { xs: '0.7rem', sm: '0.8rem' } } }} 
                      />
                    ))}
                  </Box>
                )}
                
                <Typography variant="body1" sx={{ mt: 1, mb: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  {restaurant.description}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <List dense>
                  {restaurant.address && (
                    <ListItem sx={{ px: 0, py: { xs: 0.75, sm: 1 } }}>
                      <ListItemIcon sx={{ minWidth: { xs: 36, sm: 40 } }}>
                        <LocationOnIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={restaurant.address}
                        primaryTypographyProps={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                      />
                    </ListItem>
                  )}
                  
                  {restaurant.phone && (
                    <ListItem sx={{ px: 0, py: { xs: 0.75, sm: 1 } }}>
                      <ListItemIcon sx={{ minWidth: { xs: 36, sm: 40 } }}>
                        <PhoneIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={restaurant.phone}
                        primaryTypographyProps={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                      />
                    </ListItem>
                  )}
                  
                  {restaurant.hours && (
                    <ListItem sx={{ px: 0, py: { xs: 0.75, sm: 1 } }}>
                      <ListItemIcon sx={{ minWidth: { xs: 36, sm: 40 } }}>
                        <AccessTimeIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={restaurant.hours}
                        primaryTypographyProps={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                      />
                    </ListItem>
                  )}
                  
                  {restaurant.priceRange && (
                    <ListItem sx={{ px: 0, py: { xs: 0.75, sm: 1 } }}>
                      <ListItemIcon sx={{ minWidth: { xs: 36, sm: 40 } }}>
                        <MonetizationOnIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`Price Range: ${restaurant.priceRange}`}
                        primaryTypographyProps={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                      />
                    </ListItem>
                  )}
                </List>

                {restaurant.specialties && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}>
                      Specialties
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                      {restaurant.specialties}
                    </Typography>
                  </Box>
                )}
                
                {restaurant.reservationRequired !== undefined && (
                  <Box sx={{ mt: 2 }}>
                    <Chip 
                      icon={<RestaurantIcon />} 
                      label={restaurant.reservationRequired ? "Reservation Required" : "No Reservation Needed"} 
                      color={restaurant.reservationRequired ? "warning" : "success"}
                      variant="outlined"
                      size="small"
                      sx={{ height: { xs: 28, sm: 32 }, '& .MuiChip-label': { fontSize: { xs: '0.75rem', sm: '0.8rem' } } }}
                    />
                  </Box>
                )}
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      <Box sx={{ mt: 3, mb: 2, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
          Restaurant information may change. We recommend confirming details before visiting.
        </Typography>
      </Box>
    </Container>
  );
};

export default FeaturedRestaurants;