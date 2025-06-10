import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box
} from '@mui/material';
import { useParams } from 'react-router-dom';
import PageHeader from '../common/PageHeader';
import GavelIcon from '@mui/icons-material/Gavel';
import { useLanguage } from '../../context/LanguageContext';
import { getSuiteData } from '../../utils/suiteUtils';
import { PAGE_LAYOUTS, CONTENT_PADDING } from '../../config/layout';

const HouseRulesInfo = () => {
  const params = useParams();
  const { language } = useLanguage();
  
  const suiteId = params.suiteId;
  
  // Get suite data
  const suiteData = getSuiteData(suiteId, language);
  const suite = suiteData?.details?.data?.[0];

  if (!suite) {
    return (
      <Container {...PAGE_LAYOUTS.HouseRulesInfo}>
        <PageHeader title="House Rules" />
        <Box sx={{ ...CONTENT_PADDING.standard }}>
          <Typography variant="h6">Suite information not found</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container {...PAGE_LAYOUTS.HouseRulesInfo}>
      <PageHeader title="House Rules" />
      <Box sx={{ ...CONTENT_PADDING.standard }}>

        <Typography variant="h4" component="h1" gutterBottom>
          House Rules
        </Typography>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <GavelIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" component="h2">
              Rules & Policies
            </Typography>
          </Box>
          
          <Box 
            sx={{ lineHeight: 1.6 }}
            dangerouslySetInnerHTML={{ __html: suite.houseRules || 'No house rules information available.' }}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default HouseRulesInfo;
