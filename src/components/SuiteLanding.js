import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid,
  CircularProgress
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import WifiIcon from '@mui/icons-material/Wifi';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AttractionsTwoToneIcon from '@mui/icons-material/AttractionsTwoTone';
// import TourIcon from '@mui/icons-material/Tour'; // Temporarily disabled
import { useLanguage } from '../context/LanguageContext';
import Carousel from 'react-material-ui-carousel';
import { fetchClientInfo } from '../config/clients/hubClients';
import GlobalHeader from './common/GlobalHeader';
import { getHubConfigByLanguage } from '../mocks/hub-application-config';
import { getSuiteData } from '../utils/suiteUtils';
import HighlightedPOIsSection from './common/HighlightedPOIsSection';
import poiRecommendationsData from '../mocks/poi-recommendations/en.json';

/**
 * Gets translations and configuration for the SuiteLanding component using hub application config
 * @param {string} langCode - The language code
 * @param {Object} hubConfig - The hub configuration for the language
 * @returns {Object} Translations and configuration for the SuiteLanding component
 */
const getTranslations = (langCode, hubConfig) => {
  // Initialize empty translations object
  const translations = {
    // Core navigation items
    wifiLabel: '',
    wifiIcon: '',
    infoLabel: '',
    infoIcon: '',
    restaurantsLabel: '',
    restaurantsIcon: '',
    restaurantsShortLabel: '',
    attractionsLabel: '',
    attractionsIcon: '', 
    attractionsShortLabel: '',
    toursLabel: '',
    toursIcon: '',
    
    // Page content
    popularToursLabel: '',
    
    // Buttons
    submit: 'Submit', // Default as fallback for form functionality
    checkout: 'Checkout'
  };

  // If no hub config is available, return empty translations
  if (!hubConfig || !hubConfig.data) {
    return translations;
  }

  // Extract navigation items from hub config
  if (hubConfig.data.pageLanding?.naviagtion) {
    const navItems = hubConfig.data.pageLanding.naviagtion;
    console.log('navItems')
    console.log(navItems)
    const wifiNav = navItems.find(item => item.route === "/info/wifi");
    const infoNav = navItems.find(item => item.route === "/info");
    const spotsNav = navItems.find(item => item.route === "/nearby-attractions");
    const foodsNav = navItems.find(item => item.route === "/nearby-restaurants");
    const toursNav = navItems.find(item => item.route === "/tours");

    if (wifiNav) {
      translations.wifiLabel = wifiNav.label;
      translations.wifiIcon = wifiNav.icon?.url || '';
    }
    
    if (infoNav) {
      translations.infoLabel = infoNav.label;
      translations.infoIcon = infoNav.icon?.url || '';
    }
    
    if (spotsNav) {
      translations.attractionsLabel = spotsNav.label;
      translations.attractionsShortLabel = spotsNav.label;
      translations.attractionsIcon = spotsNav.icon?.url || '';
    }
    
    if (foodsNav) {
      translations.restaurantsLabel = foodsNav.label;
      translations.restaurantsShortLabel = foodsNav.label;
      translations.restaurantsIcon = foodsNav.icon?.url || '';
    }
    
    if (toursNav) {
      translations.toursLabel = toursNav.label;
      translations.toursIcon = toursNav.icon?.url || '';
    }
    
    // Set featured experiences label if available
    if (hubConfig.data.pageLanding.recommendationHeading) {
      translations.popularToursLabel = hubConfig.data.pageLanding.recommendationHeading;
    }
  }

  // Add submit button text from language settings
  if (hubConfig.data.pageLanguage?.applyButton?.label) {
    translations.submit = hubConfig.data.pageLanguage.applyButton.label;
  }
  
  return translations;
};

const SuiteLanding = ({ clientInfo: initialClientInfo }) => {
  const { language } = useLanguage();
  const { suiteId } = useParams();
  const hubConfig = getHubConfigByLanguage(language);
  const sectionLabels = getTranslations(language, hubConfig);
  const [clientInfo, setClientInfo] = useState(initialClientInfo);
  const [loading, setLoading] = useState(!initialClientInfo);
  const [error, setError] = useState(null);
  const [suiteInfo, setSuiteInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadClientInfo = async () => {
      try {
        const data = await fetchClientInfo('beppu-story', language);
        setClientInfo(data);

        // If suiteId is present, find the matching suite
        if (data.suites && suiteId) {
          const matchingSuite = data.suites.find(suite => suite.id === suiteId);
          if (matchingSuite) {
            setSuiteInfo(matchingSuite);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error("Failed to load client info:", err);
        setError("Failed to load client information. Please try again later.");
        setLoading(false);
      }
    };

    if (!initialClientInfo) {
      loadClientInfo();
    } else if (initialClientInfo.suites) {
      const matchingSuite = initialClientInfo.suites.find(suite => suite.id === suiteId);
      if (matchingSuite) {
        setSuiteInfo(matchingSuite);
      }
    }
  }, [initialClientInfo, language, suiteId]);

  // Get route from hub config or fall back to legacy route
  const handleWifiInfoClick = () => {
    const wifiNav = hubConfig?.data?.pageLanding?.naviagtion?.find(item => item.route === "/info/wifi");
    if (wifiNav) {
      navigate(`/${language}/${suiteId}${wifiNav.route}`, { 
        state: { 
          suiteId,
          clientInfo: {
            ...clientInfo,
            sectionLabels
          }
        }
      });
    } else {
      // Fallback to legacy route
      navigate(`/${suiteId}/${language}/wifi-info`);
    }
  };

  const handleStayInfoClick = () => {
    const infoNav = hubConfig?.data?.pageLanding?.naviagtion?.find(item => item.route === "/info");
    if (infoNav) {
      navigate(`/${language}/${suiteId}${infoNav.route}`, {
        state: { 
          suiteId,
          clientInfo: {
            ...clientInfo,
            sectionLabels
          }
        }
      });
    } else {
      // Fallback to legacy route
      navigate(`/${suiteId}/${language}/stay-info`);
    }
  };

  const handleRestaurantsClick = () => {
    const restaurantsNav = hubConfig?.data?.pageLanding?.naviagtion?.find(item => item.route === "/nearby-restaurants");
    if (restaurantsNav) {
      navigate(`/${language}/${suiteId}${restaurantsNav.route}`, {
        state: { 
          restaurants: clientInfo.restaurantList, 
          suiteId,
          clientInfo: {
            ...clientInfo,
            sectionLabels: {
              ...sectionLabels,
              restaurantTitle: clientInfo.restaurantTitle,
              restaurantSubtitle: clientInfo.restaurantSubtitle
            }
          } 
        }
      });
    } else {
      // Fallback to legacy route
      navigate(`/${suiteId}/${language}/featured-restaurants`, {
        state: { 
          restaurants: clientInfo.restaurantList, 
          clientInfo: {
            ...clientInfo,
            sectionLabels: {
              ...sectionLabels,
              restaurantTitle: clientInfo.restaurantTitle,
              restaurantSubtitle: clientInfo.restaurantSubtitle
            }
          } 
        }
      });
    }
  };

  const handleAttractionsClick = () => {
    const attractionsNav = hubConfig?.data?.pageLanding?.naviagtion?.find(item => item.route === "/nearby-attractions");
    if (attractionsNav) {
      navigate(`/${language}/${suiteId}${attractionsNav.route}`, {
        state: { 
          places: clientInfo.featuredPlaces, 
          suiteId,
          clientInfo: {
            ...clientInfo,
            sectionLabels
          }
        }
      });
    } else {
      // Fallback to legacy route
      navigate(`/${suiteId}/${language}/featured-places`, {
        state: { 
          places: clientInfo.featuredPlaces, 
          clientInfo: {
            ...clientInfo,
            sectionLabels
          }
        }
      });
    }
  };

  // Tours functionality temporarily disabled
  /* const handleToursClick = () => {
    const toursNav = hubConfig?.data?.pageLanding?.naviagtion?.find(item => item.route === "/tours");
    if (toursNav) {
      navigate(`/${language}/${suiteId}${toursNav.route}`, {
        state: { 
          tours: clientInfo.featuredTours, 
          suiteId,
          clientInfo: {
            ...clientInfo,
            sectionLabels
          }
        }
      });
    } else {
      // Fallback to legacy route
      navigate(`/${suiteId}/${language}/featured-tours`, {
        state: { 
          tours: clientInfo.featuredTours, 
          clientInfo: {
            ...clientInfo,
            sectionLabels
          }
        }
      });
    }
  }; */

  const handleTourSelect = (tourId) => {
    // Check if there's a specific route for individual tours in the hub config
    // For now, navigate to a nested route under tours
    const toursNav = hubConfig?.data?.pageLanding?.naviagtion?.find(item => item.route === "/tours");
    if (toursNav) {
      navigate(`/${language}/${suiteId}/tours/${tourId}`, {
        state: { 
          tourId,
          suiteId,
          language
        }
      });
    } else {
      // Fallback to legacy route
      navigate(`/${suiteId}/${language}/join/${tourId}`);
    }
  };

    if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }
  
  // Data for display
  const roomImages = suiteInfo ? suiteInfo.roomImages : [];
  
  // Get suite slider data
  const suiteData = getSuiteData(suiteId, language);
  const sliderImages = suiteData?.details?.data?.[0]?.slider || [];
  
  const featuredTours = clientInfo.featuredTours || [];

  return (
    <Container sx={{ pb: 4, px: { xs: 0, sm: 0 }, pt: 0 }}>
      <GlobalHeader title={suiteInfo ? suiteInfo.name : clientInfo.title || 'Suite Information'} suiteId={suiteId} />
      
      <Box sx={{ px: { xs: 2, sm: 3 }, pt: 2 }}>
        <>
          {/* Greeting Section */}
          {suiteData?.details?.data?.[0]?.ownedBy && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 3,
              p: 2.5,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              backgroundImage: 'linear-gradient(to right bottom, #f8f9fa, #f5f7f9)',
              border: '1px solid rgba(0,0,0,0.05)',
            }}>
              {suiteData.details.data[0].ownedBy.avatar && (
                <Box 
                  component="img" 
                  src={suiteData.details.data[0].ownedBy.avatar.url}
                  alt={suiteData.details.data[0].ownedBy.label || "Host"}
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%',
                    mr: 2,
                    objectFit: 'cover',
                    border: '2px solid #fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }} 
                />
              )}
              <Box>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                  {suiteData.details.data[0].ownedBy.label || "Your Host"}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {suiteData.details.data[0].ownedBy.greeting || "Welcome!"}
                </Typography>
              </Box>
            </Box>
          )}

          {(sliderImages.length > 0 || roomImages.length > 0) && (
            <Box sx={{ mb: 2 }}>
              <Carousel 
                animation="slide"
                navButtonsAlwaysVisible
                autoPlay
                interval={5000}
                indicators={true}
                sx={{ borderRadius: 2, overflow: 'hidden' }}
              >
                {(sliderImages.length > 0 ? sliderImages : roomImages).map((item, index) => (
                  <Box 
                    key={item.id || item.documentId || index}
                    sx={{ 
                      height: 250, 
                      backgroundImage: `url(${item.url || item.src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: 2
                    }}
                    aria-label={item.alt || `Slide ${index + 1}`}
                  />
                ))}
              </Carousel>
              <Box sx={{ 
                mt: -4, 
                ml: 2, 
                mb: 2, 
                position: 'relative', 
                zIndex: 10, 
                display: 'inline-flex',
                bgcolor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                px: 2,
                py: 1,
                borderRadius: 1
              }}>
              </Box>
            </Box>
          )}
          
          {/* Headline Section */}
          {suiteData?.details?.data?.[0]?.headline && (
            <Box sx={{ 
              mb: 3,
              mt: 2,
              px: 2,
              py: 2.5,
              borderRadius: 2,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              color: 'primary.contrastText',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <Box sx={{ 
                position: 'absolute', 
                width: '200px', 
                height: '200px',
                borderRadius: '50%',
                bgcolor: 'primary.main',
                opacity: 0.1,
                right: '-100px',
                top: '-100px'
              }} />
              <Typography variant="h5" component="h2" sx={{ 
                fontWeight: 'medium', 
                mb: 0.5,
                position: 'relative',
                zIndex: 1
              }}>
                {suiteData.details.data[0].headline}
              </Typography>
            </Box>
          )}
          
          <Grid container spacing={0.5} justifyContent="space-between" sx={{ mb: 2, mt: 1 }}>
            {sectionLabels.wifiLabel && (
              <Grid item xs={2.4} sx={{ textAlign: 'center' }}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    p: { xs: 1, sm: 1.5 },
                    borderRadius: '50%',
                    width: { xs: 52, sm: 60 },
                    height: { xs: 52, sm: 60 },
                    mx: 'auto',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                    cursor: 'pointer'
                  }}
                  onClick={handleWifiInfoClick}
                >
                  {sectionLabels.wifiIcon ? (
                    <Box 
                      component="img" 
                      src={sectionLabels.wifiIcon} 
                      alt="WiFi"
                      sx={{ 
                        width: { xs: 24, sm: 28 }, 
                        height: { xs: 24, sm: 28 },
                        color: 'primary.main'
                      }}
                    />
                  ) : (
                    <WifiIcon fontSize={window.innerWidth < 600 ? "medium" : "large"} color="primary" />
                  )}
                </Paper>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  {sectionLabels.wifiLabel}
                </Typography>
              </Grid>
            )}
            
            {sectionLabels.infoLabel && (
              <Grid item xs={2.4} sx={{ textAlign: 'center' }}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    p: { xs: 1, sm: 1.5 },
                    borderRadius: '50%',
                    width: { xs: 52, sm: 60 },
                    height: { xs: 52, sm: 60 },
                    mx: 'auto',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                    cursor: 'pointer'
                  }}
                  onClick={handleStayInfoClick}
                >
                  {sectionLabels.infoIcon ? (
                    <Box 
                      component="img" 
                      src={sectionLabels.infoIcon} 
                      alt="Info"
                      sx={{ 
                        width: { xs: 24, sm: 28 }, 
                        height: { xs: 24, sm: 28 },
                        color: 'primary.main'
                      }}
                    />
                  ) : (
                    <InfoIcon fontSize={window.innerWidth < 600 ? "medium" : "large"} color="primary" />
                  )}
                </Paper>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  {sectionLabels.infoLabel}
                </Typography>
              </Grid>
            )}
            
            {sectionLabels.restaurantsLabel && (
              <Grid item xs={2.4} sx={{ textAlign: 'center' }}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    p: { xs: 1, sm: 1.5 },
                    borderRadius: '50%',
                    width: { xs: 52, sm: 60 },
                    height: { xs: 52, sm: 60 },
                    mx: 'auto',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                    cursor: 'pointer'
                  }}
                  onClick={handleRestaurantsClick}
                >
                  {sectionLabels.restaurantsIcon ? (
                    <Box 
                      component="img" 
                      src={sectionLabels.restaurantsIcon} 
                      alt="Restaurants"
                      sx={{ 
                        width: { xs: 24, sm: 28 }, 
                        height: { xs: 24, sm: 28 },
                        color: 'primary.main'
                      }}
                    />
                  ) : (
                    <RestaurantIcon fontSize={window.innerWidth < 600 ? "medium" : "large"} color="primary" />
                  )}
                </Paper>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  {sectionLabels.restaurantsShortLabel}
                </Typography>
              </Grid>
            )}
            
            {sectionLabels.attractionsLabel && (
              <Grid item xs={2.4} sx={{ textAlign: 'center' }}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    p: { xs: 1, sm: 1.5 },
                    borderRadius: '50%',
                    width: { xs: 52, sm: 60 },
                    height: { xs: 52, sm: 60 },
                    mx: 'auto',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                    cursor: 'pointer'
                  }}
                  onClick={handleAttractionsClick}
                >
                  {sectionLabels.attractionsIcon ? (
                    <Box 
                      component="img" 
                      src={sectionLabels.attractionsIcon} 
                      alt="Attractions"
                      sx={{ 
                        width: { xs: 24, sm: 28 }, 
                        height: { xs: 24, sm: 28 },
                        color: 'primary.main'
                      }}
                    />
                  ) : (
                    <AttractionsTwoToneIcon fontSize={window.innerWidth < 600 ? "medium" : "large"} color="primary" />
                  )}
                </Paper>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  {sectionLabels.attractionsShortLabel}
                </Typography>
              </Grid>
            )}
            
            {/* Tours button temporarily disabled - not ready yet */}
            {/* {sectionLabels.toursLabel && (
              <Grid item xs={2.4} sx={{ textAlign: 'center' }}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    p: { xs: 1, sm: 1.5 },
                    borderRadius: '50%',
                    width: { xs: 52, sm: 60 },
                    height: { xs: 52, sm: 60 },
                    mx: 'auto',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                    cursor: 'pointer'
                  }}
                  onClick={handleToursClick}
                >
                  {sectionLabels.toursIcon ? (
                    <Box 
                      component="img" 
                      src={sectionLabels.toursIcon} 
                      alt="Tours"
                      sx={{ 
                        width: { xs: 24, sm: 28 }, 
                        height: { xs: 24, sm: 28 },
                        color: 'primary.main'
                      }}
                    />
                  ) : (
                    <TourIcon fontSize={window.innerWidth < 600 ? "medium" : "large"} color="primary" />
                  )}
                </Paper>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  {sectionLabels.toursLabel}
                </Typography>
              </Grid>
            )} */}
          </Grid>
          {featuredTours.length > 0 && (
            <Box sx={{ mb: 3, mt: 4 }}>
              <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 'bold', fontSize: { xs: '1.125rem', sm: '1.25rem' } }}>
                {sectionLabels.popularToursLabel || 'Featured Experiences'}
              </Typography>
              <Box sx={{ overflowX: 'auto', display: 'flex', pb: 2 }}>
                {featuredTours.map((tour) => (
                  <Paper
                    key={tour.id}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      p: 2,
                      borderRadius: 2,
                      minWidth: 120,
                      mr: 1,
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                      }
                    }}
                    onClick={() => handleTourSelect(tour.id)}
                  >
                    <Box 
                      component="img" 
                      src={tour.imageUrl} 
                      alt={tour.title} 
                      sx={{ 
                        width: '100%', 
                        height: 120, 
                        objectFit: 'cover',
                        borderRadius: 1,
                        mb: 1
                      }} 
                    />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                      {tour.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {tour.description}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {tour.price} {tour.currency}
                    </Typography>
                    <Box sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8, 
                      bgcolor: 'white', 
                      p: 0.5, 
                      borderRadius: 1,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      <Typography variant="caption" color="text.secondary">
                        {tour.duration} | {tour.groupSize} {tour.groupSize === 1 ? 'person' : 'people'}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box>
          )}
          
          {/* Highlighted POIs Section */}
          <HighlightedPOIsSection 
            heading={hubConfig?.data?.pageSearch?.highlightedListHeading || 'Explore More'}
            pois={
              // Use POI recommendations data with weightInHighlight !== -1
              poiRecommendationsData.data
                .filter(item => item.weightInHighlight !== -1)
                .sort((a, b) => a.weightInHighlight - b.weightInHighlight)
                .slice(0, 6) // Show top 6 highlighted POIs
                .map(item => ({
                  id: item.poi.id,
                  name: item.poi.label,
                  title: item.poi.label,
                  description: item.poi.highlight,
                  imageUrl: item.poi.coverPhoto?.url,
                  type: item.poi.type,
                  category: item.poi.type === 'attraction' ? 'Attraction' : 'Experience',
                  distance: item.kmFromStay ? `${item.kmFromStay} km` : '0.5 km',
                  slug: item.poi.slug,
                  externalURL: item.poi.externalURL
                }))
            }
            suiteId={suiteId}
          />
        </>
      </Box>
    </Container>
  );
};

export default SuiteLanding;
