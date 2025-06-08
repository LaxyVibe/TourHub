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
import GlobalHeader from './common/GlobalHeader';
import { PAGE_LAYOUTS, CONTENT_PADDING } from '../config/layout';

const LanguagePage = () => {
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  
  // Store the referrer path when component mounts
  // useEffect is not needed anymore since we're not storing the previous path
  
  // Get configuration data for current language
  const hubConfig = getHubConfigByLanguage(language);
  
  // Extract language page configuration and released languages
  const pageConfig = hubConfig?.data?.pageLanguage || {};
  const heading = pageConfig?.heading || 'Language Setting';
  const applyButtonLabel = pageConfig?.applyButton?.label || 'Apply';
  
  // Get the list of released languages from the universal config
  const releasedLanguages = hubConfig?.data?.universalConfig?.releasedLanguages || [];
  
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };
  
  const handleApply = () => {
    // Store language preference in cookie (30-day expiry)
    setCookie('preferredLanguage', selectedLanguage, 30);
    
    // Update language in context
    setLanguage(selectedLanguage);
    
    // Signal to GlobalHeader that language has been changed
    try {
      localStorage.setItem('languageChanged', 'true');
    } catch (e) {
      console.error('Failed to set language changed flag:', e);
    }
    
    // We'll let the back button in GlobalHeader handle the navigation back
    // Just to be safe, we'll call navigate(-1) here too
    navigate(-1);
  };
  
  return (
    <Container {...PAGE_LAYOUTS.LanguagePage}>
      <GlobalHeader title={heading} showBackButton={true} />
      
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
