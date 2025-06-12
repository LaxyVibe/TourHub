import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { useParams } from 'react-router-dom';
import PageHeader from '../common/PageHeader';
import { useLanguage } from '../../context/LanguageContext';
import { getPOIsByType } from '../../utils/dataFetcher';
import AddressDisplay from '../common/AddressDisplay';
import { PAGE_LAYOUTS, CONTENT_PADDING } from '../../config/layout';

const POIAddressInfo = () => {
  const { language } = useLanguage();
  const { poiSlug, suiteId } = useParams();
  
  const [poi, setPOI] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPOIDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Search for POI in the specific suite across different types
        const poiTypes = ['restaurant', 'attraction'];
        let foundPOI = null;
        
        for (const poiType of poiTypes) {
          try {
            const result = await getPOIsByType('beppu-story', suiteId, poiType, language);
            foundPOI = result.pois.find(p => p.slug === poiSlug);
            if (foundPOI) {
              foundPOI.type = poiType; // Ensure type is set
              break;
            }
          } catch (error) {
            // Continue searching other POI types
            console.warn(`Failed to search ${poiType} in ${suiteId}:`, error);
          }
        }
        
        if (!foundPOI) {
          setError(`Location with ID "${poiSlug}" not found in ${language} data.`);
          setPOI(null);
        } else {
          setPOI(foundPOI);
        }
      } catch (err) {
        console.error(`Failed to load POI details for slug ${poiSlug} in suite ${suiteId} (lang: ${language}):`, err);
        setError('Failed to load location information. Please try again later.');
        setPOI(null);
      }
      setLoading(false);
    };

    if (poiSlug && suiteId) {
      loadPOIDetails();
    }
  }, [language, poiSlug, suiteId]);

  if (loading) {
    return (
      <Container {...PAGE_LAYOUTS.AddressInfo}>
        <PageHeader title="Address" />
        <Box sx={{ ...CONTENT_PADDING.standard, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !poi) {
    return (
      <Container {...PAGE_LAYOUTS.AddressInfo}>
        <PageHeader title="Address" />
        <Box sx={{ ...CONTENT_PADDING.standard }}>
          <Typography variant="h6" color="error">
            {error || 'Location information not found'}
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!poi.address) {
    return (
      <Container {...PAGE_LAYOUTS.AddressInfo}>
        <PageHeader title="Address" />
        <Box sx={{ ...CONTENT_PADDING.standard }}>
          <Typography variant="h6">
            No address information available for this location.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container {...PAGE_LAYOUTS.AddressInfo}>
      <PageHeader title="Address" />
      <Box sx={{ ...CONTENT_PADDING.standard }}>

        <AddressDisplay
          suiteId={suiteId}
          address={poi.address}
          nativeLanguageCode={poi.nativeLanguageCode}
          addressURL={poi.externalURL}
          addressEmbedHTML={poi.addressEmbedHTML}
          showMap={true}
          showMapButton={true}
          poiSlug={poi.slug}
          isCompact={false}
        />
      </Box>
    </Container>
  );
};

export default POIAddressInfo;
