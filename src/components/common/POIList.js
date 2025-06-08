import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useLanguage } from '../../context/LanguageContext';
import GlobalHeader from '../common/GlobalHeader';

/**
 * Reusable POI List component for displaying restaurants, attractions, search results, etc.
 * 
 * @param {Object} props
 * @param {Array} props.pois - Array of POI objects to display
 * @param {string} props.title - Page title
 * @param {string} props.subtitle - Page subtitle (optional)
 * @param {string} props.type - Type of POIs ('restaurant', 'attraction', 'result', etc.)
 * @param {string} props.suiteId - Suite ID for navigation
 * @param {boolean} props.showHeader - Whether to show the GlobalHeader (default: true)
 * @param {Function} props.onBackClick - Custom back click handler (optional)
 * @returns {JSX.Element} The POI list component
 */
const POIList = ({ 
  pois = [], 
  title = 'Points of Interest', 
  subtitle = '', 
  type = 'poi',
  suiteId,
  showHeader = true,
  onBackClick
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(`/${language}/${suiteId}`);
    }
  };

  const handlePOIClick = (poi) => {
    // Navigate based on POI type
    if (poi.type === 'tour') {
      navigate(`/${language}/join/${poi.slug}`);
    } else if (poi.slug) {
      // Navigate to POI detail page using suiteId and slug
      navigate(`/${language}/${suiteId}/poi/${poi.slug}`);
    } else if (poi.externalURL) {
      window.open(poi.externalURL, '_blank');
    } else {
      console.log('POI details:', poi);
    }
  };

  return (
    <Container sx={{ pb: 4, px: { xs: 0, sm: 0 }, pt: 0 }}>
      {showHeader && (
        <GlobalHeader 
          title={title} 
          suiteId={suiteId}
          showBackButton={true}
          onBackClick={handleBack}
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

        {pois.length === 0 ? (
          <Paper 
            elevation={1} 
            sx={{ 
              p: 4, 
              textAlign: 'center', 
              borderRadius: 2,
              bgcolor: 'grey.50'
            }}
          >
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No {type}s found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              There are currently no {type}s available for this location.
            </Typography>
          </Paper>
        ) : (          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {pois.map((poi) => (
              <Card 
                key={poi.id}
                elevation={2}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                  }
                }}
                onClick={() => handlePOIClick(poi)}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  {/* Cover Photo on Left */}
                  {poi.coverPhoto && (
                    <CardMedia
                      component="img"
                      sx={{ 
                        width: 120, 
                        height: 120,
                        objectFit: 'cover',
                        flexShrink: 0
                      }}
                      image={poi.coverPhoto.url}
                      alt={poi.label}
                    />
                  )}
                  
                  {/* Content on Right */}
                  <CardContent sx={{ flex: 1, p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        sx={{ 
                          fontWeight: 600,
                          fontSize: '1.1rem',
                          lineHeight: 1.3
                        }}
                      >
                        {poi.label}
                      </Typography>
                      
                      {poi.externalURL && (
                        <IconButton 
                          size="small" 
                          sx={{ color: 'primary.main' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(poi.externalURL, '_blank');
                          }}
                        >
                          <OpenInNewIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                    
                    {/* Tags below label */}
                    {poi.tag_labels && poi.tag_labels.length > 0 && (
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {poi.tag_labels.map((tag) => (
                          <Chip 
                            key={tag.id || tag.name}
                            size="small" 
                            label={tag.name || tag}
                            variant="outlined"
                            sx={{ 
                              fontSize: '0.75rem',
                              height: 24,
                              bgcolor: tag.color ? `${tag.color}.100` : 'grey.100',
                              borderColor: tag.color || 'grey.300'
                            }}
                          />
                        ))}
                      </Box>
                    )}
                  </CardContent>
                </Box>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default POIList;
