import React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useLanguage } from '../../context/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../../utils/languageUtils';

// Language name mapping
const LANGUAGE_NAMES = {
  'en': 'English',
  'ja': '日本語', // Japanese
  'ko': '한국어', // Korean
  'zh-TW': '繁體中文', // Traditional Chinese
  'zh-CN': '简体中文', // Simplified Chinese
};

/**
 * Language selector component
 * @param {Object} props - Component props
 * @param {Object} props.sx - MUI sx prop for styling
 */
const LanguageSelector = ({ sx = {} }) => {
  const { language, setLanguage } = useLanguage();

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, ...sx }}>
      <FormControl fullWidth size="small">
        <Select
          value={language}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Select language' }}
          sx={{ 
            borderRadius: 2,
            '& .MuiSelect-select': { 
              fontWeight: 'bold',
              py: 1
            }
          }}
        >
          {SUPPORTED_LANGUAGES.map((langCode) => (
            <MenuItem key={langCode} value={langCode}>
              {LANGUAGE_NAMES[langCode] || langCode.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelector;
