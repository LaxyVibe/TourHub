/**
 * Application constants - dynamic configuration from API discovery
 */

// Import discovered configuration from API
let DEFAULT_CLIENT_ID;
let DEFAULT_SUITE_ID;

try {
  const discoveredConfig = require('./discovered.json');
  DEFAULT_CLIENT_ID = discoveredConfig.clientId;
  DEFAULT_SUITE_ID = discoveredConfig.suiteId;
  
  if (!DEFAULT_CLIENT_ID || !DEFAULT_SUITE_ID) {
    throw new Error('Missing required configuration in discovered.json');
  }
} catch (error) {
  throw new Error(`Failed to load API-discovered configuration: ${error.message}. Please run 'npm run prebuild' to fetch configuration from API.`);
}

export { DEFAULT_CLIENT_ID, DEFAULT_SUITE_ID };

// API Configuration (if needed in frontend)
export const API_CONFIG = {
  CLIENT_ID: DEFAULT_CLIENT_ID,
  SUITE_ID: DEFAULT_SUITE_ID
};
