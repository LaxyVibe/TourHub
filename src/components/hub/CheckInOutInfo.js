import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { useParams } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PageHeader from '../common/PageHeader';
import { useLanguage } from '../../context/LanguageContext';
import { getSuiteData } from '../../utils/suiteUtils';
import { PAGE_LAYOUTS, CONTENT_PADDING } from '../../config/layout';

const CheckInOutInfo = () => {
  const params = useParams();
  const { language } = useLanguage();
  
  const suiteId = params.suiteId;
  
  // Get suite data
  const suiteData = getSuiteData(suiteId, language);
  const suite = suiteData?.details?.data?.[0];

  if (!suite) {
    return (
      <Container {...PAGE_LAYOUTS.CheckInOutInfo}>
        <PageHeader title="Check-in & Check-out" />
        <Box sx={{ ...CONTENT_PADDING.standard }}>
          <Typography variant="h6">Suite information not found</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container {...PAGE_LAYOUTS.CheckInOutInfo}>
      <PageHeader title="Check-in & Check-out" />
      <Box sx={{ ...CONTENT_PADDING.standard }}>

        <Typography variant="h4" component="h1" gutterBottom>
          Check-in & Check-out
        </Typography>

        <Card elevation={3} sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <AccessTimeIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" component="h2">
                Times & Instructions
              </Typography>
            </Box>
            
            <Box 
              sx={{ 
                lineHeight: 1.8,
                '& p': { mb: 2 },
                '& strong': { fontWeight: 'bold', color: 'primary.main' },
                '& ul, & ol': { pl: 2, mb: 2 },
                '& li': { mb: 1 }
              }}
              dangerouslySetInnerHTML={{ __html: suite.checkInOut || 'No check-in/check-out information available.' }}
            />

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <LoginIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Check-in
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <LogoutIcon sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Check-out
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Paper elevation={1} sx={{ p: 2, backgroundColor: 'grey.50' }}>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            Please follow the check-in and check-out instructions provided above. 
            Contact the host if you have any questions.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default CheckInOutInfo;
