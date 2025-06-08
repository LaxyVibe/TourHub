import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useLanguage } from '../../context/LanguageContext';
import { getSuiteData } from '../../utils/suiteUtils';
import { PAGE_LAYOUTS, CONTENT_PADDING } from '../../config/layout';

const FAQInfo = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { language } = useLanguage();
  
  const suiteId = params.suiteId;
  
  const handleBack = () => {
    navigate(`/${language}/${suiteId}/info`);
  };

  // Get suite data
  const suiteData = getSuiteData(suiteId, language);
  const suite = suiteData?.details?.data?.[0];

  if (!suite) {
    return (
      <Container {...PAGE_LAYOUTS.FAQInfo}>
        <Box sx={{ ...CONTENT_PADDING.standard }}>
          <IconButton onClick={handleBack} sx={{ mb: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">Suite information not found</Typography>
        </Box>
      </Container>
    );
  }

  const faqItems = suite.faq || [];

  return (
    <Container {...PAGE_LAYOUTS.FAQInfo}>
      <Box sx={{ ...CONTENT_PADDING.standard }}>
        <IconButton onClick={handleBack} sx={{ mb: 2 }}>
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h4" component="h1" gutterBottom>
          Frequently Asked Questions
        </Typography>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <HelpOutlineIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" component="h2">
              Common Questions
            </Typography>
          </Box>
          
          {faqItems.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No frequently asked questions available.
            </Typography>
          ) : (
            faqItems.map((faqItem, index) => (
              <Accordion key={faqItem.id || index} sx={{ mb: 1 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`faq-content-${index}`}
                  id={`faq-header-${index}`}
                >
                  <Typography variant="subtitle1" fontWeight="medium">
                    {faqItem.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {typeof faqItem.answer === 'string' && faqItem.answer.includes('<') ? (
                    <Box 
                      sx={{ lineHeight: 1.6 }}
                      dangerouslySetInnerHTML={{ __html: faqItem.answer }}
                    />
                  ) : (
                    <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                      {faqItem.answer}
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default FAQInfo;
