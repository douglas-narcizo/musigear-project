import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Incrementer = ({ qty, onIncrement, onDecrement }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <IconButton size='small' onClick={onDecrement} disabled={qty <= 1}>
        <RemoveIcon />
      </IconButton>
      <Typography variant="body1" sx={{ mx: 1 }}>
        {qty}
      </Typography>
      <IconButton size='small' onClick={onIncrement}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default Incrementer;