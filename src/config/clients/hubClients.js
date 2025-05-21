/**
 * Hub client configurations for different hostnames
 * These configurations are used for the HubLanding component
 */

import { getClientBaseInfo, getRestaurantsData, getPlacesData } from '../../utils/dataFetcher';

/**
 * Fetches client information from the S3 bucket
 * @param {string} clientId - The client ID (e.g., beppu-story)
 * @param {string} language - The language code for the content (e.g., 'en', 'ja')
 * @returns {Promise<Object>} The client information
 */
export const fetchClientInfo = async (clientId, languageParam = 'en') => {
  const effectiveLanguage = languageParam || 'en'; // Ensure fallback

  // Get base client info
  const baseData = await getClientBaseInfo(clientId);
  
  // Get restaurant data
  const restaurantsData = await getRestaurantsData(clientId, effectiveLanguage);
  baseData.restaurantList = restaurantsData.restaurants || [];
  baseData.restaurantTitle = restaurantsData.title || '';
  baseData.restaurantSubtitle = restaurantsData.subtitle || '';

  // Get places data
  const placesData = await getPlacesData(clientId, effectiveLanguage);
  baseData.placesList = placesData.places || [];
  baseData.placesTitle = placesData.title || '';
  baseData.placesSubtitle = placesData.subtitle || '';

  return baseData;
};

// Functions moved to utils/dataFetcher.js

/**
 * Gets the client information based on the hostname and pathname
 * @param {string} hostname - The hostname of the current URL
 * @param {string} pathname - The pathname of the current URL
 * @param {string} language - The language code (optional)
 * @returns {Promise<Object>} The client information
 */
export const getHubClientInfo = (hostname, pathname, language = 'en') => {
  // For now, all hostnames use beppu-story
  return fetchClientInfo('beppu-story', language);
};

export default getHubClientInfo;