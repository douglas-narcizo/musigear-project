import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Divider from '@mui/material/Divider';

const Footer = () => {
  return (
    <Box 
      component='footer' 
      sx={{
        justifyItems: 'center',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e9ecef',
        marginTop: '2rem',
      }}
    >
      <Stack direction='row' justifyContent='center' color='primary.main' mb='1rem'>
        <Typography variant='body2' letterSpacing={2} mt='2px' sx={{fontStyle: 'italic'}}>
          Developed by
        </Typography>
        <Typography variant='body2' fontWeight={500} mx='4px' mt='2px'>
          - Douglas Narcizo | 2025
        </Typography>
        <Link
          href='https://www.linkedin.com/in/douglas-narcizo' 
          target='_blank' 
          rel='noopener noreferrer' 
          sx={{ ml: '0.75rem', textDecoration: 'none' }}
        >
          <LinkedInIcon />
        </Link>
        <Link 
          href='https://github.com/douglas-narcizo' 
          target='_blank' 
          rel='noopener noreferrer' 
          sx={{ ml: '0.5rem', p: 0, textDecoration: 'none' }}
        >
          <GitHubIcon />
        </Link>
      </Stack>
      <Divider />
      <Typography variant='body2' color='primary.main' align='center' mt={2} sx={{fontSize: '0.75rem'}}>
        This e-commerce platform is a demonstration project created as part of a portfolio showcasing full-stack development skills.
        All products, prices, and order processing are simulated and for illustrative purposes only.
        No real transactions will be conducted, and no goods will be shipped.
      </Typography>
    </Box>
  );
};

export default Footer;