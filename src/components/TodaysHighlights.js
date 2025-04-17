import React from 'react';
import { Box, Typography, Link, Button, Paper } from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import event1 from '../assets/event_1.jpg';
import event2 from '../assets/event_2.jpg';
import event3 from '../assets/event_3.jpg';

const TodaysHighlights = () => {
  const carouselImages = [
    { src: event1, alt: 'Event 1' },
    { src: event2, alt: 'Event 2' },
    { src: event3, alt: 'Event 3' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <Box sx={{ p: 3, maxWidth: '100%', overflow: 'hidden' }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>
          Today's Highlights
        </Typography>
        <Link href="#" sx={{ color: 'gray', textDecoration: 'none' }}>
          See more
        </Link>
      </Box>

      {/* Carousel Section */}
      <Box 
        sx={{ 
          mb: 3,
          '& .slick-slide': {
            px: 1,
          },
          '& .slick-dots': {
            bottom: -35,
          },
          '& .slick-arrow': {
            zIndex: 1,
            '&::before': {
              fontSize: '24px',
            }
          },
          '& .slick-prev': {
            left: 10,
          },
          '& .slick-next': {
            right: 10,
          }
        }}
      >
        <Slider {...settings}>
          {carouselImages.map((image, index) => (
            <Box key={index}>
              <Paper
                elevation={3}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative',
                  paddingTop: '66.67%', // 3:2 aspect ratio
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    backgroundColor: '#f5f5f5',
                  }}
                />
              </Paper>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Main Content Section */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 'bold',
            mb: 2,
            fontSize: { xs: '1.5rem', sm: '2rem' }
          }}
        >
          北斗の拳40周年大原画展 – 愛をとりもどせ!!
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'gray',
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          全世界で累計1億部以上を誇り上げた超名作漫画『北斗の拳』は1983年に連載がスタートしました。
        </Typography>
      </Box>

      {/* CTA Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          href="#"
          sx={{
            bgcolor: 'teal',
            color: 'white',
            borderRadius: 2,
            px: 4,
            py: 1.5,
            '&:hover': {
              bgcolor: 'teal',
            },
          }}
        >
          Start Tour
        </Button>
      </Box>
    </Box>
  );
};

export default TodaysHighlights;