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
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AttractionIcon from '@mui/icons-material/Place';
import { useLanguage } from '../../context/LanguageContext';
import { getPOIsByType } from '../../utils/dataFetcher';

const translations = {
  en: {
    loadingMessage: 'Loading details...',
    errorTitle: 'Error',
    errorMessageDefault: 'Failed to load information. Please try again later.',
    poiNotFoundTitle: 'Not Found',
    poiNotFoundMessage: 'The location you are looking for is not available.',
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
    getPOINotFoundError: (id, lang) => `Location with ID "${id}" not found in ${lang} data.`,
  },
  ja: {
    loadingMessage: '詳細を読み込み中...',
    errorTitle: 'エラー',
    errorMessageDefault: '情報の読み込みに失敗しました。後でもう一度お試しください。',
    poiNotFoundTitle: '見つかりません',
    poiNotFoundMessage: 'お探しの場所は利用できません。',
    backButtonAriaLabel: '戻る',
    hostMessageTitle: 'ホストからのメッセージ',
    addressLabel: '住所',
    phoneLabel: '電話番号',
    openingHoursLabel: '営業時間',
    websiteLabel: 'ウェブサイト',
    highlightsTitle: 'ハイライト',
    audioTourPlay: 'オーディオツアーを聞く',
    audioTourStop: 'オーディオを停止',
    reviewCountLabel: 'レビュー',
    getPOINotFoundError: (id, lang) => `ID "${id}" の場所が ${lang} データで見つかりません。`,
  }
};

const POIDetail = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { poiSlug, suiteId } = useParams();
  
  const [poi, setPOI] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const currentTranslations = translations[language] || translations.en;
  
  useEffect(() => {
    const loadPOIDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Search for POI in the specific suite across different types
        const poiTypes = ['restaurant', 'attraction'];
        let foundPOI = null;
        
        for (const poiType of poiTypes) {
          try {
            const result = await getPOIsByType('beppu-story', suiteId, poiType, language);
            foundPOI = result.pois.find(p => p.slug === poiSlug);
            if (foundPOI) {
              foundPOI.type = poiType; // Ensure type is set
              break;
            }
          } catch (error) {
            // Continue searching other POI types
            console.warn(`Failed to search ${poiType} in ${suiteId}:`, error);
          }
        }
        
        if (!foundPOI) {
          setError(currentTranslations.getPOINotFoundError(poiSlug, language));
          setPOI(null);
        } else {
          setPOI(foundPOI);
        }
      } catch (err) {
        console.error(`Failed to load POI details for slug ${poiSlug} in suite ${suiteId} (lang: ${language}):`, err);
        setError(currentTranslations.errorMessageDefault);
        setPOI(null);
      }
      setLoading(false);
    };

    if (poiSlug && suiteId) {
      loadPOIDetails();
    }
  }, [language, poiSlug, suiteId, currentTranslations]);

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
    // Navigate back to the suite page with suiteId
    navigate(`/${language}/${suiteId}`);
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
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

  if (!poi) {
    return (
      <Container maxWidth="md" sx={{ py: 3 }}>
        <IconButton onClick={handleBack} aria-label={currentTranslations.backButtonAriaLabel} sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <RestaurantIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6">{currentTranslations.poiNotFoundTitle}</Typography>
          <Typography color="text.secondary">{currentTranslations.poiNotFoundMessage}</Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <IconButton onClick={handleBack} aria-label={currentTranslations.backButtonAriaLabel} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>

      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {poi.coverPhoto && (
          <Box
            component="img"
            src={poi.coverPhoto.url}
            alt={poi.label}
            sx={{
              width: '100%',
              height: 300,
              objectFit: 'cover'
            }}
          />
        )}
        
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', flex: 1 }}>
              {poi.label}
            </Typography>
            {poi.type === 'restaurant' ? (
              <RestaurantIcon sx={{ fontSize: 40, color: 'primary.main', ml: 2 }} />
            ) : (
              <AttractionIcon sx={{ fontSize: 40, color: 'primary.main', ml: 2 }} />
            )}
          </Box>

          {poi.rating && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={poi.rating} precision={0.1} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {poi.rating} ({poi.reviewCount || 0} {currentTranslations.reviewCountLabel})
              </Typography>
            </Box>
          )}

          {poi.highlight && (
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
              {poi.highlight}
            </Typography>
          )}

          <Divider sx={{ my: 3 }} />

          <List sx={{ py: 0 }}>
            {poi.address && (
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <LocationOnIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={currentTranslations.addressLabel}
                  secondary={poi.address}
                />
              </ListItem>
            )}

            {poi.phone && (
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <PhoneIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={currentTranslations.phoneLabel}
                  secondary={poi.phone}
                />
              </ListItem>
            )}

            {poi.openingHours && (
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <AccessTimeIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={currentTranslations.openingHoursLabel}
                  secondary={poi.openingHours}
                />
              </ListItem>
            )}

            {poi.website && (
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <LanguageIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={currentTranslations.websiteLabel}
                  secondary={
                    <Button 
                      variant="text" 
                      href={poi.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      sx={{ p: 0, textAlign: 'left', justifyContent: 'flex-start' }}
                    >
                      {poi.website}
                    </Button>
                  }
                />
              </ListItem>
            )}
          </List>

          {poi.tag_labels && poi.tag_labels.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>{currentTranslations.highlightsTitle}</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {poi.tag_labels.map((tag) => (
                  <Chip 
                    key={tag.id || tag.name}
                    label={tag.name || tag}
                    color="primary"
                    variant="outlined"
                    sx={{ 
                      bgcolor: tag.color ? `${tag.color}.100` : 'primary.50',
                      borderColor: tag.color || 'primary.main'
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {poi.audioGuide && (
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<PlayCircleOutlineIcon />}
                onClick={handlePlayAudio}
                fullWidth
                sx={{ py: 1.5 }}
              >
                {isPlayingAudio ? currentTranslations.audioTourStop : currentTranslations.audioTourPlay}
              </Button>
              <audio ref={audioRef} src={poi.audioGuide} style={{ display: 'none' }} />
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default POIDetail;
