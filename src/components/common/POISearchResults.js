import React from 'react';
import {
  Box,
  Typography,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { trackPOIView, trackButtonClick, trackNavigation } from '../../utils/analytics';

/**
 * POI Search Results component for displaying search results in a specific layout
 * matching the design with images on the left and content on the right
 * 
 * @param {Object} props
 * @param {Array} props.searchResults - Array of search result objects from poi-recommendations
 * @param {string} props.suiteId - Suite ID for navigation
 * @returns {JSX.Element} The search results component
 */
const POISearchResults = ({ searchResults = [], suiteId }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handlePOIClick = (poi) => {
    // Track POI view
    trackPOIView(poi.slug || poi.id, poi.type || 'poi', language);
    trackButtonClick(`poi_${poi.slug || poi.id}`, 'search_results');
    
    // Navigate to POI detail page
    trackNavigation('search_results', 'poi_detail', 'poi_click');
    navigate(`/${language}/${suiteId}/poi/${poi.slug}`);
  };

  const isHostRecommended = (poiSlug) => {
    // Check if this POI has a recommendation (indicating it's host-recommended)
    const result = searchResults.find(result => result.poi.slug === poiSlug);
    return result && result.recommendation && result.recommendation.trim().length > 0;
  };

  if (!searchResults || searchResults.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          No results found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your search terms
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {searchResults.map((result) => {
        const poi = result.poi;
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
  );
};

export default POISearchResults;