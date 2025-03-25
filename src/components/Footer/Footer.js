import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

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
      <Stack direction='row' justifyContent='center' color='primary.main'>
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
    </Box>
  );
};

export default Footer;