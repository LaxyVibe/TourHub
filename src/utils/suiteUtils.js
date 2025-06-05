// Use webpack's require.context to dynamically import suite data
// This allows us to scan the directory structure at build time
const suitesContext = require.context('../mocks/suites/beppu-story', true, /\.json$/);

// Discover available suites based on the folder structure
const discoverAvailableSuites = () => {
  try {
    const suites = {};
    const suiteKeys = suitesContext.keys();
    
    // Extract unique suite IDs from the file paths
    // File paths will be like './family-room-1/en.json'
    const suiteIds = [...new Set(
      suiteKeys.map(key => {
        const pathParts = key.split('/');
        // Return the first folder name
        return pathParts[1];
      })
    )];
    
    // Process each suite
    suiteIds.forEach(suiteId => {
      const suiteData = {};
      
      // Find all language files for this suite
      const suiteFiles = suiteKeys.filter(key => key.includes(`/${suiteId}/`));
      
      // Load language data
      suiteFiles.forEach(filePath => {
        // Extract language code from filename (e.g., './family-room-1/en.json' -> 'en')
        const langCode = filePath.split('/').pop().replace('.json', '');
        const langData = suitesContext(filePath);
        suiteData[langCode] = langData;
      });
      
      // Extract name and description from English data if available, or first available language
      const defaultLangData = suiteData.en || Object.values(suiteData)[0];
      
      suites[suiteId] = {
        id: suiteId,
        name: defaultLangData?.data?.[0]?.label || `Suite ${suiteId}`,
        description: defaultLangData?.data?.[0]?.headline || 'A comfortable suite for your stay',
        // Use the first image from slider if available, otherwise use placeholder
        image: defaultLangData?.data?.[0]?.slider?.[0]?.url || 'https://source.unsplash.com/random/800x600/?hotel-room',
        data: suiteData
      };
    });
    
    return suites;
  } catch (error) {
    console.error('Error discovering suites:', error);
    return {};
  }
};

// Map of available suites discovered dynamically at build time
const availableSuites = discoverAvailableSuites();

/**
 * Get list of all available suites
 * @returns {Array} Array of suite objects
 */
export const getAllSuites = () => {
  return Object.values(availableSuites);
};

/**
 * Get suite data by ID and language
 * @param {string} suiteId - The suite ID
 * @param {string} language - The language code
 * @returns {Object|null} Suite data or null if not found
 */
export const getSuiteData = (suiteId, language) => {
  const suite = availableSuites[suiteId];
  if (!suite) return null;
  
  // Use English as fallback if requested language is not available
  const langCode = language === 'zh' ? 'zh-Hans' : language;
  const effectiveLanguage = suite.data[langCode] ? langCode : 'en';
  
  return {
    ...suite,
    details: suite.data[effectiveLanguage]
  };
};
