import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  IconButton, 
  Paper, 
  Menu, 
  MenuItem,
  Grid,
  CircularProgress,
  TextField,
  Button
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import InfoIcon from '@mui/icons-material/Info';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AttractionsTwoToneIcon from '@mui/icons-material/AttractionsTwoTone';
import TourIcon from '@mui/icons-material/Tour';

import Carousel from 'react-material-ui-carousel';
import { fetchClientInfo } from '../config/clients/hubClients';

const languages = ["English", "日本語", "한국어", "繁體中文", "简体中文"];

// Translations for UI text
const translations = {
  "English": {
    infoLabel: 'Local Information',
    restaurantsLabel: 'Dining Options',
    attractionsLabel: 'Points of Interest',
    toursLabel: 'Available Tours',
    popularToursLabel: 'Featured Experiences',
    restaurantsShortLabel: 'Dining',
    attractionsShortLabel: 'Sights',
    searchPlaceholder: 'Search',
    enterRoomPasscodeTitle: 'Enter Room Passcode (1111)',
    enterRoomPasscodeDescription: 'Please enter your room passcode to view room-specific information.',
    passcodeLabel: 'Passcode',
    passcodeErrorEmpty: 'Please enter a passcode',
    passcodeErrorInvalid: 'Invalid passcode. Please try again.',
    skip: 'Skip',
    submit: 'Submit',
  },
  "日本語": {
    infoLabel: '地域情報',
    restaurantsLabel: '飲食店',
    attractionsLabel: '観光名所',
    toursLabel: '利用可能なツアー',
    popularToursLabel: 'おすすめ体験',
    restaurantsShortLabel: 'グルメ',
    attractionsShortLabel: '観光',
    searchPlaceholder: '検索',
    enterRoomPasscodeTitle: 'ルームパスコードを入力 (1111)',
    enterRoomPasscodeDescription: 'ルーム固有の情報を表示するには、ルームパスコードを入力してください。',
    passcodeLabel: 'パスコード',
    passcodeErrorEmpty: 'パスコードを入力してください',
    passcodeErrorInvalid: '無効なパスコードです。もう一度お試しください。',
    skip: 'スキップ',
    submit: '送信',
  },
  "한국어": {
    infoLabel: '지역 정보',
    restaurantsLabel: '식당 옵션',
    attractionsLabel: '관광 명소',
    toursLabel: '이용 가능한 투어',
    popularToursLabel: '추천 체험',
    restaurantsShortLabel: '맛집',
    attractionsShortLabel: '관광',
    searchPlaceholder: '검색',
    enterRoomPasscodeTitle: '객실 패스코드 입력 (1111)',
    enterRoomPasscodeDescription: '객실 특정 정보를 보려면 객실 패스코드를 입력하세요.',
    passcodeLabel: '패스코드',
    passcodeErrorEmpty: '패스코드를 입력하세요',
    passcodeErrorInvalid: '유효하지 않은 패스코드입니다. 다시 시도하세요.',
    skip: '건너뛰기',
    submit: '제출',
  },
  "繁體中文": {
    infoLabel: '當地資訊',
    restaurantsLabel: '餐飲選擇',
    attractionsLabel: '景點',
    toursLabel: '可用行程',
    popularToursLabel: '精選體驗',
    restaurantsShortLabel: '美食',
    attractionsShortLabel: '景點',
    searchPlaceholder: '搜尋',
    enterRoomPasscodeTitle: '輸入房間密碼 (1111)',
    enterRoomPasscodeDescription: '請輸入您的房間密碼以查看房間特定信息。',
    passcodeLabel: '密碼',
    passcodeErrorEmpty: '請輸入密碼',
    passcodeErrorInvalid: '密碼無效。請重試。',
    skip: '跳過',
    submit: '提交',
  },
  "简体中文": {
    infoLabel: '当地信息',
    restaurantsLabel: '餐饮选择',
    attractionsLabel: '景点',
    toursLabel: '可用行程',
    popularToursLabel: '精选体验',
    restaurantsShortLabel: '美食',
    attractionsShortLabel: '景点',
    searchPlaceholder: '搜索',
    enterRoomPasscodeTitle: '输入房间密码 (1111)',
    enterRoomPasscodeDescription: '请输入您的房间密码以查看房间特定信息。',
    passcodeLabel: '密码',
    passcodeErrorEmpty: '请输入密码',
    passcodeErrorInvalid: '密码无效。请重试。',
    skip: '跳过',
    submit: '提交',
  }
};

const HubLanding = ({ initialClientInfo }) => {
  // State for language and UI
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('English');
  const [clientInfo, setClientInfo] = useState(initialClientInfo);
  const [loading, setLoading] = useState(!initialClientInfo);
  const [error, setError] = useState(null);
  const [suiteInfo, setSuiteInfo] = useState(null);
  const [showPasscodeForm, setShowPasscodeForm] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  
  const openLanguageMenu = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Fetch client info if needed, but wait for MSW to be ready
  useEffect(() => {
    const loadClientInfo = async () => {
      try {
        // Wait for MSW to be initialized before fetching
        if (process.env.NODE_ENV === 'development') {
          // Check for MSW readiness with a timeout to prevent infinite waiting
          let attempt = 0;
          const maxAttempts = 20; // Maximum 20 attempts (10 seconds)
          
          while (!window.mswReady && attempt < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms between checks
            attempt++;
          }
          
          if (!window.mswReady) {
            console.warn('MSW initialization is taking too long, proceeding with fetch anyway');
          } else {
            console.log('MSW is ready, proceeding with fetch');
          }
        }

        // For testing purposes, we'll force loading the beppu-story data
        const data = await fetchClientInfo('beppu-story');
        setClientInfo(data);
        
        // Check for passcode in URL after data is loaded
        const queryParams = new URLSearchParams(location.search);
        const passcode = queryParams.get('passcode');
        
        if (data.suites && passcode) {
          const matchingSuite = data.suites.find(suite => suite.passcode === passcode);
          if (matchingSuite) {
            setSuiteInfo(matchingSuite);
          }
        }

        setLoading(false);
      } catch (err) {
        console.error("Failed to load client info:", err);
        setError("Failed to load client information. Please try again later.");
        setLoading(false);
      }
    };

    // If no initial client info was provided, fetch it
    if (!initialClientInfo) {
      loadClientInfo();
    }
  }, [initialClientInfo, location.search]);

  // Extract passcode from URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const passcode = queryParams.get('passcode');
    
    if (clientInfo && clientInfo.suites && passcode) {
      const matchingSuite = clientInfo.suites.find(suite => suite.passcode === passcode);
      if (matchingSuite) {
        setSuiteInfo(matchingSuite);
      }
    }
  }, [location.search, clientInfo]);

  // Check if we need to show passcode form once data is loaded
  useEffect(() => {
    // If client info is loaded, no suite is selected, and there are suites available
    if (clientInfo && !suiteInfo && clientInfo.suites && clientInfo.suites.length > 0) {
      const queryParams = new URLSearchParams(location.search);
      const passcode = queryParams.get('passcode');
      
      // Only show form if no passcode in URL or passcode is invalid
      if (!passcode) {
        setShowPasscodeForm(true);
      }
    }
  }, [clientInfo, suiteInfo, location.search]);

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (!passcodeInput.trim()) {
      setPasscodeError(translations[currentLanguage].passcodeErrorEmpty);
      return;
    }

    if (clientInfo && clientInfo.suites) {
      const matchingSuite = clientInfo.suites.find(suite => suite.passcode === passcodeInput);
      
      if (matchingSuite) {
        setSuiteInfo(matchingSuite);
        setShowPasscodeForm(false);
        
        // Update URL with the passcode (optional)
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('passcode', passcodeInput);
        window.history.replaceState({}, '', newUrl.toString());
      } else {
        setPasscodeError(translations[currentLanguage].passcodeErrorInvalid);
      }
    }
  };

  // Navigation handlers for the new routes
  const handleStayInfoClick = () => {
    // Preserve query parameters from current URL
    const currentSearchParams = new URLSearchParams(location.search);
    navigate({
      pathname: '/stay-info',
      search: currentSearchParams.toString(),
      state: { stayInfo: suiteInfo?.stayInfo, clientInfo }
    });
  };
  
  const handleRestaurantsClick = () => {
    // Preserve query parameters from current URL
    const currentSearchParams = new URLSearchParams(location.search);
    navigate({
      pathname: '/featured-restaurants',
      search: currentSearchParams.toString(),
      state: { restaurants: clientInfo.restaurantList, clientInfo }
    });
  };
  
  const handleAttractionsClick = () => {
    // Preserve query parameters from current URL
    const currentSearchParams = new URLSearchParams(location.search);
    navigate({
      pathname: '/featured-places',
      search: currentSearchParams.toString(),
      state: { places: clientInfo.featuredPlaces, clientInfo }
    });
  };
  
  const handleToursClick = () => {
    // Preserve query parameters from current URL
    const currentSearchParams = new URLSearchParams(location.search);
    navigate({
      pathname: '/featured-tours',
      search: currentSearchParams.toString(),
      state: { tours: clientInfo.featuredTours, clientInfo }
    });
  };
  
  // Handle language menu
  const handleLanguageClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleLanguageClose = () => {
    setAnchorEl(null);
  };
  
  const handleLanguageSelect = (language) => {
    setCurrentLanguage(language);
    setAnchorEl(null);
    // In a real app, this would trigger language change across the app
    // For example: i18n.changeLanguage(language)
  };
  
  // Handle QR code scanner
  const handleQRScan = () => {
    // On mobile, this would open the camera
    // On desktop, it would allow manual input or webcam scanning
    alert('QR scanner would open here');
  };

  // Handle tour selection
  const handleTourSelect = (tourId) => {
    // Navigate to the tour guide page
    navigate(`/join/${tourId}`);
  };

  // Show loading state while fetching client info
  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  // Show error state if client info failed to load
  if (error) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  // Render the appropriate header based on client info
  const renderHeader = () => {
    const displayTitle = suiteInfo ? suiteInfo.name : clientInfo.title;
    
    return (
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h5" component="h1" fontWeight="bold">
            {displayTitle}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {clientInfo.subtitle} <span style={{ fontSize: '0.8rem' }}>Powered by Laxy</span>
          </Typography>
          {clientInfo.location && (
            <Typography variant="caption" color="text.secondary">
              {clientInfo.location}
            </Typography>
          )}
        </Box>
        <Box>
          <IconButton 
            aria-label="Change language" 
            onClick={handleLanguageClick}
            aria-controls={openLanguageMenu ? 'language-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openLanguageMenu ? 'true' : undefined}
          >
            <LanguageIcon />
          </IconButton>
          <Menu
            id="language-menu"
            anchorEl={anchorEl}
            open={openLanguageMenu}
            onClose={handleLanguageClose}
            MenuListProps={{
              'aria-labelledby': 'language-button',
            }}
          >
            {languages.map((language) => (
              <MenuItem 
                key={language} 
                onClick={() => handleLanguageSelect(language)}
                selected={language === currentLanguage}
              >
                {language}
              </MenuItem>
            ))}
          </Menu>
          <IconButton aria-label="Scan QR code" onClick={handleQRScan}>
            <QrCodeScannerIcon />
          </IconButton>
        </Box>
      </Box>
    );
  };

  // Get section labels from translations based on current language
  const sectionLabels = translations[currentLanguage];

  // Get room images from suite info or nothing
  const roomImages = suiteInfo ? suiteInfo.roomImages : [];

  // Get featured tours from client info or use defaults
  const featuredTours = clientInfo.featuredTours || [];
  
  // Get featured places from client info or use defaults
  const featuredPlaces = clientInfo.featuredPlaces || [];
  
  // Get restaurant list from client info or use empty array
  const restaurantList = clientInfo.restaurantList || [];
  
  // Get carousel title based on suite info
  const carouselTitle = suiteInfo ? suiteInfo.name : clientInfo.carouselTitle || 'Discover Local Experiences';

  return (
    <Container sx={{ pb: 4, px: { xs: 2, sm: 3 }, pt: 2 }}>
      {/* Always show header with language selector */}
      <Paper elevation={0} sx={{ mb: 1, pt: 2, pb: 1, px: 2, position: 'relative', borderRadius: '0 0 16px 16px' }}>
        {renderHeader()}
      </Paper>
      
      {/* Show only passcode form when showPasscodeForm is true */}
      {showPasscodeForm ? (
        <Paper elevation={3} sx={{ mb: 3, p: 3, borderRadius: 2, position: 'relative' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {sectionLabels.enterRoomPasscodeTitle}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {sectionLabels.enterRoomPasscodeDescription}
          </Typography>
          <form onSubmit={handlePasscodeSubmit}>
            <TextField
              autoFocus
              margin="dense"
              label={sectionLabels.passcodeLabel}
              type="text"
              fullWidth
              value={passcodeInput}
              onChange={(e) => {
                setPasscodeInput(e.target.value);
                if (passcodeError) setPasscodeError('');
              }}
              error={!!passcodeError}
              helperText={passcodeError}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button 
                type="submit" 
                color="primary" 
                variant="contained"
                fullWidth
              >
                {sectionLabels.submit}
              </Button>
            </Box>
          </form>
        </Paper>
      ) : (
        /* Main content when not showing passcode form */
        <>
          {/* Search bar - non-functional in this mockup */}
          <Paper
            elevation={1}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2, 
              px: 2, 
              py: 1, 
              borderRadius: 4 
            }}
          >
            <input 
              type="text" 
              placeholder={sectionLabels.searchPlaceholder} 
              style={{ 
                border: 'none', 
                outline: 'none', 
                width: '100%', 
                background: 'transparent',
                fontFamily: 'inherit',
                fontSize: '1rem'
              }} 
            />
          </Paper>
          
          {/* Main Image Banner (Slideshow) - Only show if roomImages exist */}
          {roomImages.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Carousel 
                animation="slide"
                navButtonsAlwaysVisible
                autoPlay
                interval={5000}
                indicators={true}
                sx={{ borderRadius: 2, overflow: 'hidden' }}
              >
                {roomImages.map((item) => (
                  <Box 
                    key={item.id}
                    sx={{ 
                      height: 250, 
                      backgroundImage: `url(${item.src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: 2
                    }}
                    aria-label={item.alt}
                  />
                ))}
              </Carousel>
              <Box sx={{ 
                mt: -4, 
                ml: 2, 
                mb: 2, 
                position: 'relative', 
                zIndex: 10, 
                display: 'inline-flex',
                bgcolor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                px: 2,
                py: 1,
                borderRadius: 1
              }}>
                <Typography variant="h6" component="h2">
                  {carouselTitle}
                </Typography>
              </Box>
            </Box>
          )}
          
          {/* Navigation Icons - Updated to use navigation routes instead of expanding sections */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            {/* Info icon - Always show as it has default content */}
            <Grid item xs={3} sx={{ textAlign: 'center' }}>
              <Paper 
                elevation={1} 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: '50%',
                  width: { xs: 56, sm: 64 },
                  height: { xs: 56, sm: 64 },
                  mx: 'auto',
                  boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                  cursor: 'pointer'
                }}
                onClick={handleStayInfoClick}
              >
                <InfoIcon fontSize={window.innerWidth < 600 ? "medium" : "large"} color="primary" />
              </Paper>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {sectionLabels.infoLabel}
              </Typography>
            </Grid>
            
            {/* Restaurant icon - Only show if restaurant data exists */}
            {restaurantList.length > 0 && (
              <Grid item xs={3} sx={{ textAlign: 'center' }}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    p: { xs: 1.5, sm: 2 },
                    borderRadius: '50%',
                    width: { xs: 56, sm: 64 },
                    height: { xs: 56, sm: 64 },
                    mx: 'auto',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                    cursor: 'pointer'
                  }}
                  onClick={handleRestaurantsClick}
                >
                  <RestaurantIcon fontSize={window.innerWidth < 600 ? "medium" : "large"} color="primary" />
                </Paper>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  {sectionLabels.restaurantsShortLabel}
                </Typography>
              </Grid>
            )}
            
            {/* Attractions icon - Only show if featured places exist */}
            {featuredPlaces.length > 0 && (
              <Grid item xs={3} sx={{ textAlign: 'center' }}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    p: { xs: 1.5, sm: 2 },
                    borderRadius: '50%',
                    width: { xs: 56, sm: 64 },
                    height: { xs: 56, sm: 64 },
                    mx: 'auto',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                    cursor: 'pointer'
                  }}
                  onClick={handleAttractionsClick}
                >
                  <AttractionsTwoToneIcon fontSize={window.innerWidth < 600 ? "medium" : "large"} color="primary" />
                </Paper>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  {sectionLabels.attractionsShortLabel}
                </Typography>
              </Grid>
            )}
            
            {/* Tours icon - Only show if featured tours exist */}
            {featuredTours.length > 0 && (
              <Grid item xs={3} sx={{ textAlign: 'center' }}>
                <Paper 
                  elevation={1} 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    p: { xs: 1.5, sm: 2 },
                    borderRadius: '50%',
                    width: { xs: 56, sm: 64 },
                    height: { xs: 56, sm: 64 },
                    mx: 'auto',
                    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                    cursor: 'pointer'
                  }}
                  onClick={handleToursClick}
                >
                  <TourIcon fontSize={window.innerWidth < 600 ? "medium" : "large"} color="primary" />
                </Paper>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  {sectionLabels.toursLabel}
                </Typography>
              </Grid>
            )}
          </Grid>
          
          {/* Tour Slideshow Section - Only show if featured tours exist */}
          {featuredTours.length > 0 && (
            <Box sx={{ mb: 3, mt: 4 }}>
              <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 'bold', fontSize: { xs: '1.125rem', sm: '1.25rem' } }}>
                {sectionLabels.popularToursLabel}
              </Typography>
              
              <Box sx={{ overflowX: 'auto', display: 'flex', pb: 2 }}>
                {featuredTours.map((tour) => (
                  <Paper
                    key={tour.id}
                    elevation={2}
                    sx={{
                      minWidth: { xs: 150, sm: 200 },
                      width: { xs: 150, sm: 200 },
                      mr: 2,
                      borderRadius: 2,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      }
                    }}
                    onClick={() => handleTourSelect(tour.id)}
                  >
                    <Box
                      sx={{ 
                        height: { xs: 100, sm: 120 }, 
                        backgroundImage: `url(${tour.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
                      <Typography variant="subtitle1" fontWeight="medium" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                        {tour.name}
                      </Typography>
                      {tour.duration && (
                        <Typography variant="caption" color="text.secondary">
                          {tour.duration}
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default HubLanding;