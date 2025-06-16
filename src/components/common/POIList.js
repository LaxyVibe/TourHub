import React from 'react';
import {
  Container,
  Typography,
  Box,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import PageHeader from '../common/PageHeader';
import { trackPOIView, trackButtonClick, trackNavigation } from '../../utils/analytics';

/**
 * Reusable POI List component for displaying restaurants, attractions, search results, etc.
 * Uses the improved layout with images on the left and content on the right
 * 
 * @param {Object} props
 * @param {Array} props.pois - Array of POI objects to display (for restaurants/attractions)
 * @param {Array} props.searchResults - Array of search result objects from poi-recommendations (for search results)
 * @param {string} props.title - Page title
 * @param {string} props.subtitle - Page subtitle (optional)
 * @param {string} props.type - Type of POIs ('restaurant', 'attraction', 'result', etc.)
 * @param {string} props.suiteId - Suite ID for navigation
 * @param {boolean} props.showHeader - Whether to show the PageHeader (default: true)
 * @param {Function} props.onBackClick - Custom back click handler (optional)
 * @returns {JSX.Element} The POI list component
 */
const POIList = ({ 
  pois = [], 
  searchResults = [],
  title = '', 
  subtitle = '', 
  type = 'poi',
  suiteId,
  showHeader = true,
  onBackClick
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Determine the data source - either searchResults or pois
  const dataItems = searchResults.length > 0 ? searchResults : pois.map(poi => ({ poi }));

  const handlePOIClick = (poi) => {
    // Track POI view
    trackPOIView(poi.slug || poi.id, poi.type || type, language);
    trackButtonClick(`poi_${poi.slug || poi.id}`, `poi_list_${type}`);
    
    // Navigate based on POI type
    if (poi.type === 'tour') {
      trackNavigation(`poi_list_${type}`, 'tour', 'poi_click');
      navigate(`/${language}/join/${poi.slug}`);
    } else if (poi.slug) {
      // Navigate to POI detail page using suiteId and slug
      trackNavigation(`poi_list_${type}`, 'poi_detail', 'poi_click');
      navigate(`/${language}/${suiteId}/poi/${poi.slug}`);
    } else if (poi.externalURL) {
      trackButtonClick('external_link', `poi_${poi.slug || poi.id}`);
      window.open(poi.externalURL, '_blank');
    } else {
      console.log('POI details:', poi);
    }
  };

  const isHostRecommended = (poiSlug) => {
    // Check if this POI has a recommendation (indicating it's host-recommended)
    // Only applies to search results
    if (searchResults.length > 0) {
      const result = searchResults.find(result => result.poi.slug === poiSlug);
      return result && result.recommendation && result.recommendation.trim().length > 0;
    }
    return false;
  };

  return (
    <Container maxWidth="sm" sx={{ pb: 4, px: { xs: 0, sm: 0 }, pt: 0 }}>
      {showHeader && (
        <PageHeader 
          title={title}
          onBack={onBackClick}
        />
      )}
      
      <Box sx={{ px: { xs: 2, sm: 3 }, pt: showHeader ? 2 : 0 }}>
        {!showHeader && title && (
          <Typography 
            variant="h6" 
            component="h2" 
            sx={{ 
              mb: 1, 
              fontWeight: 600,
              fontSize: '1.1rem'
            }}
          >
            {title}
          </Typography>
        )}
        
        {subtitle && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mb: 3, textAlign: showHeader ? 'center' : 'left' }}
          >
            {subtitle}
          </Typography>
        )}

        {dataItems.length === 0 ? (
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No results found
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {dataItems.map((item) => {
              const poi = item.poi;
              const isHost = isHostRecommended(poi.slug);
              
              return (
                <Box 
                  key={poi.id}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    }
                  }}
                  onClick={() => handlePOIClick(poi)}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    height: 'auto',
                    flexDirection: 'row',
                    gap: 2
                  }}>
                    {/* Cover Photo on Left */}
                    {poi.coverPhoto && (
                      <Box
                        component="img"
                        sx={{ 
                          width: 90,
                          height: 90,
                          objectFit: 'cover',
                          flexShrink: 0,
                          borderRadius: 2
                        }}
                        src={poi.coverPhoto.url}
                        alt={poi.label}
                      />
                    )}
                    
                    {/* Content on Right */}
                    <Box sx={{ 
                      flex: 1, 
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      gap: 1
                    }}>
                      {/* Title */}
                      <Box sx={{ mb: 1 }}>
                        <Typography 
                          variant="h6" 
                          component="h3" 
                          sx={{ 
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            lineHeight: 1.3,
                            mb: 0
                          }}
                        >
                          {poi.label}
                        </Typography>
                      </Box>
                      
                      {/* Tags */}
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
                        {/* Regular Tags */}
                        {poi.tag_labels && poi.tag_labels.length > 0 && (
                          poi.tag_labels.map((tag) => (
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
                          ))
                        )}
                        
                        {/* Host Tag */}
                        {isHost && (
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
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default POIList;
