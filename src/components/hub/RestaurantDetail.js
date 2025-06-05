import React, { useState, useEffect } from 'react';
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
  Button,
  CircularProgress
} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useLanguage } from '../../context/LanguageContext';
import { getRestaurantsData } from '../../utils/dataFetcher';
import { getHubConfigByLanguage } from '../../mocks/hub-application-config';

const translations = {
  en: {
    loadingMessage: 'Loading restaurant details...',
    errorTitle: 'Error',
    errorMessageDefault: 'Failed to load restaurant information. Please try again later.',
    restaurantNotFoundTitle: 'Restaurant Not Found',
    restaurantNotFoundMessage: 'The restaurant you are looking for is not available.',
    backButtonAriaLabel: 'back',
    hostMessageTitle: 'Message from Host',
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    openingHoursLabel: 'Opening Hours',
    websiteLabel: 'Website',
    highlightsTitle: 'Highlights',
    audioTourPlay: 'Listen to Audio Tour',
    audioTourStop: 'Stop Audio',
    reviewCountLabel: 'reviews',
    getRestaurantNotFoundError: (id, lang) => `Restaurant with ID "${id}" not found in ${lang} data.`,
  },
  ja: {
    loadingMessage: 'レストラン詳細を読み込み中...',
    errorTitle: 'エラー',
    errorMessageDefault: 'レストラン情報の読み込みに失敗しました。後でもう一度お試しください。',
    restaurantNotFoundTitle: 'レストランが見つかりません',
    restaurantNotFoundMessage: 'お探しのレストランは見つかりませんでした。',
    backButtonAriaLabel: '戻る',
    hostMessageTitle: 'ホストからのメッセージ',
    addressLabel: '住所',
    phoneLabel: '電話番号',
    openingHoursLabel: '営業時間',
    websiteLabel: 'ウェブサイト',
    highlightsTitle: 'ハイライト',
    audioTourPlay: 'オーディオツアーを聞く',
    audioTourStop: 'オーディオ停止',
    reviewCountLabel: 'レビュー',
    getRestaurantNotFoundError: (id, lang) => `ID「${id}」のレストランは${lang}のデータに見つかりませんでした。`,
  }
};

const RestaurantDetail = ({ initialState }) => {
  const { restaurantId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  // Get hub configuration for current language
  const hubConfig = getHubConfigByLanguage(language);
  const currentTranslations = translations[language] || translations.en;

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { clientInfo: passedClientInfo } = initialState || location.state || {};

  useEffect(() => {
    const loadRestaurantDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getRestaurantsData('beppu-story', language);

        // Check if data has restaurants array
        const foundRestaurant = data.restaurants?.find(r => r.id === restaurantId);
        if (foundRestaurant) {
          setRestaurant(foundRestaurant);
        } else {
          setError(currentTranslations.getRestaurantNotFoundError(restaurantId, language));
          setRestaurant(null);
        }
      } catch (err) {
        console.error(`Failed to load restaurant details for ID ${restaurantId} (lang: ${language}):`, err);
        setError(currentTranslations.errorMessageDefault);
        setRestaurant(null);
      }
      setLoading(false);
    };

    if (restaurantId) {
      loadRestaurantDetails();
    }
  }, [language, restaurantId, currentTranslations]);

  const [isPlayingAudio, setIsPlayingAudio] = React.useState(false);
  const audioRef = React.useRef(null);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlayingAudio(!isPlayingAudio);
    }
  };
  
  const handleBack = () => {
    navigate(`/${language}/featured-restaurants`, {
      state: { clientInfo: passedClientInfo } 
    });
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
        {/* Optional: <Typography sx={{ ml: 2 }}>{currentTranslations.loadingMessage}</Typography> */}
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 3 }}>
        <IconButton onClick={handleBack} aria-label={currentTranslations.backButtonAriaLabel} sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center', backgroundColor: 'error.light' }}>
          <RestaurantIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
          <Typography variant="h6" color="error.contrastText">{currentTranslations.errorTitle}</Typography>
          <Typography color="error.contrastText">{error}</Typography>
        </Paper>
      </Container>
    );
  }

  if (!restaurant) {
    return (
      <Container maxWidth="md" sx={{ py: 3 }}>
        <IconButton onClick={handleBack} aria-label={currentTranslations.backButtonAriaLabel} sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <RestaurantIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6">{currentTranslations.restaurantNotFoundTitle}</Typography>
          <Typography color="text.secondary">{currentTranslations.restaurantNotFoundMessage}</Typography>
        </Paper>
      </Container>
    );
  }

  const displayName = restaurant[`name${language.charAt(0).toUpperCase() + language.slice(1).replace('-', '')}`] || restaurant.name;
  const displayAddress = restaurant[`address${language.charAt(0).toUpperCase() + language.slice(1).replace('-', '')}`] || restaurant.address;
  const displayHostMessage = restaurant[`hostMessage${language.charAt(0).toUpperCase() + language.slice(1).replace('-', '')}`] || restaurant.detail?.hostMessage;

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <IconButton onClick={handleBack} aria-label={currentTranslations.backButtonAriaLabel} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>

      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {restaurant.thumbnail && (
          <Box
            sx={{
              height: { xs: 200, sm: 300, md: 400 },
              backgroundImage: `url(${restaurant.thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}

        <Box sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant="h4" component="h1" fontWeight="bold" sx={{ mb: 1, fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' } }}>
            {displayName}
          </Typography>
          
          {restaurant.rating && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={restaurant.rating} readOnly precision={0.5} />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {restaurant.rating.toFixed(1)} ({restaurant.reviewCount} {currentTranslations.reviewCountLabel})
              </Typography>
            </Box>
          )}

          {(restaurant.categories || restaurant.cuisineType) && (
            <Box sx={{ mb: 2 }}>
              {(restaurant.categories || restaurant.cuisineType.split(',')).map((cuisine, index) => (
                <Chip 
                  key={index} 
                  label={cuisine.trim()} 
                  size="small" 
                  sx={{ mr: 0.5, mb: 0.5 }} 
                />
              ))}
            </Box>
          )}
          
          <Divider sx={{ my: 2 }} />

          {displayHostMessage && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 1, fontSize: { xs: '1.1rem', sm: '1.2rem' } }}>
                {hubConfig?.pagPoiDetail?.recommendationHeading || currentTranslations.hostMessageTitle}
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                {displayHostMessage}
              </Typography>
            </Box>
          )}
          
          <List>
            {displayAddress && (
              <ListItem disablePadding sx={{ mb: 1.5 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <LocationOnIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={currentTranslations.addressLabel} 
                  secondary={displayAddress} 
                  primaryTypographyProps={{ fontWeight: 'medium', fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  secondaryTypographyProps={{ fontSize: { xs: '0.85rem', sm: '0.95rem' } }}
                />
              </ListItem>
            )}

            {restaurant.detail?.phone && (
              <ListItem disablePadding sx={{ mb: 1.5 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <PhoneIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={currentTranslations.phoneLabel}
                  secondary={restaurant.detail.phone} 
                  primaryTypographyProps={{ fontWeight: 'medium', fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  secondaryTypographyProps={{ fontSize: { xs: '0.85rem', sm: '0.95rem' } }}
                />
              </ListItem>
            )}
            
            {restaurant.detail?.openingHours && restaurant.detail.openingHours.length > 0 && (
              <ListItem disablePadding sx={{ mb: 1.5, alignItems: 'flex-start' }}>
                <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                  <AccessTimeIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={currentTranslations.openingHoursLabel}
                  primaryTypographyProps={{ fontWeight: 'medium', fontSize: { xs: '0.9rem', sm: '1rem' }, mb: 0.5 }}
                  secondary={
                    <Box>
                      {restaurant.detail.openingHours.map((oh, index) => (
                        <Typography key={index} variant="body2" component="div" sx={{ fontSize: { xs: '0.85rem', sm: '0.95rem' } }}>
                          {oh.days}: {oh.hours}
                        </Typography>
                      ))}
                    </Box>
                  }
                />
              </ListItem>
            )}

            {restaurant.detail?.website && (
              <ListItem disablePadding sx={{ mb: 1.5 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <LanguageIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={currentTranslations.websiteLabel}
                  primaryTypographyProps={{ fontWeight: 'medium', fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  secondary={
                    <Button 
                      href={restaurant.detail.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      size="small"
                      sx={{ p: 0, textTransform: 'none', fontSize: { xs: '0.85rem', sm: '0.95rem' } }}
                    >
                      {restaurant.detail.website}
                    </Button>
                  } 
                />
              </ListItem>
            )}
          </List>
          
          {restaurant.detail?.highlights && restaurant.detail.highlights.length > 0 && (
            <Box sx={{ mt: 3, mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1, fontSize: { xs: '1.1rem', sm: '1.2rem' } }}>
                {hubConfig?.pagPoiDetail?.highlightHeading || currentTranslations.highlightsTitle}
              </Typography>
              <List dense>
                {restaurant.detail.highlights.map((highlight, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 28 }}>
                      <Chip label="✓" size="small" color="primary" sx={{ width: 22, height: 22, '& .MuiChip-label': { p:0 }}} />
                    </ListItemIcon>
                    <ListItemText primary={highlight} primaryTypographyProps={{ fontSize: { xs: '0.85rem', sm: '0.95rem' } }} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {restaurant.detail?.audioTourAvailable && restaurant.detail?.audioAddress && (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<PlayCircleOutlineIcon />}
                onClick={handlePlayAudio}
                sx={{ textTransform: 'none', fontSize: { xs: '0.9rem', sm: '1rem' } }}
              >
                {isPlayingAudio ? currentTranslations.audioTourStop : currentTranslations.audioTourPlay}
              </Button>
              <audio ref={audioRef} src={restaurant.detail.audioAddress} style={{ display: 'none' }} />
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default RestaurantDetail;
