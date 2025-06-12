/**
 * Centralized data fetching using direct mock data imports
 */
// A map to store suite data by language and room
const suiteDataCache = {};

/**
 * Dynamically loads suite data for a specific language and room
 * @param {string} clientId - The client ID (e.g., beppu-story)
 * @param {string} roomId - The room ID (e.g., family-room-1)
 * @param {string} language - The language code (e.g., en, ja)
 * @returns {Promise<Object>} - The suite data for the requested language
 */
const loadSuiteDataForLanguage = async (clientId, roomId, language) => {
  const cacheKey = `${clientId}/${roomId}/${language}`;
  
  // If we already have this data cached, return it
  if (suiteDataCache[cacheKey]) {
    return suiteDataCache[cacheKey];
  }

  try {
    // Dynamically import the language-specific file
    const module = await import(`../mocks/suites/${clientId}/${roomId}/${language}.json`);
    suiteDataCache[cacheKey] = module.default;
    return module.default;
  } catch (error) {
    console.error(`Failed to load suite data for ${clientId}/${roomId}/${language}:`, error);
    
    // Try to fallback to English if available
    const fallbackCacheKey = `${clientId}/${roomId}/en`;
    if (suiteDataCache[fallbackCacheKey]) {
      return suiteDataCache[fallbackCacheKey];
    }
    
    // Try to load English as fallback
    if (language !== 'en') {
      try {
        const fallbackModule = await import(`../mocks/suites/${clientId}/${roomId}/en.json`);
        suiteDataCache[fallbackCacheKey] = fallbackModule.default;
        return fallbackModule.default;
      } catch (fallbackError) {
        console.error(`Failed to load fallback English data for ${clientId}/${roomId}:`, fallbackError);
      }
    }
    
    return null;
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
    const suiteData = await loadSuiteDataForLanguage(clientId, roomId, language);
    
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
    const suiteData = await loadSuiteDataForLanguage(clientId, roomId, language);
    
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
export const getPlacesData = async (clientId, language = 'en') => {
  console.log(`Using suite data for places: client ${clientId}, language ${language}`);
  
  const roomId = 'family-room-1'; // Default room
  
  try {
    // Dynamically load the suite data if needed
    const suiteData = await loadSuiteDataForLanguage(clientId, roomId, language);
    
    if (!suiteData || !suiteData.data || suiteData.data.length === 0) {
      return {
        places: [],
        title: 'Points of Interest',
        subtitle: "Discover Beppu's attractions"
      };
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

    return {
      places,
      title: 'Points of Interest',
      subtitle: "Discover Beppu's attractions"
    };
  } catch (error) {
    console.error(`Error getting places data for ${clientId}:`, error);
    return {
      places: [],
      title: 'Points of Interest',
      subtitle: "Discover Beppu's attractions"
    };
  }
};

/**
 * Get POIs by type from suite configuration data, sorted by POI recommendation weights
 * @param {string} clientId - The client ID (e.g., beppu-story)
 * @param {string} suiteId - The suite ID (e.g., family-room-01, family-room-1)
 * @param {string} type - The POI type ('restaurant' or 'attraction')
 * @param {string} language - The language code (e.g., en, ja)
 * @returns {Promise<Object>} - The filtered POIs data
 */
export const getPOIsByType = async (clientId, suiteId, type, language = 'en') => {
  console.log(`Getting POIs by type: client ${clientId}, suite ${suiteId}, type ${type}, language ${language}`);
  
  try {
    // Load the suite data for the requested language
    const suiteData = await loadSuiteDataForLanguage(clientId, suiteId, language);
    
    if (!suiteData || !suiteData.data || suiteData.data.length === 0) {
      return {
        pois: [],
        title: type === 'restaurant' ? 'Nearby Restaurants' : 'Nearby Attractions',
        subtitle: type === 'restaurant' ? 'Discover local dining options' : 'Explore local attractions'
      };
    }
    
    // Extract POIs from suite data filtered by type
    const suite = suiteData.data[0];
    let pois = suite.ownedBy?.pickedPOIs?.filter(poi => poi.type === type).map(poi => ({
      id: poi.id,
      documentId: poi.documentId,
      slug: poi.slug,
      label: poi.label,
      address: poi.address,
      highlight: poi.highlight,
      externalURL: poi.externalURL,
      dial: poi.dial,
      laxyURL: poi.laxyURL,
      type: poi.type,
      nativeLanguageCode: poi.nativeLanguageCode,
      tag_labels: poi.tag_labels || [],
      coverPhoto: poi.coverPhoto
    })) || [];

    // Load POI recommendations to get sorting weights
    let poiRecommendations = null;
    try {
      const poiRecommendationsModule = await import(`../mocks/poi-recommendations/${language}.json`);
      poiRecommendations = poiRecommendationsModule.default;
    } catch (error) {
      console.warn(`Failed to load POI recommendations for ${language}:`, error);
    }

    // If we have POIs from suite data, sort them by recommendation weights
    if (pois.length > 0 && poiRecommendations) {
      const weightField = type === 'restaurant' ? 'weightInNearbyRestaurants' : 'weightInNearbyAttractions';
      
      // Create a map of slug to weight for quick lookup
      const weightMap = new Map();
      poiRecommendations.data.forEach(item => {
        weightMap.set(item.poi.slug, item[weightField] || 0);
      });
      
      // Sort POIs by their weights (ascending order - lower weight = higher priority)
      pois.sort((a, b) => {
        const weightA = weightMap.get(a.slug) || 0;
        const weightB = weightMap.get(b.slug) || 0;
        return weightA - weightB;
      });
    }
    
    // If no POIs found in suite data, use POI recommendations as fallback
    if (pois.length === 0 && poiRecommendations) {
      const weightField = type === 'restaurant' ? 'weightInNearbyRestaurants' : 'weightInNearbyAttractions';
      
      pois = poiRecommendations.data
        .filter(item => {
          // Include POIs with positive weight and matching type
          const hasWeight = item[weightField] > 0;
          const matchesType = item.poi.type === type;
          return hasWeight && matchesType;
        })
        .sort((a, b) => a[weightField] - b[weightField]) // Sort by weight (ascending)
        .map(item => ({
          id: item.poi.id,
          documentId: item.poi.documentId,
          slug: item.poi.slug,
          label: item.poi.label,
          address: item.poi.address,
          highlight: item.poi.highlight,
          externalURL: item.poi.externalURL,
          dial: item.poi.dial,
          laxyURL: item.poi.laxyURL,
          type: item.poi.type,
          nativeLanguageCode: item.poi.nativeLanguageCode,
          tag_labels: item.poi.tag_labels || [],
          coverPhoto: item.poi.coverPhoto
        }));
    }
  
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
