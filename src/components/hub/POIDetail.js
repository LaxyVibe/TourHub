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
  Rating,
  Chip,
  Divider,
  Button,
  CircularProgress
} from '@mui/material';
import { useParams } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AttractionIcon from '@mui/icons-material/Place';
import PageHeader from '../common/PageHeader';
import { useLanguage } from '../../context/LanguageContext';
import { getPOIsByType } from '../../utils/dataFetcher';
import { getHubConfigByLanguage } from '../../mocks/hub-application-config';
import AddressDisplay from '../common/AddressDisplay';
import poiRecommendationsData from '../../mocks/poi-recommendations/en.json';
import { PAGE_LAYOUTS, CONTENT_PADDING } from '../../config/layout';
import { trackNavigation, trackContentInteraction } from '../../utils/analytics';

// Function to dynamically load suite data for native language POI details
const loadNativeLanguagePOI = async (poiSlug, nativeLanguageCode, suiteId) => {
  if (!nativeLanguageCode || nativeLanguageCode === 'en') {
    return null; // No native language data needed
  }
  
  try {
    const nativeModule = await import(`../../mocks/suites/beppu-story/${suiteId}/${nativeLanguageCode}.json`);
    const nativeData = nativeModule.default;
    
    // Find the POI in the native language data
    const suite = nativeData.data?.[0];
    if (suite?.ownedBy?.pickedPOIs) {
      const nativePOI = suite.ownedBy.pickedPOIs.find(poi => poi.slug === poiSlug);
      return nativePOI;
    }
    
    return null;
  } catch (error) {
    console.warn(`Failed to load native language data for ${nativeLanguageCode}:`, error);
    return null;
  }
};

const POIDetail = () => {
  const { language } = useLanguage();
  const { poiSlug, suiteId } = useParams();
  
  const [poi, setPOI] = useState(null);
  const [nativePOI, setNativePOI] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  
  const hubConfig = getHubConfigByLanguage(language);
  const pageConfig = hubConfig?.data?.pagPoiDetail;

  // Function to get POI recommendation
  const getPOIRecommendation = (poiSlug) => {
    const recommendationItem = poiRecommendationsData.data.find(
      item => item.poi.slug === poiSlug
    );
    return recommendationItem ? recommendationItem.recommendation : null;
  };

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
          setError(`Location with ID "${poiSlug}" not found in ${language} data.`);
          setPOI(null);
        } else {
          setPOI(foundPOI);
          
          // Track POI view
          trackNavigation(`poi_detail_${foundPOI.type}`, foundPOI.slug, 'direct_access');
          
          // Load native language POI data if available
          if (foundPOI.nativeLanguageCode && foundPOI.nativeLanguageCode !== language) {
            const nativeLanguagePOI = await loadNativeLanguagePOI(poiSlug, foundPOI.nativeLanguageCode, suiteId);
            setNativePOI(nativeLanguagePOI);
          }
          
          // Check for host recommendation
          const hostRecommendation = getPOIRecommendation(poiSlug);
          setRecommendation(hostRecommendation);
        }
      } catch (err) {
        console.error(`Failed to load POI details for slug ${poiSlug} in suite ${suiteId} (lang: ${language}):`, err);
        setError('Failed to load information. Please try again later.');
        setPOI(null);
      }
      setLoading(false);
    };

    if (poiSlug && suiteId) {
      loadPOIDetails();
    }
  }, [language, poiSlug, suiteId]);

  const [isPlayingAudio, setIsPlayingAudio] = React.useState(false);
  const audioRef = React.useRef(null);

  const handlePlayAudio = () => {
    trackContentInteraction('audio_play', poi?.type || 'poi', poi?.slug || poiSlug);
    
    if (audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.pause();
        trackContentInteraction('audio_pause', poi?.type || 'poi', poi?.slug || poiSlug);
      } else {
        audioRef.current.play();
      }
      setIsPlayingAudio(!isPlayingAudio);
    }  };


  if (loading) {
    return (
      <Container {...PAGE_LAYOUTS.POIDetail} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container {...PAGE_LAYOUTS.POIDetail}>
        <PageHeader title="Error" />
        <Box sx={{ ...CONTENT_PADDING.standard }}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', backgroundColor: 'error.light' }}>
            <RestaurantIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
            <Typography variant="h6" color="error.contrastText">Error</Typography>
            <Typography color="error.contrastText">{error}</Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

  if (!poi) {
    return (
      <Container {...PAGE_LAYOUTS.POIDetail}>
        <PageHeader title="Not Found" />
        <Box sx={{ ...CONTENT_PADDING.standard }}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <RestaurantIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6">Not Found</Typography>
            <Typography color="text.secondary">The location you are looking for is not available.</Typography>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container {...PAGE_LAYOUTS.POIDetail}>
      <PageHeader title={poi.label} />
      <Box sx={{ ...CONTENT_PADDING.standard }}>
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {/* Cover Photo */}
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
          {/* POI Label */}
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

          {/* Native Label */}
          {nativePOI && nativePOI.label && nativePOI.label !== poi.label && (
            <Typography variant="h5" sx={{ mb: 2, color: 'text.secondary', fontStyle: 'italic' }}>
              {nativePOI.label}
            </Typography>
          )}

          {/* Tag Labels */}
          {poi.tag_labels && poi.tag_labels.length > 0 && (
            <Box sx={{ mb: 3 }}>
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

          {/* Address and Native Address */}
          {poi.address && (
            <List sx={{ py: 0, mb: 2 }}>
              <ListItem sx={{ px: 0, alignItems: 'flex-start' }}>
                <ListItemIcon sx={{ mt: 0.5 }}>
                  {pageConfig?.addressIcon ? (
                    <Box
                      component="img"
                      src={pageConfig.addressIcon.url}
                      alt="Address"
                      sx={{ width: 24, height: 24 }}
                    />
                  ) : (
                    <Box sx={{ width: 24, height: 24, bgcolor: 'primary.main', borderRadius: '50%' }} />
                  )}
                </ListItemIcon>
                <ListItemText 
                  primary="Address"
                  primaryTypographyProps={{ fontWeight: 'medium', mb: 1 }}
                  secondary={
                    <AddressDisplay
                      suiteId={suiteId}
                      address={poi.address}
                      nativeLanguageCode={poi.nativeLanguageCode}
                      addressURL={poi.externalURL}
                      addressEmbedHTML={poi.addressEmbedHTML}
                      showMap={false}
                      showMapButton={false}
                      poiSlug={poi.slug}
                      isCompact={true}
                    />
                  }
                />
              </ListItem>
            </List>
          )}

          {/* External URL */}
          {poi.externalURL && (
            <List sx={{ py: 0, mb: 2 }}>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  {pageConfig?.urlIcon ? (
                    <Box
                      component="img"
                      src={pageConfig.urlIcon.url}
                      alt="Website"
                      sx={{ width: 24, height: 24 }}
                    />
                  ) : (
                    <Box sx={{ width: 24, height: 24, bgcolor: 'primary.main', borderRadius: '50%' }} />
                  )}
                </ListItemIcon>
                <ListItemText 
                  primary="Website"
                  secondary={
                    <Button 
                      variant="text" 
                      href={poi.externalURL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      sx={{ p: 0, textAlign: 'left', justifyContent: 'flex-start' }}
                    >
                      {poi.externalURL}
                    </Button>
                  }
                />
              </ListItem>
            </List>
          )}

          <Divider sx={{ my: 3 }} />

          {/* Host Recommendation Section */}
          {recommendation && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                {pageConfig?.recommendationHeading || 'Host Recommendation'}
              </Typography>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 2, 
                  backgroundColor: 'primary.50',
                  borderLeft: 4,
                  borderColor: 'primary.main'
                }}
              >
                <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                  {recommendation}
                </Typography>
              </Paper>
            </Box>
          )}

          {/* Highlight Content */}
          {poi.highlight && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                {pageConfig?.highlightHeading || 'Highlight'}
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {poi.highlight}
              </Typography>
            </Box>
          )}

          {poi.rating && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
              <Rating value={poi.rating} precision={0.1} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {poi.rating} ({poi.reviewCount || 0} reviews)
              </Typography>
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
                {isPlayingAudio ? 'Stop Audio' : 'Listen to Audio Tour'}
              </Button>
              <audio ref={audioRef} src={poi.audioGuide} style={{ display: 'none' }} />
            </Box>
          )}
        </Box>
      </Paper>
      </Box>
    </Container>
  );
};

export default POIDetail;
