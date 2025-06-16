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
import PhoneIcon from '@mui/icons-material/Phone';
import POIHeader from './POIHeader';
import { useLanguage } from '../../context/LanguageContext';
import { getPOIsByType } from '../../utils/dataFetcher';
import { getHubConfigByLanguage } from '../../mocks/hub-application-config';
import { getSuiteData } from '../../utils/suiteUtils';
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
  
  // State for expandable text sections
  const [isRecommendationExpanded, setIsRecommendationExpanded] = useState(false);
  const [isHighlightExpanded, setIsHighlightExpanded] = useState(false);
  
  const hubConfig = getHubConfigByLanguage(language);
  const pageConfig = hubConfig?.data?.pagPoiDetail;

  // Get suite data for host avatar
  const suiteData = getSuiteData(suiteId, language);
  const hostAvatar = suiteData?.details?.data?.[0]?.ownedBy?.avatar;

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
          
          // Debug: Log POI data to check laxyURL
          console.log('POI Data loaded:', foundPOI);
          console.log('LaxyURL:', foundPOI.laxyURL);
          
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

  // Helper function to render expandable text
  const renderExpandableText = (text, isExpanded, setIsExpanded, characterLimit = 300, isItalic = true) => {
    if (!text || text.length <= characterLimit) {
      return (
        <Typography 
          variant="body1" 
          sx={{ 
            fontStyle: isItalic ? 'italic' : 'normal',
            fontFamily: 'Commissioner, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: 1.6
          }}
        >
          {text}
        </Typography>
      );
    }

    const truncatedText = text.substring(0, characterLimit);
    const displayText = isExpanded ? text : `${truncatedText}...`;

    return (
      <Box>
        <Typography 
          variant="body1" 
          sx={{ 
            fontStyle: isItalic ? 'italic' : 'normal',
            fontFamily: 'Commissioner, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: 1.6,
            mb: 1
          }}
        >
          {displayText}
        </Typography>
        <Button
          variant="text"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            p: 0,
            minWidth: 'auto',
            fontSize: '14px',
            fontWeight: 500,
            color: 'primary.main',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline'
            }
          }}
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </Button>
      </Box>
    );
  };

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
          elevation={0} 
          sx={{ 
            borderRadius: 4, // 16px radius
            overflow: 'hidden',
            position: 'relative',
            zIndex: 10,
            backgroundColor: '#F5F5F5', // Neutral/100 background
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
                <Typography 
                  variant="body1" 
                  sx={{ 
                    lineHeight: 1.6,
                    '&:hover': {
                      color: 'primary.main'
                    }
                  }}
                >
                  {poi.address}
                </Typography>
              </Box>
            </Box>
          )}

          {/* External URL Section */}
          {poi.externalURL && (
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
            </Box>
          )}

          {/* Phone Number Section */}
          {poi.dial && (
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ width: 24, height: 24, color: 'primary.main', mr: 1 }} />
                <Button 
                  variant="text" 
                  href={`tel:${poi.dial}`}
                  sx={{ p: 0, textAlign: 'left', justifyContent: 'flex-start' }}
                >
                  {poi.dial}
                </Button>
              </Box>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          {/* Host Recommendation Section */}
          {recommendation && (
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    fontSize: '18px',
                    fontFamily: 'Inter, sans-serif',
                    color: '#328188'
                  }}
                >
                  {pageConfig?.recommendationHeading || 'Host Recommendation'}
                </Typography>
                {hostAvatar && (
                  <Box 
                    component="img" 
                    src={hostAvatar.url}
                    alt="Host"
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #fff',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      flexShrink: 0
                    }} 
                  />
                )}
              </Box>
              <Box>
                {renderExpandableText(
                  recommendation, 
                  isRecommendationExpanded, 
                  setIsRecommendationExpanded,
                  250
                )}
              </Box>
            </Box>
          )}

          {/* Highlight Content */}
          {poi.highlight && (
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2, 
                  fontWeight: 600,
                  fontSize: '18px',
                  fontFamily: 'Inter, sans-serif',
                  color: '#423B3C'
                }}
              >
                {pageConfig?.highlightHeading || 'Highlight'}
              </Typography>
              {renderExpandableText(
                poi.highlight, 
                isHighlightExpanded, 
                setIsHighlightExpanded,
                400,
                false
              )}
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

          {/* LaxyURL Section */}
          {poi.laxyURL && (
            <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 2, 
                  fontWeight: 500,
                  color: 'text.primary',
                  textAlign: 'center'
                }}
              >
                Explore more about {poi.label}?
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                  trackContentInteraction('laxy_audio_guide_click', poi?.type || 'poi', poi?.slug || poiSlug);
                  window.open(poi.laxyURL, '_blank');
                }}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: '1rem',
                  mb: 2
                }}
              >
                Start Audio Guide with Laxy
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default POIDetail;
