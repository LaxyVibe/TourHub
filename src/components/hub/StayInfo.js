import React from 'react';
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
  Avatar
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLanguage } from '../../context/LanguageContext';
import { getHubConfigByLanguage } from '../../mocks/hub-application-config';
import { getSuiteData } from '../../utils/suiteUtils';
import { PAGE_LAYOUTS, CONTENT_PADDING } from '../../config/layout';
import { trackButtonClick, trackNavigation } from '../../utils/analytics';

const StayInfo = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { language } = useLanguage();
  
  // Get hub configuration for current language
  const hubConfig = getHubConfigByLanguage(language);
  const suiteId = params.suiteId;
  
  // Get suite data for background image and label
  const suiteData = getSuiteData(suiteId, language);
  const firstSlideImage = suiteData?.details?.data?.[0]?.slider?.[0]?.url;
  const suiteLabel = suiteData?.details?.data?.[0]?.label;
  
  const handleBack = () => {
    trackButtonClick('back_button', 'stay_info');
    trackNavigation('stay_info', 'suite_landing', 'back_button');
    navigate(`/${language}/${suiteId}`);
  };

  const handleNavigationClick = (route) => {
    trackButtonClick(`info_${route.replace('/', '_')}`, 'stay_info');
    trackNavigation('stay_info', 'info_detail', 'info_navigation');
    // Navigate to the specific info page
    navigate(`/${language}/${suiteId}${route}`);
  };

  // Get the pageInfo configuration with navigation items
  const pageInfo = hubConfig?.data?.pageInfo;
  
  if (!pageInfo) {
    return (
      <Container {...PAGE_LAYOUTS.StayInfo}>
        <Box sx={{ ...CONTENT_PADDING.standard }}>
          <IconButton onClick={handleBack} sx={{ mb: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">Page configuration not found</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container {...PAGE_LAYOUTS.StayInfo}>
      <Box sx={{ ...CONTENT_PADDING.standard }}>
        <IconButton onClick={handleBack} sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>

        {/* Header section with background image */}
        <Paper 
          elevation={3}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
            ...(firstSlideImage && {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${firstSlideImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            })
          }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{
              color: firstSlideImage ? 'white' : 'text.primary',
              fontWeight: 'bold',
              textAlign: 'center',
              textShadow: firstSlideImage ? '2px 2px 4px rgba(0,0,0,0.8)' : 'none',
            }}
          >
            {pageInfo.heading || 'Room Information'}
          </Typography>
        </Paper>

        {/* Suite label section */}
        {suiteLabel && (
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              mb: 2, 
              color: 'text.secondary',
              textAlign: 'center',
              fontWeight: 'medium'
            }}
          >
            {suiteLabel}
          </Typography>
        )}

        {/* Navigation items */}
        <Paper 
          elevation={3}
        >
          <List>
            {pageInfo.navigation && pageInfo.navigation.map((item, index) => (
              <ListItem
                key={item.id || index}
                button
                onClick={() => handleNavigationClick(item.route)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemIcon>
                  {item.icon?.url ? (
                    <Avatar
                      src={item.icon.url}
                      alt={item.label}
                      sx={{ width: 32, height: 32 }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        backgroundColor: 'primary.main',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.75rem',
                      }}
                    >
                      {item.label?.[0] || '?'}
                    </Box>
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    variant: 'subtitle1',
                    fontWeight: 'medium',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default StayInfo;