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
import SuiteLandingHeader from './common/SuiteLandingHeader';
import NavigationButton from './common/NavigationButton';
import WifiDialog from './common/WifiDialog';
import { getHubConfigByLanguage } from '../mocks/hub-application-config';
import { getSuiteData } from '../utils/suiteUtils';
import HighlightedPOIsSection from './common/HighlightedPOIsSection';
import { PAGE_LAYOUTS, CONTENT_PADDING } from '../config/layout';
import poiRecommendationsData from '../mocks/poi-recommendations/en.json';
import { trackButtonClick, trackNavigation } from '../utils/analytics';

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
  const [wifiDialogOpen, setWifiDialogOpen] = useState(false);
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

  // Open WiFi dialog instead of navigating to a page
  const handleWifiInfoClick = () => {
    trackButtonClick('wifi_info', 'suite_landing');
    trackNavigation('suite_landing', 'wifi_dialog', 'navigation_button');
    
    setWifiDialogOpen(true);
  };

  const handleStayInfoClick = () => {
    trackButtonClick('stay_info', 'suite_landing');
    trackNavigation('suite_landing', 'stay_info', 'navigation_button');
    
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
    trackButtonClick('restaurants', 'suite_landing');
    trackNavigation('suite_landing', 'restaurants', 'navigation_button');
    
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
    trackButtonClick('attractions', 'suite_landing');
    trackNavigation('suite_landing', 'attractions', 'navigation_button');
    
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
    trackButtonClick(`tour_${tourId}`, 'suite_landing');
    trackNavigation('suite_landing', 'tour_detail', 'featured_tour_click');
    
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
    <Container {...PAGE_LAYOUTS.SuiteLanding}>
      <SuiteLandingHeader title={suiteData?.details?.data?.[0]?.ownedBy?.label} suiteId={suiteId} />
      
      <Box sx={{ ...CONTENT_PADDING.standard, pt: 2 }}>
        <>
          {/* Greeting Section */}
          {suiteData?.details?.data?.[0]?.ownedBy && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 3,
              p: 2.5,
            }}>
              {suiteData.details.data[0].ownedBy.avatar && (
                <Box 
                  component="img" 
                  src={suiteData.details.data[0].ownedBy.avatar.url}
                  alt={suiteData.details.data[0].ownedBy.label}
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
                <Typography 
                  color="text.secondary"
                  sx={{ 
                    fontFamily: 'Commissioner, sans-serif',
                    fontWeight: 400,
                    fontSize: '16px'
                  }}
                >
                  {suiteData.details.data[0].ownedBy.greeting}
                </Typography>
              </Box>
            </Box>
          )}

          {(sliderImages.length > 0 || roomImages.length > 0) && (
            <Box sx={{ mb: 2 }}>
              <Carousel 
                animation="slide"
                autoPlay
                interval={5000}
                indicators={(sliderImages.length > 0 ? sliderImages.length : roomImages.length) > 1}
                navButtonsAlwaysInvisible={(sliderImages.length > 0 ? sliderImages.length : roomImages.length) <= 1}
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
            </Box>
          )}
          
          {/* Headline Section */}
          {suiteData?.details?.data?.[0]?.headline && (
            <Typography 
              component="h2" 
              sx={{ 
                fontSize: '18px',
                fontWeight: 600, 
                fontFamily: 'Inter, sans-serif',
                color: 'neutral.700',
                mb: 0.5,
                position: 'relative',
                zIndex: 1,
                className: 'h-8'
              }}
            >
              {suiteData.details.data[0].headline}
            </Typography>
          )}
          
          <Grid container spacing={0.5} justifyContent="space-between" sx={{ mb: 2, mt: 1 }}>
            {sectionLabels.wifiLabel && (
              <NavigationButton
                iconUrl={sectionLabels.wifiIcon}
                icon={!sectionLabels.wifiIcon && <WifiIcon fontSize={window.innerWidth < 600 ? "medium" : "large"} color="primary" />}
                iconAlt="WiFi"
                label={sectionLabels.wifiLabel}
                onClick={handleWifiInfoClick}
                gridProps={{ xs: 2.4 }}
              />
            )}
            
            {sectionLabels.infoLabel && (
              <NavigationButton
                iconUrl={sectionLabels.infoIcon}
                icon={!sectionLabels.infoIcon && <InfoIcon fontSize={window.innerWidth < 600 ? "medium" : "large"} color="primary" />}
                iconAlt="Info"
                label={sectionLabels.infoLabel}
                onClick={handleStayInfoClick}
                gridProps={{ xs: 2.4 }}
              />
            )}
            
            {sectionLabels.restaurantsLabel && (
              <NavigationButton
                iconUrl={sectionLabels.restaurantsIcon}
                icon={!sectionLabels.restaurantsIcon && <RestaurantIcon fontSize={window.innerWidth < 600 ? "medium" : "large"} color="primary" />}
                iconAlt="Restaurants"
                label={sectionLabels.restaurantsShortLabel}
                onClick={handleRestaurantsClick}
                gridProps={{ xs: 2.4 }}
              />
            )}
            
            {sectionLabels.attractionsLabel && (
              <NavigationButton
                iconUrl={sectionLabels.attractionsIcon}
                icon={!sectionLabels.attractionsIcon && <AttractionsTwoToneIcon fontSize={window.innerWidth < 600 ? "medium" : "large"} color="primary" />}
                iconAlt="Attractions"
                label={sectionLabels.attractionsShortLabel}
                onClick={handleAttractionsClick}
                gridProps={{ xs: 2.4 }}
              />
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
            heading={hubConfig?.data?.pageSearch?.highlightedListHeading}
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
      
      {/* WiFi Dialog */}
      <WifiDialog 
        open={wifiDialogOpen} 
        onClose={() => setWifiDialogOpen(false)} 
        suiteId={suiteId} 
      />
    </Container>
  );
};

export default SuiteLanding;
