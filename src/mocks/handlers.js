/**
 * MSW handlers for intercepting network requests
 */
import { http, HttpResponse } from 'msw';
import { beppuStoryData } from './beppuStoryData';
import { getRestaurantsByLanguage } from './restaurants';
import { DEFAULT_LANGUAGE } from '../utils/languageUtils';
import { getPlacesByLanguage } from './places';

// Helper function to extract language from URL or headers
const extractLanguageFromRequest = (request) => {
  try {
    // Ensure request and request.url exist
    if (!request || !request.url) {
      console.warn('Request or request.url is undefined, using default language');
      return DEFAULT_LANGUAGE;
    }

    // Try to get language from query parameters
    const url = new URL(request.url);
    const langParam = url.searchParams.get('lang');
    if (langParam) return langParam;
    
    // Try to get language from Accept-Language header
    const acceptLanguage = request.headers.get('Accept-Language');
    if (acceptLanguage) {
      // Simple parsing of Accept-Language
      const firstLanguage = acceptLanguage.split(',')[0].split(';')[0].trim();
      if (firstLanguage) return firstLanguage;
    }
  } catch (error) {
    console.warn('Error extracting language from request:', error);
  }
  
  // Default language as fallback
  return DEFAULT_LANGUAGE;
};

export const handlers = [
  // Intercept requests to the S3 bucket for Beppu Story
  http.get('https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/stay/beppu-story/index.json', () => {
    // Return the mock data as JSON
    return HttpResponse.json(beppuStoryData);
  }),
  
  // Intercept requests to the S3 bucket for Beppu Story Restaurants
  http.get('https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/stay/beppu-story/restaurants.json', (info) => {
    try {
      // Get language from request
      const language = extractLanguageFromRequest(info?.request);
      
      // Return the language-specific restaurant data as JSON
      return HttpResponse.json(getRestaurantsByLanguage(language));
    } catch (error) {
      console.error('Error in restaurants handler:', error);
      // Return default data
      return HttpResponse.json(getRestaurantsByLanguage(DEFAULT_LANGUAGE));
    }
  }),

  // Intercept requests to the S3 bucket for Places
  http.get('https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/stay/places.json', (info) => {
    try {
      // Get language from request
      const language = extractLanguageFromRequest(info?.request);
      
      // Return the language-specific places data as JSON
      return HttpResponse.json(getPlacesByLanguage(language));
    } catch (error) {
      console.error('Error in places handler:', error);
      // Return default data
      return HttpResponse.json(getPlacesByLanguage(DEFAULT_LANGUAGE));
    }
  }),
];

export default handlers;



// GET /api/hub-application-config
// https://ethical-novelty-0c204c906b.strapiapp.com/api/hub-application-config?populate[universalConfig][populate][releasedLanguages][fields][0]=label&populate[universalConfig][populate][releasedLanguages][fields][1]=value&populate[globalComponent][fields][0]=readMoreLabel&populate[globalComponent][populate][speechButton][fields][0]=label&populate[globalComponent][populate][speechButton][populate][icon][fields][0]=url&populate[header][fields][0]=leftRoute&populate[header][fields][1]=rightRoute&populate[header][populate][leftIcon][fields][0]=url&populate[header][populate][rightIcon][fields][0]=url&populate[pageLanding][fields][0]=recommendationHeading&populate[pageLanding][populate][naviagtion][fields][0]=label&populate[pageLanding][populate][naviagtion][fields][1]=route&populate[pageLanding][populate][naviagtion][populate][icon][fields][0]=url&populate[pageLanguage][fields][0]=heading&populate[pageLanguage][populate][applyButton][fields][0]=label&populate[pageSearch][fields][0]=searchInputPlaceholder&populate[pageSearch][fields][1]=defaultListHeading&populate[pageSearch][fields][2]=highlightedListHeading&populate[pageSearch][populate][defaultList][fields][0]=label&populate[pageSearch][populate][defaultList][fields][1]=value&populate[pageInfo][fields][0]=heading&populate[pageInfo][populate][navigation][fields][0]=label&populate[pageInfo][populate][navigation][fields][1]=route&populate[pageInfo][populate][navigation][populate][icon][fields][0]=url&populate[pageWiFi][populate][scanQRButton][fields][0]=label&populate[pageWiFi][populate][clipboardButton][fields][0]=label&populate[pageWiFi][populate][showQRButton][fields][0]=label&populate[pagPoiDetail][fields][0]=recommendationHeading&populate[pagPoiDetail][fields][1]=highlightHeading&populate[pagPoiDetail][populate][addressIcon][fields][0]=url&populate[pagPoiDetail][populate][urlIcon][fields][0]=url&populate[pagPoiDetail][populate][dialIcon][fields][0]=url&locale=en

// GET /api/suites
// https://ethical-novelty-0c204c906b.strapiapp.com/api/suites?filters[ownedBy][slug][$eq]=beppu-story&filters[name][$eq]=family-room-1&fields[0]=name&fields[1]=label&fields[2]=headline&fields[3]=address&fields[4]=addressURL&fields[5]=checkInOut&fields[6]=amenities&fields[7]=houseRules&populate[slider][fields][0]=url&populate[faq][fields][0]=question&populate[faq][fields][1]=answer&populate[wifi][fields][0]=network&populate[wifi][fields][1]=password&populate[ownedBy][fields][0]=slug&populate[ownedBy][fields][1]=label&populate[ownedBy][fields][2]=greeting&populate[ownedBy][fields][3]=nativeLanguageCode&populate[ownedBy][populate][avatar][fields][0]=url&populate[ownedBy][populate][pickedPOIs][fields][0]=slug&populate[ownedBy][populate][pickedPOIs][fields][1]=label&populate[ownedBy][populate][pickedPOIs][fields][2]=address&populate[ownedBy][populate][pickedPOIs][fields][3]=highlight&populate[ownedBy][populate][pickedPOIs][fields][4]=externalURL&populate[ownedBy][populate][pickedPOIs][fields][5]=type&populate[ownedBy][populate][pickedPOIs][fields][6]=nativeLanguageCode&populate[ownedBy][populate][pickedPOIs][populate][tag_labels][fields][0]=name&populate[ownedBy][populate][pickedPOIs][populate][tag_labels][fields][1]=color&populate[ownedBy][populate][pickedPOIs][populate][coverPhoto][fields][0]=url&locale=en

// GET /api/poi-recommendations
// https://ethical-novelty-0c204c906b.strapiapp.com/api/poi-recommendations?filters[recommended_by][slug][$eq]=beppu-story&fields[0]=recommendation&fields[1]=kmFromStay&fields[2]=weightInNearbyRestaurants&fields[3]=weightInNearbyAttractions&fields[4]=weightInHighlight&populate[poi][fields][0]=slug&populate[poi][fields][1]=label&populate[poi][fields][2]=address&populate[poi][fields][3]=highlight&populate[poi][fields][4]=externalURL&populate[poi][fields][5]=type&populate[poi][populate][tag_labels][fields][0]=name&populate[poi][populate][tag_labels][fields][1]=color&populate[poi][populate][coverPhoto][fields][0]=url&locale=en&pagination[page]=1&pagination[pageSize]=10000