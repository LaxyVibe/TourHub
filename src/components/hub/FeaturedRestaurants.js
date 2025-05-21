import React, { useEffect, useState } from 'react';
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
  Divider,
  CircularProgress
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useLanguage } from '../../context/LanguageContext';
import { getRestaurantsData } from '../../utils/dataFetcher';

const translations = {
  en: {
    pageTitleFallback: 'Dining Options',
    errorTitle: 'Restaurant Info Error',
    errorSubtitle: 'Could not load content.',
    errorHeader: 'Error',
    errorMessage: 'Failed to load restaurant information. Please try again later.',
    noRestaurantsTitle: 'No Restaurants Found',
    noRestaurantsMessage: "We're currently updating our restaurant listings. Please check back later.",
    backButtonAriaLabel: "back",
  },
  ja: {
    pageTitleFallback: 'ダイニングオプション',
    errorTitle: 'レストラン情報エラー',
    errorSubtitle: 'コンテンツを読み込めませんでした。',
    errorHeader: 'エラー',
    errorMessage: 'レストラン情報の読み込みに失敗しました。後でもう一度お試しください。',
    noRestaurantsTitle: 'レストランが見つかりません',
    noRestaurantsMessage: '現在レストラン情報を更新中です。後でもう一度ご確認ください。',
    backButtonAriaLabel: "戻る",
  }
};

const FeaturedRestaurants = ({ initialState }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage(); // This is the current language from context
  const currentTranslations = translations[language] || translations.en;

  // State for this component's specific data
  const [pageTitle, setPageTitle] = useState('');
  const [pageSubtitle, setPageSubtitle] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract clientInfo from HubLanding if passed, or use a default/placeholder
  const { clientInfo: passedClientInfo } = initialState || location.state || {};

  useEffect(() => {
    const loadRestaurantData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get restaurant data with fallback to mock data
        const data = await getRestaurantsData('beppu-story', language);
        setPageTitle(data.title || currentTranslations.pageTitleFallback);
        setPageSubtitle(data.subtitle || '');
        setRestaurants(data.restaurants || []);
      } catch (err) {
        console.error("Failed to load restaurant data for FeaturedRestaurants page:", err);
        setError(currentTranslations.errorMessage);
        setPageTitle(currentTranslations.errorTitle);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurantData();
  }, [language, currentTranslations]);
  
  const handleBack = () => {
    // Preserve query parameters when navigating back and include language code
    navigate({
      pathname: `/${language}`,
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
          aria-label={currentTranslations.backButtonAriaLabel}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" component="h1" fontWeight="bold" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          {pageTitle || currentTranslations.pageTitleFallback}
        </Typography>
      </Box>
      
      {pageSubtitle && (
        <Typography 
          variant="subtitle1" 
          color="text.secondary" 
          sx={{ mb: 2, mt: -1 }}
        >
          {pageSubtitle}
        </Typography>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2, textAlign: 'center', backgroundColor: 'error.light' }}>
          <RestaurantIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
          <Typography variant="h6" color="error.contrastText">
            {currentTranslations.errorHeader}
          </Typography>
          <Typography variant="body2" color="error.contrastText">
            {error} 
          </Typography>
        </Paper>
      ) : restaurants.length === 0 ? (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
          <RestaurantIcon sx={{ fontSize: 60, color: 'primary.light', mb: 2 }} />
          <Typography variant="h6">
            {currentTranslations.noRestaurantsTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentTranslations.noRestaurantsMessage}
          </Typography>
        </Paper>
      ) : (
        <Box>
          {restaurants.map((restaurant) => (
            <Paper 
              key={restaurant.id} 
              elevation={2} 
              sx={{ 
                mb: 2, 
                borderRadius: 2, 
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3,
                }
              }}
              onClick={() => {
                navigate(`/${language}/restaurant/${restaurant.id}`, {
                  state: { restaurants, clientInfo: passedClientInfo } // Pass the original clientInfo if needed by detail page
                });
              }}
            >
              {restaurant.thumbnail && (
                <Box 
                  sx={{ 
                    height: { xs: 150, sm: 200 }, 
                    backgroundImage: `url(${restaurant.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}
              <Box sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" component="h2" fontWeight="bold" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                    {restaurant.name}
                  </Typography>
                  <ChevronRightIcon color="action" />
                </Box>
                
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
                
                {(restaurant.categories || restaurant.cuisineType) && (
                  <Box sx={{ my: 1 }}>
                    {restaurant.categories ? (
                      restaurant.categories.map((cuisine, index) => (
                        <Chip 
                          key={index} 
                          label={cuisine} 
                          size="small" 
                          sx={{ mr: 0.5, mb: 0.5, height: { xs: 24, sm: 32 }, '& .MuiChip-label': { fontSize: { xs: '0.7rem', sm: '0.8rem' } } }} 
                        />
                      ))
                    ) : restaurant.cuisineType && (
                      restaurant.cuisineType.split(',').map((cuisine, index) => (
                        <Chip 
                          key={index} 
                          label={cuisine.trim()} 
                          size="small" 
                          sx={{ mr: 0.5, mb: 0.5, height: { xs: 24, sm: 32 }, '& .MuiChip-label': { fontSize: { xs: '0.7rem', sm: '0.8rem' } } }} 
                        />
                      ))
                    )}
                  </Box>
                )}
                
                {(restaurant.detail?.hostMessage || restaurant.description) && (
                  <Typography variant="body1" sx={{ mt: 1, mb: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    {restaurant.detail?.hostMessage || restaurant.description}
                  </Typography>
                )}
                
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