import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Reusable Highlighted POIs Section component
 * Displays a section of highlighted points of interest with configurable heading
 * 
 * @param {Object} props
 * @param {string} props.heading - The section heading text (from pageSearch.highlightedListHeading)
 * @param {Array} props.pois - Array of POI objects to display
 * @param {string} props.suiteId - The suite ID for navigation
 * @param {Object} props.clientInfo - Client information for navigation state
 * @param {Object} props.sectionLabels - Section labels for navigation state
 * @returns {JSX.Element} The highlighted POIs section component
 */
const HighlightedPOIsSection = ({ 
  heading = 'Explore More', 
  pois = [], 
  suiteId, 
  clientInfo, 
  sectionLabels 
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Don't render if no POIs are provided
  if (!pois || pois.length === 0) {
    return null;
  }

  const handlePOIClick = (poi) => {
    // Navigate to POI detail page using the same logic as SearchPage
    if (poi.type === 'tour') {
      navigate(`/${language}/join/${poi.slug}`);
    } else if (poi.type === 'attraction' || poi.type === 'place') {
      navigate(`/${language}/go/${poi.slug}`);
    } else {
      // For other types, show more info or navigate to external URL
      if (poi.externalURL) {
        window.open(poi.externalURL, '_blank');
      } else {
        // Fallback to generic POI detail route
        navigate(`/${language}/${suiteId}/poi/${poi.id}`, {
          state: { 
            poi,
            suiteId,
            clientInfo: {
              ...clientInfo,
              sectionLabels
            }
          }
        });
      }
    }
  };

  return (
    <Box sx={{ mb: 3, mt: 4 }}>
      <Typography 
        variant="h6" 
        component="h2" 
        sx={{ 
          mb: 2, 
          fontWeight: 'bold', 
          fontSize: { xs: '1.125rem', sm: '1.25rem' } 
        }}
      >
        {heading}
      </Typography>
      
      <Grid container spacing={2}>
        {pois.map((poi) => (
          <Grid item xs={12} sm={6} md={4} key={poi.id}>
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                borderRadius: 2,
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }
              }}
              onClick={() => handlePOIClick(poi)}
            >
              {poi.imageUrl && (
                <Box 
                  component="img" 
                  src={poi.imageUrl} 
                  alt={poi.name || poi.title} 
                  sx={{ 
                    width: '100%', 
                    height: 140, 
                    objectFit: 'cover',
                    borderRadius: 1,
                    mb: 1
                  }} 
                />
              )}
              
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 'medium', 
                  mb: 0.5,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {poi.name || poi.title}
              </Typography>
              
              {poi.description && (
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    '-webkit-line-clamp': 2,
                    '-webkit-box-orient': 'vertical'
                  }}
                >
                  {poi.description}
                </Typography>
              )}
              
              {(poi.category || poi.distance) && (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 'auto'
                }}>
                  {poi.category && (
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        bgcolor: 'primary.light',
                        color: 'primary.contrastText',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.75rem'
                      }}
                    >
                      {poi.category}
                    </Typography>
                  )}
                  
                  {poi.distance && (
                    <Typography variant="caption" color="text.secondary">
                      {poi.distance}
                    </Typography>
                  )}
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HighlightedPOIsSection;
