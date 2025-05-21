/**
 * Centralized data fetching with mock data fallbacks
 */
import { beppuStoryData } from '../mocks/beppuStoryData';
import { getRestaurantsByLanguage } from '../mocks/restaurants';
import { getPlacesByLanguage } from '../mocks/places';

// Cache for data
const dataCache = new Map();

/**
 * Fetch data with caching and mock fallback
 */
const fetchWithCache = async (url, cacheKey) => {
  if (dataCache.has(cacheKey)) {
    return dataCache.get(cacheKey);
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    dataCache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
};

/**
 * Get client base info - uses beppuStoryData as mock
 */
export const getClientBaseInfo = async (clientId) => {
  const url = `https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/stay/${clientId}/index.json`;
  const data = await fetchWithCache(url, `base_${clientId}`);
  return data || beppuStoryData;
};

/**
 * Get restaurants data with language support
 */
export const getRestaurantsData = async (clientId, language = 'en') => {
  const url = `https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/stay/${clientId}/restaurants.json?lang=${language}`;
  const data = await fetchWithCache(url, `restaurants_${clientId}_${language}`);
  
  // If API fails, use mock data
  if (!data) {
    const mockData = getRestaurantsByLanguage(language);
    return {
      restaurants: mockData,
      title: beppuStoryData.restaurantTitle || 'Dining Options',
      subtitle: beppuStoryData.restaurantSubtitle || 'Local Restaurants'
    };
  }
  
  // If we have API data, ensure it has the expected structure
  return {
    restaurants: data.restaurants || data || [],
    title: data.title || beppuStoryData.restaurantTitle || 'Dining Options',
    subtitle: data.subtitle || beppuStoryData.restaurantSubtitle || 'Local Restaurants'
  };
};

/**
 * Get places data with language support
 */
export const getPlacesData = async (clientId, language = 'en') => {
  const url = `https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/stay/${clientId}/places.json?lang=${language}`;
  const data = await fetchWithCache(url, `places_${clientId}_${language}`);
  
  // If API fails, use mock data
  if (!data) {
    const mockData = getPlacesByLanguage(language);
    return {
      places: mockData.places || [],
      title: 'Points of Interest',
      subtitle: 'Discover Beppu\'s attractions'
    };
  }
  
  return data;
};
