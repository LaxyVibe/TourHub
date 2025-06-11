import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Rating,
  Chip,
  Divider,
  Button,
  CircularProgress
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import POIHeader from './POIHeader';
import { useLanguage } from '../../context/LanguageContext';
import { getPOIsByType } from '../../utils/dataFetcher';
import { getHubConfigByLanguage } from '../../mocks/hub-application-config';
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
  const navigate = useNavigate();
  
  const [poi, setPOI] = useState(null);
  const [nativePOI, setNativePOI] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [poiRecommendationsData, setPOIRecommendationsData] = useState(null);
  
  const hubConfig = getHubConfigByLanguage(language);
  const pageConfig = hubConfig?.data?.pagPoiDetail;

  // Load POI recommendations data based on current language
  useEffect(() => {
    const loadPOIRecommendations = async () => {
      try {
        const poiModule = await import(`../../mocks/poi-recommendations/${language}.json`);
        setPOIRecommendationsData(poiModule.default);
      } catch (error) {
        console.error(`Failed to load POI recommendations for language ${language}:`, error);
        // Fallback to English if language-specific data is not available
        try {
          const fallbackModule = await import(`../../mocks/poi-recommendations/en.json`);
          setPOIRecommendationsData(fallbackModule.default);
        } catch (fallbackError) {
          console.error('Failed to load fallback POI recommendations:', fallbackError);
          setPOIRecommendationsData({ data: [] });
        }
      }
    };

    loadPOIRecommendations();
  }, [language]);

  // Function to get POI recommendation
  const getPOIRecommendation = useCallback((poiSlug) => {
    if (!poiRecommendationsData) return null;
    const recommendationItem = poiRecommendationsData.data.find(
      item => item.poi.slug === poiSlug
    );
    return recommendationItem ? recommendationItem.recommendation : null;
  }, [poiRecommendationsData]);

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

    if (poiSlug && suiteId && poiRecommendationsData) {
      loadPOIDetails();
    }
  }, [language, poiSlug, suiteId, poiRecommendationsData, getPOIRecommendation]);

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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <POIHeader />
        <Container {...PAGE_LAYOUTS.POIDetail}>
          <Box sx={{ ...CONTENT_PADDING.standard }}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', backgroundColor: 'error.light' }}>
              <RestaurantIcon sx={{ fontSize: 60, color: 'error.main', mb: 2 }} />
              <Typography variant="h6" color="error.contrastText">Error</Typography>
              <Typography color="error.contrastText">{error}</Typography>
            </Paper>
          </Box>
        </Container>
      </Box>
    );
  }

  if (!poi) {
    return (
      <Box>
        <POIHeader />
        <Container {...PAGE_LAYOUTS.POIDetail}>
          <Box sx={{ ...CONTENT_PADDING.standard }}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <RestaurantIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6">Not Found</Typography>
              <Typography color="text.secondary">The location you are looking for is not available.</Typography>
            </Paper>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* POI Header with image and back button */}
      <POIHeader 
        coverPhoto={poi.coverPhoto}
        poiLabel={poi.label}
      />
      
      {/* Main Content Card */}
      <Container {...PAGE_LAYOUTS.POIDetail} sx={{ position: 'relative', mt: -8 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: 4, // 16px radius
            overflow: 'hidden',
            position: 'relative',
            zIndex: 10,
            ...CONTENT_PADDING.standard
          }}
        >
          {/* POI Label */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3, mt:4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', flex: 1 }}>
              {poi.label}
            </Typography>
          </Box>

          {/* Native Label */}
          {nativePOI && nativePOI.label && nativePOI.label !== poi.label && (
            <Typography variant="h5" sx={{ mb: 3, color: 'text.secondary', fontStyle: 'italic' }}>
              {nativePOI.label}
            </Typography>
          )}

          {/* Tag Labels */}
          {poi.tag_labels && poi.tag_labels.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
                {/* Regular Tags */}
                {poi.tag_labels.map((tag) => (
                  <Chip 
                    key={tag.id || tag.name}
                    size="large" 
                    label={tag.name || tag}
                    sx={{ 
                      fontSize: '0.75rem',
                      height: 24,
                      backgroundColor: '#9C9696',
                      color: '#ffffff',
                      fontWeight: 400,
                      borderRadius: '4px',
                      '& .MuiChip-label': {
                        paddingLeft: '8px',
                        paddingRight: '8px'
                      }
                    }}
                  />
                ))}
                
                {/* Host Tag */}
                {recommendation && (
                  <Chip 
                    size="small" 
                    label="Host"
                    sx={{ 
                      fontSize: '0.75rem',
                      height: 24,
                      backgroundColor: '#ff6b47',
                      color: 'white',
                      fontWeight: 400,
                      borderRadius: '4px',
                      '& .MuiChip-label': {
                        paddingLeft: '8px',
                        paddingRight: '8px'
                      }
                    }}
                  />
                )}
              </Box>
            </Box>
          )}

          {/* Address Section */}
          {poi.address && (
            <Box sx={{ mb: 3 }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    borderRadius: 1
                  },
                  p: 1,
                  mx: -1
                }}
                onClick={() => navigate(`/${language}/${suiteId}/poi/${poi.slug}/address`)}
              >
                {pageConfig?.addressIcon ? (
                  <Box
                    component="img"
                    src={pageConfig.addressIcon.url}
                    alt="Address"
                    sx={{ width: 24, height: 24, mr: 1, color: 'primary.main' }}
                  />
                ) : (
                  <Box sx={{ width: 24, height: 24, bgcolor: 'primary.main', borderRadius: '50%', mr: 1 }} />
                )}
                <Typography variant="h6" component="h3" sx={{ fontWeight: 'medium' }}>
                  Address
                </Typography>
              </Box>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  lineHeight: 1.6,
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'primary.main'
                  }
                }}
                onClick={() => navigate(`/${language}/${suiteId}/poi/${poi.slug}/address`)}
              >
                {poi.address}
              </Typography>
            </Box>
          )}

          {/* External URL Section */}
          {poi.externalURL && (
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {pageConfig?.urlIcon ? (
                  <Box
                    component="img"
                    src={pageConfig.urlIcon.url}
                    alt="Website"
                    sx={{ width: 24, height: 24, mr: 1, color: 'primary.main' }}
                  />
                ) : (
                  <Box sx={{ width: 24, height: 24, bgcolor: 'primary.main', borderRadius: '50%', mr: 1 }} />
                )}
                <Typography variant="h6" component="h3" sx={{ fontWeight: 'medium' }}>
                  Website
                </Typography>
              </Box>
              
              <Button 
                variant="text" 
                href={poi.externalURL} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ p: 0, textAlign: 'left', justifyContent: 'flex-start' }}
              >
                {poi.externalURL}
              </Button>
            </Box>
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
        </Paper>
      </Container>
    </Box>
  );
};

export default POIDetail;
