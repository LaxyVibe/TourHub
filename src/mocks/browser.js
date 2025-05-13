/**
 * MSW browser setup
 * This file sets up the Mock Service Worker for browser environment
 */
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Create the mock service worker
export const worker = setupWorker(...handlers);

// Export worker as default
export default worker;