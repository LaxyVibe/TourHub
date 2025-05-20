/**
 * Exports restaurant data for all supported languages
 */

import { baseRestaurantsData } from './baseRestaurantsData';
import { enRestaurantsData } from './enRestaurantsData';
import { jaRestaurantsData } from './jaRestaurantsData';
import { koRestaurantsData } from './koRestaurantsData';
import { zhTWRestaurantsData } from './zhTWRestaurantsData';
import { zhCNRestaurantsData } from './zhCNRestaurantsData';

// Export all language variants
export {
  baseRestaurantsData,
  enRestaurantsData,
  jaRestaurantsData,
  koRestaurantsData,
  zhTWRestaurantsData,
  zhCNRestaurantsData,
};

// Map of language codes to their respective restaurant data
export const restaurantsDataByLanguage = {
  'en': enRestaurantsData,
  'ja': jaRestaurantsData,
  'ko': koRestaurantsData,
  'zh-TW': zhTWRestaurantsData,
  'zh-CN': zhCNRestaurantsData,
};

/**
 * Get restaurant data for a specific language
 * @param {string} langCode - The language code
 * @returns {Object} The restaurant data for the specified language or English as fallback
 */
export const getRestaurantsByLanguage = (langCode) => {
  return restaurantsDataByLanguage[langCode] || enRestaurantsData;
};

export default getRestaurantsByLanguage;
