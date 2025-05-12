import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Chip, 
  Divider, 
  Button, 
  Card, 
  CardMedia, 
  CardContent, 
  Grid, 
  Avatar, 
  IconButton
} from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Mock data for the guide content
const mockGuideImages = {
  'beppu-tour': [
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1571876396201-13ce8a73fd41?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ],
  'tokyo-tour': [
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ],
  'default': [
    "https://images.unsplash.com/photo-1619877179065-919211503669?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1516546453174-5e1098a4b4af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ]
};

const mockItineraries = {
  'beppu-tour': [
    { time: '09:00', description: 'Meet at Beppu Station', details: 'Look for your guide with a blue Laxy Travel flag' },
    { time: '09:30', description: 'Visit to Hells of Beppu', details: 'Explore the famous hot springs known as "Jigoku" (Hells)' },
    { time: '11:30', description: 'Traditional Onsen Experience', details: 'Enjoy a relaxing time at a local hot spring' },
    { time: '13:00', description: 'Lunch at Local Restaurant', details: 'Taste Beppu specialties like "Jigoku-mushi" (Hell-steamed) cuisine' },
    { time: '14:30', description: 'Sand Bath Experience', details: 'Try the unique sand bath therapy' },
    { time: '16:00', description: 'Return to Beppu Station', details: 'Tour concludes' }
  ],
  'tokyo-tour': [
    { time: '10:00', description: 'Meet at Shibuya Station', details: 'Meet at Hachiko Exit' },
    { time: '10:15', description: 'Shibuya Crossing', details: 'Experience the world\'s busiest pedestrian crossing' },
    { time: '11:00', description: 'Meiji Shrine Visit', details: 'Explore Japan\'s most famous Shinto shrine' },
    { time: '12:30', description: 'Lunch in Harajuku', details: 'Experience trendy food options' },
    { time: '13:30', description: 'Takeshita Street', details: 'Shop at this famous pedestrian street' },
    { time: '15:00', description: 'Omotesando Hills', details: 'Visit high-end shopping district' },
    { time: '16:30', description: 'Return to Shibuya Station', details: 'Tour concludes' }
  ],
  'default': [
    { time: '09:00', description: 'Tour Start', details: 'Meet your guide at the designated location' },
    { time: '11:00', description: 'Main Attractions', details: 'Visit key sightseeing points' },
    { time: '13:00', description: 'Lunch Break', details: 'Enjoy local cuisine' },
    { time: '15:00', description: 'Additional Activities', details: 'Experience local culture' },
    { time: '17:00', description: 'Tour End', details: 'Return to meeting point' }
  ]
};

const guideProfiles = {
  'beppu-tour': {
    name: 'Yuki Tanaka',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    experience: '5 years',
    languages: ['Japanese', 'English'],
    bio: 'Born and raised in Beppu, I specialize in hot spring tours and local cultural experiences.'
  },
  'tokyo-tour': {
    name: 'Kenji Nakamura',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    experience: '7 years',
    languages: ['Japanese', 'English', 'Chinese'],
    bio: 'A certified Tokyo guide with extensive knowledge of the city\'s history, culture, and hidden gems.'
  },
  'default': {
    name: 'Tour Guide',
    image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    experience: '3 years',
    languages: ['English'],
    bio: 'Professional guide passionate about sharing local experiences with travelers from around the world.'
  }
};

function GuideLanding({ clientInfo }) {
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { tourId } = useParams();
  
  // Default to 'default' if variant is not specified
  const variant = clientInfo?.variant || 'default';
  
  // Select the appropriate content based on the variant
  const guideImages = mockGuideImages[variant] || mockGuideImages.default;
  const itinerary = mockItineraries[variant] || mockItineraries.default;
  const guideProfile = guideProfiles[variant] || guideProfiles.default;
  
  // Handle back button
  const handleBack = () => {
    // If coming from a hub (like /follow/tourId), go back to the hub root
    if (location.pathname.includes('/follow/')) {
      // Extract domain parts to determine proper navigation
      const hostname = window.location.hostname;
      
      if (hostname.includes('stay-')) {
        // We're on a stay domain, so go back to the root
        navigate('/');
      } else {
        // Try to go back to previous page in history if possible
        window.history.back();
      }
    } else {
      // Default back behavior
      window.history.back();
    }
  };
  
  // Handle navigation to a place
  const handlePlaceNavigation = (placeId) => {
    // If we're on a follow.laxy.travel domain, navigate to /:tourId/go/:placeId
    const hostname = window.location.hostname;
    
    if (hostname.includes('follow.')) {
      navigate(`/${tourId}/go/${placeId}`);
    } else {
      // On Hub domains, navigate to /go/:placeId
      navigate(`/go/${placeId}`);
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
        title: clientInfo?.title || 'Laxy Travel Tour Guide',
        text: `Check out this amazing tour: ${clientInfo?.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert('Share URL copied to clipboard!');
    }
  };

  return (
    <Container maxWidth="md" sx={{ pb: 6 }}>
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
          src={guideImages[0]}
          alt={clientInfo?.title || "Tour Image"}
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
      
      {/* Tour Highlights */}
      <Box sx={{ mb: 4 }}>
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  {clientInfo?.tourDetails?.duration || '3-4 hours'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  {clientInfo?.location || 'Tour Location'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <StarIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  4.8/5 (124 reviews)
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LanguageIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  {clientInfo?.tourDetails?.languages?.join(', ') || 'English, Japanese'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      
      {/* Tour Highlights Chips */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          Tour Highlights
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {(clientInfo?.tourDetails?.highlights || ['Local Experiences', 'Cultural Sites', 'Photo Opportunities']).map((highlight, index) => (
            <Chip 
              key={index}
              label={highlight}
              color="primary"
              variant="outlined"
              icon={<CheckCircleIcon />}
            />
          ))}
        </Box>
      </Box>
      
      {/* Tour Description */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
          About This Tour
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {variant === 'beppu-tour' ? 
            'Experience the unique geothermal wonders of Beppu on this guided tour of the famous "Hells" (Jigoku). You\'ll also enjoy a traditional hot spring bath and taste local cuisine prepared using the natural steam vents.' :
          variant === 'tokyo-tour' ?
            'Discover the vibrant energy of Tokyo on this guided walking tour. From the iconic Shibuya Crossing to the serene Meiji Shrine and trendy Harajuku district, experience the perfect blend of modern and traditional Japan.' :
            'Join us for a memorable guided tour experience. Our knowledgeable guides will show you the highlights of the area, share interesting stories, and provide insider tips to make your visit special.'}
        </Typography>
        <Grid container spacing={2}>
          {guideImages.slice(1, 3).map((image, index) => (
            <Grid item xs={6} key={index}>
              <Box 
                component="img"
                src={image}
                alt={`Tour image ${index+1}`}
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
      
      {/* Itinerary */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Tour Itinerary
        </Typography>
        
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
          {itinerary.map((item, index) => (
            <Box key={index}>
              <Box sx={{ display: 'flex', mb: 1, mt: index > 0 ? 2 : 0 }}>
                <Box 
                  sx={{ 
                    minWidth: 70, 
                    fontWeight: 'bold', 
                    color: 'primary.main' 
                  }}
                >
                  {item.time}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.details}
                  </Typography>
                </Box>
              </Box>
              {index < itinerary.length - 1 && (
                <Divider sx={{ ml: 4, borderStyle: 'dashed' }} />
              )}
            </Box>
          ))}
        </Paper>
      </Box>
      
      {/* Places to Visit - Added section for place linking */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Places to Visit
        </Typography>
        
        <Grid container spacing={2}>
          {variant === 'beppu-tour' ? (
            <>
              <Grid item xs={12} sm={6}>
                <Card 
                  elevation={2} 
                  sx={{ borderRadius: 2, cursor: 'pointer' }}
                  onClick={() => handlePlaceNavigation('beppu-tower')}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://images.unsplash.com/photo-1584132915807-fd1f5e259e7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    alt="Beppu Tower"
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Beppu Tower
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      A landmark tower providing panoramic views of Beppu City and its famous hot springs.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card elevation={2} sx={{ borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://images.unsplash.com/photo-1545569341-85aa36a0d485?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    alt="Takegawara Onsen"
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Takegawara Onsen
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Historical hot spring bath house dating back to the Meiji period.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </>
          ) : variant === 'tokyo-tour' ? (
            <>
              <Grid item xs={12} sm={6}>
                <Card 
                  elevation={2} 
                  sx={{ borderRadius: 2, cursor: 'pointer' }}
                  onClick={() => handlePlaceNavigation('tokyo-tower')}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    alt="Tokyo Tower"
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Tokyo Tower
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      An iconic communications and observation tower in the heart of Tokyo.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card elevation={2} sx={{ borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    alt="Meiji Shrine"
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Meiji Shrine
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      A serene Shinto shrine dedicated to Emperor Meiji and Empress Shoken.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={6}>
                <Card elevation={2} sx={{ borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    alt="Tourist Attraction"
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Main Attraction
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      A must-visit destination with cultural and historical significance.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card elevation={2} sx={{ borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    alt="Scenic Viewpoint"
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Scenic Viewpoint
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Panoramic views of the surrounding landscape and natural beauty.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
      
      {/* Meet Your Guide */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Meet Your Guide
        </Typography>
        
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2, display: 'flex' }}>
          <Avatar
            src={guideProfile.image}
            alt={guideProfile.name}
            sx={{ width: 80, height: 80, mr: 2 }}
          />
          <Box>
            <Typography variant="h6">
              {guideProfile.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {guideProfile.experience} of experience • {guideProfile.languages.join(', ')}
            </Typography>
            <Typography variant="body2">
              {guideProfile.bio}
            </Typography>
          </Box>
        </Paper>
      </Box>
      
      {/* Book Now Button */}
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
          >
            Book This Tour
          </Button>
        </Container>
      </Box>
    </Container>
  );
}

export default GuideLanding;