import React, { useEffect } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, useParams, useLocation, Navigate } from 'react-router-dom';
import HubLanding from './components/HubLanding';
import SuiteLanding from './components/SuiteLanding';
import TourLanding from './components/TourLanding';
import PlaceLanding from './components/PlaceLanding';
import StayInfo from './components/hub/StayInfo';
import AddressInfo from './components/hub/AddressInfo';
import CheckInOutInfo from './components/hub/CheckInOutInfo';
import HouseRulesInfo from './components/hub/HouseRulesInfo';
import AmenitiesInfo from './components/hub/AmenitiesInfo';
import FAQInfo from './components/hub/FAQInfo';
import POIDetail from './components/hub/POIDetail';
import POIList from './components/common/POIList';
import FeaturedTours from './components/hub/FeaturedTours';
import SearchPage from './components/SearchPage';
import LanguagePage from './components/LanguagePage';
import { getHubClientInfo, getTourClientInfo, getPlaceClientInfo } from './config/clients';
import { getPOIsByType } from './utils/dataFetcher';
import { LanguageProvider } from './context/LanguageContext';
import { DEFAULT_LANGUAGE, extractLanguageFromPath } from './utils/languageUtils';
import { theme } from './config/theme';
import usePageTracking from './hooks/usePageTracking';

// ScrollToTop component to handle scrolling to top on route changes and GA tracking
function ScrollToTop() {
  const { pathname } = useLocation();
  
  // Use the page tracking hook
  usePageTracking();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

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

function SuiteWrapper() {
  const { suiteId, langCode } = useParams();
  const { pathname } = useLocation();
  const hostname = window.location.hostname;
  
  // Extract the cleaned pathname without the language code and suiteId for client info
  const { cleanedPathname } = extractLanguageFromPath(pathname.replace(`/${suiteId}`, ''));
  
  return <SuiteLanding clientInfo={{
    ...getHubClientInfo(hostname, cleanedPathname),
    language: langCode,
    suiteId
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
function StayInfoWrapper() {
  // The StayInfo component now reads data directly from the URL params and hub config
  return <StayInfo />;
}

function AddressInfoWrapper() {
  return <AddressInfo />;
}

function CheckInOutInfoWrapper() {
  return <CheckInOutInfo />;
}

function HouseRulesInfoWrapper() {
  return <HouseRulesInfo />;
}

function AmenitiesInfoWrapper() {
  return <AmenitiesInfo />;
}

function FAQInfoWrapper() {
  return <FAQInfo />;
}

function SearchWrapper() {
  return <SearchPage />;
}

function RestaurantsWrapper() {
  const { suiteId: urlSuiteId, langCode } = useParams();
  const location = useLocation();
  // Get suiteId from either URL params or from navigation state (for the new route structure)
  const suiteId = urlSuiteId || (location.state && location.state.suiteId);
  const [pois, setPois] = React.useState([]);
  const [title, setTitle] = React.useState('Nearby Restaurants');
  const [subtitle, setSubtitle] = React.useState('Discover local dining options');
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    const fetchPOIs = async () => {
      try {
        const result = await getPOIsByType('beppu-story', suiteId || 'family-room-1', 'restaurant', langCode || DEFAULT_LANGUAGE);
        setPois(result.pois);
        setTitle(result.title);
        setSubtitle(result.subtitle);
      } catch (error) {
        console.error("Failed to fetch restaurant POIs:", error);
        setPois([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPOIs();
  }, [langCode, suiteId]);

  if (loading) {
    return <div>Loading restaurants...</div>;
  }
  
  return (
    <POIList 
      pois={pois}
      title={title}
      subtitle={subtitle}
      type="restaurant"
      suiteId={suiteId}
    />
  );
}


function POIDetailWrapper() {
  return <POIDetail />;
}

function PlacesWrapper() {
  const { suiteId: urlSuiteId, langCode } = useParams();
  const location = useLocation();
  // Get suiteId from either URL params or from navigation state (for the new route structure)
  const suiteId = urlSuiteId || (location.state && location.state.suiteId);
  const [pois, setPois] = React.useState([]);
  const [title, setTitle] = React.useState('Nearby Attractions');
  const [subtitle, setSubtitle] = React.useState('Explore local attractions');
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    const fetchPOIs = async () => {
      try {
        const result = await getPOIsByType('beppu-story', suiteId || 'family-room-1', 'attraction', langCode || DEFAULT_LANGUAGE);
        setPois(result.pois);
        setTitle(result.title);
        setSubtitle(result.subtitle);
      } catch (error) {
        console.error("Failed to fetch attraction POIs:", error);
        setPois([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPOIs();
  }, [langCode, suiteId]);

  if (loading) {
    return <div>Loading attractions...</div>;
  }
  
  return (
    <POIList 
      pois={pois}
      title={title}
      subtitle={subtitle}
      type="attraction"
      suiteId={suiteId}
    />
  );
}

function ToursWrapper() {
  const { suiteId: urlSuiteId, langCode } = useParams();
  const location = useLocation();
  // Get suiteId from either URL params or from navigation state (for the new route structure)
  const suiteId = urlSuiteId || (location.state && location.state.suiteId);
  
  const { cleanedPathname } = extractLanguageFromPath(location.pathname.replace(`/${suiteId}`, ''));
  
  const clientInfo = {
    ...getHubClientInfo(window.location.hostname, cleanedPathname),
    language: langCode,
    suiteId
  };
  
  return <FeaturedTours initialState={{ tours: clientInfo.featuredTours, clientInfo }} />;
}

// Language Page wrapper component
function LanguagePageWrapper() {
  return <LanguagePage />;
}

// Language redirect component to handle default routing
function DefaultLanguageRedirect() {
  const { pathname, search } = useLocation();
  const { langCode: currentLangCode, cleanedPathname } = extractLanguageFromPath(pathname);
  
  // Get path segments to analyze the URL structure
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  
  // Check if the first segment is one of the known hub navigation routes
  const isHubNavigationRoute = [
    "info", "nearby-restaurants", "nearby-attractions", "tours"
  ].includes(firstSegment);

  const langToUse = currentLangCode || DEFAULT_LANGUAGE;

  // If it's a hub navigation route, we need to insert the language code at the beginning
  if (isHubNavigationRoute) {
    return <Navigate to={`/${langToUse}${pathname}`} replace />;
  }
  
  // Otherwise use the traditional language-based routing
  const hasPotentialLanguageCode = pathSegments.length > 0 && 
                                  /^[a-z]{2}(-[A-Z]{2})?$/.test(firstSegment);
  
  const redirectPath = cleanedPathname !== pathname
    ? `/${langToUse}${cleanedPathname}`
    : hasPotentialLanguageCode
      ? `/${langToUse}/${pathSegments.slice(1).join('/')}`
      : `/${langToUse}${pathname}`;
      
  return <Navigate to={`${redirectPath}${search}`} replace />;
}

function App() {
  const hostname = window.location.hostname;
  
  const getRouteConfig = () => {
    if (hostname.startsWith('stay-') || hostname.startsWith('uat-stay-')) {
      return (
        <Routes>
          <Route path="/" element={<DefaultLanguageRedirect />} />
          
          <Route path="/:langCode">
            <Route index element={<HubWrapper />} />
            <Route path="language" element={<LanguagePageWrapper />} />
            <Route path=":suiteId">
              <Route index element={<SuiteWrapper />} />
              <Route path="language" element={<LanguagePageWrapper />} />
              <Route path="poi/:poiSlug" element={<POIDetailWrapper />} />
              {/* Routes based on hub-application-config navigation */}
              <Route path="info">
                <Route index element={<StayInfoWrapper />} />
                <Route path="address" element={<AddressInfoWrapper />} />
                <Route path="check-in-out" element={<CheckInOutInfoWrapper />} />
                <Route path="house-rules" element={<HouseRulesInfoWrapper />} />
                <Route path="amenities" element={<AmenitiesInfoWrapper />} />
                <Route path="faq" element={<FAQInfoWrapper />} />
              </Route>
              <Route path="nearby-restaurants" element={<RestaurantsWrapper />} />
              <Route path="nearby-attractions" element={<PlacesWrapper />} />
              <Route path="tours" element={<ToursWrapper />} />
              <Route path="search" element={<SearchWrapper />} />
              
              {/* Legacy routes for backward compatibility */}
              <Route path="join/:tourId" element={<TourWrapper />} />
              <Route path="go/:placeId" element={<PlaceWrapper />} />
              <Route path="stay-info" element={<StayInfoWrapper />} />
              <Route path="*" element={<SuiteWrapper />} />
            </Route>
          </Route>
          <Route path="/:suiteId/*" element={<DefaultLanguageRedirect />} />
          <Route path="*" element={<DefaultLanguageRedirect />} />
        </Routes>
      );
    }
    else if (hostname.includes('join.') || hostname.includes('join--')) {
      return (
        <Routes>
          <Route path="/" element={<DefaultLanguageRedirect />} />
          <Route path="/:tourId" element={<DefaultLanguageRedirect />} />
          <Route path="/:langCode">
            <Route index element={<DefaultLanguageRedirect />} />
            <Route path=":tourId" element={<TourWrapper />} />
            <Route path=":tourId/go/:placeId" element={<PlaceWrapper />} />
          </Route>
          <Route path="*" element={<h1>Tour not found</h1>} />
        </Routes>
      );
    }
    else if (hostname.includes('go.') || hostname.includes('go--')) {
      return (
        <Routes>
          <Route path="/" element={<DefaultLanguageRedirect />} />
          <Route path="/:placeId" element={<DefaultLanguageRedirect />} />
          <Route path="/:langCode/:placeId" element={<PlaceWrapper />} />
          <Route path="*" element={<h1>Place not found</h1>} />
        </Routes>
      );
    }
    else {
      return (
        <Routes>
          <Route path="/" element={<DefaultLanguageRedirect />} />
          
          {/* Direct routes for hub navigation with language redirect */}
          <Route path="/info" element={<DefaultLanguageRedirect />} />
          <Route path="/info/address" element={<DefaultLanguageRedirect />} />
          <Route path="/info/check-in-out" element={<DefaultLanguageRedirect />} />
          <Route path="/info/house-rules" element={<DefaultLanguageRedirect />} />
          <Route path="/info/amenities" element={<DefaultLanguageRedirect />} />
          <Route path="/info/faq" element={<DefaultLanguageRedirect />} />
          <Route path="/nearby-restaurants" element={<DefaultLanguageRedirect />} />
          <Route path="/nearby-attractions" element={<DefaultLanguageRedirect />} />
          <Route path="/tours" element={<DefaultLanguageRedirect />} />
          <Route path="/tours/*" element={<DefaultLanguageRedirect />} />
          <Route path="/search" element={<DefaultLanguageRedirect />} />
          
          <Route path="/:langCode">
            <Route index element={<HubWrapper />} />
            <Route path="language" element={<LanguagePageWrapper />} />
            <Route path=":suiteId">
              <Route index element={<SuiteWrapper />} />
              <Route path="language" element={<LanguagePageWrapper />} />
              <Route path="poi/:poiSlug" element={<POIDetailWrapper />} />
              {/* Routes based on hub-application-config navigation */}
              <Route path="info">
                <Route index element={<StayInfoWrapper />} />
                <Route path="address" element={<AddressInfoWrapper />} />
                <Route path="check-in-out" element={<CheckInOutInfoWrapper />} />
                <Route path="house-rules" element={<HouseRulesInfoWrapper />} />
                <Route path="amenities" element={<AmenitiesInfoWrapper />} />
                <Route path="faq" element={<FAQInfoWrapper />} />
              </Route>
              <Route path="nearby-restaurants" element={<RestaurantsWrapper />} />
              <Route path="nearby-attractions" element={<PlacesWrapper />} />
              <Route path="tours" element={<ToursWrapper />} />
              <Route path="search" element={<SearchWrapper />} />
              
              {/* Legacy routes for backward compatibility */}
              <Route path="*" element={<SuiteWrapper />} />
            </Route>
          </Route>
          <Route path="/:suiteId/*" element={<DefaultLanguageRedirect />} />
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