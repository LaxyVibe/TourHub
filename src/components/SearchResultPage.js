import React, { useState, useEffect } from 'react';
import {
  Container,
  Box
} from '@mui/material';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from './common/PageHeader';
import POIList from './common/POIList';
import poiRecommendationsData from '../mocks/poi-recommendations/en.json';
import { PAGE_LAYOUTS, CONTENT_PADDING } from '../config/layout';
import { trackNavigation } from '../utils/analytics';

const SearchResultPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  
  // Get search query from URL parameters
  const searchQuery = searchParams.get('q') || '';
  
  const [filteredResults, setFilteredResults] = useState([]);
  
  // Get suite ID from params
  const suiteId = params.suiteId;

  // Filter POI recommendations that have weightInHighlight !== -1 and sort by weight
  const highlightedPOIs = React.useMemo(() => {
    return poiRecommendationsData.data
      .filter(item => item.weightInHighlight !== -1)
      .sort((a, b) => a.weightInHighlight - b.weightInHighlight);
  }, []);

  // Filter search results based on query
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = highlightedPOIs.filter(poi => 
        poi.poi.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        poi.poi.highlight.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [searchQuery, highlightedPOIs]);

  const handleBack = () => {
    trackNavigation('search_result_page', 'search_page', 'back_button');
    navigate(`/${language}/${suiteId}/search`);
  };

  return (
    <Container {...PAGE_LAYOUTS.SearchPage}>
      {/* Page Header */}
      <PageHeader 
        title={`Result of: ${searchQuery}`}
        onBack={handleBack}
      />

      {/* Search Results Content */}
      <Box sx={{ ...CONTENT_PADDING.standard, py: 3 }}>
        <POIList
          searchResults={filteredResults}
          suiteId={suiteId}
          showHeader={false}
          loading={false}
        />
      </Box>
    </Container>
  );
};

export default SearchResultPage;
