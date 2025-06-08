import React, { useState, useEffect } from 'react';
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
  InputAdornment,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Chip
} from '@mui/material';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import QrCodeIcon from '@mui/icons-material/QrCode2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLanguage } from '../context/LanguageContext';
import { getHubConfigByLanguage } from '../mocks/hub-application-config';
import HighlightedPOIsSection from './common/HighlightedPOIsSection';
import POIList from './common/POIList';
import poiRecommendationsData from '../mocks/poi-recommendations/en.json';
import { PAGE_LAYOUTS, CONTENT_PADDING } from '../config/layout';
import { trackSearch, trackButtonClick, trackNavigation } from '../utils/analytics';

// Function to highlight matching text
const highlightText = (text, searchQuery) => {
  if (!searchQuery.trim()) return text;
  
  const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => {
    if (regex.test(part)) {
      return (
        <Box
          key={index}
          component="span"
          sx={{
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            padding: '2px 4px',
            borderRadius: '4px',
            fontWeight: 600
          }}
        >
          {part}
        </Box>
      );
    }
    return part;
  });
};

const SearchPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { language } = useLanguage();
  
  // Get search query from URL parameters
  const urlSearchQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchDropdownResults, setSearchDropdownResults] = useState([]);
  
  // Get hub configuration for current language
  const hubConfig = getHubConfigByLanguage(language);
  const pageSearchConfig = hubConfig?.data?.pageSearch;
  
  // Get suite ID from params
  const suiteId = params.suiteId;

  // Transform POI data from poi-recommendations format to HighlightedPOIsSection format
  const transformPOIData = (poiItems) => {
    return poiItems.map(item => ({
      id: item.poi.id,
      slug: item.poi.slug,
      name: item.poi.label,
      title: item.poi.label,
      description: item.poi.highlight,
      imageUrl: item.poi.coverPhoto?.url,
      category: item.poi.type,
      // Add any additional properties that might be needed
      type: item.poi.type,
      externalURL: item.poi.externalURL
    }));
  };

  // Filter POI recommendations that have weightInHighlight !== -1 and sort by weight
  const highlightedPOIs = React.useMemo(() => {
    return poiRecommendationsData.data
      .filter(item => item.weightInHighlight !== -1)
      .sort((a, b) => a.weightInHighlight - b.weightInHighlight);
  }, []);

  // Initialize search results from URL on mount
  useEffect(() => {
    if (urlSearchQuery.trim()) {
      const results = highlightedPOIs.filter(poi => 
        poi.poi.label.toLowerCase().includes(urlSearchQuery.toLowerCase()) ||
        poi.poi.highlight.toLowerCase().includes(urlSearchQuery.toLowerCase())
      );
      setFilteredResults(results);
    }
  }, [urlSearchQuery, highlightedPOIs]);

  const handleBack = () => {
    trackButtonClick('back_button', 'search_page');
    trackNavigation('search_page', 'suite', 'back_button');
    navigate(`/${language}/${suiteId}`);
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    
    if (!query) {
      // Clear URL parameters and results if empty query
      setSearchParams({});
      setFilteredResults([]);
      setShowDropdown(false);
      return;
    }
    
    // Track search
    trackSearch(query, filteredResults.length);
    
    // Update URL with search query
    setSearchParams({ q: query });
    setShowDropdown(false);
    
    // Filter POIs for results
    const results = highlightedPOIs.filter(poi => 
      poi.poi.label.toLowerCase().includes(query.toLowerCase()) ||
      poi.poi.highlight.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResults(results);
    
    // Track search results count
    trackSearch(query, results.length);
  };

  const handleSearchInputChange = (newQuery) => {
    setSearchQuery(newQuery);
    
    if (!newQuery.trim()) {
      setSearchDropdownResults([]);
      setShowDropdown(false);
      return;
    }

    // Filter POIs by label for dropdown
    const dropdownResults = highlightedPOIs.filter(poi => 
      poi.poi.label.toLowerCase().includes(newQuery.toLowerCase())
    ).slice(0, 5); // Limit to 5 results for dropdown

    setSearchDropdownResults(dropdownResults);
    setShowDropdown(dropdownResults.length > 0);
  };

  const handleDropdownItemClick = (poi) => {
    trackButtonClick(`poi_${poi.poi.slug}`, 'search_dropdown');
    trackNavigation('search_dropdown', 'poi_detail', 'poi_click');
    
    setSearchQuery(poi.poi.label);
    setShowDropdown(false);
    // Navigate to POI detail page
    navigate(`/${language}/${suiteId}/poi/${poi.poi.slug}`);
  };

  const handleClickAway = () => {
    setShowDropdown(false);
  };

  const handleDefaultListItemClick = (item) => {
    trackButtonClick(`default_search_${item.value}`, 'search_page');
    
    setSearchQuery(item.value);
    setShowDropdown(false);
    
    // Update URL with search query
    setSearchParams({ q: item.value });
    
    // Filter POIs for results
    const query = item.value.trim();
    if (query) {
      const results = highlightedPOIs.filter(poi => 
        poi.poi.label.toLowerCase().includes(query.toLowerCase()) ||
        poi.poi.highlight.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(results);
      
      // Track search
      trackSearch(query, results.length);
    }
  };

  const handleQRCodeClick = () => {
    trackButtonClick('qr_code_scanner', 'search_page');
    // Handle QR code functionality
    // For now, show a simple alert. In future, this could integrate with a QR code scanner
    alert('QR Code Scanner functionality would be implemented here. This could open the device camera to scan QR codes for tours, places, or special offers.');
  };

  return (
    <Container {...PAGE_LAYOUTS.SearchPage}>
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
          <Box sx={{ position: 'relative', flex: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={pageSearchConfig?.searchInputPlaceholder || "Find Your Next Adventure"}
              value={searchQuery}
              onChange={(e) => {
                handleSearchInputChange(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch(e);
                }
              }}
              onFocus={() => {
                if (searchQuery.trim() && searchDropdownResults.length > 0) {
                  setShowDropdown(true);
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

            {/* Search Dropdown */}
            {showDropdown && searchDropdownResults.length > 0 && (
              <ClickAwayListener onClickAway={handleClickAway}>
                <Paper
                  elevation={8}
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    mt: 0.5,
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}
                >
                  <MenuList dense>
                    {searchDropdownResults.map((poi) => (
                      <MenuItem
                        key={poi.poi.id}
                        onClick={() => handleDropdownItemClick(poi)}
                        sx={{
                          py: 2,
                          alignItems: 'flex-start',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                          {poi.poi.coverPhoto?.url && (
                            <Box
                              component="img"
                              src={poi.poi.coverPhoto.url}
                              alt={poi.poi.label}
                              sx={{
                                width: 40,
                                height: 40,
                                objectFit: 'cover',
                                borderRadius: 1
                              }}
                            />
                          )}
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
                              {highlightText(poi.poi.label, searchQuery)}
                            </Typography>
                            
                            {/* Tag Labels */}
                            {poi.poi.tag_labels && poi.poi.tag_labels.length > 0 && (
                              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                {poi.poi.tag_labels.slice(0, 2).map((tag) => (
                                  <Chip
                                    key={tag.id || tag.name}
                                    label={tag.name || tag}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                      fontSize: '0.6rem',
                                      height: 20,
                                      '& .MuiChip-label': {
                                        px: 0.5
                                      }
                                    }}
                                  />
                                ))}
                                {poi.poi.tag_labels.length > 2 && (
                                  <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5, alignSelf: 'center' }}>
                                    +{poi.poi.tag_labels.length - 2} more
                                  </Typography>
                                )}
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Paper>
              </ClickAwayListener>
            )}
          </Box>

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
      <Box sx={{ ...CONTENT_PADDING.standard, py: 3 }}>
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
        {searchQuery.trim() ? (
          // Search Results using POIList component
          <POIList
            pois={filteredResults.map(item => item.poi)}
            title="Search Results"
            subtitle={`${filteredResults.length} result${filteredResults.length !== 1 ? 's' : ''} found for "${searchQuery}"`}
            type="result"
            suiteId={suiteId}
            showHeader={false}
          />
        ) : (
          // Highlighted POIs when not searching
          highlightedPOIs.length > 0 ? (
            <HighlightedPOIsSection
              heading={pageSearchConfig?.highlightedListHeading || "Explore More"}
              pois={transformPOIData(highlightedPOIs)}
              suiteId={suiteId}
            />
          ) : null
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
