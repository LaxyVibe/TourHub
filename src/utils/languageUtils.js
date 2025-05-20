/**
 * Language utilities for the TourHub application
 */

// List of supported ISO language codes
export const SUPPORTED_LANGUAGES = [
  'en', // English
  'ja', // Japanese
  'ko', // Korean
  'zh-TW', // Traditional Chinese
  'zh-CN', // Simplified Chinese
];

// Default language to use when no language is specified
export const DEFAULT_LANGUAGE = 'en'; // Default language

/**
 * Detect user's browser language and return a supported language code
 * @returns {string} - Detected language code that is supported by the app
 */
export const detectBrowserLanguage = () => {
  // Get browser language
  const browserLang = navigator.language || navigator.userLanguage || '';
  
  // Check if it's a supported language
  if (isLanguageSupported(browserLang)) {
    return browserLang;
  }
  
  // Handle special cases for Chinese
  if (browserLang.startsWith('zh')) {
    // Check if it's Traditional Chinese
    if (browserLang.includes('TW') || browserLang.includes('HK') || browserLang.includes('MO')) {
      return 'zh-TW';
    }
    // Default to Simplified Chinese for other Chinese variants
    return 'zh-CN';
  }
  
  // Try just the language part without region code
  const langPart = browserLang.split('-')[0];
  if (isLanguageSupported(langPart)) {
    return langPart;
  }
  
  // Fall back to default
  return DEFAULT_LANGUAGE;
};

/**
 * Check if the provided language code is supported
 * @param {string} langCode - ISO language code to check
 * @returns {boolean} - Whether the language is supported
 */
export const isLanguageSupported = (langCode) => {
  if (!langCode) return false;
  
  // Check exact match first (for extended codes like zh-TW, zh-CN)
  if (SUPPORTED_LANGUAGES.includes(langCode)) {
    return true;
  }
  
  // For backward compatibility - map old 'zh' code to 'zh-CN' (Simplified Chinese)
  if (langCode === 'zh') {
    return true;
  }
  
  return false;
};

/**
 * Get a valid language code from the provided code
 * Returns the default language if the provided code is not supported
 * @param {string} langCode - ISO language code to validate
 * @returns {string} - Valid language code
 */
export const getValidLanguageCode = (langCode) => {
  if (!langCode) {
    return DEFAULT_LANGUAGE;
  }
  
  // Handle legacy 'zh' code - map to 'zh-CN' (Simplified Chinese)
  if (langCode === 'zh') {
    return 'zh-CN';
  }
  
  if (isLanguageSupported(langCode)) {
    return langCode;
  }
  
  return DEFAULT_LANGUAGE;
};

/**
 * Extract language code from the URL path
 * @param {string} pathname - Current URL path
 * @returns {object} - Contains langCode and cleanedPathname (without language segment)
 */
export const extractLanguageFromPath = (pathname) => {
  // Remove leading slash if present
  const path = pathname.startsWith('/') ? pathname.substring(1) : pathname;
  
  // Split path by slashes
  const segments = path.split('/');
  
  // Check if the first segment is a language code
  const potentialLangCode = segments[0];
  
  // Handle both simple language codes and extended language codes (e.g., zh-TW, zh-CN)
  const isExtendedCode = potentialLangCode && potentialLangCode.includes('-');
  
  if (isExtendedCode) {
    // For extended language codes like zh-TW or zh-CN
    if (isLanguageSupported(potentialLangCode)) {
      const remainingPath = segments.slice(1).join('/');
      return {
        langCode: potentialLangCode,
        cleanedPathname: '/' + remainingPath
      };
    }
  } else if (isLanguageSupported(potentialLangCode)) {
    // For simple language codes
    const remainingPath = segments.slice(1).join('/');
    return {
      langCode: potentialLangCode,
      cleanedPathname: '/' + remainingPath
    };
  }
  
  // No language code found, return default
  return {
    langCode: DEFAULT_LANGUAGE,
    cleanedPathname: pathname
  };
};