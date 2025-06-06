import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Card,
  CardMedia,
  CardContent,
  InputAdornment,
  Chip
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import QrCodeIcon from '@mui/icons-material/QrCode2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLanguage } from '../context/LanguageContext';
import { getHubConfigByLanguage } from '../mocks/hub-application-config';
import poiRecommendationsData from '../mocks/poi-recommendations/en.json';

const SearchPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  
  // Get hub configuration for current language
  const hubConfig = getHubConfigByLanguage(language);
  const pageSearchConfig = hubConfig?.data?.pageSearch;
  
  // Get suite ID from params
  const suiteId = params.suiteId;

  // Filter POI recommendations that have weightInHighlight !== -1 and sort by weight
  const highlightedPOIs = poiRecommendationsData.data
    .filter(item => item.weightInHighlight !== -1)
    .sort((a, b) => a.weightInHighlight - b.weightInHighlight);

  const handleBack = () => {
    navigate(`/${language}/${suiteId}`);
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    
    if (!query) {
      setFilteredResults([]);
      return;
    }
    
    // Simple search functionality - filter highlighted POIs by label
    const results = highlightedPOIs.filter(poi => 
      poi.poi.label.toLowerCase().includes(query.toLowerCase()) ||
      poi.poi.highlight.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResults(results);
  };

  const handleDefaultListItemClick = (item) => {
    setSearchQuery(item.value);
    // Trigger search automatically
    const query = item.value.trim();
    if (query) {
      const results = highlightedPOIs.filter(poi => 
        poi.poi.label.toLowerCase().includes(query.toLowerCase()) ||
        poi.poi.highlight.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(results);
    }
  };

  const handleHighlightedItemClick = (poi) => {
    // Navigate to suite-specific POI detail page
    if (poi.type === 'tour') {
      navigate(`/${language}/${suiteId}/tour/${poi.slug}`);
    } else if (poi.type === 'attraction' || poi.type === 'place' || poi.type === 'restaurant') {
      navigate(`/${language}/${suiteId}/poi/${poi.slug}`);
    } else {
      // For other types, show more info or navigate to external URL
      if (poi.externalURL) {
        window.open(poi.externalURL, '_blank');
      } else {
        alert(`More information about ${poi.label} would be displayed here.`);
      }
    }
  };

  const handleQRCodeClick = () => {
    // Handle QR code functionality
    // For now, show a simple alert. In future, this could integrate with a QR code scanner
    alert('QR Code Scanner functionality would be implemented here. This could open the device camera to scan QR codes for tours, places, or special offers.');
  };

  return (
    <Container maxWidth="sm" sx={{ py: 0, px: 0 }}>
      {/* Search Header */}
      <Paper 
        elevation={1} 
        sx={{ 
          borderRadius: 0,
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'white'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          px: 2,
          py: 1.5,
          gap: 1
        }}>
          {/* Back Button */}
          <IconButton
            onClick={handleBack}
            sx={{ p: 1 }}
            aria-label="back"
          >
            <ArrowBackIcon />
          </IconButton>

          {/* Search Input */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder={pageSearchConfig?.searchInputPlaceholder || "Find Your Next Adventure"}
            value={searchQuery}
            onChange={(e) => {
              const newQuery = e.target.value;
              setSearchQuery(newQuery);
              // Real-time search
              if (!newQuery.trim()) {
                setFilteredResults([]);
              } else {
                const results = highlightedPOIs.filter(poi => 
                  poi.poi.label.toLowerCase().includes(newQuery.toLowerCase()) ||
                  poi.poi.highlight.toLowerCase().includes(newQuery.toLowerCase())
                );
                setFilteredResults(results);
              }
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch(e);
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#f5f5f5',
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                  borderWidth: 1,
                },
              }
            }}
          />

          {/* QR Code Button */}
          <IconButton
            onClick={handleQRCodeClick}
            sx={{ p: 1 }}
            aria-label="QR Code"
          >
            <QrCodeIcon />
          </IconButton>
        </Box>
      </Paper>

      {/* Search Content */}
      <Box sx={{ px: 2, py: 3 }}>
        {/* Default Search Keywords Section */}
        {pageSearchConfig?.defaultList && pageSearchConfig.defaultList.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h6" 
              component="h2" 
              sx={{ 
                mb: 2, 
                fontWeight: 600,
                fontSize: '1.1rem'
              }}
            >
              {pageSearchConfig.defaultListHeading || "Most Searched"}
            </Typography>
            
            <Paper elevation={1} sx={{ borderRadius: 2 }}>
              <List disablePadding>
                {pageSearchConfig.defaultList.map((item, index) => (
                  <ListItem
                    key={item.id || index}
                    button
                    onClick={() => handleDefaultListItemClick(item)}
                    sx={{
                      borderBottom: index < pageSearchConfig.defaultList.length - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      }
                    }}
                  >
                    <ListItemText 
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: 500
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        )}

        {/* Highlighted POIs Section or Search Results */}
        {(searchQuery.trim() ? filteredResults : highlightedPOIs).length > 0 && (
          <Box>
            <Typography 
              variant="h6" 
              component="h2" 
              sx={{ 
                mb: 2, 
                fontWeight: 600,
                fontSize: '1.1rem'
              }}
            >
              {searchQuery.trim() 
                ? `Search Results for "${searchQuery}"` 
                : (pageSearchConfig?.highlightedListHeading || "Explore More")
              }
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {(searchQuery.trim() ? filteredResults : highlightedPOIs).map((item) => (
                <Card 
                  key={item.id}
                  elevation={1}
                  sx={{ 
                    borderRadius: 2, 
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                    }
                  }}
                  onClick={() => handleHighlightedItemClick(item.poi)}
                >
                  {item.poi.coverPhoto && (
                    <CardMedia
                      component="img"
                      height={160}
                      image={item.poi.coverPhoto.url}
                      alt={item.poi.label}
                      sx={{ objectFit: 'cover' }}
                    />
                  )}
                  <CardContent sx={{ p: 2 }}>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      sx={{ 
                        fontWeight: 600,
                        fontSize: '1rem',
                        mb: 1
                      }}
                    >
                      {item.poi.label}
                    </Typography>
                    
                    {item.poi.highlight && (
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          mb: 1,
                          display: '-webkit-box',
                          '-webkit-line-clamp': 2,
                          '-webkit-box-orient': 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {item.poi.highlight}
                      </Typography>
                    )}

                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      <Chip 
                        size="small" 
                        label={item.poi.type} 
                        color="primary" 
                        variant="outlined"
                      />
                      {item.poi.tag_labels?.map((tag) => (
                        <Chip 
                          key={tag.id || tag.documentId}
                          size="small" 
                          label={tag.name} 
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}

        {/* Search No Results State */}
        {searchQuery.trim() && filteredResults.length === 0 && (
          <Paper elevation={1} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
            <SearchIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No results found for "{searchQuery}"
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try searching with different keywords
            </Typography>
          </Paper>
        )}

        {/* Empty State */}
        {!searchQuery.trim() && 
         (!pageSearchConfig?.defaultList || pageSearchConfig.defaultList.length === 0) && 
         highlightedPOIs.length === 0 && (
          <Paper elevation={1} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
            <SearchIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Start typing to search
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discover amazing places and experiences
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default SearchPage;
