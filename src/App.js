import React, { useEffect } from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, useParams, useLocation, Navigate } from 'react-router-dom';
import HubLanding from './components/HubLanding';
import TourLanding from './components/TourLanding';
import PlaceLanding from './components/PlaceLanding';
import StayInfo from './components/hub/StayInfo';
import WifiInfo from './components/hub/WifiInfo';
import FeaturedRestaurants from './components/hub/FeaturedRestaurants';
import RestaurantDetail from './components/hub/RestaurantDetail';
import FeaturedPlaces from './components/hub/FeaturedPlaces';
import FeaturedTours from './components/hub/FeaturedTours';
import { getHubClientInfo, getTourClientInfo, getPlaceClientInfo } from './config/clients';
import { LanguageProvider } from './context/LanguageContext';
import { DEFAULT_LANGUAGE, extractLanguageFromPath } from './utils/languageUtils';
import { getCookie, setCookie } from './utils/cookieUtils';

// ScrollToTop component to handle scrolling to top on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// Custom theme for the Laxy Hub application
const theme = createTheme({
  palette: {
    primary: {
      light: '#a39ddd',
      main: '#5fbcc4',
      dark: '#215458',
    },
    secondary: {
      light: '#fc6dcd',
      main: '#f57c5f',
      dark: '#cb310c',
    },
    background: {
      default: '#f5f5f7',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

// Helper function to get passcode from cookies or URL
const getPasscode = (location) => {
  // First check for passcode in cookies
  let passcode = getCookie('roomPasscode');
  
  // Fall back to query parameters for backward compatibility
  if (!passcode) {
    const queryParams = new URLSearchParams(location.search);
    passcode = queryParams.get('passcode');
    
    // If found in query params but not in cookie, save it to cookie for future use
    if (passcode) {
      setCookie('roomPasscode', passcode, 30); // Store for 30 days
    }
  }
  
  return passcode;
};

// Wrapper components to handle nested routes
function HubWrapper() {
  const { langCode } = useParams();
  const { pathname } = useLocation();
  const hostname = window.location.hostname;
  
  // Extract the cleaned pathname without the language code for client info
  const { cleanedPathname } = extractLanguageFromPath(pathname);
  
  return <HubLanding clientInfo={{
    ...getHubClientInfo(hostname, cleanedPathname),
    language: langCode
  }} />;
}

function TourWrapper() {
  const { tourId, langCode } = useParams();
  const { pathname } = useLocation();
  const hostname = window.location.hostname;
  
  // Extract the cleaned pathname without the language code for client info
  const { cleanedPathname } = extractLanguageFromPath(pathname);
  
  // Get tour client info
  const tourClientInfo = getTourClientInfo(hostname, cleanedPathname, tourId);
  
  // Get hub client info to access hubCommentsToTours
  const hubClientInfo = getHubClientInfo(hostname, cleanedPathname);
  
  // Merge the hubCommentsToTours from hubClientInfo into tourClientInfo
  const clientInfo = {
    ...tourClientInfo,
    hubCommentsToTours: hubClientInfo.hubCommentsToTours,
    language: langCode
  };
  
  return <TourLanding clientInfo={clientInfo} />;
}

function PlaceWrapper() {
  const { placeId, langCode } = useParams();
  const { pathname } = useLocation();
  const hostname = window.location.hostname;
  
  // Extract the cleaned pathname without the language code for client info
  const { cleanedPathname } = extractLanguageFromPath(pathname);
  
  return <PlaceLanding clientInfo={{
    ...getPlaceClientInfo(hostname, cleanedPathname, placeId),
    language: langCode
  }} />;
}

// Wrapper components for new hub routes
function WifiInfoWrapper() {
  const { langCode } = useParams();
  const location = useLocation();
  const [initialState, setInitialState] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const { cleanedPathname } = extractLanguageFromPath(location.pathname);
    const hostname = window.location.hostname;

    const fetchData = async () => {
      try {
        const clientInfoData = await getHubClientInfo(hostname, cleanedPathname);
        
        // Get passcode from cookie or query parameter
        const passcode = getPasscode(location);
        
        let suiteInfo = null;
        if (passcode && clientInfoData && clientInfoData.suites) {
          suiteInfo = clientInfoData.suites.find(suite => suite.passcode === passcode);
        }
        
        setInitialState({ 
          stayInfo: suiteInfo?.stayInfo, 
          clientInfo: {
            ...clientInfoData,
            language: langCode || DEFAULT_LANGUAGE
          }
        });
      } catch (error) {
        console.error("Failed to fetch client info for WifiInfoWrapper:", error);
        // Optionally, set a default or error state
        const fallbackClientInfo = getHubClientInfo(hostname, cleanedPathname); // Attempt to get synchronous fallback if any
         setInitialState({ 
          stayInfo: null, 
          clientInfo: {
            ...(fallbackClientInfo instanceof Promise ? {} : fallbackClientInfo), // Handle if fallback is also a promise initially
            language: langCode || DEFAULT_LANGUAGE
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [langCode, location]);

  if (loading) {
    return <div>Loading wifi information...</div>; // Or a spinner component
  }

  if (!initialState) {
    // This case might occur if fetchData fails and doesn't set a fallback
    return <div>Error loading information.</div>;
  }
  
  return <WifiInfo initialState={initialState} />;
}

function StayInfoWrapper() {
  const { langCode } = useParams();
  const location = useLocation();
  const [initialState, setInitialState] = React.useState(null); // Changed to useState
  const [loading, setLoading] = React.useState(true); // Added loading state

  React.useEffect(() => {
    const { cleanedPathname } = extractLanguageFromPath(location.pathname);
    const hostname = window.location.hostname;

    const fetchData = async () => {
      try {
        const clientInfoData = await getHubClientInfo(hostname, cleanedPathname);
        
        // Get passcode from cookie or query parameter
        const passcode = getPasscode(location);
        
        let suiteInfo = null;
        if (passcode && clientInfoData && clientInfoData.suites) {
          suiteInfo = clientInfoData.suites.find(suite => suite.passcode === passcode);
        }
        
        setInitialState({ 
          stayInfo: suiteInfo?.stayInfo, 
          clientInfo: {
            ...clientInfoData,
            language: langCode || DEFAULT_LANGUAGE
          }
        });
      } catch (error) {
        console.error("Failed to fetch client info for StayInfoWrapper:", error);
        // Optionally, set a default or error state
        const fallbackClientInfo = getHubClientInfo(hostname, cleanedPathname); // Attempt to get synchronous fallback if any
         setInitialState({ 
          stayInfo: null, 
          clientInfo: {
            ...(fallbackClientInfo instanceof Promise ? {} : fallbackClientInfo), // Handle if fallback is also a promise initially
            language: langCode || DEFAULT_LANGUAGE
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [langCode, location]);

  if (loading) {
    return <div>Loading stay information...</div>; // Or a spinner component
  }

  if (!initialState) {
    // This case might occur if fetchData fails and doesn't set a fallback
    return <div>Error loading information.</div>;
  }
  
  return <StayInfo initialState={initialState} />;
}

function RestaurantsWrapper() {
  const { langCode } = useParams();
  const location = useLocation();
  const [initialState, setInitialState] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  
  // Extract the cleaned pathname without the language code for client info
  const { cleanedPathname } = extractLanguageFromPath(location.pathname);
  
  React.useEffect(() => {
    const hostname = window.location.hostname;
    
    const fetchData = async () => {
      try {
        const clientInfoData = await getHubClientInfo(hostname, cleanedPathname);
        
        setInitialState({ 
          restaurants: clientInfoData.restaurantList || [], 
          clientInfo: {
            ...clientInfoData,
            language: langCode || DEFAULT_LANGUAGE
          }
        });
      } catch (error) {
        console.error("Failed to fetch client info for RestaurantsWrapper:", error);
        // Optionally, set a default or error state
        const fallbackClientInfo = getHubClientInfo(hostname, cleanedPathname); // Attempt to get synchronous fallback if any
        setInitialState({ 
          restaurants: [], 
          clientInfo: {
            ...(fallbackClientInfo instanceof Promise ? {} : fallbackClientInfo), // Handle if fallback is also a promise initially
            language: langCode || DEFAULT_LANGUAGE
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [langCode, location, cleanedPathname]);

  if (loading) {
    return <div>Loading restaurant information...</div>; // Or a spinner component
  }

  if (!initialState) {
    // This case might occur if fetchData fails and doesn't set a fallback
    return <div>Error loading restaurant information.</div>;
  }
  
  return <FeaturedRestaurants initialState={initialState} />;
}

function RestaurantDetailWrapper() {
  const { langCode, restaurantId } = useParams();
  const location = useLocation();
  const [initialState, setInitialState] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  
  // Extract the cleaned pathname without the language code for client info
  const { cleanedPathname } = extractLanguageFromPath(location.pathname);
  
  React.useEffect(() => {
    const hostname = window.location.hostname;
    
    const fetchData = async () => {
      try {
        const clientInfoData = await getHubClientInfo(hostname, cleanedPathname);
        
        setInitialState({ 
          restaurants: clientInfoData.restaurantList || [], 
          clientInfo: {
            ...clientInfoData,
            language: langCode || DEFAULT_LANGUAGE
          }
        });
      } catch (error) {
        console.error("Failed to fetch client info for RestaurantDetailWrapper:", error);
        // Optionally, set a default or error state
        const fallbackClientInfo = getHubClientInfo(hostname, cleanedPathname);
        setInitialState({ 
          restaurants: [], 
          clientInfo: {
            ...(fallbackClientInfo instanceof Promise ? {} : fallbackClientInfo),
            language: langCode || DEFAULT_LANGUAGE
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [langCode, restaurantId, location, cleanedPathname]);

  if (loading) {
    return <div>Loading restaurant details...</div>; // Or a spinner component
  }

  if (!initialState) {
    return <div>Error loading restaurant information.</div>;
  }
  
  return <RestaurantDetail initialState={initialState} />;
}

function PlacesWrapper() {
  const { langCode } = useParams();
  const location = useLocation();
  const [initialState, setInitialState] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  
  // Extract the cleaned pathname without the language code for client info
  const { cleanedPathname } = extractLanguageFromPath(location.pathname);
  
  React.useEffect(() => {
    const hostname = window.location.hostname;
    
    const fetchData = async () => {
      try {
        const clientInfoData = await getHubClientInfo(hostname, cleanedPathname);
        
        setInitialState({ 
          places: clientInfoData.placesList || [], 
          clientInfo: {
            ...clientInfoData,
            language: langCode || DEFAULT_LANGUAGE
          }
        });
      } catch (error) {
        console.error("Failed to fetch client info for PlacesWrapper:", error);
        // Optionally, set a default or error state
        const fallbackClientInfo = getHubClientInfo(hostname, cleanedPathname);
        setInitialState({ 
          places: [], 
          clientInfo: {
            ...(fallbackClientInfo instanceof Promise ? {} : fallbackClientInfo),
            language: langCode || DEFAULT_LANGUAGE
          }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [langCode, location, cleanedPathname]);

  if (loading) {
    return <div>Loading places...</div>;
  }

  if (!initialState) {
    return <div>Error loading places.</div>;
  }
  
  return <FeaturedPlaces initialState={initialState} />;
}

function ToursWrapper() {
  const { langCode } = useParams();
  const location = useLocation();
  
  // Extract the cleaned pathname without the language code for client info
  const { cleanedPathname } = extractLanguageFromPath(location.pathname);
  
  const clientInfo = {
    ...getHubClientInfo(window.location.hostname, cleanedPathname),
    language: langCode
  };
  
  return <FeaturedTours initialState={{ tours: clientInfo.featuredTours, clientInfo }} />;
}

// Language redirect component to handle default routing
function DefaultLanguageRedirect() {
  const { pathname, search } = useLocation();
  
  // Handle special cases for nested paths like /:tourId/go/:placeId
  // First, extract any language code that might be in the path already
  const { langCode: currentLangCode, cleanedPathname } = extractLanguageFromPath(pathname);
  
  // For handling nested paths in special domains like join.* or go.*
  // Remove any potential language code part from the URL path segments
  const pathSegments = pathname.split('/').filter(Boolean);
  const hasPotentialLanguageCode = pathSegments.length > 0 && 
                                  /^[a-z]{2}(-[A-Z]{2})?$/.test(pathSegments[0]);
  
  // Use extracted language code if available, otherwise use default
  const langToUse = currentLangCode || DEFAULT_LANGUAGE;
  
  // Build the new path - if we have a cleaned path, use it, otherwise keep the original path
  // but avoid double-adding the language code
  const redirectPath = cleanedPathname !== pathname
    ? `/${langToUse}${cleanedPathname}`
    : hasPotentialLanguageCode
      ? `/${langToUse}/${pathSegments.slice(1).join('/')}`
      : `/${langToUse}${pathname}`;
      
  return <Navigate to={`${redirectPath}${search}`} replace />;
}

function App() {
  const hostname = window.location.hostname;
  
  // Determine which routes to render based on hostname
  const getRouteConfig = () => {      // Stay domains (HubLanding as root)
    if (hostname.startsWith('stay-') || hostname.startsWith('uat-stay-')) {
      return (
        <Routes>
          {/* Default route redirects to language-specific route */}
          <Route path="/" element={<DefaultLanguageRedirect />} />
          
          {/* Language-specific routes */}
          <Route path="/:langCode">
            <Route index element={<HubWrapper />} />
            <Route path="join/:tourId" element={<TourWrapper />} />
            <Route path="go/:placeId" element={<PlaceWrapper />} />
            <Route path="wifi-info" element={<WifiInfoWrapper />} />
            <Route path="stay-info" element={<StayInfoWrapper />} />
            <Route path="featured-restaurants" element={<RestaurantsWrapper />} />
            <Route path="restaurant/:restaurantId" element={<RestaurantDetailWrapper />} />
            <Route path="featured-places" element={<PlacesWrapper />} />
            <Route path="featured-tours" element={<ToursWrapper />} />
            <Route path="*" element={<HubWrapper />} />
          </Route>
          
          {/* Legacy routes for backward compatibility */}
          <Route path="/join/:tourId" element={<DefaultLanguageRedirect />} />
          <Route path="/go/:placeId" element={<DefaultLanguageRedirect />} />
          <Route path="/stay-info" element={<DefaultLanguageRedirect />} />
          <Route path="/featured-restaurants" element={<DefaultLanguageRedirect />} />
          <Route path="/restaurant/:restaurantId" element={<DefaultLanguageRedirect />} />
          <Route path="/featured-places" element={<DefaultLanguageRedirect />} />
          <Route path="/featured-tours" element={<DefaultLanguageRedirect />} />
          <Route path="*" element={<DefaultLanguageRedirect />} />
        </Routes>
      );
    }
    // Join domains (TourLanding as root)
    else if (hostname.includes('join.') || hostname.includes('join--')) {
      return (
        <Routes>
          {/* Default tour route redirects to language-specific route */}
          <Route path="/:tourId" element={<DefaultLanguageRedirect />} />
          
          {/* Language-specific routes */}
          <Route path="/:langCode/:tourId" element={<TourWrapper />} />
          <Route path="/:langCode/:tourId/go/:placeId" element={<PlaceWrapper />} />
          
          {/* Legacy routes for backward compatibility */}
          <Route path="/:tourId/go/:placeId" element={<DefaultLanguageRedirect />} />
          <Route path="*" element={<h1>Tour not found</h1>} />
        </Routes>
      );
    }
    // Go domains (PlaceLanding as root)
    else if (hostname.includes('go.') || hostname.includes('go--')) {
      return (
        <Routes>
          {/* Default place route redirects to language-specific route */}
          <Route path="/:placeId" element={<DefaultLanguageRedirect />} />
          
          {/* Language-specific routes */}
          <Route path="/:langCode/:placeId" element={<PlaceWrapper />} />
          
          <Route path="*" element={<h1>Place not found</h1>} />
        </Routes>
      );
    }
    // Default routes for any other domain
    else {
      return (
        <Routes>
          {/* Default route redirects to language-specific route */}
          <Route path="/" element={<DefaultLanguageRedirect />} />
          
          {/* Language-specific routes */}
          <Route path="/:langCode">
            <Route index element={<HubWrapper />} />
            <Route path="join/:tourId" element={<TourWrapper />} />
            <Route path="go/:placeId" element={<PlaceWrapper />} />
            <Route path="wifi-info" element={<WifiInfoWrapper />} />
            <Route path="stay-info" element={<StayInfoWrapper />} />
            <Route path="featured-restaurants" element={<RestaurantsWrapper />} />
            <Route path="restaurant/:restaurantId" element={<RestaurantDetailWrapper />} />
            <Route path="featured-places" element={<PlacesWrapper />} />
            <Route path="featured-tours" element={<ToursWrapper />} />
            <Route path="*" element={<HubWrapper />} />
          </Route>
          
          {/* Legacy routes for backward compatibility */}
          <Route path="/join/:tourId" element={<DefaultLanguageRedirect />} />
          <Route path="/go/:placeId" element={<DefaultLanguageRedirect />} />
          <Route path="/stay-info" element={<DefaultLanguageRedirect />} />
          <Route path="/featured-restaurants" element={<DefaultLanguageRedirect />} />
          <Route path="/restaurant/:restaurantId" element={<DefaultLanguageRedirect />} />
          <Route path="/featured-places" element={<DefaultLanguageRedirect />} />
          <Route path="/featured-tours" element={<DefaultLanguageRedirect />} />
          <Route path="*" element={<DefaultLanguageRedirect />} />
        </Routes>
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <BrowserRouter>
          <ScrollToTop />
          <LanguageProvider>
            {getRouteConfig()}
          </LanguageProvider>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;