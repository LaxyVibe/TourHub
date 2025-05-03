import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// Import images
import event1 from '../assets/event_1.jpg';
import event2 from '../assets/event_2.jpg';
import event3 from '../assets/event_3.jpg';

const tempImages = [
  event1,
  event2,
  event3,
];

const CarouselCard = styled(Box)(({ theme }) => ({
  minWidth: 280,
  height: 180,
  borderRadius: 16,
  marginRight: 16,
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  '&:last-child': {
    marginRight: 0
  },
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }
}));

const TodaysHighlights = () => {
  return (
    <Container 
      sx={{ 
        pt: 3, 
        pb: 4,
        px: { xs: 2, sm: 3 } // Smaller padding on mobile
      }}
    >
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000' }}>
          Today's Highlights
        </Typography>
        <Typography 
          component="a" 
          href="#" 
          sx={{ 
            color: 'grey.600', 
            textDecoration: 'none',
            fontSize: '0.875rem',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          See more
        </Typography>
      </Box>

      {/* Carousel Section */}
      <Box 
        sx={{ 
          display: 'flex', 
          overflowX: 'auto', 
          mb: 4,
          mx: -2, // Extend beyond container padding
          px: 2,  // Add padding back to maintain spacing
          WebkitOverflowScrolling: 'touch',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
        }}
      >
        {tempImages.map((img, index) => (
          <CarouselCard key={index}>
            <img src={img} alt={`Event ${index + 1}`} />
          </CarouselCard>
        ))}
      </Box>

      {/* Main Content Section */}
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 'bold', 
          mb: 2,
          lineHeight: 1.4,
          fontFamily: "'Noto Sans JP', sans-serif",
          fontSize: { xs: '1.5rem', sm: '2rem' }
        }}
      >
        北斗の拳40周年大原画展 – 愛をとりもどせ!!
      </Typography>

      <Typography 
        variant="body1" 
        sx={{ 
          color: 'grey.600',
          mb: 4,
          lineHeight: 1.6,
          fontFamily: "'Noto Sans JP', sans-serif",
          fontSize: { xs: '0.875rem', sm: '1rem' }
        }}
      >
        全世界で累計1億部以上を売り上げた超名作漫画『北斗の拳』は1983年に連載がスタートしました。
      </Typography>

      {/* CTA Button */}
      <Button 
        variant="contained"
        fullWidth
        sx={{
          bgcolor: '#4DB6AC',
          color: 'white',
          py: 1.5,
          borderRadius: 2,
          textTransform: 'none',
          fontSize: { xs: '1rem', sm: '1.1rem' },
          fontWeight: 500,
          '&:hover': {
            bgcolor: '#3B9B91'
          }
        }}
        href="#"
      >
        Start Tour
      </Button>
    </Container>
  );
};

export default TodaysHighlights;