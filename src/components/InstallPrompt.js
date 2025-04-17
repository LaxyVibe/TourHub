import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const isiOS = () => /iphone|ipad|ipod/i.test(window.navigator.userAgent);
const isAndroid = () => /android/i.test(window.navigator.userAgent);

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(() => localStorage.getItem('installPromptDismissed') === '1');

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDismissed(true);
    localStorage.setItem('installPromptDismissed', '1');
  };

  if (dismissed || !showPrompt) {
    if (isiOS() && !window.matchMedia('(display-mode: standalone)').matches) {
      return (
        <Box sx={{ width: '100%', maxWidth: 400, mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Paper elevation={3} sx={{ borderRadius: 3, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>Install Laxy Hub</Typography>
            <Typography variant="body2" color="primary" align="center" sx={{ mb: 2 }}>
              Tap <b>Share</b> &gt; <b>Add to Home Screen</b> to install this app on your iPhone or iPad.
            </Typography>
            <Button variant="text" color="secondary" size="small" onClick={handleDismiss}>Dismiss</Button>
          </Paper>
        </Box>
      );
    }
    return null;
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ borderRadius: 3, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleInstall}
          sx={{ width: '100%', minHeight: 48, fontWeight: 'bold', fontSize: '1.1rem', mb: 1 }}
        >
          Install Laxy Hub App
        </Button>
        <Typography variant="caption" color="secondary" align="center" sx={{ mt: 1 }}>
          {isAndroid()
            ? 'Tap Menu > Add to Home Screen for the best experience.'
            : 'You can also install this app from your browser menu.'}
        </Typography>
        <Button variant="text" color="secondary" size="small" onClick={handleDismiss} sx={{ mt: 1 }}>Dismiss</Button>
      </Paper>
    </Box>
  );
};

export default InstallPrompt;
