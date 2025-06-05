/**
 * Centralized data fetching using direct mock data imports
 */
// Import suite data for beppu-story
import enSuiteData from '../mocks/suites/beppu-story/family-room-1/en.json';

// A map to store suite data by language
const suiteDataByLanguage = {
  'en': enSuiteData,
};

/**
 * Dynamically loads suite data for a specific language and room
 * @param {string} clientId - The client ID (e.g., beppu-story)
 * @param {string} roomId - The room ID (e.g., family-room-1)
 * @param {string} language - The language code (e.g., en, ja)
 * @returns {Promise<Object>} - The suite data for the requested language
 */
const loadSuiteDataForLanguage = async (clientId, roomId, language) => {
  // If we already have this data cached, return it
  if (suiteDataByLanguage[language]) {
    return suiteDataByLanguage[language];
  }

  try {
    // Dynamically import the language-specific file
    const module = await import(`../mocks/suites/${clientId}/${roomId}/${language}.json`);
    suiteDataByLanguage[language] = module.default;
    return module.default;
  } catch (error) {
    console.error(`Failed to load suite data for ${clientId}/${roomId}/${language}:`, error);
    // Fallback to English if the requested language is not available
    return suiteDataByLanguage['en'];
  }
};

// Fallback client data if needed
const defaultClientData = {
  name: 'Beppu Story',
  title: 'Beppu Story',
  subtitle: 'Experience Authentic Japanese Hospitality',
  logo: '/logo.png',
  featuredTours: [],
  featuredPlaces: [],
  restaurantList: [],
  suites: [],
};

/**
 * Get client base info - returns mock data directly from suite data
 */
export const getClientBaseInfo = async (clientId, language = 'en') => {
  console.log(`Using suite data for client ${clientId}, language ${language}`);
  
  const roomId = 'family-room-1'; // Default room
  
  // Try to load the suite data for the requested language
  try {
    // Dynamically load the suite data if needed
    await loadSuiteDataForLanguage(clientId, roomId, language);
    
    // Use the loaded data or fall back to English
    const suiteData = suiteDataByLanguage[language] || suiteDataByLanguage['en'];
    
    if (!suiteData || !suiteData.data || suiteData.data.length === 0) {
      return defaultClientData;
    }
    
    // Extract client info from suite data
    const suite = suiteData.data[0];
    const clientInfo = {
      name: suite.ownedBy?.label || 'Beppu Story',
      title: suite.ownedBy?.label || 'Beppu Story',
      subtitle: 'Experience Authentic Japanese Hospitality',
      logo: suite.ownedBy?.avatar?.url || '/logo.png',
      restaurantTitle: 'Dining Options',
      restaurantSubtitle: 'Local Restaurants',
      featuredTours: [],
      featuredPlaces: [],
      restaurantList: [],
      suites: [
        {
          id: suite.name || 'family-room-1',
          name: suite.label || 'Family Room 1',
          passcode: '1111', // Default passcode
          roomImages: suite.slider?.map(img => ({
            id: img.documentId,
            src: img.url,
            alt: 'Room Image'
          })) || []
        }
      ],
      carouselTitle: suite.label || 'Family Room 1'
    };
    
    return clientInfo;
  } catch (error) {
    console.error(`Error getting client base info for ${clientId}:`, error);
    return defaultClientData;
  }
};

/**
 * Get restaurants data with language support - uses suite data
 */
export const getRestaurantsData = async (clientId, language = 'en') => {
  console.log(`Using suite data for restaurants: client ${clientId}, language ${language}`);
  
  const roomId = 'family-room-1'; // Default room
  
  // Try to load the suite data for the requested language
  try {
    // Dynamically load the suite data if needed
    await loadSuiteDataForLanguage(clientId, roomId, language);
    
    // Use the loaded data or fall back to English
    const suiteData = suiteDataByLanguage[language] || suiteDataByLanguage['en'];
    
    if (!suiteData || !suiteData.data || suiteData.data.length === 0) {
      return {
        restaurants: [],
        title: 'Dining Options',
        subtitle: 'Local Restaurants'
      };
    }
    
    // Extract restaurant POIs from suite data
    const suite = suiteData.data[0];
    const restaurants = suite.ownedBy?.pickedPOIs?.filter(poi => poi.type === 'restaurant').map(restaurant => ({
      id: restaurant.id,
      name: restaurant.label,
      description: restaurant.highlight,
      address: restaurant.address,
      image: restaurant.coverPhoto?.url || 'https://via.placeholder.com/300x200?text=Restaurant',
      url: restaurant.externalURL,
      tags: restaurant.tag_labels?.map(tag => tag.name) || []
    })) || [];
  
    return {
      restaurants,
      title: 'Dining Options',
      subtitle: 'Local Restaurants'
    };
  } catch (error) {
    console.error(`Error getting restaurant data for ${clientId}:`, error);
    return {
      restaurants: [],
      title: 'Dining Options',
      subtitle: 'Local Restaurants'
    };
  }
};

/**
 * Get places data with language support - uses suite data
 */
export const getPlacesData = (clientId, language = 'en') => {
  console.log(`Using suite data for places: client ${clientId}, language ${language}`);
  
  // Get suite data for the selected language or fall back to English
  const suiteData = suiteDataByLanguage[language] || suiteDataByLanguage['en'];
  
  if (!suiteData || !suiteData.data || suiteData.data.length === 0) {
    return Promise.resolve({
      places: [],
      title: 'Points of Interest',
      subtitle: "Discover Beppu's attractions"
    });
  }
  
  // Extract places (non-restaurant POIs) from suite data
  const suite = suiteData.data[0];
  const places = suite.ownedBy?.pickedPOIs?.filter(poi => poi.type !== 'restaurant').map(place => ({
    id: place.id,
    name: place.label,
    description: place.highlight,
    address: place.address,
    image: place.coverPhoto?.url || 'https://via.placeholder.com/300x200?text=Place',
    url: place.externalURL,
    tags: place.tag_labels?.map(tag => tag.name) || []
  })) || [];

  return Promise.resolve({
    places,
    title: 'Points of Interest',
    subtitle: "Discover Beppu's attractions"
  });
};

/**
 * Get POIs by type from suite configuration data
 * @param {string} clientId - The client ID (e.g., beppu-story)
 * @param {string} suiteId - The suite ID (e.g., family-room-1)
 * @param {string} type - The POI type ('restaurant' or 'attraction')
 * @param {string} language - The language code (e.g., en, ja)
 * @returns {Promise<Object>} - The filtered POIs data
 */
export const getPOIsByType = async (clientId, suiteId, type, language = 'en') => {
  console.log(`Getting POIs by type: client ${clientId}, suite ${suiteId}, type ${type}, language ${language}`);
  
  try {
    // Load the suite data for the requested language
    await loadSuiteDataForLanguage(clientId, suiteId, language);
    
    // Use the loaded data or fall back to English
    const suiteData = suiteDataByLanguage[language] || suiteDataByLanguage['en'];
    
    if (!suiteData || !suiteData.data || suiteData.data.length === 0) {
      return {
        pois: [],
        title: type === 'restaurant' ? 'Nearby Restaurants' : 'Nearby Attractions',
        subtitle: type === 'restaurant' ? 'Discover local dining options' : 'Explore local attractions'
      };
    }
    
    // Extract POIs from suite data filtered by type
    const suite = suiteData.data[0];
    const pois = suite.ownedBy?.pickedPOIs?.filter(poi => poi.type === type).map(poi => ({
      id: poi.id,
      documentId: poi.documentId,
      slug: poi.slug,
      label: poi.label,
      address: poi.address,
      highlight: poi.highlight,
      externalURL: poi.externalURL,
      type: poi.type,
      tag_labels: poi.tag_labels || [],
      coverPhoto: poi.coverPhoto
    })) || [];
  
    return {
      pois,
      title: type === 'restaurant' ? 'Nearby Restaurants' : 'Nearby Attractions',
      subtitle: type === 'restaurant' ? 'Discover local dining options' : 'Explore local attractions'
    };
  } catch (error) {
    console.error(`Error getting POIs by type for ${clientId}/${suiteId}:`, error);
    return {
      pois: [],
      title: type === 'restaurant' ? 'Nearby Restaurants' : 'Nearby Attractions',
      subtitle: type === 'restaurant' ? 'Discover local dining options' : 'Explore local attractions'
    };
  }
};
