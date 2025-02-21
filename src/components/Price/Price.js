import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Price = ({ amount, sx }) => {
  const dollars = Math.floor(amount).toLocaleString();
  const cents = Math.round((amount % 1) * 100).toString().padStart(2, '0');

  return (
    <Box sx={{ display: 'flex', width: 'fit-content', ...sx }}>
      <Typography variant='h5' fontWeight={700} sx={{ pt: '0.3rem', mr: '0.1rem', fontSize: '1rem' }}>
        $
      </Typography>
      <Typography variant='h5' fontWeight={500} sx={{ pt: 0, fontSize: '1.6rem' }}>
        {dollars}
      </Typography>
      <Typography variant='h5' fontWeight={700} sx={{ mt: '0.13rem', py: '1px', fontSize: '1rem' }}>
        .{cents}
      </Typography>
    </Box>
  );
};

export default Price;