import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Global flag for MSW initialization status
window.mswReady = false;

// Initialize MSW in development environment
async function startApp() {
  if (process.env.NODE_ENV === 'development') {
    try {
      const { worker } = await import('./mocks/browser');
      await worker.start({
        onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
      });
      console.log('Mock Service Worker initialized successfully');
      window.mswReady = true;
    } catch (error) {
      console.error('Failed to initialize Mock Service Worker:', error);
      // Continue with the app even if MSW fails
      window.mswReady = true;
    }
  } else {
    // In production, skip MSW initialization
    window.mswReady = true;
  }

  // Render the app once MSW is ready (or skipped)
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Start the application
startApp();
