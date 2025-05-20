/**
 * Hub client configurations for different hostnames
 * These configurations are used for the HubLanding component
 */

import { beppuStoryData } from '../../mocks/beppuStoryData';

// Cache for client info
const clientInfoCache = new Map();

/**
 * Fetches client information from the S3 bucket
 * @param {string} clientId - The client ID (e.g., beppu-story)
 * @param {string} language - The language code for the content (e.g., 'en', 'ja')
 * @returns {Promise<Object>} The client information
 */
export const fetchClientInfo = async (clientId, languageParam = 'en') => {
  const effectiveLanguage = languageParam || 'en'; // Ensure fallback

  // Generate cache key that includes both client ID and language
  const cacheKey = `${clientId}_${effectiveLanguage}`;
  
  // Return from cache if available
  if (clientInfoCache.has(cacheKey)) {
    return clientInfoCache.get(cacheKey);
  }

  try {
    // Fetch the main client info
    const response = await fetch(`https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/stay/${clientId}/index.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch client info: ${response.status}`);
    }
    const data = await response.json();
    
    // Fetch restaurant data with language parameter
    try {
      const restaurantsResponse = await fetch(
        `https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/stay/${clientId}/restaurants.json?lang=${effectiveLanguage}` // Use effectiveLanguage
      );
      if (restaurantsResponse.ok) {
        const restaurantsData = await restaurantsResponse.json();
        // Merge restaurant data with client info
        data.restaurantList = restaurantsData.restaurants || [];
        // Store additional metadata like title and subtitle
        data.restaurantTitle = restaurantsData.title || '';
        data.restaurantSubtitle = restaurantsData.subtitle || '';
      }
    } catch (restaurantError) {
      console.error(`Error fetching restaurant data for ${clientId} in ${effectiveLanguage}:`, restaurantError); // Use effectiveLanguage
      // If restaurant data can't be fetched, proceed with existing data
    }

    // Fetch places data with language parameter
    try {
      const placesResponse = await fetch(
        `https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/stay/places.json?lang=${effectiveLanguage}`
      );
      if (placesResponse.ok) {
        const placesData = await placesResponse.json();
        // Merge places data with client info
        data.placesList = placesData.places || [];
        // Store any additional metadata
        data.placesTitle = 'Points of Interest';
        data.placesSubtitle = 'Discover Beppus attractions';
      }
    } catch (placesError) {
      console.error(`Error fetching places data in ${effectiveLanguage}:`, placesError);
      // If places data can't be fetched, proceed with existing data
    }
    
    // Store in cache with language-specific key
    clientInfoCache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching client info for ${clientId}:`, error);
    return beppuStoryData;
  }
};

/**
 * Fetches restaurant-specific page data from restaurants.json
 * @param {string} clientId - The client ID (e.g., beppu-story)
 * @param {string} language - The language code for the content (e.g., 'en', 'ja')
 * @returns {Promise<Object>} The restaurant page content
 */
export const fetchRestaurantsPageContent = async (clientId, language = 'en') => {
  const effectiveLanguage = language || 'en';
  const cacheKey = `${clientId}_restaurants_${effectiveLanguage}`;

  // Return from cache if available
  if (clientInfoCache.has(cacheKey)) {
    return clientInfoCache.get(cacheKey);
  }

  try {
    const response = await fetch(
      `https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/stay/${clientId}/restaurants.json?lang=${effectiveLanguage}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch restaurants page content for ${clientId} (lang: ${effectiveLanguage}): ${response.status}`);
    }
    const data = await response.json(); // Expected: { title: "...", subtitle: "...", restaurants: [...] }

    // Ensure structure even if parts are missing
    const result = {
      title: data.title || '',
      subtitle: data.subtitle || '',
      restaurants: data.restaurants || []
    };

    clientInfoCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error(`Error fetching restaurants page content for ${clientId} in ${effectiveLanguage}:`, error);
    // Provide a structured fallback on error
    return {
      title: effectiveLanguage === 'ja' ? 'レストラン情報エラー' : 'Restaurant Info Error',
      subtitle: effectiveLanguage === 'ja' ? 'コンテンツを読み込めませんでした。' : 'Could not load content.',
      restaurants: []
    };
  }
};

/**
 * Gets the client information based on the hostname and pathname
 * Can return either synchronously (for default data) or asynchronously (for API data)
 * @param {string} hostname - The hostname of the current URL
 * @param {string} pathname - The pathname of the current URL
 * @param {string} language - The language code (optional)
 * @returns {Object|Promise<Object>} The client information or a promise that resolves to it
 */
export const getHubClientInfo = (hostname, pathname, language = 'en') => {
  // Beppu Story - Japanese hotspring destination
  if (hostname.includes('stay-beppu-story')) {
    return fetchClientInfo('beppu-story', language);
  }
  
  return fetchClientInfo('beppu-story', language);
};

export default getHubClientInfo;