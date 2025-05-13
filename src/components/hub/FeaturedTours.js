import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  IconButton,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Divider,
  Grid,
  Paper
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TourIcon from '@mui/icons-material/Tour';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TranslateIcon from '@mui/icons-material/Translate';
import GroupIcon from '@mui/icons-material/Group';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const FeaturedTours = ({ initialState }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use initial state if provided, otherwise extract from location
  const { tours = [], clientInfo } = initialState || location.state || {};
  
  const handleBack = () => {
    // Preserve query parameters when navigating back
    navigate({
      pathname: '/',
      search: location.search
    });
  };

  const handleTourSelect = (tourId) => {
    // Preserve query parameters when navigating to tour detail
    navigate({
      pathname: `/join/${tourId}`,
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
          {clientInfo?.sectionLabels?.toursLabel || 'Available Tours'}
        </Typography>
      </Box>

      {tours.length === 0 ? (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
          <TourIcon sx={{ fontSize: 60, color: 'primary.light', mb: 2 }} />
          <Typography variant="h6">No Tours Available</Typography>
          <Typography variant="body2" color="text.secondary">
            We're currently updating our tour offerings. Please check back later.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {tours.map((tour) => (
            <Grid item xs={12} key={tour.id}>
              <Card 
                elevation={2} 
                sx={{ 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  }
                }}
              >
                {tour.image && (
                  <CardMedia
                    component="img"
                    height={{ xs: 150, sm: 180 }}
                    image={tour.image}
                    alt={tour.name}
                    sx={{ height: { xs: 150, sm: 180 } }}
                  />
                )}
                <CardContent sx={{ p: { xs: 2, sm: 3 }, pt: { xs: 2, sm: 2.5 } }}>
                  <Typography 
                    variant="h6" 
                    component="h2" 
                    fontWeight="bold" 
                    gutterBottom
                    sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' }, mb: 1 }}
                  >
                    {tour.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    {tour.duration && (
                      <Chip 
                        icon={<ScheduleIcon />} 
                        label={tour.duration} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        sx={{ height: { xs: 24, sm: 28 }, '& .MuiChip-label': { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }}
                      />
                    )}
                    {tour.language && (
                      <Chip 
                        icon={<TranslateIcon />} 
                        label={tour.language} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        sx={{ height: { xs: 24, sm: 28 }, '& .MuiChip-label': { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }}
                      />
                    )}
                    {tour.difficulty && (
                      <Chip 
                        icon={<AccessibilityNewIcon />} 
                        label={`Difficulty: ${tour.difficulty}`} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        sx={{ height: { xs: 24, sm: 28 }, '& .MuiChip-label': { fontSize: { xs: '0.7rem', sm: '0.75rem' } } }}
                      />
                    )}
                  </Box>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                    sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' }, mb: 1.5 }}
                  >
                    {tour.description}
                  </Typography>
                  
                  <Divider sx={{ my: 1.5 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <GroupIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5, fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
                        {tour.groupSize || 'Small groups'}
                      </Typography>
                    </Box>
                    {tour.price && (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocalOfferIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5, fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
                          {typeof tour.price === 'number' ? `¥${tour.price.toLocaleString()}` : tour.price}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  
                  {tour.highlights && (
                    <Box sx={{ mt: 2 }}>
                      <Typography 
                        variant="subtitle2" 
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                      >
                        Highlights
                      </Typography>
                      <Typography 
                        variant="body2"
                        sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
                      >
                        {tour.highlights}
                      </Typography>
                    </Box>
                  )}
                  
                  {tour.meetingPoint && (
                    <Box sx={{ mt: 2 }}>
                      <Typography 
                        variant="subtitle2" 
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                      >
                        Meeting Point
                      </Typography>
                      <Typography 
                        variant="body2"
                        sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
                      >
                        {tour.meetingPoint}
                      </Typography>
                    </Box>
                  )}
                  
                  {tour.includedItems && (
                    <Box sx={{ mt: 2 }}>
                      <Typography 
                        variant="subtitle2" 
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
                      >
                        What's Included
                      </Typography>
                      <Typography 
                        variant="body2"
                        sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' } }}
                      >
                        {tour.includedItems}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
                <CardActions sx={{ p: { xs: 1.5, sm: 2 }, pt: 0 }}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    onClick={() => handleTourSelect(tour.id)}
                    startIcon={<TourIcon />}
                    sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                  >
                    {tour.bookableOnline ? 'Book This Tour' : 'Learn More'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ mt: 3, mb: 2, textAlign: 'center' }}>
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
        >
          Tour schedules and availability are subject to change.
        </Typography>
      </Box>
    </Container>
  );
};

export default FeaturedTours;