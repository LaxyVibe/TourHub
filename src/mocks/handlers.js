/**
 * MSW handlers for intercepting network requests
 */
import { http, HttpResponse } from 'msw';
import beppuStoryData from './beppuStoryData';

export const handlers = [
  // Intercept requests to the S3 bucket for Beppu Story
  http.get('https://s3.ap-northeast-1.amazonaws.com/laxy.hub.dev/stay/beppu-story/index.json', () => {
    // Return the mock data as JSON
    return HttpResponse.json(beppuStoryData);
  }),
];

export default handlers;