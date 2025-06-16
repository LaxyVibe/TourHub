import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../../assets/logo.svg';

const FooterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f7',
  marginTop: 'auto',
}));

const Footer = () => {
  return (
    <FooterContainer component="footer">
      <Typography 
        variant="body2" 
        sx={{ 
          color: '#666', 
          marginRight: 0,
          fontSize: '0.875rem'
        }}
      >
        Powered by
      </Typography>
      <img 
        src={logo} 
        alt="Laxy" 
        style={{ 
          height: '40px',
          width: 'auto'
        }} 
      />
    </FooterContainer>
  );
};

export default Footer;
