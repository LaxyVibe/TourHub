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
    // Get language from request
    const language = extractLanguageFromRequest(info.request);
    
    // Return the language-specific restaurant data as JSON
    return HttpResponse.json(getRestaurantsByLanguage(language));
  }),

  // Intercept requests to the S3 bucket for Places
  http.get('https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/stay/places.json', (info) => {
    // Get language from request
    const language = extractLanguageFromRequest(info.request);
    
    // Return the language-specific places data as JSON
    return HttpResponse.json(getPlacesByLanguage(language));
  }),
];

export default handlers;