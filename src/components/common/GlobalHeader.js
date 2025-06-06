import React from 'react';
import { 
  Box, 
  IconButton,
  Typography 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getHubConfigByLanguage } from '../../mocks/hub-application-config';

/**
 * Global Header component used across the application
 * Shows navigation icons and handles routing
 */
const GlobalHeader = ({ title, showBackButton = false, suiteId = null }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const hubConfig = getHubConfigByLanguage(language);
  
  // Extract header configuration
  const headerConfig = hubConfig?.data?.header || {};
  const leftRoute = headerConfig?.leftRoute || '/language';
  const rightRoute = headerConfig?.rightRoute || '/search';
  const leftIcon = headerConfig?.leftIcon?.url;
  const rightIcon = headerConfig?.rightIcon?.url;

  const handleLeftIconClick = () => {
    // Include suiteId in route if available
    const basePath = suiteId ? `/${language}/${suiteId}` : `/${language}`;
    navigate(`${basePath}${leftRoute}`);
  };

  const handleRightIconClick = () => {
    // Include suiteId in route if available
    const basePath = suiteId ? `/${language}/${suiteId}` : `/${language}`;
    navigate(`${basePath}${rightRoute}`);
  };

  const handleBackClick = () => {
    // Check if we're coming from language page with a language change
    let languageChanged = false;
    try {
      languageChanged = localStorage.getItem('languageChanged') === 'true';
      if (languageChanged) {
        localStorage.removeItem('languageChanged');
      }
    } catch (e) {
      console.error('Failed to check language changed flag:', e);
    }
    
    // Check if we're on the language page
    if (window.location.pathname.includes('/language') || languageChanged) {
      // Get the current path segments
      const pathSegments = window.location.pathname.split('/');
      
      // If we're on the language page, we need to reconstruct the path
      // to go back to where we were, but with the new language
      if (pathSegments.includes('language')) {
        // Remove 'language' from the path segments
        const newPathSegments = pathSegments.filter(segment => segment !== 'language');
        
        // Make sure language is the first real segment
        if (newPathSegments.length > 1) {
          newPathSegments[1] = language;
        }
        
        // Reconstruct the path
        const newPath = newPathSegments.join('/') || `/${language}`;
        navigate(newPath);
      } else {
        // Otherwise, just navigate back with history API
        navigate(-1);
      }
    } else {
      // For non-language pages, simply go back
      navigate(-1);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        px: 2,
        py: 1,
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
      }}
    >
      {/* Left icon */}
      <IconButton
        onClick={showBackButton ? handleBackClick : handleLeftIconClick}
        sx={{ p: 1 }}
      >
        {showBackButton ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="#333333"/>
          </svg>
        ) : (
          <Box 
            component="img" 
            src={leftIcon} 
            alt="Language" 
            sx={{ width: 24, height: 24 }} 
          />
        )}
      </IconButton>

      {/* Title */}
      {title && (
        <Typography 
          variant="h6" 
          component="h1"
          sx={{ 
            fontFamily: 'serif', 
            fontWeight: 500, 
            color: '#3B7B7B', 
            flexGrow: 1, 
            textAlign: 'center' 
          }}
        >
          {title}
        </Typography>
      )}

      {/* Right icon */}
      <IconButton
        onClick={handleRightIconClick}
        sx={{ p: 1 }}
      >
        <Box 
          component="img" 
          src={rightIcon} 
          alt="Search" 
          sx={{ width: 24, height: 24 }} 
        />
      </IconButton>
    </Box>
  );
};

export default GlobalHeader;
