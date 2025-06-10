import React from 'react';
import { 
  Box, 
  IconButton,
  Typography 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { trackButtonClick, trackNavigation } from '../../utils/analytics';

/**
 * Simple Page Header component for standard pages
 * Shows only back button and title
 */
const PageHeader = ({ title }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    trackButtonClick('page_header_back_button', 'page_header');
    trackNavigation('page_header', 'previous_page', 'back_button');
    navigate(-1);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        px: 2,
        py: 1,
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
      }}
    >
      {/* Back button */}
      <IconButton
        onClick={handleBackClick}
        sx={{ p: 1, mr: 2 }}
      >
        <ArrowBackIcon 
          sx={{ 
            width: 24, 
            height: 24, 
            color: '#333333' 
          }} 
        />
      </IconButton>

      {/* Title */}
      {title && (
        <Typography 
          variant="h6" 
          component="h1"
          sx={{ 
            fontFamily: '"Commissioner", sans-serif',
            fontSize: '24px',
            fontWeight: 700, 
            color: '#333333', 
            flexGrow: 1
          }}
        >
          {title}
        </Typography>
      )}
    </Box>
  );
};

export default PageHeader;
