import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button,
  Radio,
  FormControlLabel,
  RadioGroup
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { setCookie } from '../utils/cookieUtils';
import { getHubConfigByLanguage } from '../mocks/hub-application-config';
import PageHeader from './common/PageHeader';
import { PAGE_LAYOUTS, CONTENT_PADDING } from '../config/layout';
import { trackLanguageChange, trackButtonClick, trackNavigation } from '../utils/analytics';

const LanguagePage = () => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  
  // Store the referrer path when component mounts
  // useEffect is not needed anymore since we're not storing the previous path
  
  // Get configuration data for current language
  const hubConfig = getHubConfigByLanguage(language);
  
  // Extract language page configuration from current language
  const pageConfig = hubConfig?.data?.pageLanguage || {};
  const heading = pageConfig?.heading || 'Language Setting';
  const applyButtonLabel = pageConfig?.applyButton?.label || 'Apply';
  
  // Get the list of released languages from the universal config
  // Use the current language's configuration to show the language names in the current language
  const releasedLanguages = hubConfig?.data?.universalConfig?.releasedLanguages || [];
  
  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    trackLanguageChange(language, newLanguage);
    trackButtonClick('language_selection', 'language_page');
    
    setSelectedLanguage(newLanguage);
  };
  
  const handleApply = () => {
    trackButtonClick('apply_language', 'language_page');
    trackNavigation('language_page', 'suite_landing_direct', 'language_apply');
    
    // Store language preference in cookie (30-day expiry)
    setCookie('preferredLanguage', selectedLanguage, 30);
    
    // Signal to PageHeader that language has been changed
    try {
      localStorage.setItem('languageChanged', 'true');
    } catch (e) {
      console.error('Failed to set language changed flag:', e);
    }
    
    // Extract the suiteId from the current URL path
    const pathParts = window.location.pathname.split('/');
    let suiteId = null;
    
    // The URL pattern could be /:langCode/:suiteId/language
    // Find position of current language code in URL
    const langIndex = pathParts.findIndex(part => part === language);
    if (langIndex >= 0 && langIndex + 1 < pathParts.length) {
      // The part after language code should be suiteId
      suiteId = pathParts[langIndex + 1];
    }
    
    // If we found a suiteId in the URL, directly navigate to the suite landing with new language
    if (suiteId) {
      // Update language in context
      setLanguage(selectedLanguage);
      
      // Explicitly navigate to the suite landing page with the new language
      // Construct the URL as /:newLanguage/:suiteId/
      navigate(`/${selectedLanguage}/${suiteId}`);
    } else {
      // If no suiteId was found, just update the language and let the normal navigation happen
      setLanguage(selectedLanguage);
    }
  };
  
  return (
    <Container {...PAGE_LAYOUTS.LanguagePage}>
      <PageHeader title={heading} />
      
      <Paper 
        elevation={0} 
        sx={{ 
          ...CONTENT_PADDING.standard,
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column' 
        }}
      >
        <Box sx={{ mb: 4, flexGrow: 1 }}>
          <RadioGroup
            aria-label="language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            {releasedLanguages.map((lang) => (
              <FormControlLabel 
                key={lang.value}
                value={lang.value}
                control={<Radio color="primary" />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1">{lang.label}</Typography>
                  </Box>
                }
                sx={{ mb: 1, py: 1, borderBottom: '1px solid rgba(0, 0, 0, 0.06)' }}
              />
            ))}
          </RadioGroup>
        </Box>
        
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          onClick={handleApply}
          sx={{ 
            py: 1.5, 
            borderRadius: 2,
            backgroundColor: '#3B7B7B',
            '&:hover': {
              backgroundColor: '#2A5A5A',
            }
          }}
        >
          {applyButtonLabel}
        </Button>
      </Paper>
    </Container>
  );
};

export default LanguagePage;
