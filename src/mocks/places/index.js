// filepath: /Users/sunlau/Documents/creative/LaxyVibe/TourHub/src/mocks/places/index.js
import { basePlacesData } from './basePlacesData';
import { enPlacesData } from './enPlacesData';
import { jaPlacesData } from './jaPlacesData';
import { koPlacesData } from './koPlacesData';
import { zhTWPlacesData } from './zhTWPlacesData';
import { zhCNPlacesData } from './zhCNPlacesData';

export {
  basePlacesData,
  enPlacesData,
  jaPlacesData,
  koPlacesData,
  zhTWPlacesData,
  zhCNPlacesData,
};

/**
 * Get places data for a specific language
 * @param {string} language - The language code (e.g., 'en', 'ja', 'ko', 'zh-TW', 'zh-CN')
 * @returns {Object} The merged places data with base data and language-specific data
 */
export const getPlacesByLanguage = (language) => {
  const { places: basePlaces } = basePlacesData;
  let languageSpecificData;

  switch (language) {
    case 'ja':
      languageSpecificData = jaPlacesData;
      break;
    case 'ko':
      languageSpecificData = koPlacesData;
      break;
    case 'zh-TW':
      languageSpecificData = zhTWPlacesData;
      break;
    case 'zh-CN':
      languageSpecificData = zhCNPlacesData;
      break;
    default:
      languageSpecificData = enPlacesData;
  }

  const { places: languagePlaces } = languageSpecificData;

  // Merge base data with language-specific data
  const mergedPlaces = basePlaces.map((basePlace) => {
    const languagePlace = languagePlaces.find((p) => p.id === basePlace.id);
    return {
      ...basePlace,
      ...languagePlace,
    };
  });

  return { places: mergedPlaces };
};