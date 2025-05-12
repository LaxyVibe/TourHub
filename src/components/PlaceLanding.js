// filepath: /Users/sunlau/Documents/creative/LaxyVibe/TourHub/src/components/PlaceLanding.js
import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  Grid, 
  Divider,
  Avatar,
  Rating,
  Chip,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
import PaidIcon from '@mui/icons-material/Paid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DirectionsIcon from '@mui/icons-material/Directions';
import InfoIcon from '@mui/icons-material/Info';
import HotelIcon from '@mui/icons-material/Hotel';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PublicIcon from '@mui/icons-material/Public';

// Mock data for the place information
const mockPlaceImages = {
  'beppu-place': [
    "https://images.unsplash.com/photo-1584132915807-fd1f5e259e7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1554797589-7241bb691973?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1584132705686-b76bbe12b969?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ],
  'tokyo-place': [
    "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ],
  'default': [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ]
};

// Mock nearby places data
const mockNearbyPlaces = {
  'beppu-place': [
    {
      type: 'restaurant',
      name: 'Jigoku-mushi Restaurant',
      distance: '150m',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1535140728325-a4d3707eee61?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      type: 'attraction',
      name: 'Umi Jigoku (Sea Hell)',
      distance: '300m',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1584132915807-fd1f5e259e7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      type: 'hotel',
      name: 'Suginoi Hotel',
      distance: '450m',
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    }
  ],
  'tokyo-place': [
    {
      type: 'restaurant',
      name: 'Sushi Saito',
      distance: '200m',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      type: 'attraction',
      name: 'Zojo-ji Temple',
      distance: '350m',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      type: 'hotel',
      name: 'Park Hotel Tokyo',
      distance: '500m',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    }
  ],
  'default': [
    {
      type: 'restaurant',
      name: 'Local Restaurant',
      distance: '250m',
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      type: 'attraction',
      name: 'Tourist Attraction',
      distance: '400m',
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      type: 'hotel',
      name: 'City Hotel',
      distance: '600m',
      rating: 4.0,
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    }
  ]
};

// Tips for different places
const mockTips = {
  'beppu-place': [
    'Visit early morning to avoid crowds',
    'Take comfortable shoes for the walking paths',
    'Try the local "jigoku-mushi" cuisine at nearby restaurants',
    'Don\'t forget your camera - the steam vents are photogenic'
  ],
  'tokyo-place': [
    'Visit at sunset for spectacular city views',
    'Check out the "Top Deck" for panoramic photo opportunities',
    'Book tickets online to skip the line',
    'The illumination is beautiful at night'
  ],
  'default': [
    'Check opening hours before visiting',
    'Book tickets in advance to avoid waiting in line',
    'Visit during off-peak hours for a better experience',
    'Take time to explore the surrounding area'
  ]
};

function PlaceLanding({ clientInfo }) {
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { placeId, tourId } = useParams();
  
  // Default to 'default' if variant is not specified
  const variant = clientInfo?.variant || 'default';
  
  // Select the appropriate content based on the variant
  const placeImages = mockPlaceImages[variant] || mockPlaceImages.default;
  const nearbyPlaces = mockNearbyPlaces[variant] || mockNearbyPlaces.default;
  const tips = mockTips[variant] || mockTips.default;
  
  // Handle back button navigation
  const handleBack = () => {
    // Determine where to go back to based on the current URL pattern
    const hostname = window.location.hostname;
    const pathname = location.pathname;
    
    if (hostname.includes('go.')) {
      // If we're on a go.laxy.travel domain, go back to the root
      window.history.back();
    } else if (pathname.includes('/follow/') && pathname.includes('/go/')) {
      // If we're in a nested structure like /follow/tour-id/go/place-id
      // Go back to just the tour page
      if (tourId) {
        navigate(`/${tourId}`);
      } else {
        window.history.back();
      }
    } else if (pathname.includes('/go/')) {
      // If we're on a /go/place-id route in a hub domain
      navigate('/');
    } else {
      // Default fallback
      window.history.back();
    }
  };
  
  // Handle favorite toggle
  const handleFavoriteToggle = () => {
    setFavorite(!favorite);
  };
  
  // Handle share action
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: clientInfo?.title || 'Laxy Travel Place',
        text: `Check out this amazing place: ${clientInfo?.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert('Share URL copied to clipboard!');
    }
  };
  
  // Handle directions button
  const handleDirections = () => {
    // In a real app, this would launch maps navigation
    window.open(`https://www.google.com/maps/search/?api=1&query=${clientInfo?.title}+${clientInfo?.location}`, '_blank');
  };

  return (
    <Container maxWidth="md" sx={{ pb: 8 }}>
      {/* Header with back button and actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2, pb: 1 }}>
        <IconButton edge="start" aria-label="back" onClick={handleBack}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Box>
          <IconButton aria-label="share" onClick={handleShare}>
            <ShareIcon />
          </IconButton>
          <IconButton
            aria-label={favorite ? 'remove from favorites' : 'add to favorites'}
            onClick={handleFavoriteToggle}
            color={favorite ? 'secondary' : 'default'}
          >
            <FavoriteIcon />
          </IconButton>
        </Box>
      </Box>
      
      {/* Main Image */}
      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 2, 
          overflow: 'hidden', 
          mb: 2, 
          position: 'relative',
          height: 300
        }}
      >
        <Box
          component="img"
          src={placeImages[0]}
          alt={clientInfo?.title || "Place Image"}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            p: 2,
            color: 'white',
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            {clientInfo?.title}
          </Typography>
          <Typography variant="subtitle1">
            {clientInfo?.subtitle}
          </Typography>
        </Box>
      </Paper>
      
      {/* Place Details */}
      <Box sx={{ mb: 4 }}>
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  {clientInfo?.placeDetails?.openingHours || '9:00 AM - 6:00 PM'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  {clientInfo?.location || 'Location'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PaidIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  {clientInfo?.placeDetails?.entranceFee || 'Free entry'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PublicIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  {variant === 'beppu-place' ? 'www.beppu-tower.jp' : 
                   variant === 'tokyo-place' ? 'www.tokyotower.co.jp' : 
                   'www.example.com'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<DirectionsIcon />}
              onClick={handleDirections}
              sx={{ flex: 1 }}
            >
              Directions
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              startIcon={<InfoIcon />}
              sx={{ flex: 1 }}
            >
              More Info
            </Button>
          </Box>
        </Paper>
      </Box>
      
      {/* Place Description */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          About {clientInfo?.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {clientInfo?.placeDetails?.description || 
            (variant === 'beppu-place' ? 
              'Beppu Tower is a landmark structure in Beppu City, offering visitors panoramic views of the city and its famous hot springs from an observation deck. The tower serves as both a tourist attraction and a symbol of the city.' :
            variant === 'tokyo-place' ? 
              'Tokyo Tower is a communications and observation tower in the Shiba-koen district of Minato, Tokyo, Japan. At 333 meters tall, it\'s inspired by the Eiffel Tower and has become one of the most recognizable symbols of Japan\'s capital city.' :
              'A notable landmark and visitor attraction offering unique experiences and views of the surrounding area.')}
        </Typography>
        <Grid container spacing={2}>
          {placeImages.slice(1, 3).map((image, index) => (
            <Grid item xs={6} key={index}>
              <Box 
                component="img"
                src={image}
                alt={`${clientInfo?.title} image ${index+1}`}
                sx={{
                  width: '100%',
                  height: 120,
                  objectFit: 'cover',
                  borderRadius: 2
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {/* Tour Suggestion Section - Added to link back to tours */}
      {tourId ? null : (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Related Tours
          </Typography>
          
          <Card 
            elevation={2} 
            sx={{ 
              borderRadius: 2, 
              display: 'flex', 
              cursor: 'pointer' 
            }}
            onClick={() => {
              const recommendedTourId = variant === 'beppu-place' ? 'jpn-bepu-tur-001' : 'jpn-toky-tur-001';
              // Navigate to the appropriate tour based on the hostname
              const hostname = window.location.hostname;
              
              if (hostname.includes('go.')) {
                // If on a place domain, redirect to the follow domain
                window.location.href = `https://follow.laxy.travel/${recommendedTourId}`;
              } else {
                // On hub domains, navigate to the tour within the same domain
                navigate(`/follow/${recommendedTourId}`);
              }
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 2 }}>
              <Typography variant="h6" component="div">
                {variant === 'beppu-place' ? 'Beppu Hot Springs Tour' : 
                 variant === 'tokyo-place' ? 'Tokyo City Explorer' : 
                 'Local Guided Tour'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {variant === 'beppu-place' ? '3 hours • Hot Springs Experience' : 
                 variant === 'tokyo-place' ? '4 hours • Urban Adventure' : 
                 '3-4 hours • Guided Experience'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Rating value={4.8} readOnly precision={0.5} size="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  4.8/5 (124 reviews)
                </Typography>
              </Box>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 120 }}
              image={variant === 'beppu-place' ? 
                "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" : 
                variant === 'tokyo-place' ? 
                "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" : 
                "https://images.unsplash.com/photo-1616332544157-c8be02a6b6e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"}
              alt="Tour Image"
            />
          </Card>
        </Box>
      )}
      
      {/* Visitor Tips */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Visitor Tips
        </Typography>
        
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
          <List>
            {tips.map((tip, index) => (
              <ListItem key={index} sx={{ px: 1, py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <ErrorOutlineIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={tip} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
      
      {/* Nearby Places */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Nearby Places
        </Typography>
        
        <Grid container spacing={2}>
          {nearbyPlaces.map((place, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card elevation={2} sx={{ height: '100%', borderRadius: 2 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={place.image}
                  alt={place.name}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {place.type === 'restaurant' ? (
                      <RestaurantIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
                    ) : place.type === 'hotel' ? (
                      <HotelIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
                    ) : (
                      <PhotoCameraIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
                    )}
                    <Typography variant="subtitle1" fontWeight="bold">
                      {place.name}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      {place.distance} away
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ mr: 0.5 }}>
                        {place.rating}
                      </Typography>
                      <Rating 
                        value={place.rating} 
                        readOnly 
                        precision={0.5} 
                        size="small" 
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {/* "Get Guided Tour" Button */}
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'background.paper', p: 2, zIndex: 10, boxShadow: 3 }}>
        <Container maxWidth="md">
          <Button 
            variant="contained" 
            color="secondary" 
            fullWidth 
            size="large"
            sx={{ 
              borderRadius: 2, 
              py: 1.5, 
              fontWeight: 'bold',
              fontSize: '1.1rem'
            }}
            onClick={() => {
              const recommendedTourId = variant === 'beppu-place' ? 'jpn-bepu-tur-001' : 'jpn-toky-tur-001';
              // Navigate to the appropriate tour based on the hostname
              const hostname = window.location.hostname;
              
              if (hostname.includes('go.')) {
                // If on a place domain, redirect to the follow domain
                window.location.href = `https://follow.laxy.travel/${recommendedTourId}`;
              } else {
                // On hub domains, navigate to the tour within the same domain
                navigate(`/follow/${recommendedTourId}`);
              }
            }}
          >
            Get Guided Tour
          </Button>
        </Container>
      </Box>
    </Container>
  );
}

export default PlaceLanding;