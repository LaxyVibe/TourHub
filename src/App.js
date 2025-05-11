import React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './components/HomePage';

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

function App() {
  // Get the hostname to determine which content to show
  const hostname = window.location.hostname;
  
  // Extract client information from hostname
  const getClientInfo = () => {
    console.log('Current hostname:', hostname);
    
    // Check for specific client sites
    if (hostname.includes('beppu-story')) {
      return {
        clientName: 'Beppu Story',
        variant: 'beppu-story',
        title: 'Beppu Story',
        subtitle: 'Audio Guide',
        location: 'Beppu, Japan'
      };
    }
    
    // Add more client checks here
    // if (hostname.includes('another-client')) { ... }
    
    // Default variant
    return {
      clientName: 'Laxy Travel',
      variant: 'default',
      title: 'Laxy Travel Guide',
      subtitle: 'Explore with us now',
      location: null
    };
  };

  const clientInfo = getClientInfo();
  
  // Function to render content based on hostname/subdomain
  const renderContent = () => {
    // Pass the client information to HomePage component
    return <HomePage clientInfo={clientInfo} />;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        {renderContent()}
      </div>
    </ThemeProvider>
  );
}

export default App;