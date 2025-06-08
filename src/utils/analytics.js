// Google Analytics utility functions

// Configuration
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID_NOT_SET';
const isProduction = process.env.NODE_ENV === 'production';
const isAnalyticsEnabled = isProduction && GA_MEASUREMENT_ID !== 'GA_MEASUREMENT_ID_NOT_SET';

// Initialize Google Analytics
export const initGA = () => {
  if (!isAnalyticsEnabled) {
    console.log('GA: Analytics disabled in development or measurement ID not set');
    return;
  }

  // Load GA script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: false // We'll send page views manually
  });

  console.log('GA: Initialized with ID:', GA_MEASUREMENT_ID);
};

// Track page views
export const trackPageView = (path, title = null) => {
  if (!isAnalyticsEnabled) {
    console.log('GA: Page view tracked (dev):', path);
    return;
  }

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href
  });

  console.log('GA: Page view tracked:', path);
};

// Track custom events
export const trackEvent = (eventName, parameters = {}) => {
  if (!isAnalyticsEnabled) {
    console.log('GA: Event tracked (dev):', eventName, parameters);
    return;
  }

  window.gtag('event', eventName, {
    event_category: parameters.category || 'engagement',
    event_label: parameters.label || '',
    value: parameters.value || 0,
    ...parameters
  });

  console.log('GA: Event tracked:', eventName, parameters);
};

// Track user interactions
export const trackButtonClick = (buttonName, location = '') => {
  trackEvent('button_click', {
    category: 'UI Interaction',
    label: buttonName,
    location: location
  });
};

export const trackNavigation = (from, to, method = 'click') => {
  trackEvent('navigation', {
    category: 'Navigation',
    label: `${from} -> ${to}`,
    method: method
  });
};

export const trackLanguageChange = (fromLang, toLang) => {
  trackEvent('language_change', {
    category: 'Localization',
    label: `${fromLang} -> ${toLang}`
  });
};

export const trackSuiteView = (suiteId, language) => {
  trackEvent('suite_view', {
    category: 'Content',
    label: suiteId,
    language: language
  });
};

export const trackPOIView = (poiId, type, language) => {
  trackEvent('poi_view', {
    category: 'Content',
    label: poiId,
    poi_type: type,
    language: language
  });
};

export const trackSearch = (query, resultsCount = 0) => {
  trackEvent('search', {
    category: 'Search',
    label: query,
    value: resultsCount
  });
};

export const trackTourView = (tourId, language) => {
  trackEvent('tour_view', {
    category: 'Content',
    label: tourId,
    language: language
  });
};

export const trackPlaceView = (placeId, language) => {
  trackEvent('place_view', {
    category: 'Content',
    label: placeId,
    language: language
  });
};

// Content interaction tracking
export const trackContentInteraction = (action, contentType, contentId) => {
  trackEvent('content_interaction', {
    category: 'Content Interaction',
    label: `${action}_${contentType}`,
    content_id: contentId,
    action: action,
    content_type: contentType
  });
};

// External link tracking
export const trackExternalLink = (url, contentType, contentId) => {
  trackEvent('external_link_click', {
    category: 'External Links',
    label: url,
    content_type: contentType,
    content_id: contentId,
    url: url
  });
};

// Share tracking
export const trackShare = (method, additionalParams = {}) => {
  trackEvent('share', {
    category: 'Social',
    label: `${method}_${additionalParams.content_type || 'unknown'}`,
    method: method,
    ...additionalParams
  });
};

// Enhanced ecommerce events (if needed for future features)
export const trackPurchase = (transactionId, value, currency = 'USD', items = []) => {
  trackEvent('purchase', {
    transaction_id: transactionId,
    value: value,
    currency: currency,
    items: items
  });
};

// User engagement metrics
export const trackEngagement = (engagementTime, scrollDepth) => {
  trackEvent('user_engagement', {
    category: 'Engagement',
    engagement_time_msec: engagementTime,
    scroll_depth: scrollDepth
  });
};

// PWA specific events
export const trackPWAInstall = () => {
  trackEvent('pwa_install', {
    category: 'PWA',
    label: 'App Installation'
  });
};

export const trackPWAShare = (method = 'native') => {
  trackEvent('share', {
    category: 'PWA',
    method: method
  });
};

// Error tracking
export const trackError = (error, errorInfo = '') => {
  trackEvent('exception', {
    category: 'Error',
    description: error.toString(),
    fatal: false,
    error_info: errorInfo
  });
};

// Default export
const analyticsModule = {
  initGA,
  trackPageView,
  trackEvent,
  trackButtonClick,
  trackNavigation,
  trackLanguageChange,
  trackSuiteView,
  trackPOIView,
  trackSearch,
  trackTourView,
  trackPlaceView,
  trackContentInteraction,
  trackExternalLink,
  trackShare,
  trackPurchase,
  trackEngagement,
  trackPWAInstall,
  trackPWAShare,
  trackError
};

export default analyticsModule;
