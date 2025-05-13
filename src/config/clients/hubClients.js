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
 * @returns {Promise<Object>} The client information
 */
export const fetchClientInfo = async (clientId) => {
  // Return from cache if available
  if (clientInfoCache.has(clientId)) {
    return clientInfoCache.get(clientId);
  }

  try {
    console.log(`Fetching client info for ${clientId}...`);
    const response = await fetch(`https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/stay/${clientId}/index.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch client info: ${response.status}`);
    }
    const data = await response.json();
    
    // Store in cache
    clientInfoCache.set(clientId, data);
    return data;
  } catch (error) {
    console.error(`Error fetching client info for ${clientId}:`, error);
    return beppuStoryData;
  }
};

/**
 * Gets the client information based on the hostname and pathname
 * Can return either synchronously (for default data) or asynchronously (for API data)
 * @param {string} hostname - The hostname of the current URL
 * @param {string} pathname - The pathname of the current URL
 * @returns {Object|Promise<Object>} The client information or a promise that resolves to it
 */
export const getHubClientInfo = (hostname, pathname) => {
  // Beppu Story - Japanese hotspring destination
  if (hostname.includes('stay-beppu-story')) {
    return fetchClientInfo('beppu-story');
  }
  
  return fetchClientInfo('beppu-story');
};

export default getHubClientInfo;