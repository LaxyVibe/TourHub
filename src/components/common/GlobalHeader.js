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
          leftIcon ? (
            <Box 
              component="img" 
              src={leftIcon} 
              alt="Language" 
              sx={{ width: 24, height: 24 }} 
            />
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM18.92 8H15.97C15.65 6.75 15.19 5.55 14.59 4.44C16.43 5.07 17.96 6.35 18.92 8ZM12 4.04C12.83 5.24 13.48 6.57 13.91 8H10.09C10.52 6.57 11.17 5.24 12 4.04ZM4.26 14C4.1 13.36 4 12.69 4 12C4 11.31 4.1 10.64 4.26 10H7.64C7.56 10.66 7.5 11.32 7.5 12C7.5 12.68 7.56 13.34 7.64 14H4.26ZM5.08 16H8.03C8.35 17.25 8.81 18.45 9.41 19.56C7.57 18.93 6.04 17.66 5.08 16ZM8.03 8H5.08C6.04 6.34 7.57 5.07 9.41 4.44C8.81 5.55 8.35 6.75 8.03 8ZM12 19.96C11.17 18.76 10.52 17.43 10.09 16H13.91C13.48 17.43 12.83 18.76 12 19.96ZM14.34 14H9.66C9.57 13.34 9.5 12.68 9.5 12C9.5 11.32 9.57 10.65 9.66 10H14.34C14.43 10.65 14.5 11.32 14.5 12C14.5 12.68 14.43 13.34 14.34 14ZM14.59 19.56C15.19 18.45 15.65 17.25 15.97 16H18.92C17.96 17.65 16.43 18.93 14.59 19.56ZM16.36 14C16.44 13.34 16.5 12.68 16.5 12C16.5 11.32 16.44 10.66 16.36 10H19.74C19.9 10.64 20 11.31 20 12C20 12.69 19.9 13.36 19.74 14H16.36Z" fill="#333333"/>
            </svg>
          )
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
        {rightIcon ? (
          <Box 
            component="img" 
            src={rightIcon} 
            alt="Search" 
            sx={{ width: 24, height: 24 }} 
          />
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#333333"/>
          </svg>
        )}
      </IconButton>
    </Box>
  );
};

export default GlobalHeader;
