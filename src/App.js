import React, { useEffect } from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route, useParams, useLocation } from 'react-router-dom';
import HubLanding from './components/HubLanding';
import TourLanding from './components/TourLanding';
import PlaceLanding from './components/PlaceLanding';
import { getHubClientInfo, getTourClientInfo, getPlaceClientInfo } from './config/clients';

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

// Wrapper components to handle nested routes
function HubWrapper() {
  const { pathname } = useLocation();
  const hostname = window.location.hostname;
  
  return <HubLanding clientInfo={getHubClientInfo(hostname, pathname)} />;
}

function TourWrapper() {
  const { tourId } = useParams();
  const { pathname } = useLocation();
  const hostname = window.location.hostname;
  
  // Get tour client info
  const tourClientInfo = getTourClientInfo(hostname, pathname, tourId);
  
  // Get hub client info to access hubCommentsToTours
  const hubClientInfo = getHubClientInfo(hostname, pathname);
  
  // Merge the hubCommentsToTours from hubClientInfo into tourClientInfo
  const clientInfo = {
    ...tourClientInfo,
    hubCommentsToTours: hubClientInfo.hubCommentsToTours
  };
  
  return <TourLanding clientInfo={clientInfo} />;
}

function PlaceWrapper() {
  const { placeId } = useParams();
  const { pathname } = useLocation();
  const hostname = window.location.hostname;
  
  return <PlaceLanding clientInfo={getPlaceClientInfo(hostname, pathname, placeId)} />;
}

function App() {
  const hostname = window.location.hostname;
  
  // Determine which routes to render based on hostname
  const getRouteConfig = () => {
    // Stay domains (HubLanding as root)
    if (hostname.startsWith('stay-') || hostname.startsWith('uat-stay-')) {
      return (
        <Routes>
          <Route path="/" element={<HubWrapper />} />
          <Route path="/join/:tourId" element={<TourWrapper />} />
          <Route path="/go/:placeId" element={<PlaceWrapper />} />
          <Route path="*" element={<HubWrapper />} />
        </Routes>
      );
    }
    // Join domains (TourLanding as root)
    else if (hostname.includes('join.') || hostname.includes('join--')) {
      return (
        <Routes>
          <Route path="/:tourId" element={<TourWrapper />} />
          <Route path="/:tourId/go/:placeId" element={<PlaceWrapper />} />
          <Route path="*" element={<h1>Tour not found</h1>} />
        </Routes>
      );
    }
    // Go domains (PlaceLanding as root)
    else if (hostname.includes('go.') || hostname.includes('go--')) {
      return (
        <Routes>
          <Route path="/:placeId" element={<PlaceWrapper />} />
          <Route path="*" element={<h1>Place not found</h1>} />
        </Routes>
      );
    }
    // Default routes for any other domain
    else {
      return (
        <Routes>
          <Route path="/" element={<HubWrapper />} />
          <Route path="/join/:tourId" element={<TourWrapper />} />
          <Route path="/go/:placeId" element={<PlaceWrapper />} />
          <Route path="*" element={<HubWrapper />} />
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
          {getRouteConfig()}
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;