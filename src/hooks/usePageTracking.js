// Custom hook for Google Analytics page tracking
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    const path = location.pathname + location.search;
    trackPageView(path);
  }, [location]);
};

export default usePageTracking;
